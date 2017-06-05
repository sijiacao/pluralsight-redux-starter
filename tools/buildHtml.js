import fs from 'fs';
import cheerio from 'cheerio';//gives us a handy way to interact with in-memory DOM using jQuery selectors
import colors from 'colors';

/*eslint-disable no-console*/
//read index.html file, and pass that resulting HTML right down into cheerio
fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  //since a separate spreadsheet is only utilized for the production build, need to dynamica
  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
