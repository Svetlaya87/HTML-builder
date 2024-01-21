const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
fs.createWriteStream(filePath);// creating empty file



let stream = process.stdin;
console.log('Enter any letter, please, and press Enter\n');
let str="";
stream.on("data", function(input) {
  
  
  if(input.toString('utf8').trim() === 'exit'){
    
    console.log('\n Thank you for testing our app. Good bye!');
    process.exit();

  }
  let writeToFile = fs.createWriteStream(filePath);
  str = str+input;
  writeToFile.write(str);

});

process.on('SIGINT', function() {
    console.log('\nThank you for testing our app. Good bye!');
    process.exit();
});