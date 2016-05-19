(function () {
    'use strict';

    var configServer = angular.module('petalsComponent.server.config');

    var runFuntion = runFunction;

    configServer.run(runFuntion);

    runFunction.$inject = ['formlyConfig'];

    /* @ngInject */
    function runFunction(formlyConfig) {
        formlyConfig.setType({
            name: 'input',
            template: '<div layout-gt-sm="row">' +
            '<md-input-container class="md-block" flex-gt-xs>' +
            '<label>{{to.label}}</label>' +
            '<input ng-model="model[options.key]" style="white-space: nowrap;">' +
            '</md-input-container>'
        });
        formlyConfig.setType({
            name: 'inputDetailsSub',
            template: '<div layout-align="center stretch" class="md-text-content">' +
            '<div style="text-align: start"><md-icon class="md-accent material-icons" '+
            'md-svg-icon="mdicons:subdirectory-arrow-right"></md-icon>' +
            '{{to.label}}</div>' +
            '<div style="text-align: start; white-space: nowrap;" flex><b>{{(model[options.key])}}</b></div>' +
            '</div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'details',
            template: '<div layout="row" layout-align="center stretch" class="md-text-content">' +
            '<div style="text-align: start;white-space: nowrap;">{{to.label}}</div>' +
            '<div flex style="min-width: 15px;"></div>' +
            '<div style="white-space: nowrap;overflow: hidden;">' +
            '<div style="float:right; white-space: nowrap;"><b>{{(model[options.key])}}</b></div>' +
            '</div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'details2lines',
            template: '<div layout="row" layout-align="center stretch" class="md-text-content">' +
            '<div style="text-align: start">{{to.label}}</div>' +
            '<div style="text-align: start"><b>{{(model[options.key])}}</b></div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'detailsSub',
            template: '<div layout-align="center stretch">' +
            '<div style="text-align: start"><md-icon ng-if="to.labelSub" class="md-accent material-icons" '+
            'md-svg-icon="mdicons:subdirectory-arrow-right"></md-icon>' +
            '{{to.labelSub}}</div>' +
            '<div ng-model="model[options.key]">{{to.label}}</div>' +
            '<div style="text-align: start; white-space: nowrap;" flex><b>{{(model[options.key])}}</b></div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'detailsCenter',
            template: '<div layout="row" layout-align="center center" class="md-text-content detailsCenter">' +
            '<div style="text-align: center">{{to.label}}<b>{{(model[options.key])}}</b></div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'switchCustom',
            'extends': 'switch',
            template: '<md-switch ng-model="model[options.key]">' +
            '<div style="text-align: center">{{to.label}}<br><b>{{(model[options.key])}}</b></div>' +
            '</md-switch>'
        });
        formlyConfig.setType({
            name: 'checkboxVisibility',
            'extends': 'checkbox',
            template: '<md-checkbox layout="row" ng-model="model[options.key]" layout-align="center stretch">' +
            '<div style="text-align: start; white-space: nowrap;" flex>' +
            '<p ng-if="model.checkPwd">{{to.show}}</p>' +
            '<p ng-if="!model.checkPwd">{{to.hide}}</p>' +
            '</div>' +
            '</md-checkbox>'
        });
        /* For ipAddress */
        formlyConfig.setType({
            name: 'ipAddress',
            'extends' : 'input',
            defaultOptions: {
                validators: {
                    ipAddress: function(viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /(\d{1,3}\.){3}\d{1,3}/.test(value);
                    }
                }
            }
        });
        /* For input with numbers only */
        formlyConfig.setType({
            name: 'intInput',
            'extends' : 'input',
            defaultOptions: {
                validators: {
                    intInput: function(viewValue, modelValue) {
                        var value = modelValue || viewValue;
                        return /(^[0-9]*$)/.test(value);
                    }
                }
            }
        });
    }

    configServer.config(configFunction);

    configFunction.$inject = ['$stateProvider'];

    /* @ngInject */
    function configFunction($stateProvider) {

        $stateProvider
            .state('home.workspace.petals.server.config', {
                url: '/config',
                views: {
                    'petals-console': {
                        controller: 'ConfigServerController',
                        templateUrl: 'src/client/app/petals-component/server/config/config.html',
                        controllerAs: 'vmServerConfig'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You reactivate WORKSPACE.PETALS.SERVER.CONFIG');
                }]
            });

    }
})();
