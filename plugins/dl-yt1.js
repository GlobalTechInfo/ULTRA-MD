import pkg from 'nayan-media-downloader';
const { ytdown } = pkg;

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example: ${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link.`;

  m.react('⏳');

  try {
    const { data } = await ytdown(args[0]);
    const url = data.audio; // Directly use the audio URL
    if (!url) throw new Error('Error fetching audio URL');
    const title = data.title || 'audio';
    const txt = 'Here is your requested audio';
    
    // Download and send the file
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error downloading audio');

    const buffer = await response.arrayBuffer();
    const fileBuffer = Buffer.from(buffer);

    await conn.sendMessage(m.chat, { audio: fileBuffer, mimetype: 'audio/mpeg', fileName: `${title}.mp3` }, { quoted: m });
    m.react('✅');
  } catch (err) {
    console.error('Error downloading audio:', err);
    await m.reply(`❌ Error: Could not download the audio.`);
    m.react('❌');
  }
};

handler.help = ['ytmp3 <url>'];
handler.tags = ['downloader'];
handler.command = ['ytmp3', 'yta'];

export default handler;
