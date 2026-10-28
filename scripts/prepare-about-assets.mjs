import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const source = path.join(root, "pics", "source", "About Us");
const output = path.join(root, "public", "pics", "about");

const assets = [
  ["Enterprise Factory.jpg", "sf6-equipment-manufacturer-factory.webp", 1920],
  ["Company Skilled Personnel.jpg", "sf6-engineering-team.webp", 1200],
  ["Company Honors.jpg", "sf6-company-honors.webp", 1200],
  ["Enterprise Qualifications.jpg", "sf6-enterprise-qualifications.webp", 1200],
  ...Array.from({ length: 8 }, (_, index) => [`Honors/Honors${index + 1}.png`, `honors/sf6-company-honor-${index + 1}.webp`, 640]),
  ...Array.from({ length: 8 }, (_, index) => [`Qualifications/Qualifications${index + 1}.png`, `qualifications/sf6-company-qualification-${index + 1}.webp`, 640]),
];

for (const [inputName, outputName, width] of assets) {
  const destination = path.join(output, outputName);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await sharp(path.join(source, inputName))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 84, effort: 5 })
    .toFile(destination);
  console.log(outputName);
}
