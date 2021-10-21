import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to project :)');
});

app.use('/users', require('./users.routes'));

export default app;