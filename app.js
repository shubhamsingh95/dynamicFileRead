const express = require('express');
const fs = require('fs')
const app = express();


app.use(express.static('specification'));

app.listen(8000, () => {
    console.log("server started on port 8000");
})

app.get("/", (req, res) => {
    let listOfApi = [
        "/get-meta-data/tradelicence/apply",
        "/get-meta-data/tradelicence/search",
        "/get-meta-data/finance/collect"
    ]
    let template = `
    List of API that can be used here are
    ${listOfApi[0]},   
    ${listOfApi[1]} and
    ${listOfApi[2]}
    `;
    return res.status(200).send(template);
})

app.get("/get-meta-data/:folderName/:fileName", (req, res) => {
    let url = req.url;
    let folderName = url.split("/")[2];
    let fileName = url.split("/")[3];
    let fileData;

    try {
        let data = fs.readFileSync(`specification/${folderName}/${fileName}.json`);
        fileData = JSON.parse(data);
    }
    catch(err) {
        return res.status(404).json("File Not Found -- Please check the file path");
    }

    return res.status(200).json(fileData);
})

app.get('*', function(req, res) {
    return res.status(200).send("Requested API does not exist");
});
