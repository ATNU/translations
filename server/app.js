var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

require('dotenv').config();

var textsRouter = require('./routes/texts');
var allTextsRouter = require('./routes/allTexts');
var citiesRouter = require('./routes/cities');
var locationsRouter = require('./routes/addLocation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/texts', textsRouter);
app.use('/api/cities', citiesRouter);
app.use('/api/allTexts', allTextsRouter);
app.use('/api/addLocation', locationsRouter);


module.exports = app;

