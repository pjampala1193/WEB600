var express = require('express');
var app = express();
app.get('/hello', function(req, res){
    res.send("Hello World Pavanitha2!");
});


app.listen(3000);


