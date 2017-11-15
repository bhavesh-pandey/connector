connector.controller('FooterController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {
    $rootScope.siteData = {};

    $scope.getAllSiteData = function (page) {
        $http.get('/management/getAllSiteData').then(function (response) {

            $scope.siteDataArray = response.data;

            $scope.siteDataArray.forEach(function (toMatch, index) {
                $rootScope.siteData[toMatch.page] = toMatch;
            });

            $rootScope.windowLoaded = true;
        });
    };
}]);