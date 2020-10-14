### A markow machine

It is a sequence of possible events in which the probability of each event depends only on the state attained in the previous event.

So, it esentially predicts on what will happen next based on what just happened.

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