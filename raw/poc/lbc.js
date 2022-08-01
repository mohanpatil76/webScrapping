// let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary";
let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
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
    // let allCommentaries = selectorTool(".d-flex.match-comment-padder.align-items-center .match-comment-long-text");
    // console.log(allCommentaries.length);
    // let lastComment = selectorTool(allCommentaries[0]).text();
    // console.log(lastComment);

    //scorecard bowling
    let bowlingTable = selectorTool(".Collapsible__contentInner .table.bowler");
    console.log(bowlingTable.length);
    let max = 0, Wkts = 0, Name = "";
    for (let i = 0; i < bowlingTable.length; i++) {
        let player = selectorTool(bowlingTable[i]).find("tbody tr");
        // console.log(player.length);
        for(let j = 0; j < player.length; j++)
        {
            let score = selectorTool(player[j]).find("td");
            let name = selectorTool(score[0]).text();
            let wickets = selectorTool(score[4]).text();
            console.log("Name -> " + name + "\t " + "Wickets -> " + wickets);
            if(max < wickets)
            {
                max = wickets;
                Wkts = wickets;
                Name = name;
            }
            // console.log(wickets);
        }
        console.log("-----------------------------------------");
    }
    console.log("Highest wickets are taken by " + Name + "total of " + Wkts + " wickets.");
        console.log("-----------------------------------------")
}

console.log("after");