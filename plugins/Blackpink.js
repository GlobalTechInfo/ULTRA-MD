import fetch from 'node-fetch'

let bpink = []

// Fetching the image URLs from the text file
fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt')
  .then(res => res.text())
  .then(txt => (bpink = txt.split('\n')))

let handler = async (m, { conn }) => {
  try {
    // Send "waiting" reaction to indicate the bot is processing
    await m.react('⏳')

    // Select a random image from the list
    let img = bpink[Math.floor(Math.random() * bpink.length)]

    // If no image is selected, throw an error
    if (!img) throw img

    // Fetch the image and convert the arrayBuffer to a Buffer
    const response = await fetch(img)
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Send the image with a thumbnail and custom message
    await conn.sendFile(m.chat, img, '', '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳*', m, 0, {
      thumbnail: buffer, // Use the Buffer for the thumbnail
    })

    // After processing, send the "done" reaction
    await m.react('✅')
  } catch (error) {
    console.error('Error fetching image:', error)
    await m.react('❌')  // Send a "fail" reaction if an error occurs
    m.reply('❌ Something went wrong while fetching the image. Please try again later.')
  }
}

handler.help = ['blackpink']
handler.tags = ['image']
handler.limit = false
handler.command = /^(bpink|bp|blackpink)$/i

export default handler
