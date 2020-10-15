### A markow machine

It is a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.

So, it esentially predicts on what will happen next based on what just happened.


### Explaining markov to a non-tech person:
Imagine you have a text in a language that you don't understand, and you need to render a new paragrah with the words from that original text. How would you render a 'realistic paragragh', something that, even though it is gibberish, almost sounds correct? I never understood much Chomsky's grammatic theories, but I always remember this sentence 'Colorless green ideas sleep furiously' and thinking to myself, in what context it could actually mean something? So, we want to somehow recreate some beautiful random gibberish.

We will want to break down a sentence and create a table or a tree that shows each word and what words can follow that word. So, for the sentence 'the cat in the hat', we would break it down like this, the left side we call it a key, and the right side we call it values:

 ```js
 {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
 ```

To achieve this, first we will grab our original paragraph and break it down into a list that separates all our words. We call this list 'WORDS'. We go through each word on this list, and we ask ourselves a series of questions every time we have a new word until we finish with all the WORDS from the list:
1. Have I encountered this word already?
  if YES, then do nothing for now, we already have.  
  if NO, then add this word to the object and attach a list to it. The list will hold all the words that can follow this particular word, but initially it is empty.
2. Has this word that I encountered have a word that follows it?
  if YES, then add that word to the list of words that can follow this word.
  if NO, then add null, no words follow this word.

When we finish going through all the WORDS, we will have an object that will show all the words, and the words that can follow those words.

Now we need to create a new paragraph that initially will be empty. To populate the new paragraph we will first need to grab a random word from the WORDS list, which we will call CURRENT_WORD, and we will ask:
* Does the CURRENT_WORD have a word that follows it or does it have a null value attached to it? (check that object we created above)
  if NO, then we are done.
  if YES, then:
    a. add the CURRENT_WORD to the new paragraph, 
    b. grab a random word from the list of words that may follow this CURRENT_WORD 
    c. make this random word your new CURRENT_WORD and ask again the question above until we are done


Basically, that is how we make a new paragraph. There are small details that go great lenghts to make our paragraph more realistic, like keeping uppercase after a question mark or exclamation mark. 



### Algorithm:
  - Break down sentence into a list of words
  - Build a key-value table:
    - The keys will be words and the value will be a list of words.
    - Go through every words in the supplied text
    - Populate the table as follows:
      1. As you go through the words, place the current word as a key in the table
      2. Look ahead to the next word
        a. If there is no next word, place a `null` value in the list of words associate to the current word. We are finished building our table.
        b. If there is a next word, place that word in the associated list.
      3. Go to the next word and repeat until all words in the supplied text have been used.
  - Build a new sentence:
    - Create an empty paragraph array
    - Grab a random word from the list of words, call it CURRENT_WORD
    - Check that CURRENT_WORD on the table that we created
    - Does it have a null value or does it have a list of words or one word attached to it?
      - If no, then we are done
      - if yes, then 
          - add the CURRENT_WORD to the empty paragraph
          - grab a random word from the values associated to that CURRENT_WORD
          - make that random word your new CURRENT_WORD and repeat this last question until we are done
  
    - Join the new paragraph and make it a string.
    - Address issues of Capitalization after a period.





### Going through the different approaches on this repo:

In the sentence "the cat in the hat", we would create chains based on the next word
 for text of "the cat in the hat", chains will be.
 In the text markov.js, it will be:
 ```js
 {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} 
 ```
 In the text bigram js, we attempt to make a more realistic text by joining two words together, those would be the keys, and the value would be the next word:

  ```js
  {"the cat": ["in"], "cat in": ["the"], "in the": ["hat"], "the hat": [null]}
  ```

  To run markov.js:
  ```
 $ node makeText.js file eggs.txt
... generated text from file 'eggs.txt' ...
$ node makeText.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...

  ```

  To run bigram.js
  ```
 $ node makeText2.js file eggs.txt
... generated text from file 'eggs.txt' ...
$ node makeText2.js url http://www.gutenberg.org/files/11/11-0.txt
... generated text from that URL ...

 ```

  In markov2.js, we go for a functional programming approach. Instead of a map, we create an object. This example goes a bit further since it also accounts for periods and it generates a sentence that is realistic because it has periods and uppercased.

  In markov3.js, we have a visual application. In this case, the application is more basic, or beginner friendly, because it strips all words of commas, and alters the order of them.