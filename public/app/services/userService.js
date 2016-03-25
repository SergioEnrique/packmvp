angular.module('packmvp.userservice', ['ngStorage', 'angular-jwt'])

.service('userService', ['$http', '$localStorage', 'config', 'jwtHelper',
function (                $http,   $localStorage,   config,   jwtHelper) {

	this.registrarUsuario = function(name, pass, callback){
		
		var data = {name: name, password: pass}

		$http.post(config.apiUrl+'/users', data)
		.then(function (res) {
			if (res.data.success) alert("Te registraste satisfactoriamente")
			else alert("Error en la creación de usuario: "+res.data.message)
			callback()
		})
	}

	this.signIn = function (name, pass, success) {
		
		var data = {name: name, password: pass}

		$http.post(config.apiUrl+'/auth', data)
		.then(function (res) {
			if (res.data.success) {
				var token = res.data.token
				$localStorage.token = token
				var tokenPayload = jwtHelper.decodeToken(token)
				$localStorage.username = tokenPayload.name
				success()
			}
			else
				console.log("Error: "+res.data.message)			
		})
	}

	this.getUsers = function (callback) {

		$http.get(config.apiUrl+'/users')
		.then(function (res) {
			if (res.data.success) {
				var users = res.data.users
				callback(users)
			}
			else
				console.log("Error: "+res.data.message)			
		})
	}

	this.getToken = function () {
		return $localStorage.token
	}

}])
