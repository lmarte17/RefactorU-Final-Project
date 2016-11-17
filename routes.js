var User = require('./controllers/user-ctrl'),
    Auth = require('./controllers/auth'),
    path = require('path'),
    express = require('express');

module.exports = (app) => {

  app.get('/', (req, res)=>{
      res.sendFile('home.html', {root: './public/html'});
  });

  app.get('/logout', Auth.logout);
  app.post('/login', Auth.login);
  app.post('/register', Auth.register);
  // app.get('/', Auth.middlewares.session);
  // app.all('/api*', Auth.middlewares.session);

  app.post('/api/users', User.create);
  app.get('/api/users', User.get);
  app.get('/api/users/:id', User.get);
  app.use(express.static(path.join(__dirname, 'public/html')));
}