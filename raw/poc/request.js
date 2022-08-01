let request = require("request");
// let cheerio = require("cheerio");

console.log("before");
request("https://www.google.com", cb); 
//it us requesting the data from the site and sent it to html

function cb(error, response, html)
{
    if(error)
        console.log(error);
    else    
        console.log(html);
}

console.log("after");
console.log("other");