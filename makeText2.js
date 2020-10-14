/** Command-line tool to generate Markov text. */
const fs = require("fs");
const bigram = require("./bigram");
const axios = require("axios");
const process = require("process");

console.log('ggg', bigram)
/** Make Markov machine from text and generate text from it. */

function generateText(text) {
  let mm = new bigram.MarkovBigram(text);
  console.log(mm.makeText());
}


/** read file and generate text from it. */

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });

}



/** read URL and make text from it. */


async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}


/** interpret cmdline to decide what to do. */

//skip first two
let [method, path] = process.argv.slice(2);


if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}


//  node makeText.js file eggs.txt
//  node makeText.js url http://www.gutenberg.org/files/11/11-0.txt

