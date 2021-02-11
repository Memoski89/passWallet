/* eslint-disable func-style */
//For UpperCase
function getRandomUpperCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

//For LowerCase
function getRandomLowerCase() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// generate random symbols
function getRandomSymbol() {
  let symbol = "!@#$%^&*(){}[]=<>/,.|~?";
  return symbol[Math.floor(Math.random() * symbol.length)];
}

const randomFunc =  {
  upper : getRandomUpperCase,
  lower : getRandomLowerCase,
  number : getRandomNumber,
  symbol : getRandomSymbol
};



//Generate Password Function
// eslint-disable-next-line func-style
function generatePassword(upper, lower, number, symbol, length) {
  let generatedPassword = "";

  const typesCount = upper + lower + number + symbol;
  console.log('upper/lower/length',upper,lower,length,typesCount);
  //console.log(typesCount);

  const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
  console.log('TYPES ARR', typesArr);

  if (typesCount === 0) {
    return '';
  }
  console.log('TYPES COUNT > 0')
  for (let i = 0; i <= length; i += typesCount) {
    console.log('iiii',i);
    typesArr.forEach(type => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  console.log('FINAL PASSWORD',finalPassword);

  return finalPassword;
}

console.log(generatePassword(0,0,0,1,20));

module.exports = {generatePassword};
