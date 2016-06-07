var environment = (function() {
	function setEnv(){
		var env = "http://petoandme.com/API/api/petappapi.php"
		return env;
	}
	function setImageEnv() {
		var env = "http://petoandme.com/API/"
		return env;
	}
	return {
		getImageEnv : setImageEnv,
		getEnv : setEnv
	}
})()
