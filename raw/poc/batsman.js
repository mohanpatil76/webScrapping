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
    let teamNameEleArr = selectorTool(".section-header.border-bottom.text-danger.cursor-pointer .row.no-gutters.align-items-center .header-title.label");
    let teamNameArr = [];

    //Storing the team name in an array to be used further
    for (let i = 0; i < teamNameEleArr.length; i++) {
        let Tname = selectorTool(teamNameEleArr[i]).text();
        Tname = Tname.split("INNINGS")[0];
        Tname = Tname.trim(); // to remove soaces from back and front
        console.log(Tname);
        teamNameArr.push(Tname);

    }
    console.log("---------------------------------");

    let batsmantableArr = selectorTool(".table.batsman"); // storing both the tables 
    // console.log( batsmantableArr.length);    // 2

    for (let i = 0; i < batsmantableArr.length; i++) 
    {
        let singleTeamAllRow = selectorTool(batsmantableArr[i]).find("tbody tr"); // finding the row in which the names are present
        // console.log(singleTeamAllRow.length); // 17  15

        //iterating through all the rows to find the one that has name of player in it   (1 row of name 1 of comentary i.e j += 2 ( to skip the comentary one))
        for (let j = 0; j < singleTeamAllRow.length; j += 2) 
        {
            let allocl = selectorTool(singleTeamAllRow[j]).find("td");  //storing all the columns of a particular player
            if (allocl.length == 8)   //checking that whether the row has player name or not 
            {
                let atag = selectorTool(singleTeamAllRow[j]).find("a");

                console.log("\t" + selectorTool(atag).text()); 
                let playerName = selectorTool(allocl[0]).text();
                console.log(playerName + " of " + teamNameArr[i]);
            }
        }
        console.log("---------------------------------")
    }
}