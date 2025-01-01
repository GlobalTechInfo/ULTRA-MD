import pkg from 'api-qasim';
const { wattpad } = pkg;

let handler = async (m, { text, command, usedPrefix, conn }) => {
    // If no query is provided, send a suggestion message
    const suggest = `Please provide a query (e.g., story title, author, or tag). Example: *${usedPrefix}${command} The Hunger Games*`;
    if (!text) throw suggest;

    try {
        await m.react('⌛');  // React with a loading emoji to show processing

        console.log(`Fetching Wattpad results for query: ${text}`);

        // Fetch results from Wattpad using the query
        let wattpadResult = await wattpad(text.trim());

        // Log the raw API response for debugging
        console.log('Wattpad API Response:', JSON.stringify(wattpadResult, null, 2));

        // Check if wattpadResult is a valid array with content
        if (wattpadResult && Array.isArray(wattpadResult) && wattpadResult.length > 0) {
            // Format the results for the user
            let resultText = wattpadResult.slice(0, 9).map((story, index) => {
                // Use fallbacks for each field
                let title = story.judul || 'No title available';
                let reads = story.dibaca || 'No reads available';
                let votes = story.divote || 'No votes available';
                let thumb = story.thumb || ''; // The cover image URL
                let link = story.link || 'No link available';

                // Format each story with the translated fields
                return `${index + 1}. *${title}*\n*Reads*: ${reads}\n*Votes*: ${votes}\nRead more: ${link}\n${thumb ? `![Thumbnail](${thumb})` : ''}`;
            }).join('\n\n');

            // Prepare the message to send to the user
            let data = {
                text: `*Wattpad results for "${text}":*\n\n${resultText}`,
            };
            await conn.sendMessage(m.chat, data, { quoted: m });
            m.react('✅');  // React with a checkmark to indicate success
        } else {
            throw "No results found for your query.";
        }

    } catch (e) {
        console.error('Error:', e);

        // Catch errors and show a friendly error message
        const errorMessage = e.message || e || "Unknown error occurred.";
        await conn.sendMessage(m.chat, { text: `An error occurred: ${errorMessage}` }, { quoted: m });
        m.react('❌');  // React with a cross to show failure
    }
};

handler.help = ['wattpad', 'storysearch', 'wattpadsearch'];
handler.tags = ['search', 'social'];
handler.command = ['wattpad', 'storysearch', 'wattpadsearch'];

export default handler;
