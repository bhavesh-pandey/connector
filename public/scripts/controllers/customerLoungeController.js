connector.controller('CustomerLoungeController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.selectedMenu = 0;

    $scope.editProfile = function () {
        $state.go('app.profile');
    };

    $scope.wantToTalk = function () {
        $state.go('app.talk')
    };

    $scope.enterNewRequest = function () {
        $state.go('app.newrequest')
    };

    $scope.gotoArticles = function () {
        $state.go('app.articles')
    };

}]);