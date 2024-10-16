import fs from 'fs/promises';
import path from 'path';

let handler = async (m, { text, usedPrefix, command, __dirname }) => {
  if (!text) {
    m.reply(`Usage: ${usedPrefix + command} <filename>\n❇️ Example:\n${usedPrefix}getfile main.js`);
    return;
  }
  
  const filePath = path.join(__dirname, text);
  try {
    await fs.access(filePath); // Check if file exists
    const fileContent = await fs.readFile(filePath, 'utf8');
    m.reply(fileContent);
  } catch (e) {
    if (e.code === 'ENOENT') {
      m.reply(`❌  Error: No file named "${text}" found.`);
    } else {
      console.error(e);
      m.reply(`❌  Error: ${e.message}`);
    }
  }
}

handler.help = ['getfile <filename>'];
handler.tags = ['owner'];
handler.command = ['getfile'];
handler.rowner = true;

export default handler;
