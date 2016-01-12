'use strict';

var app = angular.module('core');

app.directive('dirComponentDisplay',
    function ($mdSidenav) {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/component-display.client.view.html',
            link: function ($scope, element, attrs) {
                $scope.isOpenLeft = function(){
                    /*console.log('Test !!!' + $mdSidenav('left').isOpen());*/
                    return $mdSidenav('left').isOpen();
                };
            }
        };
    }
);

app.directive('dirMultipleNav',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/nav-display.client.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirComponentTree',
    function () {

        return {
            restrict: 'E',
/*            scope: {
                allItems: '='
            },*/
            transclude: true,
            templateUrl: '/modules/core/views/component-tree.client.view.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirOverviewTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/overview.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirOperationTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/overview.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirMonitorTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/monitor.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirConfigTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/configuration.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirLogTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/log.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirFlowTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/flow.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirUserTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/user.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

app.directive('dirSidenavTemplate',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/modules/core/views/sidenav.template.html',
            link: function ($scope, element, attrs) {

            }
        };
    }
);

/*app.directive('dirBtnMenu',
    function () {

        return {
            restrict: 'E',
            transclude: true,
            template: '<md-tab id="tab1" ng-disabled="datas.overviewLocked" ng-click="toggleLeft()" ng-hide="isOpenLeft();"><md-tab-label class=""><md-tooltip md-direction="bottom">Menu</md-tooltip><i class="material-icons md-24">{{datas.menuIcon}}</i></md-tab-label></md-tab>',
            link: function ($scope, element, attrs) {

            }
        };
    }
);*/


app.directive('yaTree',
    function () {

        return {
            restrict: 'A',
            transclude: 'element',
            priority: 1000,
            terminal: true,
            compile: function (tElement, tAttrs, transclude) {

                var repeatExpr, childExpr, rootExpr, childrenExpr, branchExpr;

                repeatExpr = tAttrs.yaTree.match(/^(.*) in ((?:.*\.)?(.*)) at (.*)$/);
                childExpr = repeatExpr[1];
                rootExpr = repeatExpr[2];
                childrenExpr = repeatExpr[3];
                branchExpr = repeatExpr[4];

                return function link(scope, element, attrs) {

                    var rootElement = element[0].parentNode,
                        cache = [];

                    // Reverse lookup object to avoid re-rendering elements
                    function lookup(child) {
                        var i = cache.length;
                        while (i--) {
                            if (cache[i].scope[childExpr] === child) {
                                return cache.splice(i, 1)[0];
                            }
                        }
                    }

                    scope.$watch(rootExpr, function (root) {

                        var currentCache = [];

                        // Recurse the data structure
                        (function walk(children, parentNode, parentScope, depth) {

                            var i = 0,
                                n = children.length,
                                last = n - 1,
                                cursor,
                                child,
                                cached,
                                childScope,
                                grandchildren;

                            // Iterate the children at the current level
                            for (i; i < n; ++i) {

                                // We will compare the cached element to the element in
                                // at the destination index. If it does not match, then
                                // the cached element is being moved into this position.
                                cursor = parentNode.childNodes[i];

                                child = children[i];

                                // See if this child has been previously rendered
                                // using a reverse lookup by object reference
                                cached = lookup(child);

                                // If the parentScope no longer matches, we've moved.
                                // We'll have to transclude again so that scopes
                                // and controllers are properly inherited
                                if (cached && cached.parentScope !== parentScope) {
                                    cache.push(cached);
                                    cached = null;
                                }

                                // If it has not, render a new element and prepare its scope
                                // We also cache a reference to its branch node which will
                                // be used as the parentNode in the next level of recursion
                                if (!cached) {
                                    transclude(parentScope.$new(), function (clone, childScope) {

                                        childScope[childExpr] = child;

                                        cached = {
                                            scope: childScope,
                                            parentScope: parentScope,
                                            element: clone[0],
                                            branch: clone.find(branchExpr)[0]
                                        };

                                        // This had to happen during transclusion so inherited
                                        // controllers, among other things, work properly
                                        parentNode.insertBefore(cached.element, cursor);

                                    });
                                } else if (cached.element !== cursor) {
                                    parentNode.insertBefore(cached.element, cursor);
                                }

                                // Lets's set some scope values
                                childScope = cached.scope;

                                // Store the current depth on the scope in case you want
                                // to use it (for good or evil, no judgment).
                                childScope.$depth = depth;

                                // Emulate some ng-repeat values
                                childScope.$index = i;
                                childScope.$first = (i === 0);
                                childScope.$last = (i === last);
                                childScope.$middle = !(childScope.$first || childScope.$last);

                                // Push the object onto the new cache which will replace
                                // the old cache at the end of the walk.
                                currentCache.push(cached);

                                // If the child has children of its own, recurse 'em.
                                grandchildren = child[childrenExpr];
                                if (grandchildren && grandchildren.length) {
                                    walk(grandchildren, cached.branch, childScope, depth + 1);
                                }
                            }
                        })(root, rootElement, scope, 0);

                        // Cleanup objects which have been removed.
                        // Remove DOM elements and destroy scopes to prevent memory leaks.
                        var i = cache.length;

                        while (i--) {
                            var cached = cache[i];
                            if (cached.scope) {
                                cached.scope.$destroy();
                            }
                            if (cached.element) {
                                cached.element.parentNode.removeChild(cached.element);
                            }
                        }

                        // Replace previous cache.
                        cache = currentCache;

                    }, true);
                };
            }
        };
    });