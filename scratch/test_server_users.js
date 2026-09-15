const http = require('http');

http.get('http://localhost:3000/api/auth/users', (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      console.log('Server /api/auth/users response:');
      console.log('Success:', data.success, 'Count:', data.count);
      console.log('Users:', data.data);
    } catch (e) {
      console.error('Parse error:', e, body);
    }
  });
}).on('error', (err) => {
  console.error('Request error:', err.message);
});
