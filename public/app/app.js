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

.config(['$httpProvider', 'jwtInterceptorProvider',
function ($httpProvider,   jwtInterceptorProvider) {
	jwtInterceptorProvider.tokenGetter = ['userService', function(userService) {
		return userService.getToken()
	}];

	$httpProvider.interceptors.push('jwtInterceptor')
}])

.config(['$authProvider', function($authProvider) {

    // Optional: For client-side use (Implicit Grant), set responseType to 'token'
    $authProvider.facebook({
        clientId: '1735934219967520'
        // responseType: 'token'
    })

}])

.config(['$urlRouterProvider', function ($urlRouterProvider) {
	$urlRouterProvider.otherwise('/dashboard')
}])