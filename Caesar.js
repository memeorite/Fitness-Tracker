// YOUR CODE BELOW
// ACT I
// define a function that accepts 2 arguments (string we want to encrypt, number we want to rotate each letter by)

function caesarCypher(string, num) {
    const alpha = "abcdefghijklmnopqrstuvwxyz";
    // Returns encrypted version of the string shifted by the number
    let encryptedString = "";
    
  //  ACT II
  //  Loop through the string and index the characters
    for(let i = 0; i < string.length; i++) {
      let currentChar = string[i];
      
  //  Once we have all of the character letters indexed, if the character is not a space, define the index, and then shift the index by the number
      if(currentChar !== " ") {
  //       The variable "index" represents looking through the index of characters in the string.
         let idx = alpha.indexOf(currentChar)
  //       The variable "newIndex" represents the alphabet index number of each encrypted character in the string.
        let newIdx = idx + num;
     
        
      if(newIdx >= alpha.length) {
  //       This new index will then rotate back to the beginning of the alphabet.  
       let newIdx = newIdx - alpha.length;
      }
        
  //      The new index will translate into the new encrypted character of the alphabet.
       let newChar = alpha[newIdx]
      
  //   if the current character was a space, then leave it as a space.
       } else {
        let newChar = " ";  
      }
  
   //     The entire encrypted string will result when every character has been looped through, indexed, and shifted, and added together. 
        encryptedString += newChar;
      }
      
    // ACT III
    
   return encryptedString
  }
  
   
  
  
  
  
  
  
  describe('Caesar Cypher', () => {
  
    it('is a function?', () => {
      expect(typeof caesarCypher).toEqual('function');
    });
  
    it('rotates a letter by the number passed in', () => {
      let returnedValue = caesarCypher('a', 2);
      expect(returnedValue).toEqual('c');
    });
  
    it('rotates every letter in the string by the supplied letter', () => {
      let returnedValue = caesarCypher('doggo', 7);
      expect(returnedValue).toEqual('kvnnv');
    });
  
    it('wraps around to the beginning of the alphabet when necessary', () => {
      let returnedValue = caesarCypher('hello', 13);
      expect(returnedValue).toEqual('uryyb');
    });
  
    it('retains spaces between encrypter world', () => {
      let returnedValue = caesarCypher('hello world', 13);
      expect(returnedValue).toEqual('uryyb jbeyq');
    });
  
  });
  