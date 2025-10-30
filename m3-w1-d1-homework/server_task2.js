// server_task2.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5002;
const sendHtml = (res, filepath) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end('<h1>500 Server Error</h1><p>' + err.message + '</p>');
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
};

const server = http.createServer((req, res) => {
  const route = req.url;

  if (route === '/' || route === '/home') {
    return sendHtml(res, path.join(__dirname, 'home.html'));
  } else if (route === '/about') {
    return sendHtml(res, path.join(__dirname, 'about.html'));
  } else if (route === '/contact') {
    return sendHtml(res, path.join(__dirname, 'contact.html'));
  }

  res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end('<h1>Invalid Request!</h1>');
});

server.listen(PORT, () => {
  console.log(`The NodeJS server on port ${PORT} is now running...`);
});