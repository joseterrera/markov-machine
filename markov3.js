function markovMachine() {
  const markovChain = {}
  console.log('chain', markovChain)
  const textArr = document.getElementById('inputBox').value.split(' ')
  for (let i = 0; i < textArr.length; i++) {
    //replace non words for empty strings 
    // so `men,` would become `men`
    let word = textArr[i].toLowerCase().replace(/[\W_]/, "")
    //if key does not exist, create it, if it does add plus one
    if (!markovChain[word]) {
      markovChain[word] = []
      }
      //if there is a word after this one, push that word
    if (textArr[i + 1]) {
      markovChain[word].push(textArr[i + 1].toLowerCase().replace(/[\W_]/, ""));
}
}
//create arrray with all words
  const words = Object.keys(markovChain)
  //grab random word
  let word = words[Math.floor(Math.random() * words.length)]
  let result = ''
  //populate output with random word
  for (let i = 0; i < words.length; i++ ) {
    result += word + ' ';
    newWord =  markovChain[word][Math.floor(Math.random() * markovChain[word].length)]
    console.log(newWord)
    word = newWord;
    if (!word || !markovChain.hasOwnProperty(word)) word = words[Math.floor(Math.random() * words.length)]
  }
  document.getElementById('markovResults').innerText = result;
}