import fetch from 'node-fetch';
import pkg from 'nayan-videos-downloader';
const { threads } = pkg;

const handler = async (message, { conn, args }) => {
  // Check if the URL is provided in the command arguments
  if (!args[0]) {
    throw '✳️ Enter the Instagram Threads link next to the command';
  }

  // Validate the URL format for Instagram Threads
  const urlPattern = /threads\.net\/(@[^\s\/]+\/post\/[^\s?]+)/gi;
  if (!args[0].match(urlPattern)) {
    throw '❌ Link incorrect';
  }

  // React with a loading emoji to show the process has started
  message.react('⏳');

  try {
    // The URL of the Instagram thread
    const url = args[0];
    console.log('URL:', url);

    // Fetch media data using the nayan-media-downloader package
    let mediaData = await threads(url);
    console.log('Media Data:', mediaData);

    // Destructure the video and image URLs from the fetched media data
    const { video, image } = mediaData.data;
    const downloadUrl = video || image; // Prioritize video if available

    // If no media URL is found, throw an error
    if (!downloadUrl) {
      throw new Error('Could not fetch the media URL');
    }

    console.log('Download URL:', downloadUrl);

    // Fetch the media content from the download URL
    const response = await fetch(downloadUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch the media content');
    }

    // Convert the response to an array buffer
    const arrayBuffer = await response.arrayBuffer();
    const mediaBuffer = Buffer.from(arrayBuffer);

    // Determine the file name and MIME type based on whether it's a video or image
    const fileName = video ? 'media.mp4' : 'media.jpg';
    const mimeType = video ? 'video/mp4' : 'image/jpeg';

    // Send the media file to the user
    await conn.sendFile(message.chat, mediaBuffer, fileName, '*ᴘᴏᴡᴇʀᴇᴅ ʙʏ © ɢʟᴏʙᴀʟᴛᴇᴄʜɪɴꜰᴏ*', message, false, { mimetype: mimeType });

    // React with a success emoji
    message.react('✅');
  } catch (error) {
    // Log and handle any errors
    console.error('Error downloading from Instagram Threads:', error.message, error.stack);
    await message.reply('⚠️ An error occurred while processing the request. Please try again later.');
    message.react('❌');
  }
};

// Define command metadata
handler.help = ['threads <url>'];
handler.tags = ['downloader'];
handler.command = ['threads'];

export default handler;
