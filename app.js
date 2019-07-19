require('dotenv').config();

//mangoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URI, {
    auth:{
        user: process.env.DB_USER,
        password: process.env.DB_PASS
    },
    useNewUrlParser: true
}).catch(err =>console.error(`ERROR: ${err}`));
//end mangoose

const express = require('express');
const path = require('path');

const app = express();



// Adding cookies and sessions support to our app
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');

app.use(cookieParser());

app.use(session({
    secret: (process.env.secret || 'bookrakacha'),
    cookie: {
      maxAge: 10800000
    },
    resave: true,
    saveUninitialized: true
  }));

app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = res.locals.flash || {};
  res.locals.flash.success = req.flash('success') || null;
  res.locals.flash.error = req.flash('error') || null;
  next();
});

//body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
//end body parser

//our veiws path
// app.set( 'views' , path.join(__dirname, 'views' ));
// app.set( 'view engine' , 'pug' );
// app.use( '/css' , express.static( 'assets/stylesheets' ) );
// app.use( '/js' , express.static( 'assets/javascripts' ) );
// app.use( '/images' , express.static( 'assets/images' ) );


// Authentication helpers
const jwt = require('jsonwebtoken');

const isAuthenticated = (req) => {
  const token = req.cookies.toke || req.body.token || req.query.tokem || req.headers["x-access-token"];
  if (req,session.userId) return true;
  if (!token) return false;

  jwt.verify(token,"moeteddy", (err, decoded) => {
    if (err) return false;
    return true;
  })
};
  app.use((req, res, next) => {
    req.isAuthenticated = () => isAuthenticated(req);      
    next();
  });
  

//our routes 
const routes = require( './routes.js' );
app.use('/api', routes);

//handles any request that dont match the ones above
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const port =  (process.env.PORT || 4000);
app.listen(port, ()=> console.log(`lising on ${port}`));