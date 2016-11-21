var express = require('express'),
    stormpath = require('express-stormpath'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    fileserver = express.static('public'),
    path = require('path'),
    Routes = require('./routes'),
    PORT = process.env.PORT || 5050,
    sessions = require('client-sessions')({
      cookieName: 'news-session',
      secret: 'New$!!',
      requestKey: 'session',
      duration: (86400 * 1000) * 7,
      cookie: {
        ephemeral: false, //true = expires when browser closes
        httpOnly: true,   //true = cookie is not accessible via FE JS
        secure: false     //true = will only be read via HTTPS
      }
    }); // cookies are now encrypted

mongoose.connect('mongodb://localhost/newsdb')

var app = express();

//app.set('views', './views');

// Middleware
app.use(morgan('dev'));
app.use(sessions);
app.use(fileserver);
app.use(bodyParser.urlencoded({ extended:true }), bodyParser.json());
// app.use(stormpath.init(app, {
//   expand: {
//     customData: true
//   }
// }));

// Routes
Routes(app);

// app.get('/', stormpath.getUser, function(req, res) {
//   res.render('home', {
//     title: 'Welcome'
//   });
// });

// app.use('/index',stormpath.loginRequired,require('./public/html/index')());

// app.on('stormpath.ready',function(){
//   console.log('Stormpath Ready');
// });

app.listen(PORT);
