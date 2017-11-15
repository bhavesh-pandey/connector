connector.controller('AboutController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 2;

    $scope.signup = function () {
        ModalService.openSignupModal();
        $('#datepicker').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

    $scope.siteData = {};

    $scope.getSiteData = function (page) {
        $scope.dataRetrieved = false;
        $http.get('/management/getSiteData/'+page).then(function (response) {
            $scope.dataRetrieved = true;
            $scope.siteData[page] = response.data;
        });
    };

}]);


connector.controller('ProductsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 3;

    $scope.signup = function () {
        ModalService.openSignupModal();
        $('#datepicker').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

}]);


connector.controller('PartnersController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 4;

    $scope.signup = function () {
        ModalService.openSignupModal();
        $('#datepicker').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

}]);

connector.controller('HowItWorksController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 5;

    $scope.signup = function () {
        ModalService.openSignupModal();
        $('#datepicker').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

}]);

connector.controller('ExpertsController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 6;

    $scope.signup = function () {
        ModalService.openSignupModal();
        $('#datepicker').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

}]);

connector.controller('ContactController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

}]);

connector.controller('DisclaimerController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

}]);


connector.controller('ConfirmRequestController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'SelectionService', function ($http, $scope, $stateParams, $state, $rootScope, SelectionService) {
    $('.cookie.nag')
        .nag('hide')
    ;
    $rootScope.selectedMenu = 0;
    $scope.addedServices = SelectionService.addedServices;
    $scope.addedServiceText = SelectionService.addedServiceText;
    $scope.selectedRegion =  SelectionService.selectedRegion;
    $scope.selectedCountries = SelectionService.selectedCountries;
    $scope.comments = SelectionService.comments;

    console.log($scope.addedServiceText);

    $scope.processStarted = false;

    $scope.back = function () {
        $state.go('app.newrequest');
    };

    $scope.confirm = function () {
        $scope.processStarted = true;
        var data = {
            userInfo: $rootScope.user,
            servicesRequested: $scope.addedServices,
            servicesRequestedText: $scope.addedServiceText,
            region: $scope.selectedRegion,
            countries: $scope.selectedCountries,
            countryNames: SelectionService.selectedCountriesText,
            comments: $scope.comments
        };

        $http.post('/services/create', data).then(function (response) {
            SelectionService.serviceId = response.data.serviceId;
            $scope.processStarted = false;
            $state.go('app.requestcomplete')
        }, function (err) {
            $scope.message = err.message;
        });
    }

}]);

connector.controller('RequestCompletedController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'SelectionService', function ($http, $scope, $stateParams, $state, $rootScope, SelectionService) {
    $rootScope.selectedMenu = 0;
    $('.cookie.nag')
        .nag('hide')
    ;
    $scope.serviceId =  SelectionService.serviceId;

    $scope.back = function () {
        SelectionService.addedServices = [];
        SelectionService.addedServiceText = [];
        SelectionService.selectedRegion = '';
        SelectionService.selectedCountries = [];
        SelectionService.comments = '';
        SelectionService.serviceId = '';
        $state.go('app.customerlounge');
    }

}]);

connector.controller('CustomerConfirmedController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    $rootScope.selectedMenu = 0;
    $('.cookie.nag')
        .nag('hide')
    ;
    $scope.logIn = function () {
        $state.go('app');
        ModalService.openLoginModal();
    };

}]);

connector.controller('LogoutConfirm', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$window', function ($http, $scope, $stateParams, $state, $rootScope, $window) {
    $rootScope.selectedMenu = 0;
    $('.cookie.nag')
        .nag('hide')
    ;
    $scope.logout = function () {
        window.localStorage.removeItem('connectorUser');
        window.localStorage.removeItem('connectorToken');
        $rootScope.user = null;
        $rootScope.token = null;
        $rootScope.isLoggedIn = false;
        $rootScope.isTeamCreated = false;
        $rootScope.profilePictureLink = '';

        $('.ui.basic.modal.logout-modal')
            .modal('hide')
        ;
        /*$state.go('app');*/
        $window.location.href = 'https://www.connector.expert';
    };

    $scope.back = function () {
        $('.ui.basic.modal.logout-modal')
            .modal('hide')
        ;
    }


}]);

connector.controller('ExpertIntroController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    $rootScope.selectedMenu = 0;
    $scope.submitAttempt = false;

    $scope.expertSignup = function () {
        ModalService.openExpertSignupModal();
        $('#datepicker-expert').calendar({
            type: 'date',
            formatter: {
                date: function (date, settings) {
                    if (!date) return '';
                    var day = ("0" + date.getDate()).slice(-2);
                    var month = ("0" + (date.getMonth() + 1)).slice(-2);
                    var year = date.getFullYear();
                    return day + '/' + month + '/' + year;
                }
            },
            maxDate: new Date()
        });
    };

    $scope.send = function () {
        $scope.processStarted = true;
        if($scope.name){
            if(typeof $scope.email !== 'undefined'){
                if($scope.comments){

                    var data = {
                        name: $scope.name,
                        email: $scope.email,
                        comments: $scope.comments
                    };

                    $http.post('/experts/inquiry', data).then(function (response) {
                        $scope.processStarted = false;
                        $scope.submitAttempt = true;
                        $scope.message = response.data.message;
                        $('.cookie.nag')
                            .nag('show')
                        ;
                        return;
                    }, function (error) {
                        $scope.processStarted = false;
                        $scope.submitAttempt = true;
                        $scope.message = error.data.message;
                        $('.cookie.nag')
                            .nag('show')
                        ;
                        return;
                    })

                } else {
                    $scope.processStarted = false;
                    $scope.submitAttempt = true;
                    $scope.message = 'Please write your query';
                    $('.cookie.nag')
                        .nag('show')
                    ;
                    return;
                }
            } else {
                $scope.processStarted = false;
                $scope.submitAttempt = true;
                $scope.message = 'Please fill E-mail in correct format';
                $('.cookie.nag')
                    .nag('show')
                ;
                return;
            }
        } else {
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill Name';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }

    }

}]);

