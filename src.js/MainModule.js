angular.module('MainModule', ['ngRoute'])

    .constant('API_URL', "nevim-kam-rekni-mi-to")

    .config(function ($routeProvider) {

            $routeProvider.when('/', {
                controller: "LoginCtrl",
                templateUrl: 'login.html'
            });

            $routeProvider.otherwise({redirectTo: '/'});
        });