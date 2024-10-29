import { createCanvas, registerFont } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fontsDir = path.join(__dirname, '../src/font'); // Adjust the path if necessary

// Register all font files from the specified directory
fs.readdirSync(fontsDir).forEach(file => {
  if (file.endsWith('.ttf') || file.endsWith('.otf')) {
    registerFont(path.join(fontsDir, file), { family: file });
  }
});

let handler = async (m, { conn, text }) => {
  let words = text.split(' ');
  if (words.length < 2) {
    // Get list of available fonts and display it if no input text
    let fonts = fs.readdirSync(fontsDir).filter(file => file.endsWith('.ttf') || file.endsWith('.otf'));
    let fontMenu = fonts.map((font, index) => `${index + 1}: ${font.replace(/\.(ttf|otf)$/, '')}`).join('\n');
    return conn.reply(m.chat, `Please provide a font number and text to style.\nUsage: .fancy2 <font_number> <text>\nAvailable fonts:\n${fontMenu}`, m);
  }

  // Get list of available fonts
  let fonts = fs.readdirSync(fontsDir).filter(file => file.endsWith('.ttf') || file.endsWith('.otf'));
  
  // Validate font number
  let fontIndex = parseInt(words[0]) - 1; // Convert to zero-based index
  if (isNaN(fontIndex) || fontIndex < 0 || fontIndex >= fonts.length) {
    return conn.reply(m.chat, `Invalid font selection. Please choose a number from 1 to ${fonts.length}.`, m);
  }

  let selectedFont = fonts[fontIndex];
  let textToStyle = words.slice(1).join(' ');

  // Create canvas
  const canvas = createCanvas(512, 512);
  const ctx = canvas.getContext('2d');

  // Randomize colors
  const backgroundColor = `hsl(${Math.random() * 360}, 100%, 90%)`;
  const fontColor = `hsl(${Math.random() * 360}, 100%, 20%)`;

  // Background color
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Define font and initial font size
  let fontSize = 120;
  ctx.fillStyle = fontColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Helper function to wrap text within the canvas width and height limits
  const wrapText = (text, maxWidth) => {
    const words = text.split(' ');
    let lines = [];
    let line = '';

    words.forEach(word => {
      let testLine = line + word + ' ';
      let { width } = ctx.measureText(testLine);

      if (width > maxWidth && line) {
        lines.push(line);
        line = word + ' ';
      } else {
        line = testLine;
      }
    });

    lines.push(line.trim()); // Trim extra spaces
    return lines;
  };

  // Dynamic adjustment based on font type
  const isOTFFont = selectedFont.endsWith('.otf');
  const widthLimit = isOTFFont ? canvas.width * 0.85 : canvas.width * 0.9;
  const heightLimit = isOTFFont ? canvas.height * 0.75 : canvas.height * 0.8;

  // Reduce font size until text fits within the canvas dimensions
  let lines;
  do {
    ctx.font = `bold ${fontSize}px "${selectedFont}"`;
    lines = wrapText(textToStyle, widthLimit); // Apply width limit for wrapping
    fontSize -= 5;
  } while ((lines.length * fontSize) > heightLimit && fontSize > 10);

  // Draw text on canvas
  lines.forEach((line, i) => {
    const y = canvas.height / 2 - ((lines.length - 1) * fontSize) / 2 + i * fontSize;
    ctx.fillText(line, canvas.width / 2, y);
  });

  // Convert canvas to image and send it
  const buffer = canvas.toBuffer('image/png');
  conn.sendFile(m.chat, buffer, 'styled-text.png', `*𝘗𝘖𝘞𝘌𝘙𝘌𝘋 𝘉𝘠 © 𝘜𝘓𝘛𝘙𝘈-𝘔𝘋*`, m);
};

handler.help = ['fancy2 <font_number> <text>'];
handler.tags = ['tools'];
handler.command = /^(fancy2)$/i;

export default handler;
