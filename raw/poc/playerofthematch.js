let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results"
let request = require("request");
let cheerio = require("cheerio");

console.log("before");
request(url, cb);

function cb(error, response, html) {
    if (error) {
        console.log(error);
    }
    else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selectorTool = cheerio.load(html);
    let teamName = selectorTool(".match-cta-container");
    console.log(teamName.length);
    for(let i = 0 ; i < teamName.length; i++){
        let scorecard = selectorTool(teamName[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        // console.log(scorecard.length);
        for(let j = 0; j < scorecard.length; j++){
            let sclink = selectorTool(scorecard[2]).attr("href");
            let fullink = "https://www.espncricinfo.com/" + sclink;
            // console.log(fullink);4
            printPlayerName(fullink);
        }
    }
}

function printPlayerName(link)
{
    request(link, cb); //async function
    function cb(error, response, html){
        if(error)
        console.log(error)
        else{
            extractPlayerofthematch(html);
        }
    }
}

function extractPlayerofthematch(html)
{
    let selectorTool = cheerio.load(html);
    let name = selectorTool(".best-player-content").text();
    console.log(name);

}