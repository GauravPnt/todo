const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Connect to Database
mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch(() => console.log('couldnt connect'));

app.use(express.json());
app.use('/users', users);

const port = process.env.PORT || 5001;
app.listen(port, console.log(`Listening on port ${port}...`));