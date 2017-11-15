connector.controller('ForgotPasswordController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $rootScope.selectedMenu = 0;
    $scope.submitAttempt = false;

    $scope.cancel = function () {
        $state.go('app');
    };

    $('#datepicker-forgot').calendar({
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
    
    $scope.submit = function () {

        $scope.processStarted = true;
        if($scope.lastname){
            if($('#datepicker-forgot').calendar('get date')){
                var tempDate = $('#datepicker-forgot').calendar('get date');
                $scope.dob = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
                if(typeof $scope.email !== 'undefined'){
                    
                    var data = {
                        lastname: $scope.lastname,
                        dob: $scope.dob,
                        email: $scope.email
                    };
                    
                    $http.post('/users/forgot', data).then(function (response) {
                        $state.go('app.forgotpasswordconfirmation');
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
                    $scope.message = 'Please fill E-mail in correct format';
                    $('.cookie.nag')
                        .nag('show')
                    ;
                    return;
                }
            } else {
                $scope.processStarted = false;
                $scope.submitAttempt = true;
                $scope.message = 'Please fill Date Of Birth';
                $('.cookie.nag')
                    .nag('show')
                ;
                return;
            }
        } else {
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please fill Lastname';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }

    };

}]);