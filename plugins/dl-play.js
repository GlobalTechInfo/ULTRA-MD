import yts from 'yt-search';

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `✳️ Example: *${usedPrefix + command}* Lil Peep hate my life`;
    let res = await yts(text);
    let vid = res.videos[0];
    if (!vid) throw `✳️ Video/Audio not found`;
    
    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;
    m.react('🎧');
    
    let play = `
≡ *FG MUSIC*
┌──────────────
▢ 📌 *Title:* ${vid.title}
▢ 📆 *Uploaded:* ${vid.ago}
▢ ⌚ *Duration:* ${vid.timestamp}
▢ 👀 *Views:* ${vid.views.toLocaleString()}
└──────────────`;

    await conn.sendButton(m.chat, play, mssg.ig, null, [
        ['🎶 MP3', `${usedPrefix}fgmp3 ${url}`],
        ['🎥 MP4', `${usedPrefix}fgmp4 ${url}`]
    ], m, { mentions: [m.sender] });

    // Optionally send the audio file if needed
    // const av = `./assets/${pickRandom(['qasim', 'global'])}.mp3`;
    // await conn.sendFile(m.chat, av, 'audio.mp3', null, m, true, { type: 'audioMessage', ptt: true });
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'playvid'];
handler.disabled = false;

export default handler;
