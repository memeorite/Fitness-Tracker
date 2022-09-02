let originalText =
  "Ever since I left the city, you, you, you You and me we just don't get along";
let parseText = parse(originalText);
let textObj = generateWordPairs(parseText);
let numberOfWordsInLine = getRandomInteger(4, 10);


// FUNCTIONS /////////////////////////////
function parse(text) {
  let newText = text.toLowerCase();
  let newText2 = newText.replaceAll(",", "");
  let newText3 = newText2.replaceAll("'", "");
  let newText4 = newText3.split(" ");

  return newText4;
}

function generateWordPairs(text) {
  let wordPairs = {};

  for (let i = 0; i < text.length - 1; i++) {
    let tempKey = text[i];
    let tempValues = Array(text[i + 1]);

    if (wordPairs[tempKey] && tempKey === text[i + 1]) {
      wordPairs[tempKey].push(tempKey);
    } else if (wordPairs[tempKey] && wordPairs[tempKey].length > 1) {
      wordPairs[tempKey].push(text[i + 1]);
    } else {
      wordPairs[tempKey] = tempValues;
    }
}   
  return wordPairs;
}

function writeLine(textObj, numberOfWordsInLine) {
    //   our line will consist of a string
      let line = "";
      // which key to start with.  The keys array includes only the keys of the  wordPairs object
      let keysArr = Object.keys(textObj);
      let randomKeyInt = getRandomInteger(0, keysArr.length);
      
       for (let i = 0; i < numberOfWordsInLine; i++) {
        let reset = 0;

        // if the line length goes beyond the end of the array, start back at 0.
        if (i > keysArr.length) {
          line += getRandomWordValue(keysArr[reset]) + " ";
          reset++;
        } else {
          line += getRandomWordValue(keysArr[randomKeyInt + i]) + " ";
        }
     }
     console.log(line)
  return line;
} 

function generatePoem(text, numOfLines){
  for (let i = 0; i < numOfLines; i++) {
    let line1 = Math.floor(Math.random() * 10) + 1;
    console.log(writeline(text, line1))
  }
}


// helpers for above ^^

// returns a single word from a values array
function getRandomWordValue(inputWord) {
  let valuesArr;

  valuesArr = textObj[inputWord]
  let value = valuesArr[Math.floor(Math.random() * valuesArr.length)]

  console.log(value)
  return value;
}

// min and max included, returns an INTEGER
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

 
  
  