import pkg from 'api-qasim';  // Import the `api-qasim` package
const { apksearch } = pkg;  // Destructure `apksearch` from `api-qasim`

// Function to search and fetch APK information
async function searchAndFetchApkInfo(query) {
  try {
    // Fetch APK data using the `apksearch` function from `api-qasim`
    const apksearchResult = await apksearch(query);

    // Log the API response to see the raw data
    console.log("Fetched APK data:", apksearchResult);

    // Ensure the result contains a 'data' field and is an array
    if (!apksearchResult || !apksearchResult.data || !Array.isArray(apksearchResult.data) || apksearchResult.data.length === 0) {
      console.log("No valid APK data found.");
      return [];
    }

    // Return an array of objects containing title, developer, version, and URL for the APKs
    return apksearchResult.data.map(item => ({
      title: item.judul,  // Corrected key to 'judul'
      developer: item.dev,  // Corrected key to 'dev'
      version: item.rating,  // Using 'rating' as the version
      url: item.link,  // Corrected to use 'link' as the URL
    }));
  } catch (error) {
    console.error('Error fetching APKs:', error);
    return [];
  }
}

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Please provide an APK name to search for. Example: *${usedPrefix + command}* Telegram`;

  conn.apksearch = conn.apksearch ? conn.apksearch : {}; // Initialize session storage
  await conn.reply(m.chat, '⏳ Searching for APK...', m);

  // Fetch the APK list from `apksearch` function
  const result = await searchAndFetchApkInfo(text);

  // Log the API response here
  console.log("API Response:", result); // Log the raw API response

  if (result.length === 0) {
    return m.reply('No APKs found for your search term. Please try another one.');
  }

  // Prepare the list of APKs for display
  const infoText = `📱 Available APKs for *${text.trim()}*:\n\n`;

  const orderedLinks = result.map((data, index) => {
    const { title, developer, version, url } = data;
    return `*${index + 1}.* ${title} - ${developer} (Version: ${version})\nURL: ${url}`;
  });

  const orderedLinksText = orderedLinks.join('\n\n');
  const fullText = `${infoText}${orderedLinksText}`;
  await conn.reply(m.chat, fullText, m); // Send the APK list directly

};

handler.help = ['android', 'android1'];
handler.tags = ['media'];
handler.command = ['android', 'android1'];

export default handler;
