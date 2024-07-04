import express from 'express';

const app = express();
const port = 5001;

// Define a route handler for the default home page
app.get('/api', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server starter listening at http://localhost:${port}`)
});