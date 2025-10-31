// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse form submissions (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public (index.html lives here)
app.use(express.static(path.join(__dirname, 'public')));

// Handle the form POST
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // DEMO ONLY — just echo back what was sent (no real auth)
  if (!username || !password) {
    return res.status(400).send('<h2>Both fields are required.</h2><a href="/">Go back</a>');
  }

  res.send(`
    <div style="font-family:sans-serif">
      <h2>Form Received ✅</h2>
      <p><strong>Username:</strong> ${username}</p>
      <p><strong>Password:</strong> ${password}</p>
      <a href="/">Go back</a>
    </div>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});