const fs = require('fs');
const path = require('path');

const serverFile = path.join(__dirname, '..', 'server.js');
let content = fs.readFileSync(serverFile, 'utf8');

// Add tls, net require if not present
if (!content.includes("const tls = require('tls');")) {
  content = content.replace("const url = require('url');", "const url = require('url');\nconst tls = require('tls');\nconst net = require('net');");
}

// Add sendSmtpMail helper function
const smtpFunction = `
// Helper: Send Real SMTP Email via pure TLS/Socket
function sendSmtpMail(options) {
  return new Promise((resolve, reject) => {
    const { host, port, user, password, fromEmail, fromName, toEmail, subject, html, text } = options;
    const isSecurePort = Number(port) === 465;
    let socket;
    let log = [];

    function cleanup() {
      if (socket && !socket.destroyed) {
        try { socket.destroy(); } catch {}
      }
    }

    const timeoutTimer = setTimeout(() => {
      cleanup();
      reject(new Error(\`SMTP 연결 시간 초과 (15초): \${log.slice(-3).join(' | ')}\`));
    }, 15000);

    const onConnected = () => { log.push('Connected'); };

    try {
      if (isSecurePort) {
        socket = tls.connect({ host, port: Number(port), rejectUnauthorized: false }, onConnected);
      } else {
        socket = net.connect({ host, port: Number(port) }, onConnected);
      }
    } catch (err) {
      clearTimeout(timeoutTimer);
      return reject(err);
    }

    socket.setEncoding('utf8');
    let step = 0;
    let buffer = '';

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\\r\\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        log.push(\`S: \${line}\`);
        const code = line.slice(0, 3);
        const isLastLine = line.charAt(3) === ' ';

        if (!isLastLine && !/^[0-9]{3}/.test(line)) continue;

        if (step === 0 && code === '220') {
          step = 1;
          socket.write(\`EHLO localhost\\r\\n\`);
        } else if (step === 1 && code === '250' && isLastLine) {
          step = 2;
          socket.write(\`AUTH LOGIN\\r\\n\`);
        } else if (step === 2 && code === '334') {
          step = 3;
          const uB64 = Buffer.from(user).toString('base64');
          socket.write(\`\${uB64}\\r\\n\`);
        } else if (step === 3 && code === '334') {
          step = 4;
          const pB64 = Buffer.from(password).toString('base64');
          socket.write(\`\${pB64}\\r\\n\`);
        } else if (step === 4 && code === '235') {
          step = 5;
          socket.write(\`MAIL FROM:<\${fromEmail}>\\r\\n\`);
        } else if (step === 5 && code === '250') {
          step = 6;
          socket.write(\`RCPT TO:<\${toEmail}>\\r\\n\`);
        } else if (step === 6 && code === '250') {
          step = 7;
          socket.write(\`DATA\\r\\n\`);
        } else if (step === 7 && code === '354') {
          step = 8;
          const dateStr = new Date().toUTCString();
          const encodedSubject = \`=?UTF-8?B?\${Buffer.from(subject || '투어이지 안내', 'utf8').toString('base64')}?=\`;
          const encodedFromName = \`=?UTF-8?B?\${Buffer.from(fromName || '투어이지', 'utf8').toString('base64')}?=\`;

          const mailBody = [
            \`From: \${encodedFromName} <\${fromEmail}>\`,
            \`To: <\${toEmail}>\`,
            \`Date: \${dateStr}\`,
            \`Subject: \${encodedSubject}\`,
            \`MIME-Version: 1.0\`,
            \`Content-Type: text/html; charset=UTF-8\`,
            \`Content-Transfer-Encoding: base64\`,
            \`\`,
            Buffer.from(html || text || '', 'utf8').toString('base64'),
            \`.\`,
            \`\`
          ].join('\\r\\n');

          socket.write(mailBody);
        } else if (step === 8 && code === '250') {
          step = 9;
          socket.write(\`QUIT\\r\\n\`);
          clearTimeout(timeoutTimer);
          cleanup();
          return resolve({ success: true, message: '이메일이 성공적으로 발송되었습니다.', code });
        } else if (parseInt(code, 10) >= 400) {
          clearTimeout(timeoutTimer);
          cleanup();
          let guide = '';
          if (code === '535') {
            guide = ' [인증 실패: 네이버/다음 메일 환경설정에서 IMAP/SMTP를 사용함으로 설정하거나, 2단계 인증 시 애플리케이션 비밀번호를 입력해주세요.]';
          }
          return reject(new Error(\`SMTP 오류 [\${code}]: \${line}\${guide}\`));
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeoutTimer);
      cleanup();
      reject(new Error(\`소켓 연결 실패: \${err.message}\`));
    });

    socket.on('close', () => {
      clearTimeout(timeoutTimer);
      if (step < 8) {
        reject(new Error(\`서버와 연결이 조기 종료되었습니다. (step: \${step})\`));
      }
    });
  });
}
`;

