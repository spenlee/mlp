var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial', 'ngTable', 'ngTableToCsv'
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


.controller('PackageCtrl', ['$scope', 'packages', 'ngTableParams', '$filter', '$mdDialog', '$http', 'Packages',
	function($scope, packages, ngTableParams, $filter, $mdDialog, $http, Packages){

	$scope.items = packages;

	$scope.packages = new ngTableParams({
		page: 1,
		count: 10
	}, {
		getData: function ($defer, params) {
			$scope.data = params.sorting() ? $filter('orderBy')($scope.items, params.orderBy()) : $scope.items;
			$scope.data = params.filter() ? $filter('filter')($scope.data, params.filter()) : $scope.data;
			$scope.data = $scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count());
			params.total($scope.data.length);
			$defer.resolve($scope.data);
		}
	});

	$scope.addPackage = addPackage;

	function addPackage($event) {
		var parentEl = angular.element(document.body);
		$mdDialog.show({
			parent: parentEl,
			targetEvent: $event,
			templateUrl:'/static/templates/addPackage.html',
			controller: 'AddPackageController'
		})
		.then(function(item) {
			$scope.packages['data'].push(item);
			$scope.showSuccess();
		}), function() {
			$scope.showFail();
		};
	}

	$scope.delPackage = delPackage;

	function delPackage($event, item) {

		item.archived = true;

		$http.patch('/api/packages/'+item.tracking_number, item)
		.then( function(res) {
			var i = 0;
			while (item.tracking_number !== $scope.packages['data'][i].tracking_number) {
				i++;
			}
			$scope.packages['data'].splice(i, 1);
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
			$mdDialog.hide(response);
		})
	}

	$scope.closeDialog = function () {
		$mdDialog.cancel();
	}
}])


.factory('Packages', ['Restangular', function (Restangular) {
	return Restangular.service('api/packages');
}]);

