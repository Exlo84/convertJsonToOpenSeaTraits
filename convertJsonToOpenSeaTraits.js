const fs = require('fs');
const path = require('path');

function convertJsonToOpenSeaTraits(filePath) {
  const jsonData = JSON.parse(fs.readFileSync(filePath));
  const variationNumber = parseInt(path.basename(filePath, '.json').split('_')[1]);
  const name = `Variation ${variationNumber}`;
  const description = `A colorful variation of a master image ${variationNumber}`;
  const image = `ipfs://${path.basename(jsonData.outputFilePath)}`;
  const attributes = [
    {
      "trait_type": "hue",
      "value": jsonData.hue
    },
    {
      "trait_type": "saturation",
      "value": jsonData.saturation
    }
  ];
  const openSeaTraits = {
    name,
    description,
    image,
    attributes
  };
  return openSeaTraits;
}

const inputFolderPath = './output/JSON';
const outputFolderPath = './JSON';

const inputFiles = fs.readdirSync(inputFolderPath).filter(file => path.extname(file) === '.json');

inputFiles.forEach(file => {
  const inputFilePath = path.join(inputFolderPath, file);
  const outputFilePath = path.join(outputFolderPath, file);
  const openSeaTraits = convertJsonToOpenSeaTraits(inputFilePath);
  fs.writeFileSync(outputFilePath, JSON.stringify(openSeaTraits));
});
