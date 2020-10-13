class MarkovMachine {
  constructor(text) {
    // split on all space or new line
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    console.log('chains', chains)
    
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      }
      else { 
        chains.set(word, [nextWord]);
      }
    }

    this.chains = chains;
  }
  
    /** Pick random choice from array */

    static choice(ar) {
      return ar[Math.floor(Math.random() * ar.length)];
    }




  /** return random text from chains */

  makeText(numWords = 100) {
    // pick a random key to begin
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let output = [];

    // produce markov chain until reaching termination word
    while (output.length < numWords && key !== null) {
      output.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    return output.join(" ");
  }
}


module.exports = {
  MarkovMachine,
};


/**
 $ node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...
$ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...
 */