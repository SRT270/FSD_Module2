const express = require('express');
const app = express();
const port = 3000;

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World! Welcome to Express Server');
});

// Start the server
app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});