connector.controller('TalkController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $rootScope.selectedMenu = 0;

    $scope.back = function () {
        $state.go('app.customerlounge');
    };

    $scope.skype_chat = function () {
        Skype.tryAnalyzeSkypeUri('chat', '0');
        Skype.trySkypeUri_Generic('skype:live:connector.skype?chat', 'chatframe', '0');
        return false;
    };

    $scope.skype_call = function () {
        Skype.tryAnalyzeSkypeUri('call', '0');
        Skype.trySkypeUri_Generic('skype:live:connector.skype?call', 'callframe', '0');
        return false;
    }

}]);