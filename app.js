const express = require('express');
const flash = require('connect-flash');
const favicon = require('express-favicon');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const { mongoURI } = require('./config/keys');

const app = express();

mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB Connected...')
    })
    .catch(err => console.log(err));

app.use(favicon(path.join(__dirname, '/public/img/faviconLogo.png')));

app.use('/static', express.static(path.join(__dirname, '/public')));

// Template Engine Config
app.set('views', path.join(__dirname, '/views'));
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'index',
    layoutsDir: path.join(__dirname + '/views/layouts'),
    partialsDir: path.join(__dirname + '/views/partials')
}));
app.set('view engine', 'hbs');

// Load Model
require('./model/message');

// Body Parser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session Config
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Flash Middleware
app.use(flash());

// Make Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Load Routes
const mkdRoutes = require('./routes/mkdRoutes');
const enRoutes = require('./routes/enRoutes');

app.use('/', mkdRoutes);
app.use('/en', enRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));