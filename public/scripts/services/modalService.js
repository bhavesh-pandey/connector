connector.service('ModalService', function () {
    this.openLoginModal = function () {
        $('.ui.basic.modal.login-modal')
            .modal('show')
        ;
    };

    this.openExpertLoginModal = function () {
        $('.ui.basic.modal.expert-login-modal')
            .modal('show')
        ;
    };

    this.openSignupModal = function () {
        $('.ui.basic.modal.signup-modal')
            .modal('show')
        ;
    };

    this.openExpertSignupModal = function () {
        $('.ui.basic.modal.expert-signup-modal')
            .modal('show')
        ;
    };

    this.logoutModal = function () {
        $('.ui.basic.modal.logout-modal')
            .modal('show')
        ;
    };
});
