(function() {

    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', '$mdToast'];

    /* @ngInject */
    function logger($log, $mdToast) {

        var service = {
            log     : log,
            info    : info,
            success : success,
            warn    : warn,
            error   : error,
            debug   : debug
        };

        return service;
        /////////////////////

        function log(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Log: ' + message)
                    .theme('red')
                    .hideDelay(8000)
                    .position('bottom')
            );

            $log.log('log: ' + message);
        }

        function info(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Info: ' + message)
                    .theme('blue')
                    .hideDelay(8000)
                    .position('bottom')
            );

            $log.info('info: ' + message);
        }

        function success(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Success: ' + message)
                    .theme('green')
                    .hideDelay(8000)
                    .position('bottom')
            );

            $log.info('success: ' + message);
        }

        function warn(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Warning: ' + message)
                    .theme('orange')
                    .hideDelay(8000)
                    .position('bottom')
            );

            $log.warn('warn: ' + message);
        }

        function error(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Error: ' + message)
                    .theme('red')
                    .hideDelay(8000)
                    .position('bottom')
            );

            $log.error('error: ' + message);
        }

        function debug(message) {
/*
            $mdToast.show(
                $mdToast.simple()
                    .content('Debug: ' + message)
                    .theme('red')
                    .hideDelay(8000)
                    .position('bottom')
            );

*/
            $log.debug('debug: ' + message);
        }
    }
}());
