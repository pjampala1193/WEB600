const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// static assets (css/js/images) from /public
app.use(express.static(path.join(__dirname, 'public')));

// set Pug as the view engine and /views as the views dir
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// route to render your foodblog page
app.get('/', (req, res) => {
  res.render('content');   // renders views/content.pug
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});