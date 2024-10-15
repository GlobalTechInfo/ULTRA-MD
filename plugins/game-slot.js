//import db from '../lib/database.js'
let reg = 10
let maxap = 20000
let cooldown = 30000
let handler = async (m, { conn, args, usedPrefix, command }) => {
    let fa = `
📌 ${mssg.example} :
*${usedPrefix + command}* 100`.trim()

    if (!args[0]) throw fa
    if (isNaN(args[0])) throw fa
    let apuesta = parseInt(args[0])
    let user = global.db.data.users[m.sender]
    if (new Date - user.lastslot < cooldown) throw `⏳ ${mssg.rouletCd} *${msToTime((user.lastslot + cooldown) - new Date())}*`
    if (apuesta < 100) throw `✳️ ${mssg.betMin} *100 🪙*`
    if (user.coin < apuesta)throw `✳️ ${mssg.coinNan}`
   if (maxap < apuesta) return m.reply(`🎰 ${mssg.betMax} *${maxap} 🪙*`) 
   	
    let emojis = ["🕊️", "🦀", "🦎"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `🎁 ${mssg.win}\n *+${apuesta} 🪙*`
        user.coin += apuesta
    } else if (a == b || a == c || b == c) {
        end = `🔮 ${mssg.slotC}\n  *+${reg} 🪙*`
        user.coin += reg
    } else {
        end = `😔 ${mssg.lost}  *-${apuesta} 🪙*`
        user.coin -= apuesta
    }
    user.lastslot = new Date * 1
    return await m.reply(
        `
       🎰 ┃ *SLOTS* 
     ───────────
       ${x[0]} : ${y[0]} : ${z[0]}
       ${x[1]} : ${y[1]} : ${z[1]}
       ${x[2]} : ${y[2]} : ${z[2]}
     ───────────
        🎰┃🎰┃ 🎰
        
${end}`) 
}
handler.help = ['slot <apuesta>']
handler.tags = ['game']
handler.command = ['slot']
handler.group = true

export default handler

function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours
    minutes = (minutes < 10) ? "0" + minutes : minutes
    seconds = (seconds < 10) ? "0" + seconds : seconds

    return seconds + ` ${mssg.second}`
}