if (!content.includes('function sendSmtpMail(')) {
  content = content.replace('// In-memory verification code store', smtpFunction + '\n// In-memory verification code store');
}

// Update /api/smtp-test route
const oldSmtpTest = `      // 10-4. POST /api/smtp-test
      if (pathname === '/api/smtp-test' && method === 'POST') {
        const body = await parseRequestBody(req);
        return sendJson(res, 200, { success: true, message: \`[\${body.recipientEmail || '고객'}]로 테스트 발송 요청을 처리했습니다.\` });
      }`;

const newSmtpTest = `      // 10-4. POST /api/smtp-test
      if (pathname === '/api/smtp-test' && method === 'POST') {
        const body = await parseRequestBody(req);
        const smtpCfg = readJson('smtp_config.json', {});
        const targetEmail = (body.recipientEmail || body.email || smtpCfg.fromEmail || 'wisekks@gmail.com').trim();

        const host = body.host || smtpCfg.host || 'smtp.naver.com';
        const port = body.port || smtpCfg.port || 465;
        const user = body.user || smtpCfg.user || '';
        const password = body.password && body.password !== '******' ? body.password : (smtpCfg.password || '');
        const fromEmail = body.fromEmail || smtpCfg.fromEmail || (user.includes('@') ? user : \`\${user}@naver.com\`);
        const fromName = body.fromName || smtpCfg.fromName || '투어이지(TourEasy)';

        if (!user || !password) {
          return sendJson(res, 400, {
            success: false,
            message: 'SMTP 계정 또는 비밀번호가 입력되지 않았습니다. 관리자 페이지에서 설정을 저장해 주세요.'
          });
        }

        try {
          const testHtml = \`
            <div style="font-family: 'Pretendard', sans-serif; padding: 24px; background: #f8fafc; border-radius: 16px; border: 1px solid #e2e8f0; max-width: 600px;">
              <h2 style="color: #0284c7; margin-top: 0;">🎉 투어이지(TourEasy) SMTP 발송 테스트 완료</h2>
              <p style="color: #334155; font-size: 14px; line-height: 1.6;">
                안녕하세요! 투어이지 이메일 발송 서버(SMTP)가 정상적으로 연동되었습니다.
              </p>
              <div style="background: #ffffff; padding: 16px; border-radius: 12px; border: 1px solid #cbd5e1; margin: 16px 0;">
                <p style="margin: 4px 0; color: #475569; font-size: 13px;"><strong>발신 호스트:</strong> \${host}:\${port}</p>
                <p style="margin: 4px 0; color: #475569; font-size: 13px;"><strong>발신자:</strong> \${fromName} &lt;\${fromEmail}&gt;</p>
                <p style="margin: 4px 0; color: #475569; font-size: 13px;"><strong>수신자:</strong> \${targetEmail}</p>
                <p style="margin: 4px 0; color: #475569; font-size: 13px;"><strong>발송 일시:</strong> \${new Date().toLocaleString('ko-KR')}</p>
              </div>
              <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">본 메일은 투어이지 관리자 센터의 SMTP 설정 정상 동작 검증 메일입니다.</p>
            </div>
          \`;

          const result = await sendSmtpMail({
            host,
            port,
            user,
            password,
            fromEmail,
            fromName,
            toEmail: targetEmail,
            subject: '[투어이지] SMTP 메일 발송 테스트 성공 안내',
            html: testHtml
          });

          return sendJson(res, 200, {
            success: true,
            message: \`[\${targetEmail}] 메일함으로 테스트 메일이 성공적으로 발송되었습니다!\`,
            details: result
          });
        } catch (err) {
          console.error('SMTP test error:', err.message);
          return sendJson(res, 500, {
            success: false,
            message: \`메일 발송 실패: \${err.message}\`
          });
        }
      }`;

content = content.replace(oldSmtpTest, newSmtpTest);

fs.writeFileSync(serverFile, content, 'utf8');
console.log('Successfully patched server.js with SMTP sender and test endpoint');
