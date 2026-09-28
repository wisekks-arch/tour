const fs = require('fs');
const vm = require('vm');

const code = fs.readFileSync('./js/api.js', 'utf8');
try {
  new vm.Script(code, { filename: 'api.js' });
  console.log('No syntax error in api.js');
} catch (err) {
  console.error('Syntax error details:', err.stack);
}
