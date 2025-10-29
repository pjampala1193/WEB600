var express = require('express');
var app = express();

app.get('/home', (req,res) =>{
    res.send('Home Page Pavanitha');
});

app.get('/about', (req, res) => {
    res.send('About Pavanitha');
});


app.listen(3000);


