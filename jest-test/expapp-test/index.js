// index.js
const express = require('express');
const https = require('https');

const app = express();

// 1. Array object model
const todos = [
  { id: 1, name: 'Go grocery shopping' },
  { id: 2, name: 'Get pizza for dinner' },
  { id: 3, name: 'Do the laundry' }
];

// 2. Required setup + basic route
app.get('/', (req, res) => {
  res.status(200).send('Hello from Express app');
});

// 3. Routes that retrieve data from the array object

// Get all todos
app.get('/todo', (req, res) => {
  res.status(200).json(todos);
});

// Get todo by id
app.get('/todo/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).send('Todo not found');
  }

  res.status(200).json(todo);
});

// 4. Route that retrieves data from an external API
app.get('/joke', (req, res) => {
  const url = 'https://api.chucknorris.io/jokes/random';

  https.get(url, response => {
    let data = '';

    // keep appending data to chunks as we receive it
    response.on('data', chunk => {
      data += chunk;
    });

    response.on('end', () => {
      res.send(data);
    });
  }).on('error', err => {
    console.error(err);
    res.status(500).send('Error fetching joke');
  });
});

// 5. Port listener
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Export app for Jest / SuperTest
module.exports = app;
