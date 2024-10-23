import db from '../lib/database.js';
import { execSync } from 'child_process';
import fs from 'fs';

let handler = async (m, { conn, text }) => {
  // Ensure that the command is executed by the owner
  if (conn.user.jid == conn.user.jid) {
    // Execute the git pull command
    let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
    // Reload all plugins
    fs.readdirSync('plugins').forEach(v => global.reload('', v));
    // Reply with the output of the git command
    conn.reply(m.chat, stdout.toString(), m);
  }
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'actualizar', 'fix', 'fixed'];
handler.rowner = true;

export default handler;
