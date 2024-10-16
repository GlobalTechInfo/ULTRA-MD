let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Sound
  let name = m.pushName || conn.getName(m.sender)
  var vn = 'https://i.imgur.com/QWELPBi.mp4'
  let url = 'https://github.com/GlobalTechInfo/ULTRA-MD'
  let murl = 'https://youtu.be/3j_EIP--2t8?si=4TFWV0On6Bl1wr-e'
  let img = 'https://i.imgur.com/3C6dAGg.mp4'
  let con = {
    key: {
      fromMe: false,
      participant: `${m.sender.split`@`[0]}@s.whatsapp.net`,
      ...(m.chat ? { remoteJid: '16504228206@s.whatsapp.net' } : {}),
    },
    message: {
      contactMessage: {
        displayName: `${name}`,
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
      },
    },
  }
  let doc = {
    audio: {
      url: vn,
    },
    mimetype: 'audio/mpeg',
    ptt: true,
    waveform: [100, 0, 100, 0, 100, 0, 100],
    fileName: 'qasim',

    contextInfo: {
      mentionedJid: [m.sender],
      externalAdReply: {
        title: '𝗮𝘃𝗶𝘀𝗵𝗻𝗮 𝗯𝗼𝘁 𝗶𝘀 𝗮𝗹𝗶𝘃𝗲',
        body: '© GlobalTechInfo',
        thumbnailUrl: img,
        sourceUrl: 'https://www.whatsapp.com/channel/0029Vaqkg8jEVccTlVpD1g2B?fbclid=PAZXh0bgNhZW0CMTEAAaZSJEiA5TYp7LtQ7Xi_l21NVUXu-J_TLlg1S7niH9OJ1RbusOGamPHCz7Q_aem_cXo-4Ex5Z0s3iQjtJpd6Hg',
        mediaType: 1,
        renderLargerThumbnail: true,
      },
    },
  }

  await conn.sendMessage(m.chat, doc, { quoted: con })
}

handler.help = ['alive']
handler.tags = ['main']
handler.command = /^(alive)$/i

export default handler
