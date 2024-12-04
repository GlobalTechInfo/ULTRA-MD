import fetch from 'node-fetch';
import pkg from 'nayan-video-downloader';
const { twitterdown } = pkg;  // Import the Twitter video downloader

// Retry function for fetching the video with better error handling
const fetchWithRetry = async (url, options, retries = 3, delay = 3000) => {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (response.ok) return response;  // Return if fetch is successful
            console.log(`Attempt ${i + 1} failed, retrying...`);
        } catch (error) {
            console.error(`Attempt ${i + 1} failed, retrying...`, error.message);
        }
        await new Promise(resolve => setTimeout(resolve, delay));  // Delay before retrying
    }
    throw new Error('Failed to fetch media content after retries');
};

const handler = async (m, { args, conn }) => {
    // Check if a URL was provided
    if (!args.length) {
        await m.reply('Please provide a Twitter or X URL.');
        return;
    }

    const url = args.join(' ');  // Join arguments to handle spaces in URLs

    // Updated regex to match both twitter.com and x.com URLs
    const twitterRegex = /^(https?:\/\/)?(www\.)?(twitter\.com|x\.com)\/.+$/;

    // Validate the URL format
    if (!twitterRegex.test(url)) {
        await m.react('❌');  // React with a cross emoji for invalid URL
        await m.reply('Invalid Twitter or X URL. Please provide a valid URL.');
        return;
    }

    await m.react('⏳');  // React with a loading emoji

    try {
        // Fetch video details from Twitter using nayan-video-downloader
        const response = await twitterdown(url);
        console.log('API Response:', response);

        if (!response || !response.data) {
            throw new Error('Invalid response from the downloader.');
        }

        const videoUrl = response.data.SD;  // Use the HD video URL
        if (!videoUrl) {
            throw new Error('HD video URL not found.');
        }

        // Fetch the video file with retry logic
        const mediaResponse = await fetchWithRetry(videoUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const contentType = mediaResponse.headers.get('content-type');
        if (!contentType || !contentType.includes('video')) {
            throw new Error('Invalid content type received');
        }

        const arrayBuffer = await mediaResponse.arrayBuffer();
        const mediaBuffer = Buffer.from(arrayBuffer);
        if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

        // Send the video file
        await conn.sendFile(m.chat, mediaBuffer, 'video.mp4', `Downloaded from ${url}`, m, false, {
            mimetype: 'video/mp4'
        });

        await m.react('✅'); // React with a checkmark emoji for success
    } catch (error) {
        console.error('Error fetching video:', error.message);
        await m.reply('An error occurred while fetching the video. Please try again later.');
        await m.react('❌');  // React with a cross emoji for errors
    }
};

handler.help = ['twitter', 'twitdl'];
handler.tags = ['download'];
handler.command = ['twitter', 'twitdl'];

export default handler;
