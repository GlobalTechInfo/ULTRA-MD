let handler = async (m, { conn, usedPrefix, isOwner }) => {
  let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Qasim;;;
FN:Qasim Ali
ORG:GlobalTechInfo
TITLE:Owner
item1.TEL;waid=923444844060:923444844060
item1.X-ABLabel:Owner
X-WA-BIZ-DESCRIPTION:Developer of the Bot
X-WA-BIZ-NAME:Qasim Ali
END:VCARD`;

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: 'Qasim Ali',
      contacts: [{ vcard }]
    }
  }, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['creator', 'creador', 'dueño'];

export default handler;
