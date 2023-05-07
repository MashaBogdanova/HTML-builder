const { stdout } = process;
const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, "text.txt");

const stream = fs.createReadStream(filePath, "utf-8");
let text = "";

stream.on('data', chunk => text += chunk);
stream.on('end', () => stdout.write(`${text}\n`));
stream.on('error', error => stdout.write(error.message));

