import { fileURLToPath } from 'url';
import path from 'path';
import { writeFileSync } from 'fs';
import * as mega from 'megajs'; 

async function processTxtAndSaveCredentials(txt) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Log the incoming txt to check its format
  console.log('Received txt:', txt);

  // Remove 'GlobalTechInfo~' prefix (assuming this is how you encode the mega code)
  const megaCode = txt.replace('GlobalTechInfo~', '');
  console.log('Extracted megaCode:', megaCode);

  // Construct the MEGA URL using the extracted megaCode
  const megaUrl = `https://mega.nz/file/${megaCode}`;

  console.log('Using URL:', megaUrl);

  try {
    // Validate the format of the URL (check if it's a valid MEGA file URL)
    if (!megaUrl.includes('/file/') || megaUrl.split('/file/')[1].length < 8) {
      console.error('Invalid MEGA URL:', megaUrl);
      return; // Exit if the URL is invalid
    }

    // Create a File object from the valid MEGA URL
    const file = mega.File.fromURL(megaUrl);

    // Download the file stream
    const stream = file.download();
    let data = '';
    
    // Collect the data from the stream
    for await (const chunk of stream) {
      data += chunk.toString();
    }

    // Define the path to save the credentials file
    const credsPath = path.join(__dirname, '..', 'session', 'creds.json');
    
    // Save the downloaded credentials data to the file
    writeFileSync(credsPath, data); 
    console.log('Saved credentials to', credsPath);
  } catch (error) {
    console.error('Error downloading or saving credentials:', error);
  }
}

export default processTxtAndSaveCredentials;
