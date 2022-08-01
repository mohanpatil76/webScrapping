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
    let allinks = [];
    for (let i = 0; i < teamName.length; i++) {
        let scorecard = selectorTool(teamName[i]).find(".btn.btn-sm.btn-outline-dark.match-cta");
        // console.log(scorecard.length);
        let sclink = selectorTool(scorecard[2]).attr("href");
        let fullink = "https://www.espncricinfo.com/" + sclink;
        allinks.push(fullink);
        // console.log(fullink);4
        // printPlayerName(fullink);
    }
    serialPlayer(allinks, 0);

}

function serialPlayer(link, n) {
    if (allinks.length == n)
        return;
    
    request(link[n], function cb(error, response, html) {
        if (error)
            console.log(error)
        else {
            extractPlayerofthematch(html);
            serialPlayer(allinks, n + 1);
        }
    })
}

function extractPlayerofthematch(html) {
    let selectorTool = cheerio.load(html);
    let name = selectorTool(".best-player-content").text();
    console.log(name);

}