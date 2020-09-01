const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8001;

app.use(cors());
app.use(express.json());

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('<h1>get started with documentation...</h1>');
});

const uri = process.env.DB_CONNECTION;
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log('MongoDB database connection established successfully.');
  }
);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
