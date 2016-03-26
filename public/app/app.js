angular.module('packmvp', [
	'ngStorage',
	'satellizer',
	'angular-jwt',
	'packmvp.signup',
	'packmvp.signin',
	'packmvp.dashboard'
])

.constant('config', {
	apiUrl: 'http://localhost:3000/api'
})

.config(['$authProvider', function($authProvider) {

    $authProvider.facebook({
    	url: '/api/auth/facebook',
        clientId: '1735934219967520'
    })

}])

.config(['$urlRouterProvider', function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/dashboard')
}])