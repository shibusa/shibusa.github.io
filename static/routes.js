var app = angular.module('shibusa', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/devops', {templateUrl: 'partials/devops.html'})
  .when('/webstack', {templateUrl: 'partials/webstack.html'})
  .when('/others', {templateUrl: 'partials/others.html'})
  .otherwise({redirectTo: '/devops'})
})
