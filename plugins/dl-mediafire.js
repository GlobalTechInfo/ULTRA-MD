/* import fetch from 'node-fetch';
import { mediafiredl } from '@bochilteam/scraper';

let handler = async (m, { conn, args, isOwner, isPrems }) => {
  const rwait = '⏳'; // Replace with your preferred loading emoji
  const done = '✅';  // Replace with your preferred done emoji

  const limitMB = isOwner || isPrems ? 1200 : 100; // Limit in MB
  const limitBytes = limitMB * 1024 * 1024; // Convert MB to Bytes for comparison

  if (!args[0]) throw `✳️ Please enter the Mediafire link after the command.`;
  if (!args[0].match(/mediafire/gi)) throw `❌ Incorrect link. Please enter a valid Mediafire link.`;

  await m.react(rwait);

  try {
    // Fetch screenshot
    const mediafireUrl = /https?:\/\//.test(args[0]) ? args[0] : 'https://' + args[0];
    const screenshot = await (await fetch(`https://image.thum.io/get/fullpage/${mediafireUrl}`)).buffer();

    // Fetch file data from Mediafire
    const res = await mediafiredl(args[0]);
    const { url, filename, ext, aploud, filesize, filesizeH } = res;

    const isLimit = filesize > limitBytes;
    const caption = `≡ *MEDIAFIRE*
▢ *File:* ${filename}
▢ *Size:* ${filesizeH}
▢ *Extension:* ${ext}
▢ *Uploaded:* ${aploud}
${isLimit ? `\n⚠️ The file size exceeds the download limit of *${limitMB} MB*.\nUpgrade to premium to download files larger than *${limitMB} MB*.` : ''}`.trim();

    // Send screenshot and file details
    await conn.sendFile(m.chat, screenshot, 'screenshot.png', caption, m);

    // Send file if it doesn't exceed limit
    if (!isLimit) {
      await conn.sendFile(m.chat, url, filename, '', m, null, { mimetype: ext, asDocument: true });
    }
  } catch (err) {
    console.error(err);
    throw `❌ Error fetching file. Please check the link or try again later.`;
  }

  await m.react(done);
}

handler.help = ['mediafire <url>'];
handler.tags = ['downloader', 'premium'];
handler.command = ['mediafire', 'mfire'];
handler.premium = false;

export default handler; */
