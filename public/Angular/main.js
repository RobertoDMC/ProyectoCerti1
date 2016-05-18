var app = angular.module("main",['ngRoute']);

app.controller("movieController", function($scope, $filter, $http, $rootScope)
{

   $http.get('movies.json').success(function(data){
      $scope.movies = data;
   });


   $scope.$on('search', function(event, criteria, searchVal)
   {
      //console.log(criteria);
      $scope.criteria = criteria;
      $scope.searchVal = searchVal;
      
   });


   $scope.movieClicked = function(){
      //$location.path('/player/' + title);
      $rootScope.$broadcast('movieClick',$scope.movies);
      //console.log($scope.movies[1]);  
   };

});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("headerController", function($scope, $location, $rootScope)
{  
   $scope.displayModal = false;
   $scope.searchVal = "";
   $scope.criteria = "";

   $scope.showModal = function()
   {
      $scope.displayModal = true;
   };

   $scope.hideModal = function()
   {
      $scope.displayModal = false;
   };

   $scope.searchFor = function(criteria,searchVal)
   {

      $scope.criteria = criteria;
      $scope.searchVal = searchVal;
      //$location.path('/');
      $rootScope.$broadcast('search',$scope.criteria ,$scope.searchVal);
     
   };

      $scope.criterias = 
      [
      {
         value: 'title',
         label: 'Title'
      }, 
      {
         value: 'genre',
         label: 'Genre'
      },
      {
         value: 'year',
         label: 'Year'
      }
      ];   

   $scope.$on('genreClicked', function(event, genre)
   {
      $scope.searchVal = genre;
      $scope.searchFor('genre', genre); 
      $scope.apply();
   });


});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("genreController", function($scope, $routeParams, $rootScope)
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


   $scope.genreClicked = function()
   {
      $scope.genre = $routeParams.genre;
      console.log($scope.genre);
      $rootScope.$broadcast('genreClicked',$scope.genre); 
   };


});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("registerController", function($scope, $http)//
{  

   $http.get('users.json').success(function(data){
      $scope.users = data;
   });

   $scope.validUsername = function()
   {

      valid = false;

      usrRE = /^([A-Z]|[a-z]|[0-9]){6,}$/;

      

      if(usrRE.test($scope.user.name))
      {
         valid = true;
      }

      for (var i = 0; i < users.length; i++) 
      {
         if($scope.user.name == /*$scope.*/users[i].name)
         {
            valid = false;
         }

      }

      return valid;
   };

   $scope.passwordValidation = function()
   {

      match = false;

      if($scope.user.password == $scope.user.passVerification)
      {
         match = true;
      }

      return match;

   };

   $scope.validSubmit = function(){

      valid = false;

      if($scope.validName && $scope.validRegistration)
      {
         valid = true;
      }

      return valid;
   };


   $scope.user = {};
   $scope.validRegistration = false;
   $scope.validName = $scope.validUsername($scope.user.name);

   $scope.register = function(name,password,passVerification, email)
   {
      $scope.user.name = name;
      $scope.validName = $scope.validUsername();
      $scope.user.password = password;
      $scope.user.passVerification = passVerification;
      $scope.validRegistration = $scope.passwordValidation();
      $scope.user.email = email;
      if($scope.validSubmit())
      {
         console.log("OOO SI");
         console.log($scope.user);
      }
      else
      {
         console.log("oooo NO");
      }
   };



   
})

/*----------------------------------------------------------------------------------------------------------------*/


app.controller("playerController", function($scope, $routeParams)
{  

   $scope.title = $routeParams.title;
   $scope.clickedMovie = {};

   $scope.$on('movieClick', function(event, movies){
      console.log("entro on");
      //$scope.movies = movies;
      for (var i = 0; i < movies.length; i++) 
      {
         if($scope.title == /*$scope.*/movies[i].title)
         {
            $scope.clickedMovie = /*$scope.*/movies[i];
            //console.log($scope.clickedMovie.title);
            console.log($scope.clickedMovie);
         }
         else
         {
            console.log("else");
         }

      };
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

/*----------------------------------------------------------------------------------------------------------------*/

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'pages/home.html'
	})		//Cuando estemos en la raiz
	.when('/signup',{
		templateUrl:'pages/signup.html',
		controller: 'registerController'
	})
   .when('/player/:title',{
      templateUrl:'pages/player.html',
      controller: 'playerController'
   })
   .when('/:genre',{
      templateUrl:'pages/home.html',
   })
	.otherwise({
		redirectTo:'/'
	})

});

/*----------------------------------------------------------------------------------------------------------------*/

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

      //link:function(scope, element, attrs)
      //{
      //   scope.clickedMovie.title = scope.clickedMovie.title + 'directiva'
      //}
   }
});
