angular.module('packmvp.signup', ['ui.router', 'packmvp.userservice'])

.config(['$stateProvider', function ($stateProvider)	 {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'templates/signup.html',
		controller: 'signupCtrl'
	})
}])

.controller('signupCtrl', ['$scope', '$state', 'userService',
function (                  $scope,   $state,   userService) {
	
	$scope.name = ''
	$scope.pass = ''

	$scope.registrar = function (name, pass) {
		userService.registrarUsuario(name, pass)
	}

}])