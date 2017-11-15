connector.directive('loginModalTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'loginModal.html'
    };
});

connector.directive('expertLoginModalTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'expertLoginModal.html'
    };
});

connector.directive('signupModalTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'signupModal.html'
    };
});

connector.directive('expertSignupModalTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'expertSignupModal.html'
    };
});

connector.directive('logoutModalTemplate', function() {
    return {
        restrict: 'E',
        templateUrl: 'logoutConfirmation.html'
    };
});