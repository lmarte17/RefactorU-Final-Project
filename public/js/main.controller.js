angular.module('myApp')
    .controller('AppController', appController)
    .controller('AuthController', authController)
    .config(loginRouter)
    .config(mainRouter);

loginRouter.$inject = ['$routeProvider'];
myRouter.$inject = ['$routeProvider'];
appController.$inject = ['$http'];

function loginRouter($routeprovider) {
  $routeProvider
      .when('/', {
          templateUrl: 'templates/home.html'
      })
      .when('/login', {
          templateUrl: 'templates/login.html'
      })
      .when('/register', {
          templateUrl: 'templates/register.html'
      })
};

function mainRouter($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/world.html'
        })
        .when('/world', {
            templateUrl: 'templates/world.html'
        })
        .when('/USA', {
            templateUrl: 'templates/USA.html'
        })
        .when('/sports', {
            templateUrl: 'templates/sports.html'
        })
        .when('/local', {
            templateUrl: 'templates/local.html'
        })
};

function appController($http) {
    var ctrl = this;
    ctrl.getNews = function(source) {
      $http.get('https://newsapi.org/v1/articles?source=' + source + '&apiKey=b5a5796607794df6ada10b439d80729a')
      .then(function(res, status) {
        console.log(res.data);
        ctrl.cData = res.data;
      }, function(res, status) {
        console.log('Failure: ' + res);
      });
    };
}

function authController($http) {
  var auth = this,
      alertError = ['alert', 'alert-danger'];

  auth.payload = {};

  auth.login = {
    submit: function($event) {
      console.debug('Login.Submit');
      $http.post('/login', auth.payload).then(auth.login.success, auth.login.error);
    },
    success: function(res) {
      console.info('auth.login.success');
      location.href = "/profile"
    },
    error: function(err) {
      console.error('Login.error');
      auth.login.alert = alertError;
      auth.login.message = err.data && err.data.message || 'Login Failed!';
    }
  };
  auth.register = {
    submit: function($event) {
      $http.post('/register', auth.payload).then(auth.register.success, auth.register.error);
    },
    success: function(res) {
      console.info('auth.register.success');
      location.href = '/profile';
    },
    error: function(err) {
      console.error('Register: error', err);
      auth.register.alert = alertError;
      auth.register.message = err.data && err.data.message || 'Registration filed!';
    }
  };
}
