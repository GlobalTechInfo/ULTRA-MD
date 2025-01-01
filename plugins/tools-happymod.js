import pkg from 'api-qasim';
const { happymod } = pkg;

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Please provide a query to search for APKs. Example: *${usedPrefix + command}* Telegram`;

  try {
    // Search for APKs using happymod
    const searchResults = await happymod(text);
    await m.react('⏳');

    // Check if there are results
    if (searchResults && Array.isArray(searchResults.data) && searchResults.data.length > 0) {
      let apkListMessage = `*Choose an APK from the list by replying with the number:*\n\n`;

      // Loop through the result and check its structure before accessing properties
      searchResults.data.forEach((item, index) => {
        console.log(`APK ${index + 1}:`, item);

        // Ensure we have valid details (title, rating) before displaying
        const apkTitle = item.title || `APK ${index + 1}`;
        const apkRating = item.rating || "N/A";
        const apkLink = item.link || "#";  // Provide a fallback URL or identifier

        apkListMessage += `*${index + 1}.* ${apkTitle} (Rating: ${apkRating})\n\n`;
      });

      // Send the list of APKs to the user
      const { key } = await conn.reply(m.chat, apkListMessage, m);

      // Initialize session storage for the selected APK
      conn.happymod = conn.happymod || {};  // Initialize session storage if not already initialized
      conn.happymod[m.sender] = {
        result: searchResults.data,  // Store the list of APKs
        key, // Store the message key to delete later
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, { delete: key });
          delete conn.happymod[m.sender];
        }, 150 * 1000), // Timeout after 2.5 minutes
      };
    } else {
      // If no results, inform the user
      await conn.reply(m.chat, `No APKs found for the query provided.`, m);
    }
  } catch (error) {
    console.error('Error searching APKs:', error);
    await conn.reply(m.chat, `❎ Error occurred while searching for APKs: ${error.message || error}`, m);
  }
};

handler.before = async (m, { conn }) => {
  // Ensure session storage is initialized before accessing
  conn.happymod = conn.happymod || {};

  // Ensure the user has received the options and replied with a number
  if (m.isBaileys || !(m.sender in conn.happymod)) return;

  const { result, key, timeout } = conn.happymod[m.sender];

  // Validate the reply and the input number
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  const choice = m.text.trim();
  const inputNumber = Number(choice);

  // Validate the user's selection
  if (inputNumber >= 1 && inputNumber <= result.length) {
    const selectedApk = result[inputNumber - 1];  // Get the selected APK
    const { title, rating, link, thumb } = selectedApk;  // Get the details of the selected APK

    try {
      // Send the selected APK details to the user
      await conn.reply(m.chat, `*Details of the selected APK:*\n\nTitle: ${title}\nRating: ${rating}\nDownload Link: ${link}`, m);
      await m.react('✅');
      clearTimeout(timeout); // Clear the timeout for the session

      // Clean up the session
      delete conn.happymod[m.sender];
    } catch (error) {
      console.error("Error sending selected APK:", error);
      await conn.reply(m.chat, `❎ Failed to send the APK details: ${error.message || error}`, m);
    }
  } else {
    await conn.reply(m.chat, `❎ Invalid selection. Please choose a number between 1 and ${result.length}.`, m);
  }
};

handler.help = ['happymod'];
handler.tags = ['media'];
handler.command = /^(happymod)$/i;

export default handler;
