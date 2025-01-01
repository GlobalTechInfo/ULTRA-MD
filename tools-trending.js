import pkg from 'api-qasim';
const { trendtwit } = pkg;

let handler = async (m, { text, command, usedPrefix, conn }) => {
    var suggest = `Please provide a country name. Example: *${usedPrefix}${command} Pakistan*`;
    if (!text) throw suggest;

    try {
        await m.react('⌛');

        console.log(`Fetching trends for country: ${text}`);

        // Fetch the trending topics using the trendtwit function
        let trendtwitResult = await trendtwit(text);

        // Check if trendtwitResult is a valid string or object
        if (typeof trendtwitResult === 'string') {
            // Send a string message properly formatted
            let data = {
                text: `*Trending topics in ${text}:*\n\n${trendtwitResult}`,
            };
            await conn.sendMessage(m.chat, data, { quoted: m });
        } else if (trendtwitResult && typeof trendtwitResult === 'object' && trendtwitResult.result && Array.isArray(trendtwitResult.result) && trendtwitResult.result.length > 0) {
            // Handle it if the result is an object with trends
            let trends = trendtwitResult.result.map((trend, index) => {
                if (trend.hastag && trend.tweet) {
                    return `${index + 1}. ${trend.hastag} - ${trend.tweet}`;
                } else {
                    console.warn(`Unexpected trend format at index ${index}:`, trend);
                    return `Invalid trend format at index ${index}`;
                }
            }).join('\n');

            let data = {
                text: `*Trending topics in ${text}:*\n\n${trends}\n\n*𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 © 𝚄𝙻𝚃𝚁𝙰-𝙼𝙳*`,
            };
            await conn.sendMessage(m.chat, data, { quoted: m });
            m.react('✅');
        } else {
            // Handle case where there are no valid trends
            throw "No trending data found for this country.";
        }

    } catch (e) {
        // Log the error message for debugging
        console.error('Error:', e);

        // Ensure error message is safely handled
        const errorMessage = e.message || e || "Unknown error occurred.";
        throw `An error occurred: ${errorMessage}`;
    }
}

handler.help = ['trendtwit', 'trends', 'trendingtags', 'tweets', 'hashtags', 'trendtags'];
handler.tags = ['social'];
handler.command = ['trendtwit', 'trends', 'trendingtags', 'tweets', 'hashtags', 'trendtags'];

export default handler;
