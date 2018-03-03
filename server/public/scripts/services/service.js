app.service ('SwapService', ['$http', function ($http) {
    let self = this;

    self.swapi = 'https://swapi.co/api/';
    self.search = '/?search=';

    self.searchResults = {list:[]};

    self.searchClick = function (text, input) {
        $http({
            method:'GET',
            url:`${self.swapi}${input}${self.search}${text}`
        }).then(function (response) {
            self.searchResults.list = response.data.results
        }).catch(function (error) {
            console.log('error on search:', error);
        })
    }

}]);