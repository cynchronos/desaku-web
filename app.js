const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override');

const app = express();

const port = process.env.PORT || 3000;

require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: 'sessionId',
    saveUninitialized: false,
    resave: true
}))
app.use(expressLayouts);
app.use(methodOverride('_method'));

app.set('layout', './layouts/main');
app.set('view engine', 'ejs')

const { router } = require('./src/routes/routes');

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on http://127.0.0.1:${port}`);
});