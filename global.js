process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'

import dotenv from 'dotenv'
import { existsSync, readFileSync, readdirSync, unlinkSync, watch } from 'fs'
import { createRequire } from 'module'
import path, { join } from 'path'
import { platform } from 'process'
import { fileURLToPath, pathToFileURL } from 'url'
import * as ws from 'ws'
import CheckSessionID from './lib/makesession.js'
import clearTmp from './lib/tempclear.js'
global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix
    ? /file:\/\/\//.test(pathURL)
      ? fileURLToPath(pathURL)
      : pathURL
    : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}
global.gurubot = 'https://www.guruapi.tech/api'

import chalk from 'chalk'
import { spawn } from 'child_process'
import lodash from 'lodash'
import { JSONFile, Low } from 'lowdb'
import NodeCache from 'node-cache'
import { default as Pino, default as pino } from 'pino'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import yargs from 'yargs'
import CloudDBAdapter from './lib/cloudDBAdapter.js'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import { makeWASocket, protoType, serialize } from './lib/simple.js'

const {
  DisconnectReason,
  useMultiFileAuthState,
  MessageRetryMap,
  fetchLatestWaWebVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
  proto,
  delay,
  jidNormalizedUser,
} = await (
  await import('@whiskeysockets/baileys')
).default

import readline from 'readline'

dotenv.config()

async function main() {
  const txt = global.SESSION_ID

  if (!txt) {
    console.error('Environment variable not found.')
    return
  }

  try {
    await CheckSessionID(txt)
    console.log('SessionID Check Completed.')
  } catch (error) {
    console.error('Error:', error)
  }
}

main()

await delay(1000 * 10)


const pairingCode = !!global.pairingNumber || process.argv.includes('--pairing-code')
const useQr = process.argv.includes('--qr')
const useStore = true

const MAIN_LOGGER = pino({ timestamp: () => `,"time":"${new Date().toJSON()}"` })

const logger = MAIN_LOGGER.child({})
logger.level = 'fatal'

const store = useStore ? makeInMemoryStore({ logger }) : undefined
store?.readFromFile('./session.json')

setInterval(() => {
  store?.writeToFile('./session.json')
}, 10000 * 6)

const msgRetryCounterCache = new NodeCache()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const question = text => new Promise(resolve => rl.question(text, resolve))

const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.API = (name, path = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) +
  path +
  (query || apikeyqueryname
    ? '?' +
      new URLSearchParams(
        Object.entries({
          ...query,
          ...(apikeyqueryname
            ? {
                [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name],
              }
            : {}),
        })
      )
    : '')
global.timestamp = {
  start: new Date(),
}

const __dirname = global.__dirname(import.meta.url)
global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp(
  '^[' +
    (process.env.PREFIX || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-.@').replace(
      /[|\\{}()[\]^$+*?.\-\^]/g,
      '\\$&'
    ) +
    ']'
)
global.opts['db'] = process.env.DATABASE_URL


