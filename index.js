const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('express-async-errors');

const { PORT, SECRET } = require('./util/config');
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const authorsRouter = require('./controllers/authors');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const readingListRouter = require('./controllers/readingLists');
const { errorHandler } = require('./util/middleware');

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
    // store needs to be added here
  })
);

// routes
app.use('/api/blogs', blogsRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/users', usersRouter);
app.use('/api/readinglists', readingListRouter);
app.use('/api/login', loginRouter);

// errorHandler middleware
app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
