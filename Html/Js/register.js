var res;
var sex;

function validatePassword()
{
	var password = document.forms["registerForm"]["password"].value;
	var passwordValidation = document.forms["registerForm"]["passwordValidation"].value;
	var compareResult = password.localeCompare(passwordValidation);
	
	return compareResult;
}	

function checkSex()
{
	if(document.getElementById('male').checked)
	{
		sex = "Male";
	}
	else
	{
		sex = "Female";
	}
}

function buildJson()
{
	res = '{'+'"datos":{'+
	'"username":' + '"'+ document.forms["registerForm"]["username"].value +'"'+ ',' +
	'"password":' + '"'+ document.forms["registerForm"]["password"].value +'"'+ ',' +
	'"email":'    + '"'+ document.forms["registerForm"]["email"].value    +'"'+ ',' +
	'"sex":'    + '"'+   sex    +'"'+ ',' +
	'"birthday":' + '"'+ document.forms["registerForm"]["birthday"].value +'"'+ 
	'}}';

	window.alert(res);
}

function register()
{

	if(validatePassword()!=0)
	{
		alert("Passwords do not match");
	}
	else
	{
		checkSex();
		buildJson();
	}

}