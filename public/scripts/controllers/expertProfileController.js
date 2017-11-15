connector.controller('ExpertProfileController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', '$timeout', function ($http, $scope, $stateParams, $state, $rootScope, $timeout) {

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

    if($rootScope.user.role == 'expert'){
        $scope.selectedCountries = $rootScope.user.selectedCountries;
        $scope.selectedCountriesText = $rootScope.user.selectedCountriesText;
        $scope.selectedSpeciality = $rootScope.user.selectedSpeciality;
    }


    $scope.cancel = function () {
        $state.go('app.expertlounge');
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

    var responseList = {
        results : []
    };

    $('.ui.search.country-list-profile')
        .search({
            apiSettings: {
                url: 'https://restcountries.eu/rest/v2/name/{query}',
                onResponse: function (data) {
                    responseList.results = [];
                    for (var key in data){
                        responseList.results.push({
                            title: data[key].name,
                            description: data[key].region,
                            image: data[key].flag
                        })
                    }
                    return responseList;
                }
            },
            onSelect: function (result, response) {
                $scope.$apply(function () {

                    var matched = false;
                    $scope.selectedCountriesText.forEach(function (toMatch) {
                        if (toMatch == result.title)
                            matched = true;
                    });
                    if(matched==false){
                        $scope.selectedCountries.push(result);
                        $scope.selectedCountriesText.push(result.title);
                    }
                });
                $timeout(function () {
                    $('.ui.search.country-list-profile')
                        .search('set value', '')
                    ;
                    $('.prompt.country-list-profile-input').attr('placeholder','Search Country...').focus().blur();
                }, 10)
            }
        })
    ;

    $scope.removeCountry = function (country) {
        var toremove;
        $scope.selectedCountries.forEach(function (toMatch, index) {
            if(toMatch.id == country.id){
                toremove = index;
                return;
            }
        });
        $scope.selectedCountries.splice(toremove,1);
        $scope.selectedCountriesText.splice(toremove,1);
    };


    $scope.selectSpeciality = function (speciality) {

        if(speciality==''){
            return;
        }
        var matched = false;
        $scope.selectedSpeciality.forEach(function (toMatch) {
            if (toMatch == speciality)
                matched = true;
        });
        if(matched==false){
            $scope.selectedSpeciality.push(speciality);
        }

        $timeout(function () {
            $('.ui.fluid.dropdown')
                .dropdown('clear')
            ;
        },10)
    };

    $scope.removeSpeciality = function (speciality) {
        var toremove;
        $scope.selectedSpeciality.forEach(function (toMatch, index) {
            if(toMatch == speciality){
                toremove = index;
                return;
            }
        });
        $scope.selectedSpeciality.splice(toremove,1);
    };

    $scope.updateProfile = function () {

        $scope.processStarted = true;

        if($scope.title){
            if($scope.firstname){
                if($scope.lastname){
                    if(typeof $scope.email !== 'undefined'){
                        if(typeof $scope.confirmEmail !== 'undefined'){
                            if($scope.email == $scope.confirmEmail){
                                if($scope.companyName){
                                    if($scope.companyCountry){
                                        if($scope.city){
                                            if($scope.address){
                                                if(/^\d+$/.test($scope.postalCode) || $scope.postalCode == '' || typeof $scope.postalCode === 'undefined'){
                                                    if($scope.phone){
                                                        if (/^\d+$/.test($scope.phone)){
                                                            if(/^\d+$/.test($scope.mobile) || $scope.mobile == '' || typeof $scope.mobile === 'undefined'){
                                                                var tempDate = $('#datepicker-profile').calendar('get date');
                                                                $scope.dob = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();


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
                                                                    mobile: $scope.mobile,
                                                                    selectedCountries: $scope.selectedCountries,
                                                                    selectedCountriesText:$scope.selectedCountriesText,
                                                                    selectedSpeciality: $scope.selectedSpeciality
                                                                };

                                                                $http.post('/experts/updateProfile', data).then (function (response) {
                                                                    $rootScope.user = response.data;
                                                                    window.localStorage.setItem('connectorUser', JSON.stringify($rootScope.user));
                                                                    $scope.processStarted = false;
                                                                    $scope.submitAttempt = true;
                                                                    $scope.message = 'Profile Updated Successfully';
                                                                    $('.cookie.nag')
                                                                        .nag('show')
                                                                    ;
                                                                }, function (error) {
                                                                    $scope.processStarted = false;
                                                                    $scope.submitAttempt = true;
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
                                                $scope.message = 'Please fill Address';
                                                $('.cookie.nag')
                                                    .nag('show')
                                                ;
                                                return;
                                            }
                                        } else {
                                            $scope.processStarted = false;
                                            $scope.submitAttempt = true;
                                            $scope.message = 'Please fill City';
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