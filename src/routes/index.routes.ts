import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Welcome to project :)');
});

app.use('/car-rentals', require('./carRentals.routes'));
app.use('/users', require('./users.routes'));

export default app;