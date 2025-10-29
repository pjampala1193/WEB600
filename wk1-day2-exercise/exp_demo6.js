var express = require('express');
var app = express();

app.get('/home', (req, res) => {
    res.send('Home Page');
});
app.get('/about', (req, res) => {
    res.send('About');
});
// For invalid routes
app.use((req, res) => {
    res.status(404).send('404! This is an Invalid URL.');
});


app.listen(3000);


