const tls = require('tls');
const fs = require('fs');
const path = require('path');

function sendSmtpMail(options) {
  return new Promise((resolve, reject) => {
    const { host, port, user, password, fromEmail, fromName, toEmail, subject, text, html } = options;
    const socket = tls.connect({ host, port: Number(port) || 465, rejectUnauthorized: false }, () => {});
    socket.setEncoding('utf8');

    let step = 0;
    let buffer = '';
    const log = [];

    const timer = setTimeout(() => {
      socket.destroy();
      reject(new Error('Timeout (15s)'));
    }, 15000);

    socket.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\r\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        const code = line.slice(0, 3);
        const isLast = line.charAt(3) === ' ';
        if (!isLast && !/^[0-9]{3}/.test(line)) continue;

        if (step === 0 && code === '220') {
          step = 1; socket.write('EHLO localhost\r\n');
        } else if (step === 1 && code === '250' && isLast) {
          step = 2; socket.write('AUTH LOGIN\r\n');
        } else if (step === 2 && code === '334') {
          step = 3; socket.write(Buffer.from(user).toString('base64') + '\r\n');
        } else if (step === 3 && code === '334') {
          step = 4; socket.write(Buffer.from(password).toString('base64') + '\r\n');
        } else if (step === 4 && code === '235') {
          step = 5; socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
        } else if (step === 5 && code === '250') {
          step = 6; socket.write(`RCPT TO:<${toEmail}>\r\n`);
        } else if (step === 6 && code === '250') {
          step = 7; socket.write('DATA\r\n');
        } else if (step === 7 && code === '354') {
          step = 8;
          const dateStr = new Date().toUTCString();
          const encodedSub = `=?UTF-8?B?${Buffer.from(subject, 'utf8').toString('base64')}?=`;
          const encodedFrom = `=?UTF-8?B?${Buffer.from(fromName || '투어이지', 'utf8').toString('base64')}?=`;
          const mail = [
            `From: ${encodedFrom} <${fromEmail}>`,
            `To: <${toEmail}>`,
            `Date: ${dateStr}`,
            `Subject: ${encodedSub}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/html; charset=UTF-8`,
            `Content-Transfer-Encoding: base64`,
            ``,
            Buffer.from(html || text || '', 'utf8').toString('base64'),
            `.`,
            ``
          ].join('\r\n');
          socket.write(mail);
        } else if (step === 8 && code === '250') {
          step = 9;
          socket.write('QUIT\r\n');
          clearTimeout(timer);
          return resolve({ success: true, message: line });
        } else if (parseInt(code, 10) >= 400) {
          clearTimeout(timer);
          return reject(new Error(`SMTP Error [${code}]: ${line}`));
        }
      }
    });

    socket.on('error', (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

const cfg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'smtp_config.json'), 'utf8'));
const targetEmail = process.argv[2] || 'kks@do-best.co.kr';

console.log(`[SMTP] Sending real test email to: ${targetEmail} via ${cfg.host}:${cfg.port}...`);

sendSmtpMail({
  host: cfg.host,
  port: cfg.port,
  user: cfg.user,
  password: cfg.password,
  fromEmail: cfg.fromEmail,
  fromName: '투어이지(TourEasy) 맞춤여행팀',
  toEmail: targetEmail,
  subject: '[투어이지] SMTP 실제 이메일 발송 연동 테스트 성공 안내',
  html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(135deg, #0284c7 0%, #0f172a 100%); padding: 30px 24px; text-align: center; color: #ffffff;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 900;">✈️ 투어이지 (TourEasy)</h1>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #bae6fd;">SMTP 이메일 발송 연동 테스트 성공</p>
      </div>
      <div style="padding: 28px 24px; color: #334155; line-height: 1.6;">
        <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">안녕하세요, 대표님!</h2>
        <p style="font-size: 14px; margin-bottom: 20px;">
          투어이지 시스템에서 요청하신 <strong>네이버 SMTP 실제 이메일 발송</strong>이 성공적으로 완료되었습니다.<br>
          본 메일이 정상 수신되었다면 본인인증, 임시비밀번호, 여행 예약 확인서, 1:1 맞춤 견적 메일이 모두 정상 발송됩니다.
        </p>
        <div style="background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 12px; padding: 18px; font-size: 13px; line-height: 1.8;">
          <div><strong>• 수신 대상:</strong> ${targetEmail}</div>
          <div><strong>• 발송 계정:</strong> ${cfg.fromEmail} (smtp.naver.com:465)</div>
          <div><strong>• 발송 일시:</strong> ${new Date().toLocaleString('ko-KR')}</div>
          <div><strong>• 발송 상태:</strong> <span style="color: #16a34a; font-weight: bold;">250 OK (정상 전송 완료)</span></div>
        </div>
        <div style="text-align: center; margin-top: 28px;">
          <a href="https://wisekks-arch.github.io/tour/admin.html" target="_blank" style="display: inline-block; background-color: #0284c7; color: #ffffff; font-weight: bold; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 12px rgba(2,132,199,0.3);">관리자 센터 바로가기</a>
        </div>
      </div>
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; font-size: 11px; color: #94a3b8; text-align: center;">
        (주)투어이지 | 고객센터: 1588-0000 | 본 메일은 SMTP 실제 발송 연동 검증을 위해 전송되었습니다.
      </div>
    </div>
  `
})
.then(res => {
  console.log('✅ [SUCCESS] Real email dispatched!');
  console.log('Server response:', res.message);
})
.catch(err => {
  console.error('❌ [FAILED]:', err.message);
});
