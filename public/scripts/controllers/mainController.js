connector.controller('MainController', ['$http', '$scope', '$stateParams', '$state', '$rootScope', 'ModalService', function ($http, $scope, $stateParams, $state, $rootScope, ModalService) {

    $scope.login = function () {
        ModalService.openLoginModal()
    };

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

    $scope.loginExpert = function () {
        ModalService.openExpertLoginModal()
    };
    
    $scope.signupExpert = function () {
        $state.go('app.expertintro');
    };

    $rootScope.selectedMenu = 1;

    $( ".right-image" ).hover(function () {
        $(".right-image").css( "right", "0%" );
        $(".left-image").css( "left", "-10%" );
    }, function () {
        $(".right-image").css( "right", "-5%" );
        $(".left-image").css( "left", "-5%" );
    });

    $( ".left-image" ).hover(function () {
        $(".left-image").css( "left", "0%" );
        $(".right-image").css( "right", "-10%" );
    }, function () {
        $(".left-image").css( "left", "-5%" );
        $(".right-image").css( "right", "-5%" );
    });

    $('.ui.embed').embed();

}]);