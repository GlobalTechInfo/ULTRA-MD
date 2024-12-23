import pkg from 'nayan-videos-downloader';
const { GDLink } = pkg;

// Simple retry function for fetch requests
const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Failed to fetch, status code: ${response.status}`);
    return response;
  } catch (error) {
    if (retries === 0) throw new Error('Max retries reached. Could not fetch the media.');
    console.log(`Fetch failed, retrying... (${retries} retries left)`);
    await new Promise(resolve => setTimeout(resolve, delay)); // Delay before retry
    return fetchWithRetry(url, options, retries - 1, delay); // Retry the fetch
  }
};

const handler = async (m, { conn, args }) => {
  if (!args[0]) throw '✳️ Enter the Google Drive link next to the command';

  m.react('⏳');
  try {
    const url = args[0];
    console.log('Checking link:', url);

    // Fetching media data from Google Drive using the GDLink method from the package
    let mediaData;
    try {
      mediaData = await GDLink(url); // Fetch data from Google Drive
      console.log('Media Data:', mediaData);
    } catch (error) {
      console.error('Error fetching Google Drive data:', error.message);
      throw new Error('Could not fetch Google Drive data');
    }

    // Ensure mediaData and the necessary 'data' property exists
    if (!mediaData || !mediaData.data) {
      throw new Error('No valid media URL found');
    }

    // The actual download link is in the 'data' property
    const mediaUrl = mediaData.data;
    console.log('Media URL:', mediaUrl);

    // Fetch the media content
    const response = await fetchWithRetry(mediaUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const contentType = response.headers.get('content-type');
    console.log('Content Type:', contentType);

    if (!contentType) {
      throw new Error('No content-type received');
    }

    // Handle video download
    if (contentType.includes('video')) {
      const arrayBuffer = await response.arrayBuffer();
      const mediaBuffer = Buffer.from(arrayBuffer);

      if (mediaBuffer.length === 0) throw new Error('Downloaded video is empty');

      const fileName = mediaData.title ? `${mediaData.title}.mp4` : 'media.mp4';
      const mimetype = 'video/mp4';

      await conn.sendFile(m.chat, mediaBuffer, fileName, '*Powered by Ultra-MD*', m, false, { mimetype });
      m.react('✅');
    }
    // Handle image download
    else if (contentType.includes('image')) {
      const arrayBuffer = await response.arrayBuffer();
      const mediaBuffer = Buffer.from(arrayBuffer);

      if (mediaBuffer.length === 0) throw new Error('Downloaded image is empty');

      const fileName = mediaData.title ? `${mediaData.title}.jpg` : 'media.jpg';
      const mimetype = 'image/jpeg';

      await conn.sendFile(m.chat, mediaBuffer, fileName, '*Powered by Ultra-MD*', m, false, { mimetype });
      m.react('✅');
    } else {
      throw new Error('Unsupported media type');
    }

  } catch (error) {
    console.error('Error processing Google Drive download:', error.message);
    await m.reply('⚠️ An error occurred while processing the request. Please try again later.');
    m.react('❌');
  }
};

// Global handler for unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

handler.help = ['gdrive'];
handler.tags = ['downloader'];
handler.command = ['gd', 'gdrive'];

export default handler;
