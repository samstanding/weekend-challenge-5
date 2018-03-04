const app = angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages']);



app.config(function ($routeProvider) {
    $routeProvider.when('/search', {
        templateUrl: '/views/search.html',
        controller: 'SearchController as sc'
    }).when('/faves', {
        templateUrl: '/views/faves.html',
        controller: 'FaveController as fc'
    }).otherwise({ redirectTo: '/'});
});

// import {MatButtonModule} from '@angular/material/button';



