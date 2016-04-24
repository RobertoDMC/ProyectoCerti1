function register(){
	var sex;

		if(document.getElementById('male').checked)
		{
			sex = "Male";
		}
		else
		{
			sex = "Female";
		}



		var res = '{'+'"datos":{'+
		'"username":' + '"'+ document.forms["registerForm"]["username"].value +'"'+ ',' +
		'"password":' + '"'+ document.forms["registerForm"]["password"].value +'"'+ ',' +
		'"email":'    + '"'+ document.forms["registerForm"]["email"].value    +'"'+ ',' +
		'"sex":'    + '"'+   sex    +'"'+ ',' +
		'"birthday":' + '"'+ document.forms["registerForm"]["birthday"].value +'"'+ 
		'}}';



		window.alert(res);
		
		console.log(res);
	}