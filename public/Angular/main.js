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

app.controller("modalController", function($scope)
{  
   $scope.displayModal = false;

   $scope.showModal = function()
   {
      $scope.displayModal = true;
   }

   $scope.hideModal = function()
   {
      $scope.displayModal = false;
   }

});

app.controller("registerController", function($scope)
{  

   $scope.user = {};

   $scope.register = function(name,password,passVerification, email)
   {
      $scope.user.name = name;
      $scope.user.password = password;
      $scope.user.passVerification = passVerification;
      $scope.user.email = email;
      console.log($scope.user);

   };

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

app.controller("playerController", function($scope, $routeParams)
{  

   $scope.title = $routeParams.title;
   

  /* $scope.getMovie = function($event)
   {
      $scope.movie = $event.currentTarget;
      console.log($scope.movie);
   };*/

/*
   //$scope.loadMovie = function()
   //{
    //  $scope.movie
   //};
*/
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
   .when('/player/:title',{
      templateUrl:'pages/player.html',
      controller: 'playerController'
   })
	.otherwise({
		redirectTo:'/'
	})


});