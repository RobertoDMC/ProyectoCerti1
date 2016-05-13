var app = angular.module("main",['ngRoute']);

app.controller("movieController", function($scope, $filter, $http, $rootScope)
{

   $http.get('movies.json').success(function(data){
      $scope.movies = data;
   })


     // $scope.searchVal = "";

   $scope.$on('search', function(event, criteria, searchVal)
   {
      console.log(criteria);
      $scope.searchVal = searchVal;
      $scope.criteria = criteria;
   });

     /* $scope.filtering = function(value, index, array){

         $filter('mifiltro')(array, $scope.criteria, false);
      }*/

   $scope.movieClicked = function()
   {
      $rootScope.$broadcast('movieClick',$scope.movies); 
      console.log($scope.movies[1]);  
   }
   
      

});

app.controller("headerController", function($scope,$location, $rootScope)
{  
   $scope.displayModal = false;

   $scope.searchVal = "";

   $scope.criteria = "";

   $scope.showModal = function()
   {
      $scope.displayModal = true;
   }

   $scope.hideModal = function()
   {
      $scope.displayModal = false;
   }

   $scope.searchFor = function(criteria,searchVal)
   {
      $scope.criteria = "genre"
      $scope.searchVal = searchVal;
      $rootScope.$broadcast('search',$scope.criteria ,$scope.searchVal);
      $location.path('/');
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
   $scope.clickedMovie = {};

   $scope.$on('movieClick', function(event, movies)
   {
      //$scope.movies = movies;
      for (var i = 0; i < movies.length; i++) 
      {
         if($scope.title == /*$scope.*/movies[i].title)
         {
            $scope.clickedMovie = /*$scope.*/movies[i];
            //console.log($scope.clickedMovie.title);
            console.log($scope.clickedMovie);
         }
      }
   });


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

app.directive('loadingPreview', function()
{
   return{
      restrict : 'E',
      scope : 
      {
         movie : "="
      },
      
      template: '<video width="600" controls poster="Imagenes/{{movie.cover}}.png"  preload="auto">' +
                  '<source src="Imagenes/ciego.mp4" type="video/mp4">'+
                  '<source src="Imagenes/ciego.ogv" type="video/ogv">'+
                  'Your browser does not support HTML5 video.'+
                '</video>',

      link:function(scope, element, attrs)
      {
         scope.clickedMovie.title = scope.clickedMovie.title + 'directiva'
      }
   }
});
