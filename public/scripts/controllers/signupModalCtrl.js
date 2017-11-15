connector.controller('SignupModalCtrl', ['$rootScope', '$scope', '$element', '$http', '$state', function($rootScope, $scope, $element, $http, $state) {
    
    $scope.submitAttempt = false;
    $scope.processStarted = false;

    $('.ui.dropdown')
        .dropdown();

    $scope.cancel = function () {
        $('.ui.basic.modal.signup-modal')
            .modal('hide')
        ;
    };

    $scope.settingUp = true;

    var response = {
        results : []
    };

    $('.ui.search.enter-country')
        .search({
            apiSettings: {
                url: 'https://restcountries.eu/rest/v2/name/{query}',
                onResponse: function (data) {
                    response.results = [];
                    for (var key in data){
                        response.results.push({
                            title: data[key].name,
                            description: data[key].region
                        })
                    }
                    $('.ui.search.enter-country')
                        .search('clear cache')
                    ;
                    return response;
                }
            },
            onSelect: function (result, response) {
                $scope.companyCountry = result.title;
            }
        })
    ;

    $scope.setUp = function () {
        if($scope.title){
            if($scope.firstname){
                if($scope.lastname){
                    if($scope.username){
                        if(typeof $scope.email !== 'undefined'){
                            if(typeof $scope.confirmEmail !== 'undefined'){
                                if($scope.email == $scope.confirmEmail){
                                    if($scope.password) {
                                        if($scope.password.length > 8){
                                            if($scope.confirmPassword){
                                                if($scope.password == $scope.confirmPassword){
                                                    if($('#datepicker').calendar('get date')){
                                                        var tempDate = $('#datepicker').calendar('get date');
                                                        $scope.dob = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
                                                        if($scope.companyName){
                                                            if($scope.companyCountry){
                                                                if(/^\d+$/.test($scope.postalCode) || $scope.postalCode == '' || typeof $scope.postalCode === 'undefined'){
                                                                    if($scope.phone){
                                                                        if (/^\d+$/.test($scope.phone)){
                                                                            if(/^\d+$/.test($scope.mobile) || $scope.mobile == '' || typeof $scope.mobile === 'undefined'){
                                                                                $scope.message = 'If the information you provide to us is correct, Please click “Submit” for registration.';
                                                                                $('.cookie.nag')
                                                                                    .nag('show')
                                                                                ;
                                                                                $scope.settingUp = false;
                                                                            } else {
                                                                                $scope.processStarted = false;
                                                                                $scope.submitAttempt = true;
                                                                                $scope.message = 'Mobile should be a number or you can leave it blank';
                                                                                $('.cookie.nag')
                                                                                    .nag('show')
                                                                                ;
                                                                                return;
                                                                            }

                                                                        } else {
                                                                            $scope.processStarted = false;
                                                                            $scope.submitAttempt = true;
                                                                            $scope.message = 'Phone should be a number';
                                                                            $('.cookie.nag')
                                                                                .nag('show')
                                                                            ;
                                                                            return;
                                                                        }
                                                                    } else {
                                                                        $scope.processStarted = false;
                                                                        $scope.submitAttempt = true;
                                                                        $scope.message = 'Please fill Phone';
                                                                        $('.cookie.nag')
                                                                            .nag('show')
                                                                        ;
                                                                        return;
                                                                    }

                                                                } else {
                                                                    $scope.processStarted = false;
                                                                    $scope.submitAttempt = true;
                                                                    $scope.message = 'Postal Code should be a number or you can leave it blank';
                                                                    $('.cookie.nag')
                                                                        .nag('show')
                                                                    ;
                                                                    return;
                                                                }
                                                            } else {
                                                                $scope.processStarted = false;
                                                                $scope.submitAttempt = true;
                                                                $scope.message = 'Please fill Company Country';
                                                                $('.cookie.nag')
                                                                    .nag('show')
                                                                ;
                                                                return;
                                                            }
                                                        } else {
                                                            $scope.processStarted = false;
                                                            $scope.submitAttempt = true;
                                                            $scope.message = 'Please fill Company Name';
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
                                } else {
                                    $scope.processStarted = false;
                                    $scope.submitAttempt = true;
                                    $scope.message = 'Email and Confirm Email do not match';
                                    $('.cookie.nag')
                                        .nag('show')
                                    ;
                                    return;
                                }
                            } else {
                                $scope.processStarted = false;
                                $scope.submitAttempt = true;
                                $scope.message = 'Please fill Confirm E-mail in correct format';
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
                        $scope.message = 'Please fill Username';
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
            } else {
                $scope.processStarted = false;
                $scope.submitAttempt = true;
                $scope.message = 'Please fill Firstname';
                $('.cookie.nag')
                    .nag('show')
                ;
                return;
            }
        } else {
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.message = 'Please select Title';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }
    };

    $scope.edit = function () {
        $scope.settingUp = true;
    };

    $scope.signUp = function(){
        $scope.processStarted = true;

        var data = {
            title: $scope.title,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
            dob: $scope.dob,
            companyName: $scope.companyName,
            companyVAT: $scope.companyVAT,
            companyCountry: $scope.companyCountry,
            city: $scope.city,
            address: $scope.address,
            postalCode: $scope.postalCode,
            phone: $scope.phone,
            mobile: $scope.mobile
        };

        $http.post('/users/signup', data).then(function(response){

            $rootScope.username = $scope.username;
            $rootScope.password = $scope.password;
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.cancel();
            $state.go('app.customerconfirmed');

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
