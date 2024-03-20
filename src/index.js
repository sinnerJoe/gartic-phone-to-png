const {decode, Image, GIF, Imagetype} = require("imagescript")
const fs = require("fs")
const process = require("node:process")


if (process.argv.length < 3) {
  console.error("Usage: node index.js <image.gif>")
}
(async () => {
  const imageContents = fs.readFileSync(process.argv[2])
  const image = await GIF.decode(imageContents.buffer, false)
  const outputImage = new Image(image.width, image.height * image.length);
  image.forEach((frame, index) => {
    outputImage.bitmap.set(frame.bitmap, index * frame.bitmap.length)
  })

  const byteData = await outputImage.encode(100)

  const outputPath = process.argv[2].replace(".gif", ".png")

  fs.writeFileSync(outputPath, byteData)
  console.log("Done! File written to " + outputPath)
})()
