const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "./src/assets/img/gallery";
const outputDir = "./src/assets/img/gallery/compressed";

// 출력 디렉토리가 없으면 생성
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 압축 설정
const compressionOptions = {
  quality: 80, // JPEG 품질 (0-100)
  width: 1200, // 최대 너비rn dev

  height: 1600, // 최대 높이
  format: "jpeg",
};

async function compressImage(inputPath, outputPath) {
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024 / 1024).toFixed(2); // MB

    await sharp(inputPath)
      .resize(compressionOptions.width, compressionOptions.height, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: compressionOptions.quality })
      .toFile(outputPath);

    const compressedStats = fs.statSync(outputPath);
    const compressedSize = (compressedStats.size / 1024 / 1024).toFixed(2); // MB
    const reduction = ((1 - compressedStats.size / stats.size) * 100).toFixed(
      1
    );

    console.log(
      `${path.basename(
        inputPath
      )}: ${originalSize}MB → ${compressedSize}MB (${reduction}% 감소)`
    );
  } catch (error) {
    console.error(`Error compressing ${inputPath}:`, error.message);
  }
}

async function compressAllImages() {
  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(
    (file) =>
      /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/.test(file) &&
      !file.includes("compressed") &&
      !file.includes("gallery_") // 기존 작은 이미지들은 제외
  );

  console.log(`총 ${imageFiles.length}개의 이미지를 압축합니다...\n`);

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(
      outputDir,
      file.replace(/\.(JPG|JPEG|PNG)$/i, ".jpg")
    );
    await compressImage(inputPath, outputPath);
  }

  console.log("\n압축 완료!");
}

compressAllImages();
