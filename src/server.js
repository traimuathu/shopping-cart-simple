const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

module.exports = app => {
  require('dotenv').config();
  app.use(favicon(path.join(__dirname, 'public', 'images', 'ic.ico')));

  mongoose.Promise = global.Promise;
  mongoose.connect(process.env.MONGODB_NAME, {useNewUrlParser: true, useUnifiedTopology: true});


  app.use(morgan('dev'));
  app.use(require('cookie-parser')());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1*24*60*60
    })
  }));

  app.use((req, res, next) => {
    res.locals.user = req.user || null;
    res.locals.session = req.session;
    next();
  });

  app.use('/static', express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views'));

  app.use('/', require('./routes/index.route'));
  app.use('/user', require('./routes/user.route'));


  const port = process.env.PORT || 8000;
  app.listen(port, () => console.log(`Server is running on port ${port}`));
}
