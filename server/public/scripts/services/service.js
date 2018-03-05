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

    self.newComment = {};

    self.searchClick = function (text, input) {
        $http({
            method:'GET',
            url:`${self.swapi}${input}${self.search}${text}`
        }).then(function (response) {
            console.log(response.data.results);
            self.searchResults.list = response.data.results;
        }).catch(function (error) {
            console.log('error on search:', error);
        })
    }

    self.makeFavorite = function (character) {
        $http({
            method: 'POST',
            url: '/sw',
            data: 
            {
                name: character.name,
                birth_year:  character.birth_year,
                gender: character.gender,
                species:  character.species,
                climate: character.climate, 
                terrain: character.terrain,
                language: character.language,
                model: character.model,
                manufacturer: character.manufacturer,
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
            self.faves.list = response.data;
            console.log(self.faves.list);
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
            self.gif.list = response.data.data[0].images.downsized.url;
        }).catch(function (error) {
            console.log('error on gif get: ', error);
        })
    }

    self.sendComment = function (newComment, id) {
        $http({
            method:'PUT',
            url:`/sw/${id}`,
            data: newComment
        }).then(function (response) {
            console.log('successfully sent comment');
            self.getFaves();
            }).catch(function (errror) {
            console.log('error on send comment: ', error);
        })

    }
}]);