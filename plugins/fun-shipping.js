
function handler(m, {conn, groupMetadata }) {
	
	let time = global.db.data.users[m.sender].shipping + 28800000
  if (new Date - global.db.data.users[m.sender].shipping < 28800000) throw `👩🏻‍❤️‍💋‍👨🏾 ${mssg.shipCd} *${msToTime(time - new Date())}* `
let ps = groupMetadata.participants.map(v => v.id)
let f = ps.getRandom()
let g
do g = ps.getRandom()
while (g === f)
m.reply(`
▢ *${mssg.shipp}*

${toM(f)}
       ❤️
 ${toM(g)}
`, null, { mentions: [f, g] })
global.db.data.users[m.sender].shipping = new Date * 1
}
handler.help = ['shipping']
handler.tags = ['fun']
handler.command = ['shipping']
handler.group = true

export default handler

let toM = f => '@' + f.split('@')[0]

function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = (hours < 10) ? "0" + hours : hours
  minutes = (minutes < 10) ? "0" + minutes : minutes
  seconds = (seconds < 10) ? "0" + seconds : seconds

  return hours + ` ${mssg.hour} ` + minutes + ` ${mssg.minute}`
}
