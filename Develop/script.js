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

  /**
   * Sets the fields of this objects to their default values
   */
  reset() {
    this.length = 0;
    for (let key in this.allowChars) {
      this.allowChars[key] = false;
    }
  },

  promptLength() {
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
 * Selects a random element from an array
 * 
 * @param {any[]} arr 
 */
function randomSelection(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * The password criteria object is passed as a parameter to this function. I just think it makes it more 
 * clear that this function interacts with that object, especially since it's mutating it.
 * 
 * @param {typeof passwordCriteria} criteria 
 */
function generatePassword(criteria) {
  criteria.reset(); // Clear any mutations from the previous session
  criteria.promptLength();
  criteria.promptFeatures();

  // Generate password char-by-char in a loop
  let allowedChars = criteria.allowedChars;
  let password = "";
  for (let _i = 0; _i < criteria.length; ++_i) {
    password += randomSelection(allowedChars);
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
