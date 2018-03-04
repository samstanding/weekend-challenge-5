app.service ('SwapService', ['$http', function ($http) {
    let self = this;

    self.swapi = 'https://swapi.co/api/';
    self.search = '/?search=';

    self.giphy = 'http://api.giphy.com/v1/gifs/search?q=';
    self.giphyKeyLimit = '&api_key=yXNVgUk05pFMQDWErgzYfFpYntraXL1U&limit=1';

    self.searchResults = {list:[]};
    self.searchResultsSpecies = {list:[]};
    self.faves = {list: []};
    self.gif = {list: []};

    self.searchClick = function (text, input) {
        $http({
            method:'GET',
            url:`${self.swapi}${input}${self.search}${text}`
        }).then(function (response) {
            // self.getSpecies(response.data.results.species);
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
    //         console.log(self.searchResultsSpecies);
    //     }).catch(function (error) {
    //         console.log('error on species: ', error);
    //     })
    // }

    self.makeFavorite = function (character) {
        $http({
            method: 'POST',
            url: '/sw',
            data: 
            {
                name: character.name,
                birth_year:  character.birth_year,
                species:  character.species,
                climate: character.climate, 
                residents: character.residents,
                language: character.language,
                average_lifespan: character.average_lifespan,
                homeworld: character.homeworld,
                model: character.model,
                manufacturer: character.manufacturer,
                pilots: character.pilots
            }
        }).then(function (response) {
            self.getFaves();
        }).catch(function (error) {
            console.log('error on post: ', error);
        })
    }

    self.getFaves = function () {
        $http({
            method:'GET',
            url:'/sw'
        }).then(function (response) {
            console.log(response.data);
            self.faves.list = response.data;
        }).catch(function (error) {
            console.log('error on fave get: ',error);
            
        })
    }
    
    self.removeFave = function (id) {
        $http({
            method:'DELETE',
            url:`/sw/${id}`
        }).then(function (response) {
            self.getFaves();
        }).catch(function (error) {
            console.log('error on fave delete: ', error);
        })
    }

    self.getGif = function (name) {
        $http({
            method:'GET',
            url: `${self.giphy}${name}${self.giphyKeyLimit}`
        }).then(function(response) {
            console.log(response.data.data[0].images.downsized.url);
            self.gif.list = response.data.data[0].images.downsized.url;
            // self.getFaves();
        }).catch(function (error) {
            console.log('error on gif get: ', error);
        })
    }
}]);