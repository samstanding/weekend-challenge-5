const faveController = app.controller('FaveController', ['SwapService', function (SwapService) {
    let self = this;

    self.getFaves = SwapService.getFaves;
    self.getFaves();
    self.faves = SwapService.faves;

    self.removeFave = SwapService.removeFave;


}]);