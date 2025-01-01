import pkg from 'api-qasim';  // Import the `api-qasim` package
const { styletext } = pkg;  // Destructure `styletext` from `api-qasim`

const handler = async (m, { conn, command, text, args, usedPrefix }) => {
  if (!text) throw `Please provide a text. Example: *${usedPrefix + command} Hello*`;

  try {
    // Apply the styletext function to the provided text
    const styledResult = await styletext(text);  // Assuming styletext is async


    // Ensure the result is an array
    if (Array.isArray(styledResult)) {
      let styledMessage = `Choose a styled version of the text by replying with the number:\n\n`;

      // Loop through the result and check its structure before accessing properties
      styledResult.forEach((item, index) => {
        // Log each item in the response to understand its structure
        console.log(`Styled Text ${index + 1}:`, item);

        // Ensure we have a valid `name` and `result` to display
        const styledText = item.result || item;  // Use 'result' for the transformed text
        const styleName = item.name || `Style ${index + 1}`;  // Fallback to default style name if not provided
        styledMessage += `*${index + 1}.* ${styledText}\n`;
      });

      // Send the list of styled versions to the user
      const { key } = await conn.reply(m.chat, styledMessage, m);

      // Initialize session storage for the selected styles
      conn.styletext = conn.styletext || {};  // Initialize session storage if not already initialized
      conn.styletext[m.sender] = {
        result: styledResult,
        key, // Store the message key to delete later
        timeout: setTimeout(() => {
          conn.sendMessage(m.chat, { delete: key });
          delete conn.styletext[m.sender];
        }, 150 * 1000), // Timeout after 2.5 minutes
      };
    } else {
      // If the result isn't an array, inform the user
      await conn.reply(m.chat, `No styled text found for the input provided.`, m);
    }
  } catch (error) {
    console.error('Error applying styletext:', error);
    await conn.reply(m.chat, `❎ Error occurred while styling the text: ${error.message || error}`, m);
  }
};

handler.before = async (m, { conn }) => {
  // Ensure session storage is initialized before accessing
  conn.styletext = conn.styletext || {};

  // Ensure the user has received the options and replied with a number
  if (m.isBaileys || !(m.sender in conn.styletext)) return;

  const { result, key, timeout } = conn.styletext[m.sender];

  // Validate the reply and the input number
  if (!m.quoted || m.quoted.id !== key.id || !m.text) return;

  const choice = m.text.trim();
  const inputNumber = Number(choice);

  // Validate the user's selection
  if (inputNumber >= 1 && inputNumber <= result.length) {
    const selectedStyledText = result[inputNumber - 1].result || result[inputNumber - 1];  // Access 'result' for the transformed text

    try {
      // Send the selected styled text to the user
      await conn.reply(m.chat, `${selectedStyledText}`, m);
      clearTimeout(timeout); // Clear the timeout for the session

      // Clean up the session
      delete conn.styletext[m.sender];
    } catch (error) {
      console.error("Error sending selected styled text:", error);
      await conn.reply(m.chat, `❎ Failed to send the styled text: ${error.message || error}`, m);
    }
  } else {
    await conn.reply(m.chat, `❎ Invalid selection. Please choose a number between 1 and ${result.length}.`, m);
  }
};

handler.help = ['styletext'];
handler.tags = ['utility'];
handler.command = /^(styletext)$/i;

export default handler;
