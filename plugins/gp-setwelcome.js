let handler = async (m, { conn, text, isROwner, isOwner }) => {
  if (text) {
    global.db.data.chats[m.chat].sWelcome = text;
    m.reply(`✅ Welcome message updated successfully!`);
  } else {
    throw `✳️ Please provide a new welcome message.`;
  }
}

handler.help = ['setwelcome'];
handler.tags = ['group'];
handler.command = ['setwelcome'];
handler.admin = true;
handler.owner = false;

export default handler;
