import fetch from 'node-fetch';
import pkg from 'nayan-media-downloader';
const { instagram } = pkg;

const fetchWithRetry = async (url, options, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);
    if (response.ok) return response;
    console.log(`Retrying... (${i + 1})`);
  }
  throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Enter the Instagram link next to the command';

  // Updated regex to capture Instagram story links
  const instagramRegex = /^(https?:\/\/)?(www\.)?(instagram\.com\/stories\/[A-Za-z0-9._%+-]+\/\d+(\?.*)?)$/;

  if (!args[0].match(instagramRegex)) {
    throw '❌ Link incorrect. Please ensure it is a valid Instagram story link.';
  }

  m.react('⏳');

  try {
    const url = args[0];
    console.log('Checking link:', url);

    const mediaData = await instagram(url);
    console.log('Media Data:', mediaData);

    if (!mediaData.status) {
      throw new Error(`Error: ${mediaData.msg || 'Failed to retrieve media data'}`);
    }

    let downloadUrl;
    if (mediaData.data.video && mediaData.data.video.length > 0) {
      downloadUrl = mediaData.data.video[0]; // Use the first video URL
    } else if (mediaData.data.images && mediaData.data.images.length > 0) {
      downloadUrl = mediaData.data.images[0]; // Use the first image URL
    } else {
      throw new Error('Could not fetch the download URL');
    }

    console.log('Download URL:', downloadUrl);

    const response = await fetchWithRetry(downloadUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || 
        (!contentType.includes('image') && 
        !contentType.includes('octet-stream') && 
        !contentType.includes('video'))) {
      throw new Error('Invalid content type received');
    }

    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

    const fileName = mediaData.data.title ? `${mediaData.data.title}.jpg` : 'media.jpg';
    const mimetype = mediaData.data.video.length > 0 ? 'video/mp4' : 'image/jpeg';

    await conn.sendFile(m.chat, mediaBuffer, fileName, '*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳*', m, false, { mimetype });
    m.react('✅');
  } catch (error) {
    console.error('Error downloading from Instagram:', error.message, error.stack);
    await m.reply('⚠️ An error occurred while processing the request. Please try again later.');
    m.react('❌');
  }
};

handler.help = ['instastory', 'igstory', 'igstorydl', 'instagramstory', 'storyig'];
handler.tags = ['downloader'];
handler.command = ['instastory', 'igstory', 'igstorydl', 'instagramstory', 'storyig'];

export default handler;