global.db = new Low(
  /https?:\/\//.test(opts['db'] || '') ?
    new cloudDBAdapter(opts['db']) : /mongodb(\+srv)?:\/\//i.test(opts['db']) ?
      (opts['mongodbv2'] ? new mongoDBV2(opts['db']) : new mongoDB(opts['db'])) :
      new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`)
)


global.DATABASE = global.db 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
    if (!global.db.READ) {
      clearInterval(this)
      resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
    }
  }, 1 * 1000))
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {})
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()
global.authFolder = `temp`
const { state, saveCreds } = await useMultiFileAuthState(global.authFolder)
//let { version, isLatest } = await fetchLatestWaWebVersion()

const connectionOptions = {
  version: [2, 3000, 1015901307],
  logger: Pino({
    level: 'fatal',
  }),
  printQRInTerminal: !pairingCode,
  browser: ["Ubuntu", "Chrome", "20.0.04"],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(
      state.keys,
      Pino().child({
        level: 'fatal',
        stream: 'store',
      })
    ),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async key => {
    let jid = jidNormalizedUser(key.remoteJid)
    let msg = await store.loadMessage(jid, key.id)
    return msg?.message || ''
  },
  patchMessageBeforeSending: message => {
    const requiresPatch = !!(
      message.buttonsMessage ||
      message.templateMessage ||
      message.listMessage
    )
    if (requiresPatch) {
      message = {
        viewOnceMessage: {
          message: {
            messageContextInfo: {
              deviceListMetadataVersion: 2,
              deviceListMetadata: {},
            },
            ...message,
          },
        },
      }
    }

    return message
  },
  msgRetryCounterCache,
  defaultQueryTimeoutMs: undefined,
  syncFullHistory: false,
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false
store?.bind(conn.ev)

if (pairingCode && !conn.authState.creds.registered) {
  let phoneNumber
  if (!!global.pairingNumber) {
    phoneNumber = global.pairingNumber.replace(/[^0-9]/g, '')
    const PHONENUMBER_MCC = {
    '93': 'Afghanistan',
    '355': 'Albania',
    '213': 'Algeria',
    '376': 'Andorra',
    '244': 'Angola',
    '1': 'Antigua and Barbuda',
    '54': 'Argentina',
    '374': 'Armenia',
    '297': 'Aruba',
    '61': 'Australia',
    '43': 'Austria',
    '994': 'Azerbaijan',
    '1': 'Bahamas',
    '973': 'Bahrain',
    '880': 'Bangladesh',
    '1': 'Barbados',
    '375': 'Belarus',
    '32': 'Belgium',
    '501': 'Belize',
    '229': 'Benin',
    '1': 'Bermuda',
    '975': 'Bhutan',
    '591': 'Bolivia',
    '387': 'Bosnia and Herzegovina',
    '267': 'Botswana',
    '55': 'Brazil',
    '673': 'Brunei',
    '359': 'Bulgaria',
    '226': 'Burkina Faso',
    '257': 'Burundi',
    '855': 'Cambodia',
    '237': 'Cameroon',
    '1': 'Canada',
    '238': 'Cape Verde',
    '345': 'Cayman Islands',
    '61': 'Central African Republic',
    '236': 'Chad',
    '56': 'Chile',
    '86': 'China',
    '61': 'Christmas Island',
    '57': 'Colombia',
    '269': 'Comoros',
    '682': 'Cook Islands',
    '506': 'Costa Rica',
    '225': 'Ivory Coast',
    '385': 'Croatia',
    '53': 'Cuba',
    '357': 'Cyprus',
    '420': 'Czech Republic',
    '45': 'Denmark',
    '253': 'Djibouti',
    '1': 'Dominica',
    '1809': 'Dominican Republic',
    '593': 'Ecuador',
    '20': 'Egypt',
    '503': 'El Salvador',
    '240': 'Equatorial Guinea',
    '291': 'Eritrea',
    '372': 'Estonia',
    '251': 'Ethiopia',
    '679': 'Fiji',
    '358': 'Finland',
    '33': 'France',
    '241': 'Gabon',
    '220': 'Gambia',
    '995': 'Georgia',
    '49': 'Germany',
    '233': 'Ghana',
    '350': 'Gibraltar',
    '30': 'Greece',
    '299': 'Greenland',
    '1': 'Grenada',
    '590': 'Guadeloupe',
    '1': 'Guam',
    '502': 'Guatemala',
    '224': 'Guinea',
    '245': 'Guinea-Bissau',
    '592': 'Guyana',
    '509': 'Haiti',
    '504': 'Honduras',
    '36': 'Hungary',
    '354': 'Iceland',
    '91': 'India',
    '62': 'Indonesia',
    '964': 'Iraq',
    '98': 'Iran',
    '354': 'Iceland',
    '39': 'Italy',
    '972': 'Israel',
    '1': 'Jamaica',
    '81': 'Japan',
    '962': 'Jordan',
    '7': 'Kazakhstan',
    '254': 'Kenya',
    '686': 'Kiribati',
    '965': 'Kuwait',
    '996': 'Kyrgyzstan',
    '856': 'Laos',
    '371': 'Latvia',
    '961': 'Lebanon',
    '266': 'Lesotho',
    '231': 'Liberia',
    '218': 'Libya',
    '423': 'Liechtenstein',
    '370': 'Lithuania',
    '352': 'Luxembourg',
    '853': 'Macau',
    '389': 'Macedonia',
    '261': 'Madagascar',
    '265': 'Malawi',
    '60': 'Malaysia',
    '960': 'Maldives',
    '223': 'Mali',
    '356': 'Malta',
    '692': 'Marshall Islands',
    '596': 'Martinique',
    '222': 'Mauritania',
    '230': 'Mauritius',
    '262': 'Mayotte',
    '52': 'Mexico',
    '691': 'Micronesia',
    '373': 'Moldova',
    '377': 'Monaco',
    '976': 'Mongolia',
    '382': 'Montenegro',
    '1': 'Montserrat',
    '212': 'Morocco',
    '258': 'Mozambique',
    '95': 'Myanmar',
    '264': 'Namibia',
    '674': 'Nauru',
    '977': 'Nepal',
    '31': 'Netherlands',
    '687': 'New Caledonia',
    '64': 'New Zealand',
    '505': 'Nicaragua',
    '227': 'Niger',
    '234': 'Nigeria',
    '683': 'Niue',
    '850': 'North Korea',
    '47': 'Norway',
    '968': 'Oman',
    '92': 'Pakistan',
    '680': 'Palau',
    '507': 'Panama',
    '675': 'Papua New Guinea',
    '595': 'Paraguay',
    '51': 'Peru',
    '63': 'Philippines',
    '48': 'Poland',
    '351': 'Portugal',
    '1': 'Puerto Rico',
    '974': 'Qatar',
    '40': 'Romania',
    '7': 'Russia',
    '250': 'Rwanda',
    '590': 'Saint Barthélemy',
    '1': 'Saint Helena',
    '758': 'Saint Kitts and Nevis',
    '590': 'Saint Martin',
    '1': 'Saint Vincent and the Grenadines',
    '685': 'Samoa',
    '378': 'San Marino',
    '966': 'Saudi Arabia',
    '221': 'Senegal',
    '381': 'Serbia',
    '248': 'Seychelles',
    '232': 'Sierra Leone',
    '65': 'Singapore',
    '421': 'Slovakia',
    '386': 'Slovenia',
    '677': 'Solomon Islands',
    '252': 'Somalia',
    '27': 'South Africa',
    '82': 'South Korea',
    '34': 'Spain',
    '94': 'Sri Lanka',
    '249': 'Sudan',
    '597': 'Suriname',
    '268': 'Eswatini',
    '46': 'Sweden',
    '41': 'Switzerland',
    '963': 'Syria',
    '886': 'Taiwan',
    '992': 'Tajikistan',
    '255': 'Tanzania',
    '66': 'Thailand',
    '670': 'Timor-Leste',
    '228': 'Togo',
    '676': 'Tonga',
    '1': 'Trinidad and Tobago',
    '216': 'Tunisia',
    '90': 'Turkey',
    '993': 'Turkmenistan',
    '256': 'Uganda',
    '380': 'Ukraine',
    '971': 'United Arab Emirates',
    '44': 'United Kingdom',
    '1': 'United States',
    '598': 'Uruguay',
    '998': 'Uzbekistan',
    '678': 'Vanuatu',
    '58': 'Venezuela',
    '84': 'Vietnam',
    '681': 'Wallis and Futuna',
    '967': 'Yemen',
    '260': 'Zambia',
    '263': 'Zimbabwe',
    // Add more if needed to reach 207
};

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx"))
      )
      process.exit(0)
    }
  } else {
    phoneNumber = await question(
      chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
    )
    phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

    if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
      console.log(
        chalk.bgBlack(chalk.redBright("Start with your country's WhatsApp code, Example : 62xxx"))
      )

      phoneNumber = await question(
        chalk.bgBlack(chalk.greenBright(`Please type your WhatsApp number : `))
      )
      phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
      rl.close()
    }
  }

  setTimeout(async () => {
    let code = await conn.requestPairingCode(phoneNumber)
    code = code?.match(/.{1,4}/g)?.join('-') || code
    const pairingCode =
      chalk.bold.greenBright('Your Pairing Code:') + ' ' + chalk.bgGreenBright(chalk.black(code))
    console.log(pairingCode)
  }, 3000)
}

conn.logger.info('\nWaiting For Login\n')

if (!opts['test']) {
  if (global.db) {
    setInterval(async () => {
      if (global.db.data) await global.db.write()
      if (opts['autocleartmp'] && (global.support || {}).find)
        (tmp = [os.tmpdir(), 'tmp']),
          tmp.forEach(filename =>
            cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])
          )
    }, 30 * 1000)
  }
}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

function runCleanup() {
  clearTmp()
    .then(() => {
      console.log('Temporary file cleanup completed.')
    })
    .catch(error => {
      console.error('An error occurred during temporary file cleanup:', error)
    })
    .finally(() => {
      // 2 minutes
      setTimeout(runCleanup, 1000 * 60 * 2)
    })
}

runCleanup()

function clearsession() {
  let prekey = []
  const directorio = readdirSync('./session')
  const filesFolderPreKeys = directorio.filter(file => {
    return file.startsWith('pre-key-')
  })
  prekey = [...prekey, ...filesFolderPreKeys]
  filesFolderPreKeys.forEach(files => {
    unlinkSync(`./session/${files}`)
  })
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin, qr } = update
  global.stopped = connection

  if (isNewLogin) conn.isInit = true

  const code =
    lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

  if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
    try {
      conn.logger.info(await global.reloadHandler(true))
    } catch (error) {
      console.error('Error reloading handler:', error)
    }
  }

  if (code && (code === DisconnectReason.restartRequired || code === 428)) {
    conn.logger.info(chalk.yellow('\n🌀 Restart Required... Restarting'))
    process.send('reset')
  }

  if (global.db.data == null) loadDatabase()

  if (!pairingCode && useQr && qr !== 0 && qr !== undefined) {
    conn.logger.info(chalk.yellow('\nLogging in....'))
  }

  if (connection === 'open') {
    const { jid, name } = conn.user
    const msg = `*ULTRA-MD Connected* \n\n *Prefix  : [ . ]* \n\n *Plugins : 340* \n\n *SUPPORT BY SUBSCRIBE*
*youtube.com/@GlobalTechInfo*`

    await conn.sendMessage(jid, { text: msg, mentions: [jid] }, { quoted: null })

    conn.logger.info(chalk.yellow('\n👍 R E A D Y'))
  }

  if (connection === 'close') {
    conn.logger.error(chalk.yellow(`\nConnection closed... Get a new session`))
  }
}

process.on('uncaughtException', console.error)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (error) {
    console.error
  }
  if (restatConn) {
    const oldChats = global.conn.chats
    try {
      global.conn.ws.close()
    } catch {}
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, {
      chats: oldChats,
    })
    isInit = true
  }
  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('messages.update', conn.pollUpdate)
    conn.ev.off('group-participants.update', conn.participantsUpdate)
    conn.ev.off('groups.update', conn.groupsUpdate)
    conn.ev.off('message.delete', conn.onDelete)
    conn.ev.off('presence.update', conn.presenceUpdate)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.welcome = ` Hello @user!\n\n🎉 *WELCOME* to the group @group!\n\n📜 Please read the *DESCRIPTION* @desc.`
  conn.bye = `👋GOODBYE @user \n\nSee you later!`
  conn.spromote = `*@user* has been promoted to an admin!`
  conn.sdemote = `*@user* is no longer an admin.`
  conn.sDesc = `The group description has been updated to:\n@desc`
  conn.sSubject = `The group title has been changed to:\n@group`
  conn.sIcon = `The group icon has been updated!`
  conn.sRevoke = ` The group link has been changed to:\n@revoke`
  conn.sAnnounceOn = `The group is now *CLOSED*!\nOnly admins can send messages.`
  conn.sAnnounceOff = `The group is now *OPEN*!\nAll participants can send messages.`
  conn.sRestrictOn = `Edit Group Info has been restricted to admins only!`
  conn.sRestrictOff = `Edit Group Info is now available to all participants!`

  conn.handler = handler.handler.bind(global.conn)
  conn.pollUpdate = handler.pollUpdate.bind(global.conn)
  conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
  conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
  conn.onDelete = handler.deleteUpdate.bind(global.conn)
  conn.presenceUpdate = handler.presenceUpdate.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  const currentDateTime = new Date()
  const messageDateTime = new Date(conn.ev)
  if (currentDateTime >= messageDateTime) {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map(v => v[0])
  } else {
    const chats = Object.entries(conn.chats)
      .filter(([jid, chat]) => !jid.endsWith('@g.us') && chat.isChats)
      .map(v => v[0])
  }

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('messages.update', conn.pollUpdate)
  conn.ev.on('group-participants.update', conn.participantsUpdate)
  conn.ev.on('groups.update', conn.groupsUpdate)
  conn.ev.on('message.delete', conn.onDelete)
  conn.ev.on('presence.update', conn.presenceUpdate)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
  for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }
}
filesInit()
  .then(_ => Object.keys(global.plugins))
  .catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(`\nUpdated plugin - '${filename}'`)
      else {
        conn.logger.warn(`\nDeleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`\nNew plugin - '${filename}'`)
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    })
    if (err) conn.logger.error(`\nSyntax error while loading '${filename}'\n${format(err)}`)
    else {
      try {
        const module = await import(`${global.__filename(dir)}?update=${Date.now()}`)
        global.plugins[filename] = module.default || module
      } catch (e) {
        conn.logger.error(`\nError require plugin '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(
          Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b))
        )
      }
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
  const test = await Promise.all(
    [
      spawn('ffmpeg'),
      spawn('ffprobe'),
      spawn('ffmpeg', [
        '-hide_banner',
        '-loglevel',
        'error',
        '-filter_complex',
        'color',
        '-frames:v',
        '1',
        '-f',
        'webp',
        '-',
      ]),
      spawn('convert'),
      spawn('magick'),
      spawn('gm'),
      spawn('find', ['--version']),
    ].map(p => {
      return Promise.race([
        new Promise(resolve => {
          p.on('close', code => {
            resolve(code !== 127)
          })
        }),
        new Promise(resolve => {
          p.on('error', _ => resolve(false))
        }),
      ])
    })
  )
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  const s = (global.support = {
    ffmpeg,
    ffprobe,
    ffmpegWebp,
    convert,
    magick,
    gm,
    find,
  })
  Object.freeze(global.support)
}

async function saafsafai() {
  if (stopped === 'close' || !conn || !conn.user) return
  clearsession()
  console.log(chalk.cyanBright('\nStored Sessions Cleared'))
}

setInterval(saafsafai, 10 * 60 * 1000)

_quickTest().catch(console.error)
