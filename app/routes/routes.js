'use strict';

var morgan         = require('morgan'),
    bodyParser     = require('body-parser'),
    methodOverride = require('express-method-override'),
    less           = require('less-middleware'),
    session        = require('express-session'),
    RedisStore     = require('connect-redis')(session),
    //foursquare     = require('node-foursquare'),
    security       = require('../lib/security'),
    debug          = require('../lib/debug'),
    home           = require('../controllers/home');
    //users          = require('../controllers/users');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(less(__dirname + '/../static'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(methodOverride());
  app.use(session({store:new RedisStore(), secret:'my super secret key', resave:true, saveUninitialized:true, cookie:{maxAge:null}}));

  // app.use(security.authenticate);
  app.use(debug.info);

  app.get('/', home.index);
  //app.post('/', home.index);


  //app.get('/login', users.login);
  //app.post('/login', users.authenticate);


  console.log('Express: Routes Loaded');
};
