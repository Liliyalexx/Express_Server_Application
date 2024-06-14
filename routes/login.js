const express = require('express');
const router = express.Router();

// GET route to serve the login form
router.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'views' });
});

// POST route to handle login form submission
router.post('/login', (req, res) => {
  const { username, email } = req.body;

  //Find the user by username in the users array
  const user = users.find((user) => user.username === username);

  // Check if user exists and password matches
  if (user && user.email === ElementInternals) {
    res.send(`Logged in as ${username}`);
  } else {
    res.status(401).send('Invalid credentials');
  }
});

module.exports = router;
