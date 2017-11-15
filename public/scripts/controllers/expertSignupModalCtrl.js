connector.controller('ExpertSignupModalCtrl', ['$rootScope', '$scope', '$element', '$http', '$state', '$timeout', function($rootScope, $scope, $element, $http, $state, $timeout) {

    $scope.submitAttempt = false;
    $scope.processStarted = false;

    $scope.selectedCountries = [];
    $scope.selectedCountriesText = [];
    $scope.selectedSpeciality = [];

    $('.ui.dropdown')
        .dropdown();

    $scope.cancel = function () {
        $('.ui.basic.modal.expert-signup-modal')
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
                            description: data[key].region,
                            image: data[key].flag
                        })
                    }
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

    $('.ui.search.country-list')
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
                    $('.ui.search.country-list')
                        .search('set value', '')
                    ;
                    $('.prompt.country-list-input').attr('placeholder','Search Country...').focus().blur();
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

    $scope.setUp = function () {
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
                                                                var tempDate = $('#datepicker-expert').calendar('get date');
                                                                $scope.dob = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear();
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
            email: $scope.email,
            dob: $scope.dob,
            companyName: $scope.companyName,
            companyVAT: $scope.companyVAT,
            companyCountry: $scope.companyCountry,
            city: $scope.city,
            address: $scope.address,
            postalCode: $scope.postalCode,
            phone: $scope.phone,
            mobile: $scope.mobile,
            selectedCountries: $scope.selectedCountries,
            selectedCountriesText:$scope.selectedCountriesText,
            selectedSpeciality: $scope.selectedSpeciality
        };

        $http.post('/experts/application', data).then(function(response){
            $scope.processStarted = false;
            $scope.submitAttempt = true;
            $scope.cancel();
            $state.go('app.expertapplied');

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
