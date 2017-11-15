connector.controller('ArticlesController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.selectedMenu = 0;

    $scope.back = function () {
        $state.go('app.customerlounge');
    }
}]);