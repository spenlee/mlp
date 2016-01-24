var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial', 'md.data.table'
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


.controller('PackageCtrl', ['$scope', '$filter', '$mdDialog', '$http', 'Packages', 'packages',
	function($scope, $filter, $mdDialog, $http, Packages, packages){

	$scope.selected = [];

	$scope.packages = packages;

	$scope.query = {
		order: 'name',
		limit: 10,
		page: 1
	};

	function getPackages() {
		$scope.promise = Packages.getList().$promise;
	}

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
			var i = 0;
			while (item.tracking_number !== $scope.packages[i].tracking_number) {
				i++;
			}
			$scope.packages.splice(i, 1);
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
		);
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
		);
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

