const {cmd , commands} = require('../command')
const fg= require(`api-dylux`)
const yts = require(`yt-search`)
cmd({
    pattern: "song",
    desc: "Song downlod
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (q) retrun  reply("*🧑‍🔧Please give me a text or url that I want to search!🧑‍🔧*")
const search = await  yts(q)
const data =search .videos[0]:
const url = data.url

let desc =`🎶 *SHAGEE MD AUDIO DOWNLODER* 🎶  
|__________
|\_ ℹ️ 𝚃𝚒𝚝𝚕𝚎 : ${data.title}
|
|\_🗒️ Description : ${data.description}
|
|\_🕘 𝚃𝚒𝚖𝚎 : ${data.timestamp}
|
|\_📌 𝙰𝚐𝚘 :${data.ago}
|
|\_📉 𝚅𝚒𝚎𝚠𝚜 :${data.views}
|__________

*_DOWNLODING YOUR SONG..._*

> POWERED by DINETH Ofc🚀📩
> downlod by SHAGEE MD 
`
  await conn.sendMassge(from,{image:{url data.thumbnail},caption:desc},{quoted:mek}):

  // downlod audio 

let down = await fg.yta(url)
let downlodUrl = down.dl_url

// send audio massge
await conn.sendMassge(from,{audio:{url:downlodUrl},minetype:"audio/mpeg"},{quoted:mek})
await conn.sendMassge(from,{document:{url:downlodUrl},minetype:"audio/mpeg",fileName:data.title +".mp3",caption:"*_DOWNLOD BY SHAGEE-MD V1_*"},{quoted:mek})

}catch(e){
console.log(e)
 reply(`${e}`)
}
}}



//===========================video-dl+document================


cmd({
    pattern: "video",
    desc: "video downlod
    category: "downlod",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (q) retrun  reply("*🧑‍🔧Please give me a text or url that I want to search!🧑‍🔧*")
const search = await  yts(q)
const data =search .videos[0]:
const url = data.url

let desc =`🎶 *SHAGEE MD VIDEO DOWNLODER* 🎶  
|__________
|\_ ℹ️ 𝚃𝚒𝚝𝚕𝚎 : ${data.title}
|
|\_🗒️ Description : ${data.description}
|
|\_🕘 𝚃𝚒𝚖𝚎 : ${data.timestamp}
|
|\_📌 𝙰𝚐𝚘 :${data.ago}
|
|\_📉 𝚅𝚒𝚎𝚠𝚜 :${data.views}
|__________

*_DOWNLODING YOUR VIDEO..._*

> POWERED by DINETH Ofc🚀📩
> downlod by SHAGEE MD 
`
  await conn.sendMassge(from,{image:{url data.thumbnail},caption:desc},{quoted:mek}):

  // downlod video

let down = await fg.ytv(url)
let downlodUrl = down.dl_url
    
// send video massge
    
await conn.sendMassge(from,{video:{url:downlodUrl},minetype:"video/mp4"},{quoted:mek})
await conn.sendMassge(from,{document:{url:downlodUrl},minetype:"video/mp4",fileName:data.title +".mp4",caption:"*_DOWNLOD BY SHAGEE-MD V1_*"},{quoted:mek})



console.log(e)
 reply(`${e}`)
}
}}
