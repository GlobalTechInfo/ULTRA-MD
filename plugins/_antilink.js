const linkRegex = /(?:chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})|https:\/\/whatsapp\.com\/channel\/[0-9A-Za-z]+)/i;

export async function before(m, { conn, isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true;
  if (!m.isGroup) return false;

  // Ensure chat data exists in the database
  let chat = global.db.data.chats[m.chat];
  if (typeof chat !== 'object') global.db.data.chats[m.chat] = {};
  chat = global.db.data.chats[m.chat];

  // Log current settings to confirm they are correctly loaded
  console.log(`AntiLink is ${chat.antiLink}, Admin status: ${isAdmin}, Bot Admin: ${isBotAdmin}`);

  // Check if message contains a group link and antiLink is enabled
  const isGroupLink = linkRegex.exec(m.text);
  if (chat.antiLink && isGroupLink && !isAdmin) {
    console.log(`Detected a link by non-admin: ${m.sender}`);

    // Check if the bot is admin to proceed with removing the user
    if (isBotAdmin) {
      const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
      if (m.text.includes(linkThisGroup)) return true; // Ignore links to the same group

      await conn.reply(
        m.chat,
        `*≡ Link Detected*
        
We do not allow links from other groups. 
I'm sorry *@${m.sender.split('@')[0]}*, you will be removed from the group.`,
        null,
        { mentions: [m.sender] }
      );
      // Delete the message with the link
      await conn.sendMessage(m.chat, { delete: m.key });
      // Remove the user from the group
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    } else {
      console.log("Bot is not an admin and cannot remove members.");
    }
  }
  return true;
        }
