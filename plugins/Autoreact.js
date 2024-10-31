/* const emojis = [
    '💘', '💝', '💖', '💗', '💓', '💞', '💕', '💟', '❣️', '❤️',
    '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '❤️‍', '🔥',
    '♥️', '🎈', '🎉', '🎊', '🎁', '💌', '📧', '📨', '📩', '💐',
    '🌸', '💮', '🏵️', '🌹', '🥀', '🌺', '🌻', '🌼', '🌷', '☘️',
    '🍀', '🍁', '🍂', '🍃', '⭐️', '🌟', '✨', '😊', '🥰', '😍',
    '🤩', '☺️'
];

async function doReact(emoji, mek, gss) {
    try {
        const react = {
            react: {
                text: emoji,
                key: mek.key,
            },
        };
        await gss.sendMessage(mek.key.remoteJid, react);
    } catch (error) {
        console.error('Error sending auto reaction:', error);
    }
}

let AUTO_REACT = false;
let lastReactedTime = null;

const handler = async (message, { conn, args, command }) => {
    try {
        const isAutoReactCommand = command === 'autoreact';

        if (isAutoReactCommand) {
            if (args[0] === 'on') {
                AUTO_REACT = true;
                lastReactedTime = Date.now(); // Set the last reacted time to now
                console.log('Auto-react enabled ✅');
                await conn.sendMessage(message.key.remoteJid, { text: 'Auto-react enabled ✅' }, { quoted: message });
            } else if (args[0] === 'off') {
                AUTO_REACT = false;
                console.log('Auto-react disabled ❌');
                await conn.sendMessage(message.key.remoteJid, { text: 'Auto-react disabled ❌' }, { quoted: message });
            } else {
                await conn.sendMessage(message.key.remoteJid, { text: 'Usage:\n- autoreact on\n- autoreact off' }, { quoted: message });
            }
            return;
        }

        if (AUTO_REACT) {
            const currentTime = Date.now();
            // Check if enough time has passed since the last reaction
            if (!lastReactedTime || (currentTime - lastReactedTime > 5000)) {
                const isCommand = /^[!#.$%^&*+=?<>]/.test(message.body || '');
                if (!isCommand) {
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    try {
                        await doReact(randomEmoji, message, conn);
                        lastReactedTime = currentTime; // Update last reacted time
                    } catch (error) {
                        console.error('Error during auto reaction:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Handler error:', error);
    }
};

handler.help = ['autoreact'];
handler.tags = ['main'];
handler.command = /^(autoreact)$/i;

export default handler;
*/
