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

const searchController = app.controller('SearchController', ['SwapService', function (SwapService) {
    let self = this;
    self.searchClick = SwapService.searchClick;

    self.searchResults = SwapService.searchResults;
    console.log( self.searchResults);
    
    

}]);

const faveController = app.controller('FaveController', ['SwapService', function (SwapService) {
    let self = this;
    console.log('in fave controller');


}]);

app.service ('SwapService', ['$http', function ($http) {
    let self = this;

    let swapi = 'https://swapi.co/api/';
    let search = '/?search=';

    let searchResults = {list:[]};

    self.searchClick = function (text, input) {
        console.log(text, input);
        $http({
            method:'GET',
            url:`${swapi}${input}${search}${text}`
        }).then(function (response) {
            console.log(response.data.results);
            searchResults.list = response.data.results
        }).catch(function (error) {
            console.log('error on search:', error);
        })
    }

}]);

