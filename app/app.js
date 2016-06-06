'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('artleafgallery', [
  'ngRoute',
  
]).constant('appConstants', {
    appName: 'Artleaf Gallery',
    appVersion: 1.0,
    apiUrl: 'http://localhost:8001/'
}).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);



