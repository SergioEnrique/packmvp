angular.module('packmvp.userservice', [])

.service('userService', ['$http', function ($http) {
	this.registrarUsuario = function(name, pass){
		
		var data = {name: name, password: pass}

		$http.post('http://localhost:3000/api/users', data)
		.then(function (res) {
			var success = res.data.success
			if (success) alert("Te registraste satisfactoriamente")
			else alert("Error en la creación de usuario: "+res.data.message)
		})

	}
}])