var app = angular.module("main",['ngRoute']);

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
         "value" : "Horror"
      },
      { 
         "value" : "History"
      },
   	{ 
   		"value" : "Drama"
   	}	 
   	];
});

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'pages/home.html'
	})		//Cuando estemos en la raiz
	.when('/signup',{
		templateUrl:'pages/signup.html',
		//controller: 'loginController'
	})
	.otherwise({
		redirectTo:'/'
	})


});