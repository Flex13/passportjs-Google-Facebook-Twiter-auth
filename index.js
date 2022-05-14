const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');
const keys = require('./config/keys');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express()
const port = process.env.PORT || 5000


// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));


const start = async() => {
    try {
        await connectDB(keys.mongodb.dbURI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();