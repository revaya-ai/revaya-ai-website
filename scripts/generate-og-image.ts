import sharp from "sharp";
import path from "path";
import fs from "fs";

const WIDTH = 1200;
const HEIGHT = 630;
const BG_COLOR = { r: 13, g: 26, b: 74 };
const TEAL = "#028090";

async function generateOgImage() {
  const outputPath = path.join(process.cwd(), "public/images/og-default.png");
  const logoPath = path.join(process.cwd(), "public/revaya-logo-white.png");

  fs.mkdirSync(path.join(process.cwd(), "public/images"), { recursive: true });

  const svgOverlay = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <text
        x="80" y="220"
        font-family="Arial, sans-serif"
        font-weight="900"
        font-size="58"
        fill="white"
        letter-spacing="-1"
      >Business AI Operating Systems</text>
      <text
        x="80" y="296"
        font-family="Arial, sans-serif"
        font-weight="900"
        font-size="58"
        fill="white"
        letter-spacing="-1"
      >for Owner-Operators</text>
      <text
        x="80" y="520"
        font-family="Arial, sans-serif"
        font-weight="400"
        font-size="28"
        fill="${TEAL}"
      >revaya.ai</text>
    </svg>
  `);

  const logoBuffer = await sharp(logoPath)
    .resize({ width: 280, fit: "inside" })
    .toBuffer();

  const logoLeft = 80;
  const logoTop = 60;

  await sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { ...BG_COLOR, alpha: 1 },
    },
  })
    .composite([
      { input: logoBuffer, left: logoLeft, top: logoTop },
      { input: svgOverlay, left: 0, top: 0 },
    ])
    .png()
    .toFile(outputPath);

  console.log(`og:image created at ${outputPath}`);
}

generateOgImage().catch(console.error);
