function validatePassword()
{
	var password = document.forms["registerForm"]["password"].value;
	var passwordValidation = document.forms["registerForm"]["passwordValidation"].value;
	var compareResult = password.localeCompare(passwordValidation);
	if(compareResult!=0)
	{
		alert("Passwords do not match");
	}
}	