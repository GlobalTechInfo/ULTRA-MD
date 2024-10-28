const handler = async (m, { conn, args, usedPrefix, command }) => {
  // Only proceed if the command pattern is matched
  if (!command) return;

  if ("status@broadcast" != m.quoted?.chat) throw "Quote Status message to download.";
  try {
    let buffer = await m.quoted?.download();
    await conn.sendFile(m.chat, buffer, "", m.quoted?.text || "", m, false, {
      quoted: m
    });
  } catch (e) {
    console.log(e);
    await conn.reply(m.chat, m.quoted?.text || "Error downloading status", m);
  }
};

handler.help = ["downloadsw"];
handler.tags = ["tools"];
handler.command = /^((sw|status)(dl|download)|(dl|download)(sw|status))$/i;

export default handler;
