let handler = async (m, { conn }) => {
  let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = conn.getName(who)
  conn.sendFile(m.chat, global.API('https://some-random-api.com', '/canvas/gay', {
    avatar: await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/1ZxrXKJ/avatar-contact.jpg'), 
  }), 'gay.png', `🏳️‍🌈  *Gay :* ${name}\n\n${mssg.gaytex}`, m)
}

handler.help = ['gay @user']
handler.tags = ['fun']
handler.command = /^(gay)/i
handler.diamond = true

export default handler
