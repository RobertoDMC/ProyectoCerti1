var app = angular.module("loadGenres",[]);
app.controller("genreController", function($scope)
{
	$scope.genres = [
   	{ 
   		"value" : "Action"
   	},
   	{ 
   		"value" : "Comedy"
   	},
      { 
         "value" : "Much WOW"
      },
      { 
         "value" : "Horros"
      },
      { 
         "value" : "History"
      },
   	{ 
   		"value" : "Drama"
   	}	 
   	];
});