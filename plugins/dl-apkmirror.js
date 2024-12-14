import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Enter the name of the app to search for the mod.");
  }

  try {
    // Add "wait" reaction to indicate the request is processing
    await m.react('⏳');
    
    const response = await fetch(`https://global-tech-api.vercel.app/apksearch?query=${text}`);
    
    // Log the API response to the console
    const data = await response.json();
    console.log("API Response:", data); // Log the complete response

    // Check if the response contains any data
    if (!data.data || data.data.length === 0) {
      // React with "done" emoji in case no results
      await m.react('✅');
      return m.reply("No mods were found for the application you were looking for.");
    }

    let caption = `Search results for *${text}*:\n\n`;

    // Loop through the results and format the response
    data.data.forEach((result, index) => {
      if (result.title && result.url && result.updated && result.size) {
        caption += `
${index + 1}. *Title:* ${result.title}
*Version:* ${result.version}
*Size:* ${result.size}
*Updated:* ${result.updated}
*Download Link:* ${result.url}
\n`;
      }
    });

    // React with "done" emoji after the process is complete
    await m.react('✅');
    
    // Send the formatted message
    await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
  } catch (error) {
    console.error("Error in search modapk:", error);
    m.reply("An error occurred while searching for mods.");
  }
};

handler.help = ['apksearch'];
handler.tags = ['search'];
handler.command = /^(apksearch|searchapk)$/i;
handler.group = false;

export default handler;
