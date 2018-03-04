const searchController = app.controller('SearchController', ['SwapService', function (SwapService) {
    let self = this;

    self.searchClick = SwapService.searchClick;

    self.searchResults = SwapService.searchResults;

    self.makeFavorite = SwapService.makeFavorite;
    
    // self.species = SwapService.searchResultsSpecies;
    
}]);