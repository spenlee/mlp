
var app = angular.module('drf-angular', [
	'ui.router'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '/static/templates/home.html',
			controller: 'MainCtrl'
		})

		.state('packages', {
			url: '/packages',
			templateUrl: '/static/templates/packageList.html',
			controller: 'PackageCtrl'
		});

	$urlRouterProvider.otherwise('/');
});

app.controller('MainCtrl', ['$scope', function( $scope ){
	$scope.test = "I come from the angularz";
}]);

app.controller('PackageCtrl', [ '$scope', function($scope){
	$scope.packages = "Packages";
}]);
