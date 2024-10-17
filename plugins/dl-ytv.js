import pkg from 'nayan-media-downloader';
const { ytdown } = pkg;

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args || !args[0]) throw `✳️ Example: ${usedPrefix + command} https://youtu.be/YzkTFFwxtXI`;
  if (!args[0].match(/youtu/gi)) throw `❎ Verify that it is a YouTube link`;

  await m.react('⏳');

  try {
    const { data } = await ytdown(args[0]);
    const videoUrl = data.video;
    if (!videoUrl) throw new Error('Error fetching video URL');
    const title = data.title || 'video';

    await conn.sendFile(m.chat, videoUrl, `${title}.mp4`, `Here is your requested video`, m, false, { mimetype: 'video/mp4' });
    await m.react('✅');
  } catch (err) {
    console.error('Error downloading video:', err);
    await m.reply('❌ Error: Could not download the video.');
    await m.react('❌');
  }
};

handler.help = ['ytmp4 <yt-link>'];
handler.tags = ['downloader'];
handler.command = ['ytmp4', 'video', 'ytv'];

export default handler;