connector.controller('ExpertAppliedController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

    $scope.back = function () {
        $state.go('app');
    };

}]);

connector.controller('ForgotPasswordConfirmation', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

    $scope.login = function () {
        $state.go('app');
        ModalService.openLoginModal();
    };

}]);

connector.controller('ExpertForgotPasswordConfirmation', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

    $scope.login = function () {
        $state.go('app');
        ModalService.openExpertLoginModal();
    };

}]);

connector.controller('ResetPasswordController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;
    $scope.submitAttempt = false;

    $scope.cancel = function () {
        $state.go('app');
    };

    $scope.resetPassword = function () {

        $scope.processStarted = true;
        if($scope.password) {
            if($scope.password.length > 8){
                if($scope.confirmPassword){
                    if($scope.password == $scope.confirmPassword){

                        var data = {
                            new_password: $scope.password,
                            confirm_password: $scope.confirmPassword,
                            token: $stateParams.token
                        };

                        $scope.isResetDisabled = true;
                        $http.put('/users/reset/', data).then(function(response){
                            $scope.processStarted = false;
                            $scope.submitAttempt = true;
                            $state.go('app.resetpasswordconfirmation');

                        },function(response){
                            $scope.processStarted = false;
                            $scope.submitAttempt = true;
                            $scope.message = response.data.message;
                            $('.cookie.nag')
                                .nag('show')
                            ;
                        });

                    } else {
                        $scope.processStarted = false;
                        $scope.submitAttempt = true;
                        $scope.message = 'Passwords do not match';
                        $('.cookie.nag')
                            .nag('show')
                        ;
                        return;
                    }
                } else {
                    $scope.processStarted = false;
                    $scope.submitAttempt = true;
                    $scope.message = 'Please fill Confirm Password';
                    $('.cookie.nag')
                        .nag('show')
                    ;
                    return;
                }
            } else {
                $scope.processStarted = false;
                $scope.submitAttempt = true;
                $scope.message = 'Password must be more than 8 characters';
                $('.cookie.nag')
                    .nag('show')
                ;
                return;
            }
        } else {
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill Password';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }
    };

}]);

connector.controller('ExpertResetPasswordController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;
    $scope.submitAttempt = false;

    $scope.cancel = function () {
        $state.go('app');
    };

    $scope.resetPassword = function () {

        $scope.processStarted = true;
        if($scope.password) {
            if($scope.password.length > 8){
                if($scope.confirmPassword){
                    if($scope.password == $scope.confirmPassword){

                        var data = {
                            new_password: $scope.password,
                            confirm_password: $scope.confirmPassword,
                            token: $stateParams.token
                        };

                        $scope.isResetDisabled = true;
                        $http.put('/experts/reset/', data).then(function(response){
                            $scope.processStarted = false;
                            $scope.submitAttempt = true;
                            $state.go('app.expertresetpasswordconfirmation');

                        },function(response){
                            $scope.processStarted = false;
                            $scope.submitAttempt = true;
                            $scope.message = response.data.message;
                            $('.cookie.nag')
                                .nag('show')
                            ;
                        });

                    } else {
                        $scope.processStarted = false;
                        $scope.submitAttempt = true;
                        $scope.message = 'Passwords do not match';
                        $('.cookie.nag')
                            .nag('show')
                        ;
                        return;
                    }
                } else {
                    $scope.processStarted = false;
                    $scope.submitAttempt = true;
                    $scope.message = 'Please fill Confirm Password';
                    $('.cookie.nag')
                        .nag('show')
                    ;
                    return;
                }
            } else {
                $scope.processStarted = false;
                $scope.submitAttempt = true;
                $scope.message = 'Password must be more than 8 characters';
                $('.cookie.nag')
                    .nag('show')
                ;
                return;
            }
        } else {
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill Password';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }
    };

}]);

connector.controller('ResetPasswordConfirmation', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

    $scope.login = function () {
        $state.go('app');
        ModalService.openLoginModal();
    };

}]);


connector.controller('ExpertResetPasswordConfirmation', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;

    $scope.login = function () {
        $state.go('app');
        ModalService.openExpertLoginModal();
    };

}]);

connector.controller('CustomerLogin', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    ModalService.openLoginModal()
}]);

connector.controller('CustomerSignup', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    ModalService.openSignupModal();
    $('#datepicker').calendar({
        type: 'date',
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
        },
        maxDate: new Date()
    });
}]);

connector.controller('ExpertLogin', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    ModalService.openExpertLoginModal()
}]);

connector.controller('ExpertSignup', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {
    ModalService.openExpertSignupModal();
    $('#datepicker-expert').calendar({
        type: 'date',
        formatter: {
            date: function (date, settings) {
                if (!date) return '';
                var day = ("0" + date.getDate()).slice(-2);
                var month = ("0" + (date.getMonth() + 1)).slice(-2);
                var year = date.getFullYear();
                return day + '/' + month + '/' + year;
            }
        },
        maxDate: new Date()
    });
}]);