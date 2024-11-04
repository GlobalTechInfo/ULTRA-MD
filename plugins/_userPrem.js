
let handler = m => m
export async function all(m) {
    let user = global.db.data.users[m.sender]
    if (m.chat.endsWith('broadcast')) return
    if (user.premiumTime != 0 && user.prem) {
        if (new Date() * 1 >= user.premiumTime) {
          await m.reply(`✳️ Premium expired`)
            user.premiumTime = 0
            user.prem = false
        }
    }
}
