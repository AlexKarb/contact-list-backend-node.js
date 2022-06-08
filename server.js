const mongoose = require('mongoose');
const app = require('./app');

const DB_HOST =
  'mongodb+srv://AlexKarb:2nBdBDcafvoyiGQ3@hw.otqkljr.mongodb.net/db-contacts?retryWrites=true&w=majority';

const PORT = 3080;

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });
