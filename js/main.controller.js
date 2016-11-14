angular.module('myApp')
    .controller('AppController', appController)
    .config(myRouter);

myRouter.$inject = ['$routeProvider'];
appController.$inject = ['$http'];

function myRouter($routeProvider) {
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
