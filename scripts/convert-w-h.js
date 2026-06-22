// scripts/convert-w-h.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Replace width utilities: w-<num> => w-[<num>%]
  content = content.replace(/\bw-(\d+(?:\.\d+)?)\b/g, (match, size) => {
    return `w-[${size}%]`;
  });
  // Replace height utilities: h-<num> => h-[<num>%]
  content = content.replace(/\bh-(\d+(?:\.\d+)?)\b/g, (match, size) => {
    return `h-[${size}%]`;
  });
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Converted ${filePath}`);
}

const patterns = ['**/*.tsx', '**/*.ts', '**/*.jsx', '**/*.js'];
patterns.forEach(pattern => {
  const files = glob.sync(pattern, { cwd: path.resolve(__dirname, '..'), absolute: true, ignore: ['node_modules/**', 'dist/**'] });
  files.forEach(replaceInFile);
});

console.log('Conversion complete.');
