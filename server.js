const mongoose = require('mongoose');
const users = require('./routes/users');
// const all = require('./routes/all');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost/todo', { useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch(() => console.log('couldnt connect'));

app.use(express.json());
app.use('/users', users);
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use('/all', all);

const port = process.env.PORT || 5001;
app.listen(port, console.log(`Listening on port ${port}...`));