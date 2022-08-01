let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
let url = "https://github.com/topics";
let PDFDocument = require('pdfkit');
let dirpath = ""

request(url, cb)

function cb(error, response, html) {
    if (error) {
        console.log(error);
    }
    else {
        extractHtml(html);
    }
}

function extractHtml(html) {
    let selctool = cheerio.load(html);
    let cards = selctool(".col-12.col-sm-6.col-md-4.mb-4");
    console.log(cards.length);
    for (let i = 0; i < cards.length; i++) {
        let link = "https://github.com" + selctool(cards[i]).find("a").attr("href");
        // console.log(link);
        processRepoPage(link);
    }
}

function processRepoPage(url) {
    request(url, cb);
    function cb(err, resp, html) {
        if (err) {
            console.log(err);
        }
        else {
            getRepoLinks(html);
        }
    }
}

function getRepoLinks(html) {
    let seltool = cheerio.load(html);
    let topicName = seltool(".h1-mktg").text().trim();
    console.log(topicName + "\n");
    dirpath = path.join("D:\\Study\\Pepcoding\\My_code\\Web_Scrapping\\raw\\facts", topicName);
    dirCreator(dirpath);

    let arr = seltool("a.text-bold");
    for (let i = 0; i < 8; i++) {
        let link = "https://github.com" + seltool(arr[i]).attr("href");
        console.log(link);

        //splittting the link to get the folder name
        let linkarr = link.split("/");
        let reponame = linkarr.pop();
        // console.log(filename);

        //creating json file
        let filepath = path.join(dirpath, reponame);
        // createfile(filepath + ".json");

        let issueLink = link + "/issues";
        // console.log(issueLink);

        getIssues(reponame, topicName, issueLink, dirpath);
    }
    console.log("------------------------");
}

function dirCreator(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}

function createfile(filepath) {
    fs.writeFile(filepath, "", function (err) {
        if (err) throw err;
        // console.log('Saved!');
    });
}

function getIssues(reponame, topicName, issueLink, dirpath) {
    request(issueLink, cb)
    function cb(err, resp, html) {
        if (err)
            console.log(err);
        else
            extractIssues(html, reponame, topicName, dirpath);
    }

}

function extractIssues(html, reponame, topicName, dirpath){
    let seltool = cheerio.load(html);
    let IssueAnchar = seltool("a.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
    let arr = [];
    for(let i = 0 ; i < IssueAnchar.length; i++){
        let name = seltool(IssueAnchar[i]).text();
        let link = seltool(IssueAnchar[i]).attr("href");
        // console.log("\n" + name + "\n" + link)
        arr.push({
            name : name,
            link : "https://github.com" + link
        });
    }
    // console.log(arr);
    let filepath = path.join(dirpath, reponame + ".pdf");
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream(filepath));
    pdfDoc.text(JSON.stringify(arr));
    pdfDoc.end();

    // fs.writeFileSync(filepath, JSON.stringify(arr));
    // console.table(arr);
}