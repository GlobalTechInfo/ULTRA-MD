import fetch from 'node-fetch'

let bpink = []

fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt')
  .then(res => res.text())

  .then(txt => (bpink = txt.split('\n')))

let handler = async (m, { conn }) => {
  let img = bpink[Math.floor(Math.random() * bpink.length)]

  if (!img) throw img

  await conn.sendFile(m.chat, img, '', '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳*', m, 0, {
    thumbnail: await (await fetch(img)).buffer(),
  })
}

handler.help = ['blackpink']

handler.tags = ['image']

handler.limit = false

handler.command = /^(bpink|bp|blackpink)$/i

export default handler
