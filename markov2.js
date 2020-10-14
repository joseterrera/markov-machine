const sentence = `
Most men, even in this comparatively free country, through mere ignorance and mistake, are so occupied with the factitious cares and superfluously coarse labors of life that its finer fruits cannot be plucked by them. Their fingers, from excessive toil, are too clumsy and tremble too much for that. Actually, the laboring man has not leisure for a true integrity day by day; he cannot afford to sustain the manliest relations to men; his labor would be depreciated in the market. He has no time to be anything but a machine. How can he remember well his ignorance, which his growth requires, who has so often to use his knowledge? We should feed and clothe him gratuitously sometimes, and recruit him with our cordials, before we judge of him. The finest qualities of our nature, like the bloom on fruits, can be preserved only by the most delicate handling. Yet we do not treat ourselves nor one another thus tenderly.
`
// helper functions

function getRandomNumber(startInclusive,endExclusive) {
  const diff = endExclusive - startInclusive
  const stretchTheRandomNumber = Math.random() * diff
  return Math.floor( stretchTheRandomNumber ) + startInclusive
}

/**
 * makes the string consistent
 */
function normalizeString(text) {
  return (text || '').toLowerCase()
}

/**
 * make upper case
 */
function titleCase(word){
  return word.charAt(0).toUpperCase() + word.slice(1)
}
/**
 * make sentences upper case after a period, exclamation or interrogation sign
 */

function upperCaseAfterPunctuation(punctuation, sentence) {
  const splitThis = punctuation + ' '
  return (
    sentence
    .split(splitThis)
    .map(titleCase)
    .join(splitThis)
  )

}


// end of helper functions


function buildMap(sentence) {
  const words = (
    sentence
    //split on the non words
    .split(/[ \r\n]/)
    // get rid off anything that is an empty string
    .filter( x => Boolean(x.length) )
  )
  let map = {}
  for( let index = 0; index < words.length; index++ ) {
    const wordItem = normalizeString(words[index])
    // initialize
    // we want to make sure there is at least an array for every key.
    // We'll push the words that follow onto that key.
    // If the wordItem in the map already exists, then do nothing--which
    // is the same as setting the value for a given key to itself--otherwise
    // if it is undefined set the value to an empty array 
    
    map[wordItem] = map[wordItem] || []
    const currentList = map[wordItem]
    // add to the current list the next word attached to it or null
    const normalizeNextWord = normalizeString(words[index+1])
    currentList.push(normalizeNextWord || null)
  }

  console.log('map markov2', map)
  
  // once we have an object, and our sentence broken down into an array, we start randomizing the order
  const startIndex = getRandomNumber( 0, words.length )
  let currentWord = normalizeString(words[startIndex])

  //start populating output, this output is now an array, and later will be .join(' '),
  //also, while currentWord is not equal null, we will grab a new word in the list
  let randomSentenceWords = []
  while( currentWord !== null ) {
    randomSentenceWords.push(currentWord)
    const nextWordList = map[currentWord]
    const nextWordIndex = getRandomNumber( 0, nextWordList.length)
    currentWord = nextWordList[nextWordIndex]
  }

  const generatedSentenceRaw = randomSentenceWords
  .join(' ')

  const [generatedSentence] = (
    [ generatedSentenceRaw ]
    .map(upperCaseAfterPunctuation.bind(null,'.'))
    .map(upperCaseAfterPunctuation.bind(null,'?'))
    .map(upperCaseAfterPunctuation.bind(null,'!'))
  )
  return generatedSentence
}



console.log('markov2', buildMap(sentence)) //?


