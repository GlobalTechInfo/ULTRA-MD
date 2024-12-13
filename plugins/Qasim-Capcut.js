import fetch from 'node-fetch';
import pkg from 'nayan-videos-downloader';
const { capcut } = pkg;

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw `✳️ Enter the CapCut link next to the command`;
  if (!args[0].match(/(capcut\.com\/[^\s]+)/gi)) throw `❌ Link incorrect`;
  m.react('⏳');

  try {
    const url = args[0];
    console.log('URL:', url); // Debug log for URL

    // Fetch media data using nayan-media-downloader
    let mediaData = await capcut(url);
    console.log('Media Data:', mediaData); // Debug log for media data

    const { video, image } = mediaData.data; // Extract video or image
    const downloadUrl = video || image; // Use video if available, else use image
    if (!downloadUrl) throw new Error('Could not fetch the download URL');

    console.log('Download URL:', downloadUrl); // Debug log for download URL

    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error('Failed to fetch the media content');

    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    const fileName = video ? 'media.mp4' : 'media.jpg';
    const mimetype = video ? 'video/mp4' : 'image/jpeg';
    
    // Send the media file
    await conn.sendFile(m.chat, mediaBuffer, fileName, `*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳*`, m, false, { mimetype });
    m.react('✅');
  } catch (error) {
    console.error('Error downloading from CapCut:', error.message, error.stack);
    await m.reply('⚠️ An error occurred while processing the request. Please try again later.');
    m.react('❌');
  }
};

handler.help = ['capcut <url>'];
handler.tags = ['downloader'];
handler.command = ['capcut'];

export default handler;
