const bodyParser = require('body-parser');
const express = require('express');
const { readFileSync } = require('fs');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', function (req, res) {

    res.sendFile(__dirname + "/index.html");
});

app.get('/data', function (req, res) {

    let booksData = () => {
        let books = JSON.parse(readFileSync('data.json'))
        return books;
    }


    res.send(booksData());
});

app.post('/', function (req, res) {

    var auth = req.body.auth;
    var title = req.body.title;
    var language = req.body.language;
    var pages = req.body.pages;
    var year = req.body.year;
    var arr = { auth, title, language, pages, year };
    res.send('Author is : ' + auth);
    saveData(arr);

})

const saveData = (newData) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const informaiton = JSON.parse(data);      
            informaiton.push(newData);
            fs.writeFile('./data.json', JSON.stringify(informaiton), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('successful add');
                }
            });
        }
    });


    // const jasonData = JSON.stringify(newData, null, 2);


}

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
}
);

