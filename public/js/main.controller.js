angular.module('myApp')
    .controller('AppController', appController)
    .controller('AuthController', authController)
    .config(loginRouter)
    .config(mainRouter);

loginRouter.$inject = ['$routeProvider'];
mainRouter.$inject = ['$routeProvider'];
appController.$inject = ['$http'];

function loginRouter($routeProvider) {
  $routeProvider
      .when('/', {
          templateUrl: 'html/templates/home.html'
      })
      .when('/login', {
          templateUrl: 'html/templates/login.html'
      })
      .when('/register', {
          templateUrl: 'html/templates/register.html'
      })
};

function mainRouter($routeProvider) {
    $routeProvider
        // .when('/', {
        //     templateUrl: 'templates/world.html'
        // })
        .when('/world', {
            templateUrl: 'html/templates/world.html'
        })
        .when('/USA', {
            templateUrl: 'html/templates/USA.html'
        })
        .when('/sports', {
            templateUrl: 'html/templates/sports.html'
        })
        .when('/local', {
            templateUrl: 'html/templates/local.html'
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
      location.href = "html/index.html"
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
      location.href = '/#/login';
    },
    error: function(err) {
      console.error('Register: error', err);
      auth.register.alert = alertError;
      auth.register.message = err.data && err.data.message || 'Registration filed!';
    }
  };
}
