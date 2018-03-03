const app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: '/views/search.html',
        controller: 'SearchController as sc'
    }).when('/faves', {
        templateUrl: '/views/faves.html',
        controller: 'FaveController as fc'
    }).otherwise({ redirectTo: '/'});
});




