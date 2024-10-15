let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

  let pp = './assets/qasim.jpg'
  let more = String.fromCharCode(8206)
  let readMore = more.repeat(850)

  let lkr
  switch (command) {
    case 'list':
      lkr ='*Get ready for the ride, here are your ticket options:*\n\n' +
        '🌅 *' +
        usedPrefix +
        "botmenu* - The Bot's secret control panel.\n\n" +
        '🖲️ *' +
        usedPrefix +
        "ownermenu* - Yep, that's for you, Boss!\n\n" +
        '🛫 *' +
        usedPrefix +
        'groupmenu* - Groups to unite people.\n\n' +
        '🗂️ *' +
        usedPrefix +
        "dlmenu* - 'DL' stands for 'Delicious Loot'.\n\n" +
        '🎭 *' +
        usedPrefix +
        "funmenu* - The bot's party hat. Games, jokes and instant ROFLs.\n\n" +
        '💵 *' +
        usedPrefix +
        'economymenu* - Your personal vault of virtual economy.\n\n' +
        '🎮 *' +
        usedPrefix +
        'gamemenu* - Enter the gaming arena.\n\n' +
        '🫐 *' +
        usedPrefix +
        'stickermenu* - A rainbow of stickers.\n\n' +
        '🪙 *' +
        usedPrefix +
        "toolmenu* - Your handy-dandy toolkit.\n\n" +
        '🧲 *' +
        usedPrefix +
        'logomenu* - Create a logo that screams You.\n\n' +
        '💟 *' +
        usedPrefix +
        'nsfwmenu* - The After Dark menu.\n\n' +
        '🌀 *' +
        usedPrefix +
        'aimenu* - Your Personal Artificial Intelligence Copilots.\n\n' +
        '🎧 *' +
        usedPrefix +
        'aeditor* - Tune The Mp3/Audio As You Wish.'
        break

    case 'botmenu':
      lkr = `
╭───『 *Bot* 』─❍
◈ .quran
◈ .bible
◈ .gita
◈ .ping
◈ .uptime
◈ .alive
◈ .anticall
◈ .chatbot
◈ .bot
◈ .owner
◈ .script
◈ .test
◈ .runtime
◈ .info
◈ .mrcs
◈ .bebots
◈ .jadibot
◈ .serbot
◈ .donate
◈ .groups
◈ .blocklist
◈ .listprem
◈ © GlobalTechInfo
╰─────────❍` // Your bot menu message here
      break
      case 'aimenu':
      lkr=`
 ╭───『 *AI* 』─❍
 ◈ .lexica
 ◈ .chatgpt
 ◈ .gitagpt
 ◈ .gptpro
 ◈ .gpt4
 ◈ .civitai
 ◈ .blackpink
 ◈ .image
 ◈ .dalle
 ◈ .bro
 ◈ .ai
 ╰─────────❍` //
 break
    case 'ownermenu':
      lkr = `
╭───『 *Owner* 』─❍
◈ .enable
◈ .disable
◈ .banchat
◈ .unbanchat
◈ .banuser
◈ .unbanuser
◈ .broadcast
◈ .broadcastgc
◈ .readviewonce
◈ .setprivacy
◈ .join
◈ .setppbot
◈ .setprefix
◈ .resetprefix
◈ .getfile
◈ .getplugin
◈ .plugins
◈ .install
◈ .savecontact
◈ .fakereply
◈ .delcmd
◈ .listcmd
◈ .getmsg
◈ .addprem
◈ .delprem
◈ .addsudo
◈ .delsudo
◈ .addowner
◈ .delowner
◈ .allvars
◈ .broadcast
◈ .fullpp
◈ .inspect
◈ .cleartmp
◈ .restart
◈ .savefile
◈ .getfile
◈ .logout
◈ .unban
◈ .ban
◈ .afk
◈ .save
◈ .update
◈ .allow
◈ .listban
╰─────────❍` //
      break
    case 'groupmenu':
      lkr = `
╭───『 *Group* 』─❍
◈ .kick
◈ .promote
◈ .demote
◈ .groupinfo
◈ .resetlink
◈ .antilink
◈ .link
◈ .setpp
◈ .setname
◈ .setdesc
◈ .setwelcome
◈ .setbye
◈ .hidetag
◈ .tagall
◈ .totag
◈ .notify
◈ .delwarn
◈ .warn
◈ .unwarn
◈ .warns
◈ .add
◈ .delete
◈ .group
◈ .enable
◈ .disable
◈ .toxic
◈ .ship
◈ .register
◈ .unreg
◈ .mysn
◈ .poll
◈ .simulate
◈ .admins
╰─────────❍` //
      break
    case 'downloadermenu':
    case 'dlmenu':
      lkr = `
╭───『 *Download* 』─❍
◈ .video
◈ .itunes
◈ .play
◈ .play2
◈ .play3
◈ .apk
◈ .mega
◈ .yts
◈ .yta
◈ .ytv
◈ .ytmp3 
◈ .ytmp4
◈ .gimage
◈ .gdrive
◈ .gitclone 
◈ .twitter
◈ .tiktokstalk
◈ .insta
◈ .igstalk
◈ .facebook
◈ .swdl
◈ .dlstatus
╰─────────❍` //
      break
    case 'economymenu':
      lkr = `
╭───『 *Economy* 』─❍
◈ .claim/daily
◈ .weekly
◈ .monthly
◈ .leaderboard
◈ .bet
◈ .heal
◈ .craft
◈ .balance
◈ .shop
◈ .sell
◈ .adventure
◈ .opencrate
◈ .mine
◈ .work
◈ .transfer
◈ .todiamond
◈ .tomoney
╰────────❍ ` //
      break
    case 'funmenu':
      lkr = `
╭───『 *Fun* 』─❍
◈ .character
◈ .truth
◈ .dare
◈ .flirt
◈ .gay
◈ .shayeri
◈ .ship
◈ .waste
◈ .alexa
◈ .simpcard
◈ .hornycard
◈ .ytcomment
◈ .stupid
◈ .lolicon
╰─────────❍` //
      break
    case 'animemenu':
      lkr = `
╭───『 *Anime* 』─❍
◈ .waifu
◈ .neko
◈ .loli
◈ .couplepp
◈ .toanime
◈ .naruto
◈ .itachi
◈ .akira
◈ .asuna
◈ .akiyama
◈ .boruto
◈ .hornycard
◈ .ayuzawa
◈ .anna
◈ .chiho
◈ .chitoge
◈ .deidara
◈ .erza
◈ .elaina
◈ .emilia
◈ .hestia
◈ .hinata
◈ .inori
◈ .isuzu
◈ .kagura
◈ .kaori
◈ .keneki
◈ .kurumi
◈ .madara
◈ .mikasa
◈ .miku
◈ .minato
◈ .nezuko
◈ .sagiri
◈ .sasuke
◈ .sakura
◈ .kotori
╰─────────❍` //
      break
    case 'gamemenu':
      lkr = `
╭───『 *Game* 』─❍
◈ .tictactoe
◈ .delttt
◈ .chess
◈ .math
◈ .math answer
◈ .ppt
◈ .slot
◈ .casino
◈ .guessflag
◈ .fhint
╰─────────❍` //
      break
    case 'stickermenu':
      lkr = `
╭───『 *Sticker* 』─❍
◈ .sticker
◈ .take
◈ .scircle
◈ .smaker
◈ .sremovebg
◈ .smeme
◈ .trigger
◈ .getsticker
◈ .tgsticker
◈ .emojimix
◈ .toimg
◈ .tovid
◈ .ttp
◈ .attp
◈ .attp2
◈ .attp3
╰─────────❍` //
      break
    case 'toolmenu':
      lkr = `
╭───『 *Tools* 』─❍
◈ .autosticker
◈ .tgsticker
◈ .topdf
◈ .whatmusic
◈ .filelength
◈ .tempmail
◈ .checkmail
◈ .course
◈ .calc
◈ .google
◈ .imdb
◈ .reddit
◈ .lyrics
◈ .readmore
◈ .ssweb
◈ .carbon
◈ .element
◈ .translate
◈ .tourl
◈ .trace
◈ .wikipedia
◈ .nowa
◈ .qrmaker
◈ .readqr
◈ .fancy
◈ .weather
◈ .tocartoon
◈ .quote
◈ .technews
◈ .define
◈ .itunes
◈ .pokedex
◈ .removebg
◈ .tinyurl/shorturl
◈ .readvo
◈ .true
◈ .wa
◈ .voz
╰─────────❍` //
break
case 'aeditor':
lkr=`
╭───『 *Audio* 』─❍
◈ .bass
◈ .blown
◈ .deep
◈ .earrape
◈ .fast
◈ .nightcore
◈ .reverse
◈ .robot
◈ .slow
◈ .smooth
◈ .tupai
◈ .squirrel
◈ .chipmunk
╰─────────❍` //
      break
    case 'nsfwmenu': 
      lkr = `
  ╭───『 *Nsfw* 』─❍
  ◈ .genshin
  ◈ .swimsuit
  ◈ .schoolswimsuit
  ◈ .white
  ◈ .barefoot
  ◈ .touhou
  ◈ .gamecg
  ◈ .hololive
  ◈ .uncensored
  ◈ .sunglasses
  ◈ .glasses
  ◈ .weapon
  ◈ .shirtlift
  ◈ .chain
  ◈ .fingering
  ◈ .flatchest
  ◈ .torncloth
  ◈ .bondage
  ◈ .demon
  ◈ .wet
  ◈ .pantypull
  ◈ .headdress
  ◈ .headphone
  ◈ .tie
  ◈ .anusview
  ◈ .shorts
  ◈ .stokings
  ◈ .topless
  ◈ .beach
  ◈ .bunnygirl
  ◈ .bunnyear
  ◈ .idol
  ◈ .vampire
  ◈ .gun
  ◈ .maid
  ◈ .bra
  ◈ .nobra
  ◈ .bikini
  ◈ .whitehair
  ◈ .blonde
  ◈ .pinkhair
  ◈ .bed
  ◈ .ponytail
  ◈ .nude
  ◈ .dress
  ◈ .underwear
  ◈ .foxgirl
  ◈ .uniform
  ◈ .skirt
  ◈ .sex
  ◈ .sex2
  ◈ .sex3
  ◈ .breast
  ◈ .twintail
  ◈ .spreadpussy
  ◈ .tears
  ◈ .seethrough
  ◈ .breasthold
  ◈ .drunk
  ◈ .fateseries
  ◈ .spreadlegs
  ◈ .openshirt
  ◈ .headband
  ◈ .food
  ◈ .close
  ◈ .tree
  ◈ .nipples
  ◈ .erectnipples
  ◈ .horns
  ◈ .greenhair
  ◈ .wolfgirl
  ◈ .catgirl
  ◈ .nsfw
  ◈ .ass
  ◈ .boobs
  ◈ .lesbian
  ◈ .pussy
  ◈ .pack
  ◈ .xvid
  ◈ .xnxx
  ╰─────────❍` //
      break
    case 'logomenu':
      lkr = `
  ╭───『 *Maker* 』─❍
  ◈ .blur
  ◈ .difuminar2
  ◈ .hornycard
  ◈ .hornylicense
  ◈ .gfx1
  ◈ .gfx2
  ◈ .gfx3
  ◈ .gfx4
  ◈ .gfx5
  ◈ .gfx6
  ◈ .gfx7
  ◈ .gfx8
  ◈ .gfx9
  ◈ .gfx10
  ◈ .gfx11
  ◈ .gfx12
  ◈ .simpcard
  ◈ .itssostupid
  ◈ .iss
  ◈ .stupid
  ◈ .tweet <comment>
  ◈ .lolicon
  ◈ .ytcomment <comment>
  ╰─────────❍` //
      break
    default:
      lkr = `Invalid command. Type ${usedPrefix}list to see available options.`
  }

  conn.sendFile(m.chat, pp, 'perfil.jpg', lkr, m, false, { mentions: [who] })

  let done = '👍'
  m.react(done)
}

handler.help = [
  'list',
  'aimenu',
  'animemenu',
  'aeditor',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloadermenu',
  'economymenu',
  'funmenu',
  'gamemenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'toolmenu',
]
handler.tags = ['main']
handler.command = [
  'list',
  'aimenu',
  'animemenu',
  'aeditor',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloadermenu',
  'economymenu',
  'funmenu',
  'gamemenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'toolmenu',
]

export default handler
