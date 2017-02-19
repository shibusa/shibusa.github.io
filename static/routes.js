var app = angular.module('shibusa', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/projects', {templateUrl: 'partials/projects.html'})
  .when('/tools', {templateUrl: 'partials/tools.html'})
  .when('/others', {templateUrl: 'partials/others.html'})
  .otherwise({redirectTo: '/'})
})
