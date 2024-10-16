let handler = async (m, { conn, text, args, usedPrefix, command }) => {
  let te = `✳️ Select the language you want to use\n≡ *Available languages:*\n- es (Spanish)\n- en (English)\n- id (Indonesian)\n- pt (Portuguese)\n- ar (Arabic)\n\nExample: *${usedPrefix + command}* en\nHelp us translate the bot into your language\nt.me/GlobalBotInc`.trim();
  
  if (!text) throw te;

  let user = global.db.data.users[m.sender];

  if (args[0] === "es") {
    user.language = args[0];
    m.reply("✅ *Español Seleccionado*\n\nAhora el bot responderá a su mensaje en Español");
  } else if (args[0] === "en") {
    user.language = args[0];
    m.reply("✅ *Selected English*\n\nNow the bot will reply to your message in English");
  } else if (args[0] === "id") {
    user.language = args[0];
    m.reply("✅ *Bahasa Indonesia terpilih*\n\nSekarang bot akan membalas pesanmu dengan bahasa Indonesia");
  } else if (args[0] === "pt") {
    user.language = args[0];
    m.reply("✅ *Português selecionados*\n\nAgora o bot vai responder a sua mensagem em Português");
  } else if (args[0] === "ar") {
    user.language = args[0];
    m.reply("✅ *تم اختيار اللغة العربية*\n\nالآن سيقوم البوت بالرد على رسائلك باللغة العربية");
  } else {
    m.reply(te);
  }
}

handler.help = ['language <es-en..>'];
handler.tags = ['main'];
handler.command = ['language', 'lenguaje', 'lang', 'idioma'];

export default handler;
