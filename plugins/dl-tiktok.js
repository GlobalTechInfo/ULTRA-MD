import pkg from 'nayan-media-downloader';
const { tikdown } = pkg;

let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  if (!args[0] && m.quoted && m.quoted.text) {
    args[0] = m.quoted.text;
  }
  if (!args[0] && !m.quoted) throw 'Give the link of the video TikTok or quote a TikTok link';
  if (!args[0].match(/tiktok/gi)) throw 'Verify that the link is from TikTok';
  let txt = 'Here is your requested video';
  m.react('⏳');

  try {
    const { data } = await tikdown(args[0]);
    const url = data.video;  // Directly use the video URL
    if (!url) throw new Error('Error fetching video URL');
    await conn.sendFile(m.chat, url, 'tiktok.mp4', txt, m);
    m.react('✅');
  } catch (err) {
    console.error(err); // Added error logging
    await m.reply('*An unexpected error occurred*');
    m.react('❌');
  }
};

handler.help = ['tiktok'].map(v => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^t(t|iktok(d(own(load(er)?)?|l))?|td(own(load(er)?)?|l))$/i;

export default handler;
