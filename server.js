// dependencies
const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
// const hbs = exphbs.create({ helpers });

const sequelize = require('./config/connection');
const routes = require('./controllers');
// const helpers = require('./utils/helpers');

const app = express();
const PORT = process.env.PORT || 3001;

// enable session 
const sess = {
    secret: 'dovahkiin',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    }),
    maxAge: 900000
};

// middleware from express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// turn on routes
app.use(routes);

// set handlebars as view model
// app.engine('handlebars', hbs.engine);
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// connect the db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log
        (`\n |-----------------------------------------------| \n |    Code Zone is now listening on Port ${PORT}!   |\n |-----------------------------------------------| `));
});