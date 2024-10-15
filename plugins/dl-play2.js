import fg from 'api-dylux';
import yts from 'yt-search';
import fetch from 'node-fetch';
import axios from 'axios';


const imgUrl = 'https://telegra.ph/file/a83d8f5535e6b744986b4.png';

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
    let lister = ["mp3", "yta", "audio", "ytv", "video", "vídeo", "mp4", "mp3doc", "ytadoc", "audiodoc", "mp4doc", "ytvdoc", "videodoc", "vídeodoc"];
    
    let [format, ...keywords] = text.split(" ");
    let searchQuery = keywords.join(" ");
    
    if (!lister.includes(format)) {
        return conn.reply(m.chat, `*💙 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚏𝚘𝚛𝚖𝚊𝚝𝚘 𝚎𝚗 𝚚𝚞𝚎 𝚍𝚎𝚜𝚎𝚊𝚜 𝚍𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚛 𝚖á𝚜 𝚎𝚕 𝚝í𝚝𝚞𝚕𝚘 𝚍𝚎 𝚞𝚗 𝚟𝚒𝚍𝚎𝚘 𝚘 𝚖ú𝚜𝚒𝚌𝚊 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎.*\n\n𝙴𝚓𝚎𝚖𝚙𝚕𝚘: ${usedPrefix + command} *mp3* Connor RK800 - I Am Machine\n\n𝙵𝚘𝚛𝚖𝚊𝚝𝚘𝚜 𝚍𝚒𝚜𝚙𝚘𝚗𝚒𝚋𝚕𝚎𝚜:\n${lister.map(f => `${usedPrefix + command} *${f}*`).join('\n')}`, m);
    }
    
    if (!searchQuery) {
        return conn.reply(m.chat, `*💙 𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚝í𝚝𝚞𝚕𝚘 𝚍𝚎 𝚞𝚗 𝚟𝚒𝚍𝚎𝚘 𝚘 𝚖ú𝚜𝚒𝚌𝚊 𝚍𝚎 𝚈𝚘𝚞𝚃𝚞𝚋𝚎.*`, m);
    }
    
    try {
        await m.react('⏳');
        
    
        const responseImg = await axios.get(imgUrl, { responseType: 'arraybuffer' });

        let res = await yts(searchQuery);
        let vid = res.videos[0];
        let q = '128kbps';
        
        let txt = `❏ TITLE: ${vid.title}\n`;
        txt += `❏ DURATION: ${vid.timestamp}\n`;
        txt += `❏ VIEWS: ${vid.views}\n`;
        txt += `❏ AUTHOR: ${vid.author.name}\n`;
        txt += `❏ PUBLISHED: ${vid.ago}\n`;
        txt += `❏ URL: https://youtu.be/${vid.videoId}\n\n`;
        txt += `❄ REMEMBER @${m.sender.split('@')[0]}, 𝙲𝚞𝚛𝚒 𝚎𝚜 𝚖𝚒 𝚘𝚠𝚗𝚎𝚛 𝚜𝚒 𝚟𝚊𝚜 𝚊 𝚌𝚊𝚛𝚐𝚊𝚛 𝚕𝚘𝚜 𝚙𝚕𝚞𝚐𝚒𝚗𝚜 𝚍𝚊 𝚌𝚛𝚎𝚍𝚒𝚝𝚘𝚜❄`;

        
        await conn.sendFile(m.chat, responseImg.data, "thumbnail.jpg", txt, m, null, rcanal);

        if (format == "mp3" || format == "yta" || format == "audio" || format == "mp3doc" || format == "ytadoc" || format == "audiodoc") {
            let yt = await fg.yta(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 100;
            
            if (parseFloat(size.split('MB')[0]) >= limit) {
                return conn.reply(m.chat, `𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚙𝚎𝚜𝚊 𝚖á𝚜 𝚍𝚎 ${limit} 𝙼𝙱, 𝚜𝚎 𝚌𝚊𝚗𝚌𝚎𝚕ó 𝚕𝚊 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊.`, m);
            }
            
            await conn.sendFile(m.chat, dl_url, 'yt.mp3', `${vid.title}.mp3`, m);
            await m.react('✅');
        } else if (format == "mp4" || format == "ytv" || format == "video" || format == "mp4doc" || format == "ytvdoc" || format == "videodoc" || format == "videodoc") {
            let q = '720p';
            let yt = await fg.ytv(vid.url, q);
            let { title, dl_url, size } = yt;
            let limit = 500;
            
            if (parseFloat(size.split('MB')[0]) >= limit) {
                return conn.reply(m.chat, `𝙴𝚕 𝚊𝚛𝚌𝚑𝚒𝚟𝚘 𝚙𝚎𝚜𝚊 𝚖á𝚜 𝚍𝚎 ${limit} 𝙼𝙱, 𝚜𝚎 𝚌𝚊𝚗𝚌𝚎𝚕ó 𝚕𝚊 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊.`, m);
            }
            
            await conn.sendFile(m.chat, dl_url, 'yt.mp4', `${vid.title}.mp4`, m);
            await m.react('✅');
        }
    } catch (error) {
        await conn.reply(m.chat, `ɴᴏ ᴇꜱᴛᴀ ɪɴꜱᴛᴀʟᴀᴅᴏ ꜰꜰᴍᴘɢ ᴠᴜᴇʟᴠᴀ ᴀʟ ʀᴇᴘᴏꜱɪᴛᴏʀɪᴏ ᴘᴀʀᴀ ᴄʜᴇᴄᴀʀ ᴄᴏᴍᴏ ɪɴꜱᴛᴀʟᴀʀʟᴏ`, m);
        console.error(error);
    }
};

handler.help = ["play3"].map(v => v + " <formato> <búsqueda>");
handler.tags = ["downloader"];
handler.command = ['play3'];
handler.register = true;

export default handler;
