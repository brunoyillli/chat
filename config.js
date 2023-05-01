const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
const envConfig = env.split('\n').reduce((prev, next) => {
  const keyValue = next.split('=');
  if (keyValue.length === 2) {
    prev[keyValue[0]] = keyValue[1];
  }
  return prev;
}, {});

module.exports = envConfig;
