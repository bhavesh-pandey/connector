var connector = angular.module('connector', ['ui.router', 'ngAnimate', 'ngFileUpload']);

connector.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider

        .state('app',{
            url:'/',
            views: {
                'header': {
                    templateUrl: '/views/header.html',
                    controller: 'HeaderController'
                },
                'content': {
                    templateUrl: '/views/gotoHomePage.html'
                    /*controller: 'MainController'*/
                },
                'footer': {
                    templateUrl: '/views/footer.html',
                    controller: 'FooterController'
                }
            }
        })

        /*.state('app.about',{
            url:'about',
            views: {
                'content@': {
                    templateUrl: '/views/about.html',
                    controller: 'AboutController'
                }
            }
        })

        .state('app.products',{
            url:'products',
            views: {
                'content@': {
                    templateUrl: '/views/products.html',
                    controller: 'ProductsController'
                }
            }
        })

        .state('app.partners',{
            url:'partners',
            views: {
                'content@': {
                    templateUrl: '/views/partners.html',
                    controller: 'PartnersController'
                }
            }
        })

        .state('app.howitworks',{
            url:'howitworks',
            views: {
                'content@': {
                    templateUrl: '/views/howitworks.html',
                    controller: 'HowItWorksController'
                }
            }
        })

        .state('app.experts',{
            url:'experts',
            views: {
                'content@': {
                    templateUrl: '/views/experts.html',
                    controller: 'ExpertsController'
                }
            }
        })

        .state('app.contact',{
            url:'contact',
            views: {
                'content@': {
                    templateUrl: '/views/contact.html',
                    controller: 'ContactController'
                }
            }
        })

        .state('app.disclaimer',{
            url:'disclaimer',
            views: {
                'content@': {
                    templateUrl: '/views/disclaimer.html',
                    controller: 'DisclaimerController'
                }
            }
        })*/

        .state('app.customerlogin',{
            url:'customer/login',
            views: {
                'content@': {
                    templateUrl: '/views/gotoHomePage.html',
                    controller: 'CustomerLogin'
                }
            }
        })

        .state('app.customersignup',{
            url:'customer/signup',
            views: {
                'content@': {
                    templateUrl: '/views/gotoHomePage.html',
                    controller: 'CustomerSignup'
                }
            }
        })

        .state('app.customerlounge',{
            url:'customer-lounge',
            views: {
                'content@': {
                    templateUrl: '/views/customerLounge.html',
                    controller: 'CustomerLoungeController'
                }
            }
        })

        .state('app.customerconfirmed',{
            url:'customer-confirmed',
            views: {
                'content@': {
                    templateUrl: '/views/customerSignupConfirmation.html',
                    controller: 'CustomerConfirmedController'
                }
            }
        })

        .state('app.talk',{
            url:'talk',
            views: {
                'content@': {
                    templateUrl: '/views/talk.html',
                    controller: 'TalkController'
                }
            }
        })

        .state('app.newrequest',{
            url:'new-request',
            views: {
                'content@': {
                    templateUrl: '/views/newCustomerRequest.html',
                    controller: 'NewRequestController'
                }
            }
        })

        .state('app.confirmrequest',{
            url:'confirm-request',
            views: {
                'content@': {
                    templateUrl: '/views/confirmCustomerRequest.html',
                    controller: 'ConfirmRequestController'
                }
            }
        })

        .state('app.requestcomplete',{
            url:'request-completed',
            views: {
                'content@': {
                    templateUrl: '/views/customerRequestCompleted.html',
                    controller: 'RequestCompletedController'
                }
            }
        })

        .state('app.sharepoint',{
            url:'sharepoint',
            views: {
                'content@': {
                    templateUrl: '/views/sharepoint.html',
                    controller: 'SharepointController'
                }
            }
        })

        .state('app.articles',{
            url:'articles',
            views: {
                'content@': {
                    templateUrl: '/views/articles.html',
                    controller: 'ArticlesController'
                }
            }
        })

        .state('app.profile',{
            url:'profile',
            views: {
                'content@': {
                    templateUrl: '/views/profile.html',
                    controller: 'ProfileController'
                }
            }
        })

        /*.state('app.expertintro',{
            url:'expert-introduction',
            views: {
                'content@': {
                    templateUrl: '/views/expertIntroduction.html',
                    controller: 'ExpertIntroController'
                }
            }
        })*/

        .state('app.expertlogin',{
            url:'expert/login',
            views: {
                'content@': {
                    templateUrl: '/views/gotoHomePage.html',
                    controller: 'ExpertLogin'
                }
            }
        })

        .state('app.expertsignup',{
            url:'expert/signup',
            views: {
                'content@': {
                    templateUrl: '/views/gotoHomePage.html',
                    controller: 'ExpertSignup'
                }
            }
        })

        .state('app.expertapplied',{
            url:'expert-applied',
            views: {
                'content@': {
                    templateUrl: '/views/expertApplied.html',
                    controller: 'ExpertAppliedController'
                }
            }
        })

        .state('app.expertlounge',{
            url:'expert-lounge',
            views: {
                'content@': {
                    templateUrl: '/views/expertLounge.html',
                    controller: 'ExpertLoungeController'
                }
            }
        })

        .state('app.expertprofile',{
            url:'expert-profile',
            views: {
                'content@': {
                    templateUrl: '/views/expertProfile.html',
                    controller: 'ExpertProfileController'
                }
            }
        })

        .state('app.experttalk',{
            url:'expert-talk',
            views: {
                'content@': {
                    templateUrl: '/views/expertTalk.html',
                    controller: 'ExpertTalkController'
                }
            }
        })

        .state('app.management',{
            url:'management',
            views: {
                'content@': {
                    templateUrl: '/views/management.html',
                    controller: 'ManageController'
                },
                'footer@': {}
            }
        })

        .state('app.forgotpassword',{
            url:'forgot-password',
            views: {
                'content@': {
                    templateUrl: '/views/forgotPassword.html',
                    controller: 'ForgotPasswordController'
                }
            }
        })

        .state('app.forgotpasswordconfirmation',{
            url:'forgot-password-done',
            views: {
                'content@': {
                    templateUrl: '/views/forgotPasswordConfirmation.html',
                    controller: 'ForgotPasswordConfirmation'
                }
            }
        })

        .state('app.resetpassword',{
            url:'reset-password/:token',
            views: {
                'content@': {
                    templateUrl: '/views/resetPassword.html',
                    controller: 'ResetPasswordController'
                }
            }
        })

        .state('app.resetpasswordconfirmation',{
            url:'reset-password-done',
            views: {
                'content@': {
                    templateUrl: '/views/resetPasswordConfirmation.html',
                    controller: 'ResetPasswordConfirmation'
                }
            }
        })

        .state('app.expertforgotpassword',{
            url:'expert-forgot-password',
            views: {
                'content@': {
                    templateUrl: '/views/expertForgotPassword.html',
                    controller: 'ExpertForgotPasswordController'
                }
            }
        })

        .state('app.expertforgotpasswordconfirmation',{
            url:'expert-forgot-password-done',
            views: {
                'content@': {
                    templateUrl: '/views/expertForgotPasswordConfirmation.html',
                    controller: 'ExpertForgotPasswordConfirmation'
                }
            }
        })

        .state('app.expertresetpassword',{
            url:'expert-reset-password/:token',
            views: {
                'content@': {
                    templateUrl: '/views/expertResetPassword.html',
                    controller: 'ExpertResetPasswordController'
                }
            }
        })

        .state('app.expertresetpasswordconfirmation',{
            url:'expert-reset-password-done',
            views: {
                'content@': {
                    templateUrl: '/views/expertResetPasswordConfirmation.html',
                    controller: 'ExpertResetPasswordConfirmation'
                }
            }
        })

        .state('app.scrollDown', {
            onEnter: function () {
                $('html, body').animate({
                    scrollTop: $("#scrollToThis").offset().top
                }, 800);
                $state.go('app');
            }
        });


    $locationProvider.html5Mode({
        enabled: true
    });
    $urlRouterProvider.otherwise('/');

});


connector.run(function ($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
});
