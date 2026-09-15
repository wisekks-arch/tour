const tls = require('tls');
const net = require('net');
const fs = require('fs');
const path = require('path');

function sendSmtpMail(options) {
  return new Promise((resolve, reject) => {
    const { host, port, user, password, fromEmail, fromName, toEmail, toName, subject, text, html } = options;

    const isSecurePort = Number(port) === 465;
    let socket;
    let log = [];

    function cleanup() {
      if (socket && !socket.destroyed) {
        socket.destroy();
      }
    }

    const timeoutTimer = setTimeout(() => {
      cleanup();
      reject(new Error(`SMTP connection timed out (15s): ${log.join(' | ')}`));
    }, 15000);

    const onConnected = () => {
      log.push('Connected');
    };

    if (isSecurePort) {
      socket = tls.connect({ host, port, rejectUnauthorized: false }, onConnected);
    } else {
      socket = net.connect({ host, port }, onConnected);
    }

    socket.setEncoding('utf8');

    let step = 0;
    let buffer = '';

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      buffer = lines.pop(); // keep last incomplete line

      for (const line of lines) {
        if (!line.trim()) continue;
        log.push(`S: ${line}`);
        const code = line.slice(0, 3);
        const isLastLine = line.charAt(3) === ' ';

        if (!isLastLine && !/^[0-9]{3}/.test(line)) continue;

        if (step === 0 && code === '220') {
          // Greeting received, send EHLO
          step = 1;
          const ehloCmd = `EHLO localhost\r\n`;
          log.push(`C: EHLO localhost`);
          socket.write(ehloCmd);
        } else if (step === 1 && code === '250' && isLastLine) {
          // EHLO response finished, start AUTH LOGIN
          step = 2;
          log.push(`C: AUTH LOGIN`);
          socket.write(`AUTH LOGIN\r\n`);
        } else if (step === 2 && code === '334') {
          // Send Base64 User
          step = 3;
          const uB64 = Buffer.from(user).toString('base64');
          log.push(`C: [Base64 Username: ${user}]`);
          socket.write(`${uB64}\r\n`);
        } else if (step === 3 && code === '334') {
          // Send Base64 Password
          step = 4;
          const pB64 = Buffer.from(password).toString('base64');
          log.push(`C: [Base64 Password]`);
          socket.write(`${pB64}\r\n`);
        } else if (step === 4 && code === '235') {
          // Authentication successful! Send MAIL FROM
          step = 5;
          const mailFromCmd = `MAIL FROM:<${fromEmail}>\r\n`;
          log.push(`C: ${mailFromCmd.trim()}`);
          socket.write(mailFromCmd);
        } else if (step === 5 && code === '250') {
          // MAIL FROM OK, send RCPT TO
          step = 6;
          const rcptToCmd = `RCPT TO:<${toEmail}>\r\n`;
          log.push(`C: ${rcptToCmd.trim()}`);
          socket.write(rcptToCmd);
        } else if (step === 6 && code === '250') {
          // RCPT TO OK, send DATA
          step = 7;
          log.push(`C: DATA`);
          socket.write(`DATA\r\n`);
        } else if (step === 7 && code === '354') {
          // Send mail body
          step = 8;
          const dateStr = new Date().toUTCString();
          const encodedSubject = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
          const encodedFromName = `=?UTF-8?B?${Buffer.from(fromName || '투어이지', 'utf8').toString('base64')}?=`;
          
          let mailData = [
            `From: ${encodedFromName} <${fromEmail}>`,
            `To: <${toEmail}>`,
            `Date: ${dateStr}`,
            `Subject: ${encodedSubject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: base64`,
            ``,
            Buffer.from(html || text || '', 'utf8').toString('base64'),
            `.`,
            ``
          ].join('\r\n');

          log.push(`C: [Sending Mail Body...]`);
          socket.write(mailData);
        } else if (step === 8 && code === '250') {
          // Message accepted for delivery!
          step = 9;
          log.push(`C: QUIT`);
          socket.write(`QUIT\r\n`);
          clearTimeout(timeoutTimer);
          cleanup();
          return resolve({ success: true, message: `메일 발송 성공: ${line}`, log });
        } else if (parseInt(code, 10) >= 400) {
          clearTimeout(timeoutTimer);
          cleanup();
          return reject(new Error(`SMTP Error [${code}]: ${line} | Full Log: ${log.slice(-5).join(' -> ')}`));
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timeoutTimer);
      cleanup();
      reject(new Error(`Socket error: ${err.message} | Log: ${log.join(' | ')}`));
    });

    socket.on('close', () => {
      clearTimeout(timeoutTimer);
      if (step < 8) {
        reject(new Error(`Connection closed unexpectedly at step ${step} | Log: ${log.join(' | ')}`));
      }
    });
  });
}

// Test dispatch to wisekks@gmail.com
const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'smtp_config.json'), 'utf8'));

console.log('Testing SMTP using account:', cfg.fromEmail, 'via', cfg.host, 'port', cfg.port);

sendSmtpMail({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  fromEmail: cfg.fromEmail,
  fromName: cfg.fromName,
  toEmail: 'wisekks@gmail.com',
  subject: '[투어이지] SMTP 메일 발송 연동 테스트',
  html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0; max-width: 600px;">
      <h2 style="color: #0284c7; margin-bottom: 12px;">🎉 투어이지(TourEasy) SMTP 연동 완료</h2>
      <p style="color: #334155; font-size: 14px; line-height: 1.6;">
        안녕하세요, <strong>최고관리자</strong>님!<br>
        투어이지 이메일 발송 시스템(SMTP)이 성공적으로 연동되었습니다.
      </p>
      <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #cbd5e1; margin: 16px 0;">
        <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 13px; line-height: 1.8;">
          <li><strong>발신 서버:</strong> ${cfg.host}:${cfg.port}</li>
          <li><strong>발신 계정:</strong> ${cfg.fromEmail}</li>
          <li><strong>수신 계정:</strong> wisekks@gmail.com</li>
          <li><strong>발송 일시:</strong> ${new Date().toLocaleString('ko-KR')}</li>
        </ul>
      </div>
      <p style="color: #64748b; font-size: 12px;">본 메일은 투어이지 웹사이트의 SMTP 메일 발송 기능 정상 동작 검증을 위해 발송되었습니다.</p>
    </div>
  `
})
.then(res => {
  console.log('✅ SMTP Test Successful!');
  console.log(res.message);
})
.catch(err => {
  console.error('❌ SMTP Test Failed:', err.message);
});
