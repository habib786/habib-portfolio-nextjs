const opentype = require('opentype.js');
const fs = require('fs');
const https = require('https');

const fontUrl = 'https://raw.githubusercontent.com/google/fonts/main/ofl/pacifico/Pacifico-Regular.ttf';
const dest = './Pacifico-Regular.ttf';

const file = fs.createWriteStream(dest);
https.get(fontUrl, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(function() {
      opentype.load(dest, function(err, font) {
        if (err) {
          console.error('Font could not be loaded: ' + err);
        } else {
          // generate path for the whole word
          const path = font.getPath('Habib', 0, 50, 60);
          console.log('--- ENTIRE PATH ---');
          console.log(path.toPathData(2));

          // let's also output glyph paths separate to isolate the i
          console.log('--- GLYPH PATHS ---');
          const glyphs = font.stringToGlyphs('Habib');
          let x = 0;
          glyphs.forEach((glyph, index) => {
              const p = glyph.getPath(x, 50, 60);
              console.log(`Glyph ${index}:`, p.toPathData(3));
              x += glyph.advanceWidth * (60 / font.unitsPerEm);
          });
        }
      });
    });
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error(err.message);
});
