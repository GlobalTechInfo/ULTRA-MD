let handler = async (m, { conn, usedPrefix, command }) => {
  let who = m.quoted
    ? m.quoted.sender
    : m.mentionedJid && m.mentionedJid[0]
      ? m.mentionedJid[0]
      : m.fromMe
        ? conn.user.jid
        : m.sender
  if (!(who in global.db.data.users)) throw `✳️ The user is not found in my database`

  let pp = './assets/Ultra.jpg'
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
        'aeditor* - Tune The Mp3/Audio As You Wish.\n\n' +
         '🎉 *' +
        usedPrefix +
        'animemenu* - Animated Images,Stickers and Videos.\n\n' +
         '🪁 *' +
        usedPrefix +
        'infoanime* - Full Information About Animes Like imdb.\n\n' +
        '💡 *' +
        usedPrefix +
        'imagen* - Create Images and designs based on your thoughts/prompts.\n\n' +
        '🃏 *' +
        usedPrefix +
        'randompic* - Random Images you might like and love.\n\n' +
        '🎥 *' +
        usedPrefix +
        'randomvid* - Random Videos you might like and love.\n\n' +
        '🖍️ *' +
        usedPrefix +
        'fancy* - Fancy text generator Menu.\n\n' + 
        '🖌️ *' +
        usedPrefix +
        'fancy2* - Will Create Images With Fancy Text.' 
        break

    case 'botmenu':
      lkr = `
╭───『 *Bot* 』─❍
◈ •quran
◈ •gita
◈ •ping
◈ •uptime
◈ •alive
◈ •language
◈ •server
◈ •rentbot
◈ •listrent
◈ •stoprent
◈ •botinfo
◈ •owner
◈ •script
◈ •speedtest
◈ •runtime
◈ •menu
◈ •menu2
◈ •menu3
◈ •menu4
◈ •donate
◈ •groups
◈ •blocklist
◈ •listprem
◈ •list
◈ •mrcs
◈ © GlobalTechInfo
╰─────────❍` // Your bot menu message here
      break
      case 'aimenu':
      lkr=`
 ╭───『 *AI* 』─❍
 ◈ •chatgpt
 ◈ •googleit
 ◈ •blackbox
 ◈ •gpt4
 ◈ •travel
 ◈ •blackpink
 ◈ •image
 ◈ •google
 ◈ •bro
 ◈ •ai
 ╰─────────❍` //
 break
      case 'imagen':
      case 'imagenai':
      lkr=`
 ╭───『 *Imagen* 』─❍
 ◈ •hercai-lexica
 ◈ •hercai-raava
 ◈ •hercai-shonin
 ◈ •hercai-cartoon
 ◈ •hercai-animefy
 ◈ •hercai-prodia
 ◈ •hercai-simurg
 ◈ •photoleap
 ◈ •realistic
 ◈ •dalle
 ╰─────────❍` //
 break
    case 'ownermenu':
      lkr = `
╭───『 *Owner* 』─❍
◈ •enable
◈ •banchat
◈ •unbanchat
◈ •banuser
◈ •unbanuser
◈ •broadcast
◈ •broadcastgc
◈ •readviewonce
◈ •setprivacy
◈ •setppbot
◈ •setprefix
◈ •resetprefix
◈ •getfile
◈ •getplugin
◈ •plugins
◈ •install
◈ •remove
◈ •savecontact
◈ •fakereply
◈ •delcmd
◈ •listcmd
◈ •getmsg
◈ •addprem
◈ •delprem
◈ •addsudo
◈ •delsudo
◈ •addowner
◈ •delowner
◈ •allvars
◈ •broadcast
◈ •fullpp
◈ •inspect
◈ •cleartmp
◈ •clearchat
◈ •restart
◈ •savefile
◈ •logout
◈ •unban
◈ •update
◈ •intro
◈ •ban
◈ •afk
◈ •save
◈ •allow
◈ •listban
◈ •join
╰─────────❍` //
      break
      case 'randompic':
      lkr = `
╭───『 *RandomPic* 』─❍
◈ •chinese
◈ •malaysia
◈ •hijab
◈ •japanese
◈ •korean
◈ •malay
◈ •random
◈ •random2
◈ •thai
◈ •vietnamese
◈ •indo
◈ •girl
◈ •person
◈ •boneka
◈ •blackpink3
◈ •bike
◈ •antiwork
◈ •aesthetic
◈ •justina
◈ •doggo
◈ •cat
◈ •cosplay2
◈ •car
◈ •profile2
◈ •notnot
◈ •kpop
◈ •kayes
◈ •ulzzanggirl
◈ •ulzzangboy
◈ •ryujin
◈ •pubg
◈ •wallml
◈ •wallhp
╰─────────❍` //
      break
      case 'randomvid':
      lkr = `
╭───『 *RandomVid* 』─❍
◈ •tiktokgirl
◈ •tiktokghea
◈ •tiktokbocil
◈ •tiktoknukhty
◈ •tiktoksantuy
◈ •tiktokkayes
◈ •tiktokpanrika
◈ •tiktoknotnot
╰─────────❍` //
      break
    case 'groupmenu':
      lkr = `
╭───『 *Group* 』─❍
◈ •kick
◈ •promote
◈ •demote
◈ •groupinfo
◈ •getjids
◈ •resetlink
◈ •antilink
◈ •link
◈ •setpp
◈ •setname
◈ •setdesc
◈ •setwelcome
◈ •setbye
◈ •hidetag
◈ •tagall
◈ •totag
◈ •notify
◈ •delwarn
◈ •warn
◈ •unwarn
◈ •warns
◈ •add
◈ •delete
◈ •group
◈ •enable
◈ •disable
◈ •toxic
◈ •ship
◈ •register
◈ •unreg
◈ •mysn
◈ •poll
◈ •simulate
◈ •admins
╰─────────❍` //
      break
    case 'downloadermenu':
    case 'dlmenu':
    case 'downloads':
      lkr = `
╭───『 *Download* 』─❍
◈ •likee
◈ •pinterest
◈ •threads
◈ •capcut
◈ •itunes
◈ •playvid
◈ •play
◈ •playvid2
◈ •play2
◈ •play5
◈ •mega
◈ •ytsearch
◈ •ytmp3 
◈ •ytmp4
◈ •gdrive
◈ •gitclone 
◈ •twitter
◈ •tiktok
◈ •tiktokstalk
◈ •insta
◈ •igstory
◈ •igstalk
◈ •facebook
◈ •wallpapers
◈ •swdl
◈ •dlstatus
╰─────────❍` //
      break
    case 'economymenu':
    case 'economy':
      lkr = `
╭───『 *Economy* 』─❍
◈ •claim/daily
◈ •weekly
◈ •monthly
◈ •wallet
◈ •withdraw
◈ •leaderboard
◈ •levelup
◈ •addxp
◈ •buych
◈ •buyall
◈ •addgold
◈ •bank
◈ •deposit
◈ •give
◈ •bet
◈ •heal
◈ •craft
◈ •balance
◈ •shop
◈ •sell
◈ •rob
◈ •adventure
◈ •opencrate
◈ •mine
◈ •work
◈ •transfer
◈ •todiamond
◈ •tomoney
╰────────❍ ` //
      break
    case 'funmenu':
      lkr = `
╭───『 *Fun* 』─❍
◈ •character
◈ •truth
◈ •dare
◈ •hack
◈ •flirt
◈ •gay
◈ •shayeri
◈ •ship
◈ •waste
◈ •alexa
◈ •simpcard
◈ •hornycard
◈ •ytcomment
◈ •stupid
◈ •lolicon
╰─────────❍` //
      break
    case 'animemenu':
      lkr = `
╭───『 *Anime* 』─❍
◈ •waifu
◈ •neko
◈ •loli
◈ •couplepp
◈ •toanime
◈ •naruto
◈ •itachi
◈ •akira
◈ •asuna
◈ •akiyama
◈ •boruto
◈ •hornycard
◈ •ayuzawa
◈ •anna
◈ •chiho
◈ •chitoge
◈ •deidara
◈ •erza
◈ •elaina
◈ •emilia
◈ •hestia
◈ •hinata
◈ •inori
◈ •isuzu
◈ •kagura
◈ •kaori
◈ •keneki
◈ •kurumi
◈ •madara
◈ •mikasa
◈ •miku
◈ •minato
◈ •nezuko
◈ •sagiri
◈ •sasuke
◈ •sakura
◈ •kotori
╰─────────❍` //
      break
      case 'infoanime':
      lkr = `
╭───『 *Info Anime* 』─❍
◈ •anime waifu
◈ •anime neko
◈ •anime loli
◈ •anime naruto
◈ •anime itachi
◈ •anime akira
◈ •anime asuna
◈ •anime akiyama
◈ •anime boruto
◈ •anime ayuzawa
◈ •anime anna
◈ •anime chiho
◈ •anime chitoge
◈ •anime deidara
◈ •anime erza
◈ •anime elaina
◈ •anime emilia
◈ •anime hestia
◈ •anime hinata
◈ •anime inori
◈ •anime isuzu
◈ •anime kagura
◈ •anime kaori
◈ •anime keneki
◈ •anime kurumi
◈ •anime madara
◈ •anime mikasa
◈ •anime miku
◈ •anime minato
◈ •anime nezuko
◈ •anime sagiri
◈ •anime sasuke
◈ •anime sakura
◈ •anime kotori
╰─────────❍` //
      break
    case 'gamemenu':
    case 'gamesmenu':
      lkr = `
╭───『 *Game* 』─❍
◈ •tictactoe
◈ •delttt
◈ •chess
◈ •math
◈ •math answer
◈ •ppt
◈ •slot
◈ •cock-fight
◈ •roulette
◈ •casino
◈ •guessflag
◈ •fhint
╰─────────❍` //
      break
    case 'stickermenu':
      lkr = `
╭───『 *Sticker* 』─❍
◈ •s
◈ •tenor
◈ •take
◈ •scircle
◈ •smaker
◈ •removebg
◈ •smeme
◈ •trigger
◈ •getsticker
◈ •tgsticker
◈ •emojimix
◈ •toimg
◈ •tovid
◈ •quoted
◈ •rc
◈ •ttp
◈ •ttp2
◈ •attp
◈ •attp2
◈ •attp3
◈ Add remove bg key First
╰─────────❍` //
      break
    case 'toolmenu':
    case 'toolsmenu':
      lkr = `
╭───『 *Tools* 』─❍
◈ •autosticker
◈ •topdf
◈ •whatmusic
◈ •filelength
◈ •tempmail
◈ •checkmail
◈ •course
◈ •calc
◈ •google
◈ •googleit
◈ •linux
◈ •imdb
◈ •reddit
◈ •lyrics
◈ •readmore
◈ •ssweb
◈ •carbon
◈ •element
◈ •translate
◈ •tourl
◈ •trace
◈ •wikipedia
◈ •nowa
◈ •qrmaker
◈ •readqr
◈ •fancy
◈ •fancy2
◈ •weather
◈ •tocartoon
◈ •quote
◈ •technews
◈ •define
◈ •itunes
◈ •pokedex
◈ •removebg
◈ •tinyurl/shorturl
◈ •readvo
◈ •true
◈ •wa
◈ •pokedex
◈ •voz
◈ •remini
◈ •enhance
╰─────────❍` //
break
case 'aeditor':
case 'audioeditor':
lkr=`
╭───『 *Audio* 』─❍
◈ •bass
◈ •blown
◈ •deep
◈ •earrape
◈ •fast
◈ •nightcore
◈ •reverse
◈ •robot
◈ •slow
◈ •smooth
◈ •tupai
◈ •squirrel
◈ •chipmunk
╰─────────❍` //
      break
    case 'nsfwmenu': 
      lkr = `
  ╭───『 *Nsfw* 』─❍
  ◈ •genshin
  ◈ •swimsuit
  ◈ •schoolswimsuit
  ◈ •white
  ◈ •barefoot
  ◈ •touhou
  ◈ •gamecg
  ◈ •hololive
  ◈ •uncensored
  ◈ •sunglasses
  ◈ •glasses
  ◈ •weapon
  ◈ •shirtlift
  ◈ •chain
  ◈ •fingering
  ◈ •flatchest
  ◈ •torncloth
  ◈ •bondage
  ◈ •demon
  ◈ •wet
  ◈ •pantypull
  ◈ •headdress
  ◈ •headphone
  ◈ •tie
  ◈ •anusview
  ◈ •shorts
  ◈ •stokings
  ◈ •topless
  ◈ •beach
  ◈ •bunnygirl
  ◈ •bunnyear
  ◈ •idol
  ◈ •vampire
  ◈ •gun
  ◈ •maid
  ◈ •bra
  ◈ •nobra
  ◈ •bikini
  ◈ •whitehair
  ◈ •blonde
  ◈ •pinkhair
  ◈ •bed
  ◈ •ponytail
  ◈ •nude
  ◈ •dress
  ◈ •underwear
  ◈ •foxgirl
  ◈ •uniform
  ◈ •skirt
  ◈ •sex
  ◈ •sex2
  ◈ •sex3
  ◈ •breast
  ◈ •twintail
  ◈ •spreadpussy
  ◈ •tears
  ◈ •seethrough
  ◈ •breasthold
  ◈ •drunk
  ◈ •fateseries
  ◈ •spreadlegs
  ◈ •openshirt
  ◈ •headband
  ◈ •food
  ◈ •close
  ◈ •tree
  ◈ •nipples
  ◈ •erectnipples
  ◈ •horns
  ◈ •greenhair
  ◈ •wolfgirl
  ◈ •catgirl
  ◈ •nsfw
  ◈ •ass
  ◈ •boobs
  ◈ •lesbian
  ◈ •pussy
  ◈ •pack
  ◈ •xvid
  ◈ •xnxx
  ╰─────────❍` //
      break
    case 'logomenu':
    case 'makermenu':
      lkr = `
  ╭───『 *Maker* 』─❍
  ◈ •blur
  ◈ •enhance
  ◈ •difuminar2
  ◈ •hornycard
  ◈ •hornylicense
  ◈ •gfx1
  ◈ •gfx2
  ◈ •gfx3
  ◈ •gfx4
  ◈ •gfx5
  ◈ •gfx6
  ◈ •gfx7
  ◈ •gfx8
  ◈ •gfx9
  ◈ •gfx10
  ◈ •gfx11
  ◈ •gfx12
  ◈ •simpcard
  ◈ •itssostupid
  ◈ •iss
  ◈ •stupid
  ◈ •tweet <comment>
  ◈ •lolicon
  ◈ •ytcomment <comment>
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
  'imagen',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]
handler.tags = ['main']
handler.command = [
  'list',
  'aimenu',
  'imagen',
  'imagenai',
  'animemenu',
  'aeditor',
  'audioeditor',
  'infoanime',
  'botmenu',
  'ownermenu',
  'groupmenu',
  'dlmenu',
  'downloads',
  'downloadermenu',
  'economymenu',
  'economy',
  'funmenu',
  'gamemenu',
  'gamesmenu',
  'stickermenu',
  'nsfwmenu',
  'logomenu',
  'makermenu',
  'randompic',
  'randomvid',
  'toolsmenu',
  'toolmenu',
]

export default handler
