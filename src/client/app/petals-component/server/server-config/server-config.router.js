(function () {
    'use strict';

    var configServer = angular.module('app.configServer');

    var runFuntion = runFunction;

    configServer.run(runFuntion);

    runFunction.$inject = ['formlyConfig'];

    /* @ngInject */
    function runFunction(formlyConfig) {
/*
        formlyConfig.setType({
            name: 'input',
            template: '<input ng-model="model[options.key]">'
        });
*/
        formlyConfig.setType({
            name: 'details',
            template:
            '<div layout="row" layout-align="center stretch" class="md-text-content">' +
            '   <div style="text-align: start;white-space: nowrap;">{{to.label}}</div>' +
            '   <div flex style="min-width: 15px;"></div>' +
            '   <div style="text-align: right;white-space: nowrap;overflow: hidden;">' +
            '       <div style="float:right;"><b>{{(model[options.key])}}</b></div>' +
            '   </div>'+
            '</div>'
        });
        formlyConfig.setType({
            name: 'details2lines',
            template: '<div layout="column" layout-align="center stretch" class="md-text-content">' +
            '<div style="text-align: start">{{to.label}}</div>' +
            '<div style="text-align: start"><b>{{(model[options.key])}}</b></div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'detailsSub',
            template: '<div layout="row" layout-align="center stretch" class="md-text-content">' +
            '<div ng-model="model[options.key]">{{to.label}}</div>' +
            '<div ng-if="to.label && !to.labelSub" flex></div>' +
            '<div><md-icon ng-if="to.labelSub" class="md-accent material-icons" '+
            'md-svg-icon="mdicons:subdirectory-arrow-right"></md-icon>' +
            '{{to.labelSub}}</div>' +
            '<div ng-if="to.labelSub" flex></div>' +
            '<div style="text-align: end"><b>{{to.labelValue}}</b></div>' +
            '</div>'
        });
        formlyConfig.setType({
            name: 'detailsCenter',
            template: '<div layout-align="center center" class="md-text-content detailsCenter">' +
            '<div style="text-align: center">{{to.label}}<b>{{(model[options.key])}}</b></div>' +
            '</div>'
        });

/*
        formlyConfig.setWrapper({
            name: 'mdLabel',
            types: ['input'],
            template: '<label>{{to.label}}</label><formly-transclude></formly-transclude>'
        });

        formlyConfig.setWrapper({
            name: 'mdInputContainer',
            types: ['input'],
            template: '<md-input-container><formly-transclude></formly-transclude></md-input-container>'
        });

        formlyConfig.templateManipulators.preWrapper.push(function(template, options) {
            if (!options.data.icon) {
                return template;
            }
            return '<md-icon class="step" md-font-icon="icon-' + options.data.icon + '"></md-icon>' + template;
        });
*/
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
                        templateUrl: 'src/client/app/petals-component/server/server-config/server-config.html',
                        controllerAs: 'vmServerConfig'
                    }
                },
                onEnter: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.CONFIG');
                }],
                onReactivate: ['logger', function (logger) {
                    logger.debug('You are in WORKSPACE.PETALS.SERVER.CONFIG');
                }]
            });

    }
})();
