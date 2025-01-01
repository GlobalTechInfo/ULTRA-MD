import pkg from 'api-qasim'; // Import the `api-qasim` package
import fs from 'fs';
import os from 'os';
import { promisify } from 'util';
import { pipeline } from 'stream';

const { ringtone } = pkg;  // Destructure `ringtone` from the package

const streamPipeline = promisify(pipeline);

// Retry fetch function
async function fetchWithRetry(url, retries = 3, delay = 3000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch, status: ${response.status}`);
      }
      return response; // Successfully fetched, return the response
    } catch (error) {
      attempt++;
      if (attempt < retries) {
        console.log(`Attempt ${attempt} failed. Retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
      } else {
        throw new Error(`Fetch failed after ${retries} attempts: ${error.message}`);
      }
    }
  }
}

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `*Please provide a search term. Example: ${usedPrefix + command} Shape Of You*`;
  
  conn.ringtone = conn.ringtone ? conn.ringtone : {}; // Initialize the session storage
  await m.react('⏳');

  // Fetch the ringtones list from `api-qasim` package
  const result = await searchAndFetchRingtones(text);

  if (result.length === 0) {
    return m.reply('No ringtones found for your search term. Please try another one.');
  }

  // Prepare the list for display
  const infoText = `🎶 Available ringtones for *${text.trim()}*:\n\n[ ⭐ Reply with the number to select a ringtone ]\n\n`;

  const orderedLinks = result.map((data, index) => {
    const sectionNumber = index + 1;
    const { title, creator } = data;
    return `*${sectionNumber}.* ${title}`;
  });

  const orderedLinksText = orderedLinks.join('\n\n');
  const fullText = `${infoText}${orderedLinksText}`;
  const { key } = await conn.reply(m.chat, fullText, m);

  // Store the result and set timeout
  conn.ringtone[m.sender] = {
    result,
    key,
    timeout: setTimeout(() => {
      conn.sendMessage(m.chat, { delete: key });
      delete conn.ringtone[m.sender];
    }, 150 * 1000), // Timeout after 2 minutes
  };
};

handler.before = async (m, { conn }) => {
  conn.ringtone = conn.ringtone ? conn.ringtone : {};
  if (m.isBaileys || !(m.sender in conn.ringtone)) return;

  const { result, key, timeout } = conn.ringtone[m.sender];

  // Ensure that the reply is valid
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  const choice = m.text.trim();
  const inputNumber = Number(choice);

  // Validate the user's input
  if (inputNumber >= 1 && inputNumber <= result.length) {
    const selectedRingtone = result[inputNumber - 1];
    console.log('User selected:', selectedRingtone);

    const { title, url, creator } = selectedRingtone;  // Use the actual creator here

    try {
      // Retry fetching the ringtone
      const audioStream = await fetchWithRetry(url);

      const tmpDir = os.tmpdir();
      const filePath = `${tmpDir}/${title}.mp3`;
      const writableStream = fs.createWriteStream(filePath);

      // Download the file
      await streamPipeline(audioStream.body, writableStream);
      console.log(`Ringtone downloaded to: ${filePath}`);

      // Send the ringtone to the user
      await conn.sendFile(m.chat, filePath, title + '.mp3', `*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳* 🎶\n\nCreator: ${creator}`, m);
      m.react('✅');

      // Log the success
      console.log(`Ringtone sent to ${m.sender}`);

      // Clean up the temporary file after sending
      fs.unlinkSync(filePath);
      console.log('Temporary file deleted');

      // Clean up the session
      delete conn.ringtone[m.sender];
    } catch (error) {
      console.error('Error fetching the ringtone:', error);
      m.reply(`❎ Failed to fetch the ringtone: ${error.message}`);
    }
  } else {
    m.reply(`❎ Invalid selection. Please choose a number between 1 and ${result.length}.`);
  }
};

handler.help = ['ringtone'];
handler.tags = ['media'];
handler.command = /^(ringtone)$/i;

export default handler;

// Function to search and fetch ringtones using the `api-qasim` package
async function searchAndFetchRingtones(query) {
  try {
    // Fetch ringtones data using the `api-qasim` package
    const ringtoneResult = await ringtone(query);

    if (!ringtoneResult || ringtoneResult.length === 0) {
      return [];
    }

    // Return an array of objects containing title, creator, and url for the ringtones
    return ringtoneResult.map(item => ({
      title: item.title,
      creator: item.creator,  // Use the actual creator here
      url: item.audio, // Use 'audio' field directly as it's the correct URL field
    }));
  } catch (error) {
    console.error('Error fetching ringtones:', error);
    return [];
  }
}
