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

    let batsmantableArr = selectorTool(".table.batsman");
    for(let i = 0; i < batsmantableArr.length; i++){
        let batsmanNameAnchor = selectorTool(batsmantableArr[i]).find("tbody tr .batsman-cell a");
        for(let j = 0; j < batsmanNameAnchor.length; j++)
        {
            let name = selectorTool(batsmanNameAnchor[j]).text();
            let link = selectorTool(batsmanNameAnchor[j]).attr("href");
            // console.log(teamNameArr[i] + " " + name + " " + link);
            printBirthday(link, name, teamNameArr[i]);
            // console.log("-------------------------------------------")
        }
        // console.log("-------------------------------------------")
    }
}

function printBirthday(link, name, teamName){
    request(link, cb);
    function cb(error, response, html){
        if(error)
        console.log(error)
        else{
            extractBirthday(html, name, teamName);
            console.log("-------------------------------------------")
        }
    }
}

function extractBirthday(html, name, teamName){
    let selectorTool = cheerio.load(html);
    let birthdayele = selectorTool(".ciPlayerinformationtxt span")
    let birthday = selectorTool(birthdayele[1]).text();
    console.log(name + " " + teamName + " " + birthday);
    console.log("-------------------------------------------")
}