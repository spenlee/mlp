var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial', 'md.data.table', 'ngSanitize', 'ngCsv'
])


.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('deep-purple')
    .accentPalette('light-blue');
})


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


.controller('PackageCtrl', ['$scope', '$filter', '$mdDialog', '$http', 'packages', 'Restangular',
	function($scope, $filter, $mdDialog, $http, packages, Restangular){

	$scope.selected = [];

	$scope.packages = packages;

	$scope.query = {
		order: 'name',
		limit: 10,
		page: 1
	};

	$scope.getArray = getArray;

	function getArray() {
		return Restangular.stripRestangular($scope.selected);
	};

	$scope.addPackage = addPackage;

	function addPackage($event) {
		var parentEl = angular.element(document.body);
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'/static/templates/addPackage.html',
			controller: 'AddPackageController'
		})
	}

	$scope.delPackage = delPackage;

	function delPackage($event, item) {

		item.archived = true;

		$http.patch('/api/packages/'+item.tracking_number, item)
		.then( function(res) {
			$scope.showSuccess();
		}, function(error) {
			$scope.showFail();
		});
	}

	$scope.showSuccess = showSuccess;

	function showSuccess() {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Success!')
				.textContent('Yes.')
				.ariaLabel('Success Dialog')
				.ok('Got it!')
		).then(function(res) {
			window.location.reload();
		});
	};

	$scope.showFail = showFail;

	function showFail() {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Oh no!')
				.textContent('Error occurred.')
				.ariaLabel('Error Dialog')
				.ok('Ok')
		);
	};
}])


.controller('AddPackageController', ['$scope', '$mdDialog', 'Packages', function ($scope, $mdDialog, Packages) {
	$scope.form = {};

	$scope.logPackage = logPackage;

	function logPackage() {
		Packages.post($scope.form)

		.then(function(response) {
			$scope.showSuccess();
		}, function(res) {
			$scope.showFail();
		});
	}

	$scope.showSuccess = showSuccess;

	function showSuccess() {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Success!')
				.textContent('Yes.')
				.ariaLabel('Success Dialog')
				.ok('Got it!')
		).then(function(res) {
			window.location.reload();
		});
	};

	// X close in top corner
	$scope.closeDialog = function () {
		$mdDialog.cancel();
	}

	$scope.showFail = showFail;

	function showFail() {
		$mdDialog.show(
			$mdDialog.alert()
				.parent(angular.element(document.querySelector('#popupContainer')))
				.clickOutsideToClose(true)
				.title('Oh no!')
				.textContent('Error occurred.')
				.ariaLabel('Error Dialog')
				.ok('Ok')
		);
	};
}])


.factory('Packages', ['Restangular', function (Restangular) {
	return Restangular.service('api/packages');
}]);

