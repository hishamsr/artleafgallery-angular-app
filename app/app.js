'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('artleafgallery', [
  'ngRoute',
  'ui.router'
  
]).constant('appConstants', {
    appName: 'Artleaf Gallery',
    appVersion: 1.0,
    apiUrl: 'http://localhost:8001/'
});

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function($httpProvider, $stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');
    $stateProvider
    .state('home',{
       url:"/home",
       templateUrl: '/app/home.html',
       controller: 'HomeController',
       //abstract: true //you could use abstract state or not depending on your design 
    }).state('category', { //inherit from your main
        url: '/category/:productId/:categoryId',
        templateUrl: '/app/products.html',
        //controller: 'ProductsController'
    })
    .state('products', { //inherit from your main
        url: '/products/:productId',
        templateUrl: '/app/products.html',
        //controller: 'ProductsController'
    }).state('frames', { //inherit from your main
        url: '/frames',
        templateUrl: '/app/frames.html',
        //controller: 'ProductsController'
    });    
}]);
