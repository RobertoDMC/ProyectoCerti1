var app = angular.module("moobeez",[]);
app.controller("movieController", function($scope)
{
	$scope.movies = [
   	{ 
   		"title" : "Doge the Movie" , 
   		"genre" : "Much WOW",
   		"year"  : "2016",
   		"cover" : "Imagenes/doge.png" 
   	},
   	{ 
   		"title" : "Batman vs Superman",
   		"genre" : "Accion",
   		"year"  : "2016",
   		"cover" : "Imagenes/bvs.png" 
   	},
   	{ 
   		"title" : "The Avengers",
   		"genre" : "Accion",
   		"year"  : "2016",
   		"cover" : "Imagenes/avengers.png" 
   	}	 
   	];
});