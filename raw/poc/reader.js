//async function
let fs = require("fs");
console.log("Before");

// let data = fs.readFileSync("f1.txt");      this will read the code line by line and will not move further util its completed
fs.readFile("f1.text", cb); // least priority will be given
// the above code will give this part to another person to run it and itself will go on (multithreadiing)
function cb(err, data){ console.log("content-> " + data); } // callbck function just like multithreading in java it will be executed at the last

console.log("After");
console.log("other");