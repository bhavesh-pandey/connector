connector.controller('ProfileController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', function ($http, $scope, $stateParams, $state, $rootScope) {

    $('.ui.dropdown')
        .dropdown();

    $scope.submitAttempt = false;

    $scope.title = $rootScope.user.title;
    $scope.firstname = $rootScope.user.firstname;
    $scope.lastname = $rootScope.user.lastname;
    $scope.dob = $rootScope.user.dob;
    $scope.companyName = $rootScope.user.companyName;
    $scope.companyVAT = $rootScope.user.companyVAT;
    $scope.companyCountry = $rootScope.user.companyCountry;
    $scope.city = $rootScope.user.city;
    $scope.address = $rootScope.user.address;
    $scope.postalCode = $rootScope.user.postalCode;
    $scope.email = $rootScope.user.email;
    $scope.confirmEmail = $rootScope.user.email;
    $scope.phone = $rootScope.user.phone;
    $scope.mobile = $rootScope.user.mobile;


    $scope.cancel = function () {
        $state.go('app.customerlounge');
    };

    var response = {
        results : []
    };

    $('#datepicker-profile').calendar('set date', $scope.dob);

    $('#datepicker-profile').calendar({
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

    $('.ui.search.enter-country')
        .search('set value', $scope.companyCountry)
    ;

    $('.ui.search.enter-country')
        .search({
            apiSettings: {
                url: 'https://restcountries.eu/rest/v2/name/{query}',
                onResponse: function (data) {
                    response.results = [];
                    for (var key in data){
                        response.results.push({
                            title: data[key].name,
                            description: data[key].region,
                            image: data[key].flag
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

    $scope.updateProfile = function () {

        if($scope.title){
            if($scope.firstname){
                if($scope.lastname){
                    if(typeof $scope.email !== 'undefined'){
                        if(typeof $scope.confirmEmail !== 'undefined'){
                            if($scope.email == $scope.confirmEmail){
                                if($('#datepicker-profile').calendar('get date')){
                                    var tempDate = $('#datepicker-profile').calendar('get date');
                                    $scope.dob = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
                                    if($scope.companyName){
                                        if($scope.companyCountry){
                                            if(/^\d+$/.test($scope.postalCode) || $scope.postalCode == '' || typeof $scope.postalCode === 'undefined'){
                                                if($scope.phone){
                                                    if (/^\d+$/.test($scope.phone)){
                                                        if(/^\d+$/.test($scope.mobile) || $scope.mobile == '' || typeof $scope.mobile === 'undefined'){

                                                            var data = {
                                                                _id: $rootScope.user._id,
                                                                title: $scope.title,
                                                                firstname: $scope.firstname,
                                                                lastname: $scope.lastname,
                                                                dob: $scope.dob,
                                                                companyName: $scope.companyName,
                                                                companyVAT: $scope.companyVAT,
                                                                companyCountry: $scope.companyCountry,
                                                                city: $scope.city,
                                                                address: $scope.address,
                                                                postalCode: $scope.postalCode,
                                                                email: $scope.email,
                                                                phone: $scope.phone,
                                                                mobile: $scope.mobile
                                                            };

                                                            $http.post('/users/updateProfile', data).then (function (response) {
                                                                $rootScope.user = response.data;
                                                                window.localStorage.setItem('connectorUser', JSON.stringify($rootScope.user));
                                                                $scope.message = 'Profile Updated Successfully';
                                                                $('.cookie.nag')
                                                                    .nag('show')
                                                                ;
                                                            }, function (error) {
                                                                $scope.message = error.data.message;
                                                                $('.cookie.nag')
                                                                    .nag('show')
                                                                ;
                                                            })

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
    }

}]);