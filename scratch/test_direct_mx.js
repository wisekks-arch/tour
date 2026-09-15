const dns = require('dns');
const net = require('net');

function sendDirectMxMail({ toEmail, fromEmail, fromName, subject, html, text }) {
  return new Promise((resolve, reject) => {
    const domain = toEmail.split('@')[1];
    dns.resolveMx(domain, (err, addresses) => {
      if (err || !addresses || addresses.length === 0) {
        return reject(new Error('MX record not found for ' + domain));
      }
      const mxHost = addresses.sort((a, b) => a.priority - b.priority)[0].exchange;
      console.log('Using MX Host for ' + domain + ':', mxHost);

      const socket = net.connect({ host: mxHost, port: 25 }, () => {
        console.log('Connected to MX ' + mxHost + ':25');
      });

      let step = 0;
      let log = [];
      let buffer = '';

      const timer = setTimeout(() => {
        socket.destroy();
        reject(new Error('MX connection timeout (15s): ' + log.slice(-3).join(' | ')));
      }, 15000);

      socket.on('data', (chunk) => {
        buffer += chunk.toString('utf8');
        const lines = buffer.split('\r\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (!line.trim()) continue;
          log.push('S: ' + line);
          const code = line.slice(0, 3);
          const isLastLine = line.charAt(3) === ' ';
          if (!isLastLine && !/^[0-9]{3}/.test(line)) continue;

          console.log('Step', step, 'Line:', line);

          if (step === 0 && code === '220') {
            step = 1;
            socket.write('EHLO mail.toureasy.co.kr\r\n');
          } else if (step === 1 && code === '250' && isLastLine) {
            step = 2;
            socket.write('MAIL FROM:<' + fromEmail + '>\r\n');
          } else if (step === 2 && code === '250') {
            step = 3;
            socket.write('RCPT TO:<' + toEmail + '>\r\n');
          } else if (step === 3 && code === '250') {
            step = 4;
            socket.write('DATA\r\n');
          } else if (step === 4 && code === '354') {
            step = 5;
            const messageId = '<' + Date.now() + '.' + Math.random().toString(36).substring(2) + '@toureasy.co.kr>';
            const encodedSubject = '=?UTF-8?B?' + Buffer.from(subject, 'utf8').toString('base64') + '?=';
            const encodedFromName = '=?UTF-8?B?' + Buffer.from(fromName || '투어이지', 'utf8').toString('base64') + '?=';
            const mailData = [
              'From: ' + encodedFromName + ' <' + fromEmail + '>',
              'To: <' + toEmail + '>',
              'Date: ' + new Date().toUTCString(),
              'Message-ID: ' + messageId,
              'Subject: ' + encodedSubject,
              'MIME-Version: 1.0',
              'Content-Type: text/html; charset=UTF-8',
              'Content-Transfer-Encoding: base64',
              '',
              Buffer.from(html || text || '', 'utf8').toString('base64'),
              '.',
              ''
            ].join('\r\n');
            socket.write(mailData);
          } else if (step === 5 && code === '250') {
            step = 6;
            socket.write('QUIT\r\n');
            clearTimeout(timer);
            socket.end();
            return resolve({ success: true, message: line, mxHost });
          } else if (parseInt(code, 10) >= 400) {
            clearTimeout(timer);
            socket.destroy();
            return reject(new Error('MX Server Error [' + code + ']: ' + line));
          }
        }
      });

      socket.on('error', (e) => {
        clearTimeout(timer);
        reject(e);
      });
    });
  });
}

sendDirectMxMail({
  toEmail: 'wisekks@gmail.com',
  fromEmail: 'toureasy.kr@gmail.com',
  fromName: '투어이지(TourEasy)',
  subject: '[투어이지] 실시간 다이렉트 이메일 발송 테스트',
  html: '<div style="font-family: sans-serif; padding: 20px; background: #f0f9ff; border-radius: 10px;"><h2 style="color: #0284c7;">🎉 투어이지 실시간 메일 전송 성공</h2><p>본 메일은 투어이지(TourEasy)에서 실제 수신자(wisekks@gmail.com)에게 정상 발송된 메일입니다.</p></div>'
})
.then(r => console.log('✅ Direct MX Success:', r))
.catch(e => console.error('❌ Direct MX Error:', e.message));
