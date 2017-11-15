connector.controller('ManageController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'Upload', '$timeout', function ($http, $scope, $stateParams, $state, $rootScope, Upload, $timeout) {

    $rootScope.selectedMenu = 0;
    $rootScope.windowLoaded = true;
    $scope.processStarted = false;

    $scope.selectedManagementMenu = 1;
    $scope.isExpertSelected = false;
    $scope.isCustomerSelected = false;
    $scope.isServiceSelected = false;
    $scope.isViewExpertSelected = false;
    $scope.isAdminSelected = false;
    $scope.selectedSiteTab = 1;
    $scope.showExpertApprovedDialogue = false;
    $scope.browseText = 'Browse';

    $scope.gotoCustomerManagement = function () {
        $scope.showExpertApprovedDialogue = false;
        $scope.isExpertSelected = false;
        $scope.isCustomerSelected = false;
        $scope.isServiceSelected = false;
        $scope.isViewExpertSelected = false;
        $scope.isAdminSelected = false;
        $scope.selectedManagementMenu = 1;
    };

    $scope.gotoExpertManagement = function () {
        $scope.showExpertApprovedDialogue = false;
        $scope.isExpertSelected = false;
        $scope.isCustomerSelected = false;
        $scope.isServiceSelected = false;
        $scope.isViewExpertSelected = false;
        $scope.isAdminSelected = false;
        $scope.selectedManagementMenu = 2;
    };

    $scope.gotoAdminManagement = function () {
        $scope.showExpertApprovedDialogue = false;
        $scope.isExpertSelected = false;
        $scope.isCustomerSelected = false;
        $scope.isServiceSelected = false;
        $scope.isViewExpertSelected = false;
        $scope.isAdminSelected = false;
        $scope.selectedManagementMenu = 3;
    };

    $scope.gotoSiteManagement = function () {
        $scope.showExpertApprovedDialogue = false;
        $scope.isExpertSelected = false;
        $scope.isCustomerSelected = false;
        $scope.isServiceSelected = false;
        $scope.isViewExpertSelected = false;
        $scope.isAdminSelected = false;
        $scope.selectedManagementMenu = 4;
    };

    $scope.expertRequests = [];
    $scope.services = [];

    $scope.getAllData = function () {
        $http.get('/management/getAllCustomers').then(function (response) {
            $scope.allCustomers = response.data;
        });

        $http.get('/management/getAllServices').then(function (response) {
            $scope.services = response.data;
        });

        $http.get('/management/getAllExpertRequests').then(function (response) {
            $scope.expertRequests = response.data;
        });

        $http.get('/management/getAllExperts').then(function (response) {
            $scope.allExperts = response.data;

            $scope.allAdmins = [];
            $scope.allExperts.forEach(function (toMatch, index) {
                if(toMatch.isAdmin == true){
                    $scope.allAdmins.push(toMatch);
                }
            })
        });
    };

    $scope.siteData = {};
    $scope.siteInitialData = {};
    $scope.updating = false;

    $scope.getAllSiteData = function (page) {
        $scope.dataRetrieved = false;
        $http.get('/management/getAllSiteData').then(function (response) {
            $scope.siteDataArray = response.data;
            $scope.siteDataArray.forEach(function (toMatch, index) {
                $scope.siteData[toMatch.page] = toMatch;
            });
            $scope.dataRetrieved = true;
            angular.copy($scope.siteData, $scope.siteInitialData);
            console.log($scope.siteInitialData.partners.content);
        });
    };

    $scope.updateSiteData = function (page, name) {
        $scope.updating = true;
        var data = {
            page: page,
            name: $scope.siteData[page].content[name].name,
            data: $scope.siteData[page].content[name].data
        };
        $http.post('/management/updateSiteData/', data).then(function (response) {
            $scope.updating = false;
        })
    };

    $scope.upload = function (file, page, name) {
        $scope.updating = true;
        Upload.upload({
            url: '/management/upload',
            data:{file:file}
        }).then(function (resp) {
            $scope.siteData[page].content[name].data = file.name;
            $scope.updateSiteData(page, name);
        }, function (resp) {
        });
    };

    $scope.submit = function(file, page, name){
        $scope.upload(file, page, name);
    };
    
    $scope.approveExpert = function () {
        $scope.processStarted = true;

        if($scope.username){
            if($scope.password){
                if($scope.confirmPassword){
                    if($scope.password == $scope.confirmPassword){
                        delete $scope.selectedExpert['__v'];
                        delete $scope.selectedExpert['updatedAt'];
                        delete $scope.selectedExpert['createdAt'];
                        $scope.selectedExpert.username = $scope.username;
                        $scope.selectedExpert.password = $scope.password;

                        $http.post('/experts/approveExpert', $scope.selectedExpert).then(function (response) {

                            $scope.username = null;
                            $scope.password = null;
                            $scope.confirmPassword = null;
                            $scope.processStarted = false;
                            $scope.submitAttempt = false;
                            $scope.isExpertSelected = false;
                            $scope.showExpertApprovedDialogue = true;
                            $scope.expertRequests.splice($scope.selectedExpertIndex,1);

                        }, function (error) {
                            $scope.processStarted = false;
                            $scope.submitAttempt = true;
                            $scope.message = error.data.message;
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
                    $scope.message = 'Please fill Confirm password';
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
            $scope.message = 'Please fill Username';
            $('.cookie.nag')
                .nag('show')
            ;
            return;
        }
    };

    $scope.backFromExpert = function () {
        $scope.expertRequestQuery = '';
        $scope.isExpertSelected = false;
        $scope.showExpertApprovedDialogue = false;
    };

    $scope.backFromViewExpert = function () {
        $scope.expertQuery = '';
        $scope.isViewExpertSelected = false;
        $scope.selectedViewExpert = null;
    };

    $scope.backFromCustomer = function () {
        $scope.customerQuery = '';
        $scope.isCustomerSelected = false;
        $scope.selectedCustomer = null;
    };

    $scope.backFromService = function () {
        $scope.serviceQuery = '';
        $scope.isServiceSelected = false;
        $scope.selectedService = null;
    };

    $scope.backFromAdmin = function () {
        $scope.adminQuery = '';
        $scope.isAdminSelected = false;
        $scope.selectedAdmin = null;
    };

    $scope.selectExpert = function (index) {
        $scope.isExpertSelected = true;
        $scope.selectedExpertIndex = index;
        $scope.selectedExpert = $scope.expertRequests[index];
    };

    $scope.selectViewExpert = function (expert) {
        $scope.isViewExpertSelected = true;
        $scope.selectedViewExpert = expert;
    };

    $scope.selectService = function (service) {
        $scope.isServiceSelected = true;
        $scope.selectedService = service;
    };

    $scope.selectCustomer = function (customer) {
        $scope.isCustomerSelected = true;
        $scope.selectedCustomer = customer;
    };

    $scope.selectAdmin = function (admin) {
        $scope.isAdminSelected = true;
        $scope.selectedAdmin = admin;
    };

    $scope.goto = {
        Tab: function (number) {
            $scope.browseText = 'Browse';
            $scope.selectedSiteTab = number;
        }
    };

    var pushNewExpertRequests = function (msg) {
        $scope.$apply(function () {
            $scope.expertRequests.push(JSON.parse(msg.data));
        })
    };

    var source = new EventSource('/experts/expertRequestStatus');
    source.addEventListener('message', pushNewExpertRequests, false);
    
    $scope.deleteRequest = function () {
        $scope.processStarted = true;
        $scope.submitAttempt = false;

        var toremove;
        $scope.expertRequests.forEach(function (toMatch, index) {
            if(toMatch._id == $scope.selectedExpert._id){
                toremove = index;
            }
        });

        $scope.expertRequests.splice(toremove,1);

        $http.post('/experts/deleteRequest', $scope.selectedExpert).then(function (response) {

            $scope.showExpertApprovedDialogue = false;
            $scope.submitAttempt = false;
            $scope.isExpertSelected = false;
            $scope.isCustomerSelected = false;
            $scope.isServiceSelected = false;
            $scope.isViewExpertSelected = false;
            $scope.isAdminSelected = false;
            $scope.processStarted = false;
            $scope.selectedManagementMenu = 2;

        });
    };

    $scope.deleteExpert = function () {
        $scope.processStarted = true;

        var toremove;
        $scope.allExperts.forEach(function (toMatch, index) {
            if(toMatch._id == $scope.selectedViewExpert._id){
                toremove = index;
            }
        });

        $scope.allExperts.splice(toremove,1);

        $http.post('/experts/deleteExpert', $scope.selectedViewExpert).then(function (response) {

            $scope.showExpertApprovedDialogue = false;
            $scope.submitAttempt = false;
            $scope.isExpertSelected = false;
            $scope.isCustomerSelected = false;
            $scope.isServiceSelected = false;
            $scope.isViewExpertSelected = false;
            $scope.isAdminSelected = false;
            $scope.processStarted = false;
            $scope.selectedManagementMenu = 2;

        });
    };

    $scope.deleteCustomer = function () {
        $scope.processStarted = true;
        $scope.submitAttempt = false;

        var toremove;
        $scope.allCustomers.forEach(function (toMatch, index) {
            if(toMatch._id == $scope.selectedCustomer._id){
                toremove = index;
            }
        });

        $scope.allCustomers.splice(toremove,1);

        $http.post('/users/deleteUser', $scope.selectedCustomer).then(function (response) {

            $scope.showExpertApprovedDialogue = false;
            $scope.submitAttempt = false;
            $scope.isExpertSelected = false;
            $scope.isCustomerSelected = false;
            $scope.isServiceSelected = false;
            $scope.isViewExpertSelected = false;
            $scope.isAdminSelected = false;
            $scope.processStarted = false;
            $scope.selectedManagementMenu = 1;

        });
    };


    $scope.downloadAllCustomer = function () {

        $scope.processStarted = true;

        $scope.allCustomers.forEach(function (toMatch) {
            toMatch.fullname = toMatch.title + ' ' + toMatch.firstname + ' ' + toMatch.lastname;
            var tempDate = new Date(toMatch.createdAt);
            toMatch.applyDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()
        });

        var customerstyle = {
            headers:true,
            columns: [
                { columnid: 'fullname', title: 'Customer Name'},
                { columnid: 'email', title: 'Email-ID'},
                { columnid: 'dob', title: 'Date Of Birth'},
                { columnid: 'companyName', title: 'Company Name'},
                { columnid: 'companyVAT', title: 'Company VAT' },
                { columnid: 'companyCountry', title: 'Company Country'},
                { columnid: 'city', title: 'City'},
                { columnid: 'address', title: 'Address'},
                { columnid: 'postalCode', title: 'Postal Code'},
                { columnid: 'phone', title: 'Phone'},
                { columnid: 'mobile', title: 'Mobile'},
                { columnid: 'username', title: 'User Name'},
                { columnid: 'applyDate', title: 'Apply Date'}
            ]
        };

        alasql('SELECT * INTO XLS("AllCustomerData' + '.xls",?) FROM ?', [customerstyle, $scope.allCustomers]);
        $timeout(function () {
            $scope.processStarted = false;
        }, 1000)

    };

    $scope.downloadAllServices = function () {

        $scope.processStarted = true;

        $scope.services.forEach(function (toMatch) {
            toMatch.fullname = toMatch.userInfo.title + ' ' + toMatch.userInfo.firstname + ' ' + toMatch.userInfo.lastname;
            toMatch.email = toMatch.userInfo.email;
            toMatch.phone = toMatch.userInfo.phone;
            toMatch.companyName = toMatch.userInfo.companyName;
            toMatch.serviceIdString = toMatch.serviceId.toString();
            var tempDate = new Date(toMatch.createdAt);
            toMatch.requestDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()
        });

        var servicestyle = {
            headers:true,
            columns: [
                { columnid: 'serviceIdString', title: 'Service ID'},
                { columnid: 'fullname', title: 'Requested By'},
                { columnid: 'email', title: 'Customer E-mail'},
                { columnid: 'phone', title: 'Customer Phone'},
                { columnid: 'companyName', title: 'Customer Company' },
                { columnid: 'region', title: 'Service Region'},
                { columnid: 'countryNames', title: 'Service Country(s)'},
                { columnid: 'servicesRequestedText', title: 'Service(s) Requested'},
                { columnid: 'comments', title: 'Comments'},
                { columnid: 'requestDate', title: 'Request Date'}
            ]
        };

        alasql('SELECT * INTO XLS("AllServiceData' + '.xls",?) FROM ?', [servicestyle, $scope.services]);
        $timeout(function () {
            $scope.processStarted = false;
        }, 1000)

    };


    $scope.downloadAllExperts = function () {

        $scope.processStarted = true;

        $scope.allExperts.forEach(function (toMatch) {
            toMatch.fullname = toMatch.title + ' ' + toMatch.firstname + ' ' + toMatch.lastname;
            var tempDate = new Date(toMatch.createdAt);
            toMatch.applyDate = tempDate.getDate() + '/' + (tempDate.getMonth()+1) + '/' + tempDate.getFullYear()
        });

        var customerstyle = {
            headers:true,
            columns: [
                { columnid: 'fullname', title: 'Customer Name'},
                { columnid: 'email', title: 'Email-ID'},
                { columnid: 'dob', title: 'Date Of Birth'},
                { columnid: 'companyName', title: 'Company Name'},
                { columnid: 'companyVAT', title: 'Company VAT' },
                { columnid: 'companyCountry', title: 'Company Country'},
                { columnid: 'city', title: 'City'},
                { columnid: 'address', title: 'Address'},
                { columnid: 'postalCode', title: 'Postal Code'},
                { columnid: 'phone', title: 'Phone'},
                { columnid: 'mobile', title: 'Mobile'},
                { columnid: 'username', title: 'User Name'},
                { columnid: 'applyDate', title: 'Apply Date'},
                { columnid: 'selectedSpeciality', title: 'Speciality'},
                { columnid: 'selectedCountriesText', title: 'Country'}
            ]
        };

        alasql('SELECT * INTO XLS("AllExpertsData' + '.xls",?) FROM ?', [customerstyle, $scope.allExperts]);
        $timeout(function () {
            $scope.processStarted = false;
        }, 1000)

    };

}]);