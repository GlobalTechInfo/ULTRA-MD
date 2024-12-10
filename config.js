import { watchFile, unwatchFile } from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

const defaultOwner = '923103863856';


// Check for the OWNERS environment variable; if not found, use the default
const ownervb = process.env.OWNERS || process.env.OWNER_NUMBER || 'your number';  // put your number here

const ownerlist = ownervb.split(';');

global.owner = [];
for (let i = 0; i < ownerlist.length; i++) {
    global.owner.push([ownerlist[i], true]);
}
//
global.botname = process.env.BOTNAME || 'ULTRA-MD';
global.pairingNumber = process.env.BOT_NUMBER || '923103863856';  // put your number here
global.SESSION_ID = process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUFScWVWMUtrSlR2aWJHZUNaS2xrS3RsSEw2bW9LNmVmRGFjOHU2RmxuOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNTV2endodnVRR0toYU5OUUJQazdVOHd4UUxnbmJOcmhLUVY5WXJIZ1oxYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSzhzK0I4bXJ3S2ZVZUtEY3FlYUI0STlIRWVoYmFObVRMZm5MTzE2c0hJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJSRUsvbHY4V1dac2RIdnhxRExXaFJoV2RmczNuZmM3YjZHc2RyR0tCL1E0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhMSU0reWdqWHFHUk5vT3FnQnR6YWlFZjU2eHRHY04zaEd3bHloYWI4a2M9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZBdVpwT1pHU2g3Tzc5U1l1NTF4UEJFc1lmclNGcmZ3eHJheDU0dkNKRFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0w2Q3BhbXFzdVYwYlZrSHE3blZWWXNiSFFqaGFyWktFNE44MmxXSGRXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0gwNjBvb05GQ0dFRXozdG5sTTFhd3pLUUYyaFp2RG9BdlArcGk1dFlqMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImROTHMyQm10VDJOUkZRczFmSmNwV1F4M3pTMnVSN3BoSWZXZnBWR21hZWcxY28yV1RpYU9TdklWTXJReGlsalMzbHYvSmRiSzExWjR5N29GN21pQ0NBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJZYkVRWHBZT04zWFg2ZkQ5UjdMTUpDYVFxQk1HaU5EQ1NhYncreENIK3lNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJORkJKWjZFRiIsIm1lIjp7ImlkIjoiOTIzMTAzODYzODU2OjE4QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQzMDk1MzE2NzY2Nzc5OjE4QGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFNJeXJZSEVKR0o0N29HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiYXdPYnY2VWN4L3Q4bnVlSjVJRGVyMjllQjZOZkJEc1R0WVRHYnVlck1rbz0iLCJhY2NvdW50U2lnbmF0dXJlIjoiTUpWTWVRMG5zRVJUdE5mNGxPZnlCRHlHTlBaejlSRVlWMkVaOXdBaDF1VzhxVkdmYmh5MEJvK1dGcldncUZtd2cxZitZQ0ZSeWlIaVRiV0FSMW45QWc9PSIsImRldmljZVNpZ25hdHVyZSI6ImpEOHJ5SkJ6Q2ZaajhlelBEYUpWSkdxZ0J6N08xb0FTVHpNU1M1M1EwNUtrVUpvYzFMRFJES3lYVkV5VktISHY1d21VT3NBaCtGWlZFbWlTMEdpSER3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzMTAzODYzODU2OjE4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldzRG03K2xITWY3Zko3bmllU0EzcTl2WGdlalh3UTdFN1dFeG03bnF6SksifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlDQT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzg3MDc1MCwibGFzdFByb3BIYXNoIjoiVHJEQzkiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUpFWiJ9';  // put your session id h
global.mods = []
global.prems = []
global.allowed = ['923444844060', '923051391007']
global.keysZens = ['c2459db922', '37CC845916', '6fb0eff124']
global.keysxxx = keysZens[Math.floor(keysZens.length * Math.random())]
global.keysxteammm = [
  '29d4b59a4aa687ca',
  '5LTV57azwaid7dXfz5fzJu',
  'cb15ed422c71a2fb',
  '5bd33b276d41d6b4',
  'HIRO',
  'kurrxd09',
  'ebb6251cc00f9c63',
]
global.keysxteam = keysxteammm[Math.floor(keysxteammm.length * Math.random())]
global.keysneoxrrr = ['5VC9rvNx', 'cfALv5']
global.keysneoxr = keysneoxrrr[Math.floor(keysneoxrrr.length * Math.random())]
global.lolkeysapi = ['GataDios']

global.canal = 'https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07'


global.APIs = {
  // API Prefix
  // name: 'https://website'
  xteam: 'https://api.xteam.xyz',
  dzx: 'https://api.dhamzxploit.my.id',
  lol: 'https://api.lolhuman.xyz',
  violetics: 'https://violetics.pw',
  neoxr: 'https://api.neoxr.my.id',
  zenzapis: 'https://zenzapis.xyz',
  akuari: 'https://api.akuari.my.id',
  akuari2: 'https://apimu.my.id',
  nrtm: 'https://fg-nrtm.ddns.net',
  bg: 'http://bochil.ddns.net',
  fgmods: 'https://api.fgmods.xyz',
}
global.APIKeys = {
  // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://api.lolhuman.xyz': '85faf717d0545d14074659ad',
  'https://api.neoxr.my.id': `${keysneoxr}`,
  'https://violetics.pw': 'beta',
  'https://zenzapis.xyz': `${keysxxx}`,
  'https://api.fgmods.xyz': 'm2XBbNvz',
}

// Sticker WM
global.premium = 'true'
global.packname = 'GLOBAL-MD'
global.author = 'GlobalTechInfo'
global.menuvid = 'https://i.imgur.com/2U2K9YA.mp4'
global.igfg = ' Follow on Instagram\nhttps://www.instagram.com/global.techinfo'
global.dygp = 'https://whatsapp.com/channel/0029VagJIAr3bbVBCpEkAM07'
global.fgsc = 'https://github.com/GlobalTechInfo/ULTRA-MD'
global.fgyt = 'https://youtube.com/@GlobalTechInfo'
global.fgpyp = 'https://youtube.com/@GlobalTechInfo'
global.fglog = 'https://i.ibb.co/G2dh9cB/qasim.jpg'
global.thumb = fs.readFileSync('./assets/qasim.jpg')

global.wait = '⏳'
global.rwait = '⏳'
global.dmoji = '🤭'
global.done = '✅'
global.error = '❌'
global.xmoji = '🤩'

global.multiplier = 69
global.maxwarn = '3'

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
