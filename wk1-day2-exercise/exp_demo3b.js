var express = require('express');
var app = express();
var routedemo = require('./exp_demo3a.js');



app.use('/routedemo', routedemo);


//both exp-demo3a.js and exp-demo3b.js are in same directory


app.listen(3000);


