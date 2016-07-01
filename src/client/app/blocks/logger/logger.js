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
                    .theme('yellow')
                    .hideDelay(6000)
                    .position('top left')
            );

            $log.log('log: ' + message);
        }

        function info(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Info: ' + message)
                    .theme('blue')
                    .hideDelay(6000)
                    .position('bottom left')
            );

            $log.info('info: ' + message);
        }

        function success(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Success: ' + message)
                    .theme('green')
                    .hideDelay(3000)
                    .position('bottom left')
            );

            $log.info('success: ' + message);
        }

        function warn(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Warning: ' + message)
                    .theme('orange')
                    .hideDelay(6000)
                    .position('bottom right')
            );

            $log.warn('warn: ' + message);
        }

        function error(message) {
            $mdToast.show(
                $mdToast.simple()
                    .content('Error: ' + message)
                    .theme('red')
                    .hideDelay(6000)
                    .position('bottom right')
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
