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
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.trim()) continue;
        log.push(`S: ${line}`);
        const code = line.slice(0, 3);
        const isLastLine = line.charAt(3) === ' ';

        if (!isLastLine && !/^[0-9]{3}/.test(line)) continue;

        if (step === 0 && code === '220') {
          step = 1;
          socket.write(`EHLO localhost\r\n`);
        } else if (step === 1 && code === '250' && isLastLine) {
          step = 2;
          socket.write(`AUTH LOGIN\r\n`);
        } else if (step === 2 && code === '334') {
          step = 3;
          const uB64 = Buffer.from(user).toString('base64');
          socket.write(`${uB64}\r\n`);
        } else if (step === 3 && code === '334') {
          step = 4;
          const pB64 = Buffer.from(password).toString('base64');
          socket.write(`${pB64}\r\n`);
        } else if (step === 4 && code === '235') {
          step = 5;
          socket.write(`MAIL FROM:<${fromEmail}>\r\n`);
        } else if (step === 5 && code === '250') {
          step = 6;
          socket.write(`RCPT TO:<${toEmail}>\r\n`);
        } else if (step === 6 && code === '250') {
          step = 7;
          socket.write(`DATA\r\n`);
        } else if (step === 7 && code === '354') {
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

          socket.write(mailData);
        } else if (step === 8 && code === '250') {
          step = 9;
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
      reject(new Error(`Socket error: ${err.message}`));
    });

    socket.on('close', () => {
      clearTimeout(timeoutTimer);
      if (step < 8) {
        reject(new Error(`Connection closed at step ${step} | Log: ${log.join(' | ')}`));
      }
    });
  });
}

// Test Daum
console.log('--- Testing Daum SMTP (smtp.daum.net:465) ---');
sendSmtpMail({
  host: 'smtp.daum.net',
  port: 465,
  user: 'kwangsoo-kim@hanmail.net',
  password: '@wisesoo7337',
  fromEmail: 'kwangsoo-kim@hanmail.net',
  fromName: '투어이지(TourEasy)',
  toEmail: 'wisekks@gmail.com',
  subject: '[투어이지] 다음 SMTP 발송 테스트',
  html: '<p>다음 SMTP 테스트 메일입니다.</p>'
})
.then(res => console.log('✅ Daum SMTP Success:', res.message))
.catch(err => {
  console.error('❌ Daum (full email) Failed:', err.message);
  // Try ID only
  return sendSmtpMail({
    host: 'smtp.daum.net',
    port: 465,
    user: 'kwangsoo-kim',
    password: '@wisesoo7337',
    fromEmail: 'kwangsoo-kim@hanmail.net',
    fromName: '투어이지(TourEasy)',
    toEmail: 'wisekks@gmail.com',
    subject: '[투어이지] 다음 SMTP 발송 테스트 (ID)',
    html: '<p>다음 SMTP 테스트 메일입니다.</p>'
  }).then(r => console.log('✅ Daum SMTP (ID only) Success:', r.message))
    .catch(e => console.error('❌ Daum (ID only) Failed:', e.message));
});
