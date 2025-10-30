// server_task1.js
const http = require('http');

const PORT = 5001;

const server = http.createServer((req, res) => {
  const { url, method } = req;

  // Always set a content-type
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (method !== 'GET') {
    res.statusCode = 405;
    return res.end('<h1>Method Not Allowed</h1>');
  }

  if (url === '/' || url === '/home') {
    res.statusCode = 200;
    return res.end('<h1>Home Page</h1><p>Welcome to the home page!</p>');
  } else if (url === '/about') {
    res.statusCode = 200;
    return res.end('<h1>About Page</h1><p>Welcome to the about page!</p>');
  } else if (url === '/contact') {
    res.statusCode = 200;
    return res.end('<h1>Contact Page</h1><p>Welcome to the contact page!</p>');
  } else {
    res.statusCode = 404;
    return res.end('<h1>Invalid Request!</h1>');
  }
});

server.listen(PORT, () => {
  console.log(`The NodeJS server on port ${PORT} is now running...`);
});