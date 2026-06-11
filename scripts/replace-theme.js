const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('c:/demo/src/app/(dashboard)', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/text-blue-500/g, 'text-primary')
      .replace(/text-blue-600/g, 'text-primary')
      .replace(/text-blue-700/g, 'text-[#D4894A]')
      .replace(/text-blue-800/g, 'text-[#C4581E]')
      .replace(/bg-blue-50\/50/g, 'bg-primary/5')
      .replace(/bg-blue-50/g, 'bg-primary/10')
      .replace(/bg-blue-100/g, 'bg-primary/20')
      .replace(/bg-blue-200/g, 'bg-primary/30')
      .replace(/bg-blue-500/g, 'bg-primary')
      .replace(/bg-blue-600/g, 'bg-primary')
      .replace(/bg-blue-700/g, 'bg-[#D4894A]')
      .replace(/border-blue-100/g, 'border-primary/20')
      .replace(/border-blue-200/g, 'border-primary/30')
      .replace(/border-blue-500/g, 'border-primary')
      .replace(/border-blue-600/g, 'border-primary')
      .replace(/shadow-blue-100/g, 'shadow-primary/20')
      .replace(/shadow-blue-600\/20/g, 'shadow-primary/20')
      .replace(/shadow-blue-600\/25/g, 'shadow-primary/25')
      .replace(/shadow-blue-600\/40/g, 'shadow-primary/40')
      .replace(/shadow-blue-700\/15/g, 'shadow-[#D4894A]/15')
      .replace(/from-blue-50/g, 'from-primary/10')
      .replace(/from-blue-600/g, 'from-primary')
      .replace(/to-blue-50\/50/g, 'to-primary/5')
      .replace(/to-blue-700/g, 'to-[#D4894A]')
      .replace(/via-blue-700/g, 'via-[#D4894A]')
      .replace(/to-indigo-700/g, 'to-[#C4581E]')
      .replace(/to-indigo-800/g, 'to-[#C4581E]')
      .replace(/ring-blue-50/g, 'ring-primary/10')
      .replace(/hover:text-blue-600/g, 'hover:text-primary')
      .replace(/hover:text-blue-700/g, 'hover:text-[#D4894A]')
      .replace(/hover:bg-blue-50/g, 'hover:bg-primary/10')
      .replace(/hover:bg-blue-100/g, 'hover:bg-primary/20')
      .replace(/hover:border-blue-200/g, 'hover:border-primary/30');

    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
