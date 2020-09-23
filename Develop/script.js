// Assignment Code
var generateBtn = document.querySelector("#generate");

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
const UPPERCASE = LOWERCASE.map(c => c.toUpperCase());
const NUMERIC = '01234556789'.split('');
const SPECIAL = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'.split('');

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

function generatePassword(criteria) {
  criteria.promptLength();
  criteria.promptFeatures();

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
