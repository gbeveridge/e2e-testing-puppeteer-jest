const pixelmatch = require('pixelmatch');
const fs = require('fs');
const PNG = require('pngjs').PNG;

exports.compareScreenshots = fileName => {
  return new Promise((resolve, reject) => {
    const doneReading = () => {
      expect(img1.width).toBe(img2.width);
      expect(img1.height).toBe(img2.height);
      const numDiffPixel = pixelmatch(
        img1.data,
        img2.data,
        null,
        img1.width,
        img1.height,
        { threshold: 0.7 }
      );

      expect(numDiffPixel).toEqual(0);
      resolve();
    }

    const img1 = fs.createReadStream('original.png').pipe(new PNG());
    const img2 = fs.createReadStream(fileName).pipe(new PNG()).on('parsed', doneReading);

  });
};