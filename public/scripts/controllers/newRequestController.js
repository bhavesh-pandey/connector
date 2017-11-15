connector.controller('NewRequestController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'SelectionService', '$timeout', function ($http, $scope, $stateParams, $state, $rootScope, SelectionService, $timeout) {
    $rootScope.selectedMenu = 0;
    $scope.submitAttempt = false;

    $('.ui.fluid.dropdown')
        .dropdown('refresh')
    ;

    $('.new-request-info')
        .popup()
    ;

    $scope.regions = [
        {
            title: 'Africa',
            query: 'africa'
        },
        {
            title: 'America',
            query: 'americas'
        },
        {
            title: 'Asia',
            query: 'asia'
        },
        {
            title: 'Europe',
            query: 'europe'
        },
        {
            title: 'Oceania',
            query: 'oceania'
        }
    ];

    $scope.selectedCountries = SelectionService.selectedCountries;
    $scope.selectedCountriesText = SelectionService.selectedCountriesText;
    $scope.selectedRegion = SelectionService.selectedRegion;
    $scope.comments = SelectionService.comments;

    $('.ui.fluid.dropdown')
        .dropdown('set selected', $scope.selectedRegion)
    ;

    $('.ui.search.search-country')
        .search('clear cache')
    ;

    $('.ui.search.search-country')
        .search('set value', '')
    ;

    var response = {
        results : []
    };

    $('.ui.search.search-country')
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
                        });
                        /*if ($scope.selectedRegion != ''){
                            if(data[key].region == $scope.selectedRegion){
                                response.results.push({
                                    title: data[key].name,
                                    description: data[key].region,
                                    image: data[key].flag
                                })
                            }
                        }
                        else {
                            response.results.push({
                                title: data[key].name,
                                description: data[key].region,
                                image: data[key].flag
                            })
                        }*/
                    }

                    return response;
                }
            },
            onSelect: function (result) {
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
                    $('.ui.search.search-country')
                        .search('set value', '')
                    ;
                    $('.prompt.search-country-input').attr('placeholder','Search Country...').focus().blur();
                }, 10)
            }
        })
    ;

    $scope.selectRegion = function () {
        SelectionService.selectedRegion = $scope.selectedRegion;
        /*response.results = [];
        $scope.selectedCountries = [];
        SelectionService.selectedCountries = [];

        $('.ui.search.search-country')
            .search('clear cache')
        ;

        $('.ui.search.search-country')
            .search('set value', '')
        ;*/
    };

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


    $scope.services = {
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false
    };

    $scope.serviceText = {
        1: 'Car Policy Design and Review',
        2: 'Lease versus Buy versus Cash Allowance',
        3: 'Telematics and Risk Management',
        4: 'Powertrains',
        5: 'Company Car to Mobility transition',
        6: 'Tendering',
        7: 'Contract Negotiations, SLA and KPI service',
        8: 'Supply Chain assessments',
        9: 'Supplier integration',
        10: 'Savings programs',
        11: 'Communication Strategy',
        12: 'Change and Project Management'
    };


    SelectionService.addedServices.forEach(function (toMatch, index) {
        $scope.services[toMatch] = true;
    });

    $scope.addedServices = SelectionService.addedServices;
    $scope.addedServiceText = SelectionService.addedServiceText;

    $scope.toggleSelection = function (serviceNumber) {

        if($scope.services[serviceNumber]){
            $scope.addedServices.forEach(function (toMatch, index) {
                if (toMatch == serviceNumber){
                    $scope.addedServices.splice(index, 1);
                    $scope.addedServiceText.splice(index, 1);
                }
            });
        }
        else {
            $scope.addedServices.push(serviceNumber);
            $scope.addedServiceText.push($scope.serviceText[serviceNumber]);
        }
        SelectionService.addedServices =  $scope.addedServices;
        SelectionService.addedServiceText =  $scope.addedServiceText;
        $scope.services[serviceNumber] = !$scope.services[serviceNumber];
    };


    $scope.cancelRequest = function () {
        $state.go('app.customerlounge')
    };

    $scope.placeRequest = function () {
        $scope.submitAttempt = true;
        if ($scope.addedServices.length == 0){
            $scope.message = 'Please select any Service';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }

        if ($scope.selectedRegion == '' && $scope.selectedCountries.length == 0){
            $scope.message = 'Please select a region or country';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }

        /*if ($scope.selectedCountries.length == 0){
            $scope.message = 'Please select a country';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }*/


        SelectionService.selectedCountries = $scope.selectedCountries;
        SelectionService.selectedCountriesText = $scope.selectedCountriesText;

        SelectionService.comments = $scope.comments;
        $state.go('app.confirmrequest')
    }
}]);