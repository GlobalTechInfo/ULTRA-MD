import { doReact, emojis } from '../lib/autoreact.cjs';

let AUTO_REACT = false;

const handler = async (m, { conn, args, command }) => {
  if (command === 'autoreact') {
    let responseMessage;
    if (args[0] === 'on') {
      AUTO_REACT = true;
      responseMessage = "AUTO_REACT has been enabled.";
    } else if (args[0] === 'off') {
      AUTO_REACT = false;
      responseMessage = "AUTO_REACT has been disabled.";
    } else {
      responseMessage = "Usage:\n- `autoreact on`: Enable Auto-React\n- `autoreact off`: Disable Auto-React";
    }
    try {
      await conn.sendMessage(m.chat, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await conn.sendMessage(m.chat, { text: 'Error processing your request.' }, { quoted: m });
    }
    return;
  }

  if (AUTO_REACT && !m.key.fromMe) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    try {
      await doReact(emoji, m, conn);
    } catch (error) {
      console.error('Error sending auto reaction:', error);
    }
  }
};

handler.all = async (m, { conn }) => {
  if (AUTO_REACT && !m.key.fromMe) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    try {
      await doReact(emoji, m, conn);
    } catch (error) {
      console.error('Error sending auto reaction:', error);
    }
  }
};

handler.help = ['autoreact <on|off>'];
handler.tags = ['owner'];
handler.command = ['autoreact'];
handler.owner = true;

export default handler;
