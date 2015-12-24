'use strict';

var coreApp = angular.module('core');
// Config HTTP Error Handling
coreApp.config(['$httpProvider', function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push(['$q', '$location', 'Authentication',
        function ($q, $location, Authentication) {
            return {
                responseError: function (rejection) {
                    switch (rejection.status) {
                        case 401:
                            // Deauthenticate the global user
                            Authentication.user = null;

                            // Redirect to signin page
                            $location.path('signin');
                            break;
                        case 403:
                            // Add unauthorized behaviour
                            break;
                    }

                    return $q.reject(rejection);
                }
            };
        }
    ]);
}
]);


//take all whitespace out of string

coreApp.filter('nospace', function () {

    return function (value) {

        return (!value) ? '' : value.replace(/ /g, '');

    };

});

//replace uppercase to regular case

coreApp.filter('humanizeDoc', function () {

    return function (doc) {

        if (!doc) return;

        if (doc.type === 'directive') {

            return doc.name.replace(/([A-Z])/g, function ($1) {

                return '-' + $1.toLowerCase();

            });

        }


        return doc.label || doc.name;

    };

});