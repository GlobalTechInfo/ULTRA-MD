import fetch from 'node-fetch';
import pkg from 'nayan-media-downloader';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { ytdown } = pkg;
const execPromise = promisify(exec);

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fetchWithRetry = async (url, options, retries = 3) => {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url, options);
        if (response.ok) return response;
        console.log(`Retrying... (${i + 1})`);
    }
    throw new Error('Failed to fetch media content after retries');
};

const convertToMp3 = async (inputBuffer, outputPath) => {
    const tempInputPath = path.join(__dirname, 'temp_audio.mp4');
    fs.writeFileSync(tempInputPath, inputBuffer);

    try {
        await execPromise(`ffmpeg -i "${tempInputPath}" -vn -ar 44100 -ac 2 -b:a 192k "${outputPath}"`);
    } catch (error) {
        console.error('FFmpeg Error:', error);
        throw new Error('Failed to convert audio to MP3.');
    } finally {
        fs.unlinkSync(tempInputPath);
    }
};

const handler = async (m, { args, conn, usedprefix }) => {
    if (!args.length) {
        await m.reply('Please provide a YouTube URL.');
        return;
    }

    const url = args.join(' ');
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (!youtubeRegex.test(url)) {
        await m.react('❌');
        await m.reply('Invalid YouTube URL. Please provide a valid URL.');
        return;
    }

    await m.react('⏳');

    try {
        const response = await ytdown(url);
        console.log('API Response:', JSON.stringify(response, null, 2));

        if (!response || !response.data) {
            throw new Error('Too many requests towards api wait little longer.');
        }

        // Check if the API provides the full-length audio file
        const audioUrl = response.data.audio_hd || response.data.audio;  // Prefer HD audio
        if (!audioUrl) {
            throw new Error('Audio URL not found.');
        }

        console.log('Audio URL:', audioUrl);

        const title = response.data.title || 'audio';
        const safeTitle = title.substring(0, 4).replace(/[<>:"/\\|?*]/g, '_'); // Get the first four characters
        const caption = `POWERED BY ULTRA`;

        const mediaResponse = await fetchWithRetry(audioUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
                'Accept': 'application/json, text/plain, */*'
            }
        });

        const arrayBuffer = await mediaResponse.arrayBuffer();
        const mediaBuffer = Buffer.from(arrayBuffer);

        console.log('Media Buffer Size:', mediaBuffer.length);
        if (mediaBuffer.length === 0) throw new Error('Downloaded file is empty');

        const outputPath = path.join(__dirname, `${safeTitle}.mp3`);
        await convertToMp3(mediaBuffer, outputPath);

        await conn.sendFile(m.chat, outputPath, path.basename(outputPath), caption, m, false, {
            mimetype: 'audio/mpeg'
        });

        await m.react('✅');
    } catch (error) {
        console.error('Error fetching audio:', error.message);
        await m.reply(`⏱️ Error: ${error.message}`);
        await m.react('❌');
    }
};

handler.help = ['ytmp3', 'yta'];
handler.tags = ['dl'];
handler.command = ['ytmp3', 'yta'];

export default handler;
