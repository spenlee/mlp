var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial', 'ngTable'
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


.controller('PackageCtrl', ['$scope', 'packages', 'ngTableParams', '$filter',
	function($scope, packages, ngTableParams, $filter){

	$scope.items = packages;

	$scope.packages = new ngTableParams({
		page: 1,
		count: 10
	}, {
		getData: function ($defer, params) {
			$scope.data = params.sorting() ? $filter('orderBy')($scope.items, params.orderBy()) : $scope.items;
			$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
			$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
			$defer.resolve($scope.data);
		}
	});
}])

.factory('Packages', ['Restangular', function (Restangular) {
	return Restangular.service('api/packages');
}]);

