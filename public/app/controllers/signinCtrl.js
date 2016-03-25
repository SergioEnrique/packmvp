angular.module('packmvp.signin', ['ui.router', 'packmvp.userservice'])

.config(['$stateProvider', function ($stateProvider)	 {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/signin.html',
		controller: 'signinCtrl'
	})
}])

.controller('signinCtrl', ['$scope', '$auth', '$state', 'userService',
function (                  $scope,   $auth,   $state,   userService) {

	$scope.name = ''
	$scope.pass = ''

	$scope.signin = function (name, pass) {
		userService.signIn(name, pass, function () {
			console.log('Sesión correcta')
		})
	}

	$scope.authenticate = function(provider) {
        $auth.authenticate(provider)
    }

}])