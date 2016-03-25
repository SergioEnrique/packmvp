angular.module('packmvp.dashboard', ['ui.router', 'packmvp.userservice'])

.config(['$stateProvider', function ($stateProvider) {
	$stateProvider.state('dashboard', {
		url: '/dashboard',
		templateUrl: 'templates/dashboard.html',
		controller: 'dashboardCtrl'
	})
}])

.controller('dashboardCtrl', ['$scope', '$state', 'userService',
function (                     $scope,   $state,   userService) {
	
	$scope.users = []

	userService.getUsers(function (users) {
		$scope.users = users
	})

}])