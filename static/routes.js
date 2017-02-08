var app = angular.module('shibusa', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/projects.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})
