import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ Example: *${usedPrefix + command}* Lil Peep hate my life`;
    m.react('📀');
    
    let result = await yts(text);
    let ytres = result.videos;
    
    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `${index}┃ ${v.title}`,
            rows: [
                {
                    header: '🎶 MP3',
                    title: "",
                    description: `▢ ⌚ *Duration:* ${v.timestamp}\n▢ 👀 *Views:* ${v.views}\n▢ 📌 *Title:* ${v.title}\n▢ 📆 *Uploaded:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp3 ${v.url}`
                },
                {
                    header: "🎥 MP4",
                    title: "" ,
                    description: `▢ ⌚ *Duration:* ${v.timestamp}\n▢ 👀 *Views:* ${v.views}\n▢ 📌 *Title:* ${v.title}\n▢ 📆 *Uploaded:* ${v.ago}\n`, 
                    id: `${usedPrefix}ytmp4 ${v.url}`
                }
            ]
        });
    }

    await conn.sendList(m.chat, '  ≡ *ULTRA-MD MUSIC*🔎', `\n 📀 Results for:\n *${text}*`, `Click Here`, ytres[0].image, listSections, m);
};

handler.help = ['play2'];
handler.tags = ['dl'];
handler.command = ['play2', 'playvid2', 'playlist', 'playlista']; 
handler.disabled = false;

export default handler;
