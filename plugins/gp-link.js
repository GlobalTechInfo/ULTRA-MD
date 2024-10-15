
let handler = async (m, { conn, groupMetadata }) => { 

 let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat)
 conn.reply(m.chat, `\n${mssg.linkGp} *${groupMetadata.subject}*\n\n${link}`, m, {detectLink: true})
//conn.sendHydrated(m.chat, `\n${mssg.linkGp} *${groupMetadata.subject}*\n\n${link}`, packname, null, 'https://www.whatsapp.com/otp/copy/https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat), 'Copiar', null, null, [ null ], m)

}
handler.help = ['link']
handler.tags = ['group']
handler.command = ['linkgroup', 'link'] 
handler.group = true
handler.botAdmin = true

export default handler
