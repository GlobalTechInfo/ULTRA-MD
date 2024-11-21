import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import PastebinAPI from 'pastebin-js'; // Import the Pastebin API
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL'); // Your Pastebin API key

// Function to ensure the session ID is exactly 213 characters
function ensureSessionIdLength(sessionId) {
  const prefix = 'GlobalTechInfo~';
  const requiredLength = 50;

  // If the session ID is too short, add random characters to make it the correct length
  if (sessionId.length < requiredLength) {
    const remainingLength = requiredLength - sessionId.length;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < remainingLength; i++) {
      randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sessionId + randomString;
  }

  // If the session ID is too long, truncate it
  if (sessionId.length > requiredLength) {
    return sessionId.slice(0, requiredLength);
  }

  // If the session ID is exactly the correct length, return it as is
  return sessionId;
}

async function CheckSessionID(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Log the incoming txt to check its format
  console.log('Received txt:', txt);

  // Ensure the session ID is exactly 213 characters long
  const sessionId = ensureSessionIdLength(txt);
  console.log('Final session ID:', sessionId);

  // Remove 'GlobalTechInfo~' prefix (assuming this is how you encode the pastebin code)
  const pastebinCode = sessionId.replace('GlobalTechInfo~', '');
  console.log('Extracted pastebinCode:', pastebinCode);

  // Construct the Pastebin URL using the extracted pastebinCode
  const pastebinUrl = `https://pastebin.com/${pastebinCode}`;
  console.log('Using URL:', pastebinUrl);

  // Check if the sessionId is valid (ensure the pastebinCode is correctly extracted)
  if (!pastebinCode || pastebinCode.length < 8) {
    console.log('Session ID or Pastebin code is invalid or missing. Please check the input.');
    return;  // Log the error and continue
  }

  try {
    // Validate the format of the URL (check if it's a valid Pastebin URL)
    if (!pastebinUrl.includes('pastebin.com/') || pastebinUrl.split('pastebin.com/')[1].length < 8) {
      console.error('Invalid Pastebin URL:', pastebinUrl);
      return; // Exit if the URL is invalid
    }

    // Retrieve the content of the paste from Pastebin (using the API)
    const pasteContent = await pastebin.getPaste(pastebinCode);
    console.log('Retrieved paste content:', pasteContent);

    // Define the path to save the credentials file
    const credsPath = path.join(__dirname, '..', 'session', 'creds.json');

    // Optionally, save the retrieved content locally if needed
    writeFileSync(credsPath, pasteContent);
    console.log('Saved credentials to', credsPath);

    // Optionally, send the paste content to Pastebin again as a new paste (if needed)
    const newPasteUrl = await pastebin.createPaste(pasteContent, 'New credentials paste', null, 1, 'N');
    console.log('New paste created at:', newPasteUrl);

  } catch (error) {
    // Log the error instead of just returning
    if (error.message.includes('404')) {
      console.error(`Paste not found for code ${pastebinCode}. Error: 404 - Paste not found.`);
    } else {
      console.error('Error retrieving or saving credentials:', error);
    }
  }
}

export default CheckSessionID;
  
