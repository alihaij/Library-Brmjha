const bodyParser = require('body-parser');
const express = require('express');
const {readFileSync} = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req,res){

    res.sendFile(__dirname + "/index.html");
});

app.get('/data',function(req,res){

let booksData = ()=>{

    let books = JSON.parse(readFileSync('data.json'))
    return books;
}


res.send(booksData());
});

app.post('/',function(req,res){

    var auth = req.body.auth;
    var title = req.body.title;
    var language = req.body.language;
    var pages = req.body.pages;
    var year = req.body.year;
    res.send('Author is : ' +auth);
    
})



app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
}
);

