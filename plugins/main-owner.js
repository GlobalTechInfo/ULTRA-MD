let handler = async (m, { conn }) => {
  if (!conn) {
    console.error('Connection object is undefined');
    return; // or handle the error as appropriate
  }

  const ownerNumber = global.owner[0] ? global.owner[0][0] : 'default_number_here'; // Fallback

  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;${ownerNumber};;;
FN:Owner
ORG:GlobalTechInfo
TITLE:Owner
item1.TEL;waid=${ownerNumber}:${ownerNumber}
item1.X-ABLabel:Owner
X-WA-BIZ-DESCRIPTION:Owner of the Bot
X-WA-BIZ-NAME:Owner
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Owner',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner'];

export default handler;
