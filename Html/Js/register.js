function register(){
		var res = '{'+'"datos":{'+
		'"username":' + '"'+ document.forms["registerForm"]["username"].value +'"'+ ',' +
		'"password":' + '"'+ document.forms["registerForm"]["password"].value +'"'+ ',' +
		'"email":'    + '"'+ document.forms["registerForm"]["email"].value    +'"'+ ',' +
		'"birthday":' + '"'+ document.forms["registerForm"]["birthday"].value +'"'+ 
		'}}';

		window.alert(res);
		
		console.log(res);
	}