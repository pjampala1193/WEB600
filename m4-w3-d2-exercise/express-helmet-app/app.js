'use strict';

const express = require('express');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

// Use Helmet to set various HTTP security headers
app.use(helmet());

// Simple route for the root path
app.get('/', (req, res) => {
  res.send('Hello from Express with Helmet!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
