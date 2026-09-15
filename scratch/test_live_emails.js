const https = require('https');

// Test Web3Forms
function testWeb3Forms() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      access_key: '5561a35e-beec-4ea8-b3d2-c288ca7dc36f',
      subject: '[투어이지] Web3Forms 실시간 발송 테스트',
      from_name: '투어이지 (TourEasy)',
      email: 'wisekks@gmail.com',
      message: `투어이지 실제 메일 도달 테스트입니다. 시간: ${new Date().toLocaleString('ko-KR')}`
    });

    const req = https.request('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ provider: 'Web3Forms', status: res.statusCode, body });
      });
    });

    req.on('error', (err) => resolve({ provider: 'Web3Forms', error: err.message }));
    req.write(postData);
    req.end();
  });
}

// Test FormSubmit
function testFormSubmit() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      _subject: '[투어이지] FormSubmit 실시간 발송 테스트',
      name: '투어이지 (TourEasy)',
      email: 'kmagick@naver.com',
      _replyto: 'kmagick@naver.com',
      message: `투어이지 FormSubmit 실제 메일 도달 테스트입니다. 시간: ${new Date().toLocaleString('ko-KR')}`
    });

    const req = https.request('https://formsubmit.co/ajax/wisekks@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ provider: 'FormSubmit', status: res.statusCode, body });
      });
    });

    req.on('error', (err) => resolve({ provider: 'FormSubmit', error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('--- Testing Web3Forms ---');
  const r1 = await testWeb3Forms();
  console.log(r1);

  console.log('--- Testing FormSubmit ---');
  const r2 = await testFormSubmit();
  console.log(r2);
}

run();
