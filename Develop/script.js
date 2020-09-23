// Assignment Code
var generateBtn = document.querySelector("#generate");

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASE = LOWERCASE.map(c => c.toUpperCase());
const NUMERIC = '01234556789'.split('');
const SPECIAL = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');

/**
 * An object encapsulating all the applicable criteria for password generation
 * 
 * Shared mutable state is asking for trouble but for the purposes of this exercise it's fine
 */
let passwordCriteria = {
  length: 0,
  allowChars: {
    lowercase: false,
    uppercase: false,
    numeric: false,
    special: false
  },

  get allowedChars() {
    let allowedChars = [];
    if (this.allowChars.lowercase) {
      allowedChars.push(...LOWERCASE);
    }

    if (this.allowChars.uppercase) {
      allowedChars.push(...UPPERCASE);
    }

    if (this.allowChars.numeric) {
      allowedChars.push(...NUMERIC);
    }

    if (this.allowChars.special) {
      allowedChars.push(...SPECIAL);
    }

    return allowedChars;
  },

  promptLength() {
    // Since we're working with just this object in global scope, the length needs to be cleared 
    // so that successive sessions don't inherit their length from the previous one
    this.length = 0;
    while (this.length < 8 || this.length > 128) {
      let input = prompt("How long shall the password be?\n(Must be between 8 and 128 inclusive)");
      let parsedInput = parseInt(input);
      if (typeof parsedInput !== "number") {
        continue;
      }

      this.length = parsedInput;
    }
  },

  promptFeatures() {
    this.allowChars.lowercase = confirm("May the password contain lowercase letters?");
    this.allowChars.uppercase = confirm("May the password contain uppercase letters?");
    this.allowChars.numeric = confirm("May the password contain numbers?");
    this.allowChars.special = confirm("May the password contain special characters?");
  }
}

/**
 * @param {typeof passwordCriteria} criteria 
 */
function generatePassword(criteria) {
  // Ask user for criteria
  criteria.promptLength();
  criteria.promptFeatures();

  // Generate password char-by-char in a loop
  let allowedChars = criteria.allowedChars;
  let password = "";
  for (let _i = 0; _i < criteria.length; ++_i) {
    password += allowedChars[Math.floor(Math.random() * allowedChars.length)];
  }

  return password;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword(passwordCriteria);
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
