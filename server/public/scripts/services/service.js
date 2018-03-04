app.service ('SwapService', ['$http', function ($http) {
    let self = this;

    self.swapi = 'https://swapi.co/api/';
    self.search = '/?search=';

    self.searchObject = {list:[]};
    self.searchResults = {list:[]};
    // self.searchResultsSpecies = {list:[]};

    self.searchClick = function (text, input) {
        $http({
            method:'GET',
            url:`${self.swapi}${input}${self.search}${text}`
        }).then(function (response) {
            // self.getSpecies(response.data.results[0].species);
            self.searchResults.list = response.data.results;
            console.log(self.searchResults.list);
        }).catch(function (error) {
            console.log('error on search:', error);
        })
    }

    // self.getSpecies = function (species) {
    //     $http({
    //         method:'GET',
    //         url: `${species}`
    //     }).then(function (response) {
    //         self.searchResultsSpecies = response.data.name;
    //         self.searchResults =  self.searchObject.list; 
    //         console.log(self.searchResults);
    //     }).catch(function (error) {
    //         console.log('error on species: ', error);
    //     })
    // }

    

}]);