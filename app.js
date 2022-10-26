const uuid = require('uuid')
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
app.post('/delete',function (req,res){
    var deleteId = req.body.id;

    res.send('Successful delete ');
    deleteData(deleteId)
});
app.post('/', function (req, res) {
    
   var id = uuid.v1();
    var auth = req.body.auth;
    var title = req.body.title;
    var language = req.body.language;
    var pages = req.body.pages;
    var year = req.body.year;
    var book = {id,auth, title, language, pages, year };
    res.send('Successful add ');
    saveData(book);

})

const saveData = (newData) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const informaiton = JSON.parse(data);   
               
            informaiton.push(newData);
            fs.writeFile('./data.json', JSON.stringify(informaiton,null,2), (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('successful add');
                }
            });
        }
    });

}


const deleteData = (id) => {
    fs.readFile('./data.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const informaiton = JSON.parse(data);   
            console.log(informaiton[0].id) 
        }
    });

}

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
}
);

