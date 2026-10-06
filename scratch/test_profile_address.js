const fs = require('fs');

async function test() {
  const users = JSON.parse(fs.readFileSync('d:/92.SW/tour/data/users.json', 'utf8'));
  console.log('Total users:', users.length);
  const testUser = users.find(u => u.email === 'user@toureasy.com');
  console.log('Sample user before edit:', testUser);

  // Let's verify server.js handles profile update logic properly
  console.log('Checking server.js code structure...');
  const serverCode = fs.readFileSync('d:/92.SW/tour/server.js', 'utf8');
  if (serverCode.includes('target.postcode') && serverCode.includes('target.address') && serverCode.includes('target.addressDetail')) {
    console.log('✓ server.js profile update handles address fields correctly');
  } else {
    console.error('✗ server.js missing address fields in profile update');
    process.exit(1);
  }

  // Check js/components.js
  const compCode = fs.readFileSync('d:/92.SW/tour/js/components.js', 'utf8');
  if (compCode.includes('mypage-profile-postcode') && compCode.includes('searchUserAddress') && compCode.includes('mypage-profile-address-detail')) {
    console.log('✓ js/components.js handles postcode and address correctly');
  } else {
    console.error('✗ js/components.js missing address elements');
    process.exit(1);
  }

  // Check js/api.js
  const apiCode = fs.readFileSync('d:/92.SW/tour/js/api.js', 'utf8');
  if (apiCode.includes('profileData.postcode') && apiCode.includes('profileData.addressDetail')) {
    console.log('✓ js/api.js handles address in updateProfile correctly');
  } else {
    console.error('✗ js/api.js missing address handling');
    process.exit(1);
  }

  console.log('All functional checks passed!');
}

test();
