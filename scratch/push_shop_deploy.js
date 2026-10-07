const fs = require('fs');
const cp = require('child_process');

const base = 'C:/Users/wisek/AppData/Local/GitHubDesktop';
const dirs = fs.readdirSync(base).filter(d => d.startsWith('app-'));
const gitPath = base + '/' + dirs[dirs.length - 1] + '/resources/app/git/cmd/git.exe';
console.log('Git Executable:', gitPath);

const shopDir = 'd:/92.SW/shop';

console.log('--- 1. Git Status Before Commit ---');
console.log(cp.execFileSync(gitPath, ['status', '-s'], { cwd: shopDir, encoding: 'utf8' }));

console.log('--- 2. Git Add All ---');
cp.execFileSync(gitPath, ['add', '-A'], { cwd: shopDir, encoding: 'utf8' });

console.log('--- 3. Git Commit ---');
try {
  const commitMsg = "feat: integrate header auth UI with login/signup and logout buttons";
  const commitOut = cp.execFileSync(gitPath, ['commit', '-m', commitMsg], { cwd: shopDir, encoding: 'utf8' });
  console.log(commitOut);
} catch (e) {
  console.log('Commit note:', e.stdout || e.message);
}

console.log('--- 4. Git Push origin main ---');
const pushOut = cp.execFileSync(gitPath, ['push', 'origin', 'main'], { cwd: shopDir, encoding: 'utf8' });
console.log(pushOut || 'Pushed successfully!');

console.log('--- 5. Final Status ---');
console.log(cp.execFileSync(gitPath, ['status', '-s'], { cwd: shopDir, encoding: 'utf8' }));
console.log('✅ Shop Deployment to GitHub Pages Completed!');
