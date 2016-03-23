angular.module('packmvp', [
	'packmvp.signup'
])

.config(['$urlRouterProvider', function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/signup')
}])