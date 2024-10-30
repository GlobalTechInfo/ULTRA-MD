import fg from 'api-dylux';

let handler = async (m, { conn, text }) => {
  if (!text) throw `✳️ Please provide a search term for the wallpaper.\n\n*Example: .wallpapers technology*`;

  try {
    let res = await fg.wallpaper(text);
    let re = pickRandom(res);
    
    if (!re.image || re.image.length === 0) throw 'No images found for this query.'; // Check if images are available

    await conn.sendMessage(m.chat, {
      image: { url: re.image[0] },
      caption: `*𝘗𝘖𝘞𝘌𝘙𝘌𝘋 𝘉𝘠 © 𝘜𝘓𝘛𝘙𝘈-𝘔𝘋*`
    }, { quoted: m });

  } catch (error) {
    console.error(error); // Log the error for debugging
    m.reply(`✳️ An error occurred: ${error.message || error}`);
  }
}

handler.help = ['wallpapers']
handler.tags = ['img']
handler.command = ['wallpapers', 'wp']
handler.diamond = false

export default handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
