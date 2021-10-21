import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to project :)');
});

export default app;