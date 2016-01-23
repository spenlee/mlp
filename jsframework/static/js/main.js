var app = angular.module('drf-angular', [
	'ui.router', 'restangular', 'ngMaterial', 'ngTable'
])


/*.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('orange');
})*/


/*.config(function(RestangularProvider) {
	RestangularProvider.setDefaultHeaders({
		'Content-Type': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	});
	RestangularProvider.setDefaultHttpFields({
		'withCredentials': true
	});
})

.config([
	'$httpProvider',
	function($httpProvider) {
		$httpProvider.defaults.withCredentials = true;
		$httpProvider.defaults.useXDomain = true;
  		delete $httpProvider.defaults.headers.common['X-Requested-With'];
	}
])

.run(['$cookies', '$http', function($cookies, $http) {
		$http.defaults.headers.common['X-CSRFToken'] = $cookies.get('csrftoken');
	}
])*/


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


.controller('PackageCtrl', ['$scope', 'packages', 'ngTableParams', '$filter', '$mdDialog', 'Restangular', '$http',
	function($scope, packages, ngTableParams, $filter, $mdDialog, Restangular, $http){

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
			$scope.items.push(item);
			$scope.showSuccess();
		}), function() {
			$scope.showFail();
		};
	}

	$scope.delPackage = delPackage;

	function delPackage($event, item) {
		/*Restangular.one('api/packages', item.tracking_number).get()

		.then(function(res) {
			res.archived = true;
			res.save()

				.then(function (res) {
					var i = 0;
					while (item.tracking_number !== $scope.packages[i]) {
						i++;
					}
					$scope.splice($scope.indexOf(i), 1);
					$scope.showSuccess();
				}, function (error) {
					console.log(error);
					$scope.showFail();
				});
		}, function (error) {
			console.log(error);
			$scope.showFail();
		});*/

		item.archived = true;

		$http.patch('/api/packages/'+item.tracking_number, item)
		.then( function(res) {
			var i = 0;
			while (item.tracking_number !== $scope.packages[i]) {
				i++;
			}
			$scope.splice($scope.indexOf(i), 1);
			$scope.showSuccess();
		}, function(error) {
			console.log(error);
			$scope.showFail();
		});



		/*item.remove()

		.then( function(res) {
			$scope.showSuccess();
		}, function(error) {
			console.log(error);
			$scope.showFail();
		});
*/

		/*item.archived = true;

		item.put()

		.then(function(res) {
			var i = 0;
			while (item.tracking_number !== $scope.packages[i]) {
				i++;
			}
			$scope.splice($scope.indexOf(i), 1);
			$scope.showSuccess();
		}, function(error) {
			console.log(error);
			$scope.showFail();
		});*/
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

