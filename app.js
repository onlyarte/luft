const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');

const User = require('./routes/User');
const Admin = require('./routes/Admin');
const Airport = require('./routes/Airport');
const Connection = require('./routes/Connection');
const Flight = require('./routes/Flight');
const Plane = require('./routes/Plane');
const Ticket = require('./routes/Ticket');
const Post = require('./routes/Post');

const app = express();

mongoose.connect('mongodb://adm:ruslan16@ds163494.mlab.com:63494/luft')
  .then(() => {
    console.log('Database connection set');
  })
  .catch((error) => {
    console.log('Database connection failed.');
    console.log(error);
  });

cloudinary.config({
  cloud_name: 'dsqyqvcq4',
  api_key: '127728219583678',
  api_secret: 'NpdV7OhIXX-FMhNe8xl8PBHg34E',
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'w23n4b5bh3ch5f83498543yfch3jkhcfjkh48cf438c7f',
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
}));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', User);
app.use('/admin', Admin);
app.use('/airports', Airport);
app.use('/connections', Connection);
app.use('/flights', Flight);
app.use('/planes', Plane);
app.use('/tickets', Ticket);
app.use('/posts', Post);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.sendStatus(err.status || 500);
});

module.exports = app;
