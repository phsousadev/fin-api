const fs = require('node:fs')
const path = require('node:path')

const buffer = Buffer.from('0', 'binary')

const filePath = path.join(__dirname, '..', '..', 'database', 'app', 'index.bin')

function generateId() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const currentIndex = parseInt(data) || 0;
    const newIndex = currentIndex + 1;

    fs.writeFileSync(filePath, newIndex.toString());

    return newIndex;
  } catch (err) {
    console.error('Error generating ID:', err);
    return null;
  }
}

module.exports = {
  generateId
}