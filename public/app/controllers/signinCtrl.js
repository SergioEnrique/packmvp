angular.module('packmvp.signin', ['ui.router', 'satellizer', 'packmvp.userservice'])

.config(['$stateProvider', function ($stateProvider)	 {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: 'templates/signin.html',
		controller: 'signinCtrl'
	})
}])

.controller('signinCtrl', ['$scope', '$auth', '$state', 'userService',
function (                  $scope,   $auth,   $state,   userService) {

	$scope.isAuthenticated = function() {
		return $auth.isAuthenticated();
	};

	$scope.authenticate = function(provider) {
        $auth.authenticate(provider)
    }

}])