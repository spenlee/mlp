var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial',
])


/*.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('orange');
})*/


.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/static/templates/home.html',
			controller: 'MainCtrl'
		})

		.state('packages', {
			url: '/packages',
			templateUrl: '/static/templates/packageList.html',
			controller: 'PackageCtrl',
			resolve: {
				'packages': ['Packages', function(Packages) {
						return Packages.getList();
					}
				]
			}
		});

	$urlRouterProvider.otherwise('/');
})


.controller('MainCtrl', ['$scope', function($scope){
	$scope.test = "Welcome to My Little Package!";
}])


.controller('PackageCtrl', ['$scope', 'packages', function($scope, packages){
	$scope.packages = packages;
}])

.factory('Packages', ['Restangular', function (Restangular) {
	return Restangular.service('api/packages');
}]);

