const fs = require('fs');
const path = require('path');

function fixFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      fixFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/className="0[a-z0-9]+ /g, 'className="');
      fs.writeFileSync(fullPath, content);
    }
  }
}

fixFiles('./src');
console.log('Fixed all class names');
