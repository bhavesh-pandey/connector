connector.controller('LoginModalCtrl', ['$rootScope', '$scope', '$element', '$http', '$state', function($rootScope, $scope, $element, $http, $state) {

    $scope.submitAttempt = false;
    $scope.processStarted = false;

    $scope.cancel = function () {
        $('.ui.basic.modal.login-modal')
            .modal('hide')
        ;
    };

    $scope.forgotPassword = function () {
        $scope.cancel();
        $state.go('app.forgotpassword');
    };

    $scope.logIn = function () {
        $scope.processStarted = true;
        if(!$scope.username || !$scope.password){
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill all the fields';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }

        var data = {
            username: $scope.username,
            password: $scope.password
        };

        $http.post('/users/login', data).then(function(response){
            $rootScope.isLoggedIn = true;
            $rootScope.token = response.data.token;
            $rootScope.user = response.data.user;
            $rootScope.profilePictureLink = $rootScope.user.imageUrl;
            window.localStorage.setItem('connectorToken', JSON.stringify($rootScope.token));
            window.localStorage.setItem('connectorUser', JSON.stringify($rootScope.user));
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.cancel();
            $state.go('app.customerlounge');

        },function(response){
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = response.data.message;
            $('.cookie.nag')
                .nag('show')
            ;
        });
    };

}]);
