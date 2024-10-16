//import db from '../lib/database.js'
let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sBye = text;
    m.reply(`✅ Goodbye message updated successfully!`);
  } else {
    throw `✳️ Please provide a new goodbye message.`;
  }
}

handler.help = ['setbye <text>'];
handler.tags = ['group'];
handler.command = ['setbye'];
handler.admin = true;
handler.owner = false;

export default handler;
