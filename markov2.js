const sentence = `
Most men, even in this comparatively free country, through mere ignorance and mistake, are so occupied with the factitious cares and superfluously coarse labors of life that its finer fruits cannot be plucked by them. Their fingers, from excessive toil, are too clumsy and tremble too much for that. Actually, the laboring man has not leisure for a true integrity day by day; he cannot afford to sustain the manliest relations to men; his labor would be depreciated in the market. He has no time to be anything but a machine. How can he remember well his ignorance—which his growth requires—who has so often to use his knowledge? We should feed and clothe him gratuitously sometimes, and recruit him with our cordials, before we judge of him. The finest qualities of our nature, like the bloom on fruits, can be preserved only by the most delicate handling. Yet we do not treat ourselves nor one another thus tenderly.
`

function getRandomNumber(startInclusive,endExclusive) {
  const diff = endExclusive - startInclusive
  const stretchTheRandomNumber = Math.random() * diff
  return Math.floor( stretchTheRandomNumber ) + startInclusive
}

function normalizeString(text) {
  return (text || '').toLowerCase()
}

function buildMap(sentence) {
  const words = (
    sentence
    .split(/\W/)
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
    const normalizeWord = normalizeString(words[index+1])
    currentList.push(normalizeWord || null)
  }
  
  const startIndex = getRandomNumber( 0, words.length )
  let currentWord = normalizeString(words[startIndex])
  let randomSentenceWords = []
  while( currentWord !== null ) {
    randomSentenceWords.push(currentWord)
    const nextWordList = map[currentWord]
    const nextWordIndex = getRandomNumber( 0, nextWordList.length)
    currentWord = nextWordList[nextWordIndex]
  }
  return randomSentenceWords.join(' ')
}

buildMap(sentence) //?
