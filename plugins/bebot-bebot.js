import pkg from '@whiskeysockets/baileys';
const {
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageRetryMap,
    makeCacheableSignalKeyStore,
    jidNormalizedUser,
    PHONENUMBER_MCC
} = pkg;

import moment from 'moment-timezone';
import NodeCache from 'node-cache';
import readline from 'readline';
import crypto from 'crypto';
import fs from 'fs';
import pino from 'pino';
import * as ws from 'ws';
const { CONNECTING } = ws;
import { Boom } from '@hapi/boom';
import { makeWASocket } from '../lib/simple.js';

if (global.conns instanceof Array) console.log();
else global.conns = [];

let handler = async (m, { conn: _conn, args, usedPrefix, command, isOwner }) => {
    let parent = args[0] && args[0] === 'plz' ? _conn : await global.conn;
    if (!((args[0] && args[0] === 'plz') || (await global.conn).user.jid === _conn.user.jid)) {
        throw `📌 ${mssg.nobbot}\n\n wa.me/${global.conn.user.jid.split`@`[0]}?text=${usedPrefix}botclone`;
    }

    let isInit = false; // Declare isInit here

    async function bbts() {
        let authFolderB = crypto.randomBytes(10).toString('hex').slice(0, 8);

        if (!fs.existsSync("./bebots/" + authFolderB)) {
            fs.mkdirSync("./bebots/" + authFolderB, { recursive: true });
        }
        if (args[0]) {
            fs.writeFileSync("./bebots/" + authFolderB + "/creds.json", JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t'));
        }

        const { state, saveState, saveCreds } = await useMultiFileAuthState(`./bebots/${authFolderB}`);
        const msgRetryCounterCache = new NodeCache();
        const { version } = await fetchLatestBaileysVersion();
        let phoneNumber = m.sender.split('@')[0];

        const methodCode = !!phoneNumber || process.argv.includes("code");
        const MethodMobile = process.argv.includes("mobile");

        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

        const connectionOptions = {
            logger: pino({ level: 'silent' }),
            printQRInTerminal: false,
            mobile: MethodMobile,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
            },
            markOnlineOnConnect: true,
            generateHighQualityLinkPreview: true,
            getMessage: async (clave) => {
                let jid = jidNormalizedUser(clave.remoteJid);
                let msg = await store.loadMessage(jid, clave.id);
                return msg?.message || "";
            },
            msgRetryCounterCache,
            defaultQueryTimeoutMs: undefined,
            version
        };

        let conn = makeWASocket(connectionOptions);

        if (methodCode && !conn.authState.creds.registered) {
            if (!phoneNumber) {
                process.exit(0);
            }
            let cleanedNumber = phoneNumber.replace(/[^0-9]/g, '');
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
            if (!Object.keys(PHONENUMBER_MCC).some(v => cleanedNumber.startsWith(v))) {
                process.exit(0);
            }

            setTimeout(async () => {
                let codeBot = await conn.requestPairingCode(cleanedNumber);
                codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot;

                parent.sendMessage(m.chat, { text: `➤ Code: *${codeBot}*\n\nUse this code to become a Bot:\n\n1. Click on the three dots in the top right corner.\n2. Tap on Linked Devices.\n3. Select *Link with Phone Number*\n\n*Note:* The code is only valid for this number.` }, { quoted: m });

                rl.close();
            }, 3000);
        }

        async function connectionUpdate(update) {
            const { connection, lastDisconnect, isNewLogin } = update;
            if (isNewLogin) isInit = true;

            const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode;
            if (code && code !== DisconnectReason.loggedOut && conn?.ws.socket == null) {
                let i = global.conns.indexOf(conn);
                if (i < 0) return console.log(await creloadHandler(true).catch(console.error));
                delete global.conns[i];
                global.conns.splice(i, 1);

                if (code !== DisconnectReason.connectionClosed) {
                    parent.sendMessage(conn.user.jid, { text: `⚠️ ${mssg.recon}` }, { quoted: m });
                } else {
                    parent.sendMessage(m.chat, { text: `⛔ ${mssg.sesClose}` }, { quoted: m });
                }
            }
            if (connection === 'open') {
                conn.isInit = true;
                global.conns.push(conn);
                await parent.sendMessage(m.chat, { text: args[0] ? `✅ ${mssg.connet}` : `✅ ${mssg.connID}` }, { quoted: m });
                await sleep(5000);
                if (args[0]) return;
                await parent.sendMessage(conn.user.jid, { text: `✅ ${mssg.connMsg}` }, { quoted: m });
                parent.sendMessage(conn.user.jid, { text: usedPrefix + command + " " + Buffer.from(fs.readFileSync("./bebots/" + authFolderB + "/creds.json"), "utf-8").toString("base64") }, { quoted: m });
            }
        }

        setInterval(async () => {
            if (!conn.user) {
                try { conn.ws.close(); } catch { }
                conn.ev.removeAllListeners();
                let i = global.conns.indexOf(conn);
                if (i < 0) return;
                delete global.conns[i];
                global.conns.splice(i, 1);
            }
        }, 60000);

        let handler = await import('../handler.js');
        let creloadHandler = async function (restatConn) {
            try {
                const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error);
                if (Object.keys(Handler || {}).length) handler = Handler;
            } catch (e) {
                console.error(e);
            }
            
            if (restatConn) {
                try { conn.ws.close(); } catch { }
                conn.ev.removeAllListeners();
                conn = makeWASocket(connectionOptions);
                isInit = true; // Update isInit when restarting
            }

            if (!isInit) {
                // Only remove listeners if they were set
                if (conn.handler) {
                    conn.ev.off('messages.upsert', conn.handler);
                }
                if (conn.participantsUpdate) {
                    conn.ev.off('group-participants.update', conn.participantsUpdate);
                }
                if (conn.groupsUpdate) {
                    conn.ev.off('groups.update', conn.groupsUpdate);
                }
                if (conn.onDelete) {
                    conn.ev.off('message.delete', conn.onDelete);
                }
                if (conn.onCall) {
                    conn.ev.off('call', conn.onCall);
                }
                if (conn.connectionUpdate) {
                    conn.ev.off('connection.update', conn.connectionUpdate);
                }
                if (conn.credsUpdate) {
                    conn.ev.off('creds.update', conn.credsUpdate);
                }
            }

            // Setup handlers
            conn.welcome = global.conn.welcome + '';
            conn.bye = global.conn.bye + '';
            conn.spromote = global.conn.spromote + '';
            conn.sdemote = global.conn.sdemote + '';

            conn.handler = handler.handler.bind(conn);
            conn.participantsUpdate = handler.participantsUpdate.bind(conn);
            conn.groupsUpdate = handler.groupsUpdate.bind(conn);
            conn.onDelete = handler.deleteUpdate.bind(conn);
            conn.connectionUpdate = connectionUpdate.bind(conn);
            conn.credsUpdate = saveCreds.bind(conn, true);

            conn.ev.on('messages.upsert', conn.handler);
            conn.ev.on('group-participants.update', conn.participantsUpdate);
            conn.ev.on('groups.update', conn.groupsUpdate);
            conn.ev.on('message.delete', conn.onDelete);
            conn.ev.on('connection.update', conn.connectionUpdate);
            conn.ev.on('creds.update', conn.credsUpdate);
            isInit = false; // Reset isInit after setup
            return true;
        }
        creloadHandler(false);
    }
    bbts();
}

handler.help = ['botclone'];
handler.tags = ['bebot'];
handler.command = ['bebot', 'serbot', 'jadibot', 'botclone', 'clonebot', 'rent', 'rentbot'];
handler.rowner = false;

export default handler;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
	}
