connector.controller('HeaderController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    /*window.localStorage.removeItem('connectorUser');
    window.localStorage.removeItem('connectorToken');*/

    $('#user-dropdown')
        .dropdown();


    $scope.login = function () {
        ModalService.openLoginModal()
    };

    $scope.signup = function () {
        ModalService.openSignupModal()
    };


    if(window.localStorage.getItem('connectorUser') !== "undefined" || window.localStorage.getItem('connectorToken') !== "undefined" ) {
        $rootScope.user = JSON.parse(window.localStorage.getItem('connectorUser'));
        $rootScope.token = JSON.parse(window.localStorage.getItem('connectorToken'));
        if ($rootScope.user) {
            $rootScope.isLoggedIn = true;
            $rootScope.profilePictureLink = $rootScope.user.imageUrl;
            var data = {
                userId: $rootScope.user._id,
                profileType: $rootScope.user.profileType
            };
            if($rootScope.user.role == 'user'){
                $http.post('/users/revalidate', data).then(function (response) {
                    $rootScope.user = response.data;
                    $rootScope.profilePictureLink = $rootScope.user.imageUrl;
                    window.localStorage.setItem('connectorUser', JSON.stringify($rootScope.user));
                    $rootScope.isLoggedIn = true;
                });
            } else {
                $http.post('/experts/revalidate', data).then(function (response) {
                    $rootScope.user = response.data;
                    $rootScope.profilePictureLink = $rootScope.user.imageUrl;
                    window.localStorage.setItem('connectorUser', JSON.stringify($rootScope.user));
                    $rootScope.isLoggedIn = true;
                });
            }

        }
    }

    $scope.logout = function () {
        ModalService.logoutModal()
    };

    $scope.gotoCustomerLounge = function () {
        $state.go('app.customerlounge');
    };

    $scope.gotoExpertLounge = function () {
        $state.go('app.expertlounge');
    };

    $scope.gotoManagementConsole = function () {
        $state.go('app.management');
    };

    $scope.showDropdown = function () {
        $('#user-dropdown')
            .dropdown('show');
    }

}]);

