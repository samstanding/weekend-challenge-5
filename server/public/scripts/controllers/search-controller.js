const searchController = app.controller('SearchController', ['SwapService', function (SwapService) {
    let self = this;
    
    self.searchClick = SwapService.searchClick;

    self.searchResults = SwapService.searchResults;
   
    
}]);