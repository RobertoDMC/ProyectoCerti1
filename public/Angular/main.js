var app = angular.module("main",['ngRoute']);

app.controller("movieController", function($scope, $filter, $http, $rootScope, searchFactory)
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

   $scope.filterMovie = function() {
    return function( movie ) 
    {

      var crit;

      if(searchFactory.getCriteria()=='genre')
      {
         return movie.genre == searchFactory.getSearchVal;
      }
      else if(searchFactory.getCriteria()=='title')
      {
         return movie.title == searchFactory.getSearchVal;
      }
      else if(searchFactory.getCriteria()=='year')
      {
         return movie.year == searchFactory.getSearchVal;
      }

         //return null;
         
    };
};

});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("headerController", function($scope, $location, $rootScope, searchFactory)
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
      searchFactory.setParams(criteria, searchVal);
      $location.path('/');
      //$rootScope.$broadcast('search',$scope.criteria ,$scope.searchVal);
     
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
      //$scope.apply();
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

app.controller("registerController", function($scope, $http, registerFactory)//
{  

   $http.get('users.json').success(function(data){
      $scope.users = data;
   });
/*
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
         if($scope.user.name == /*$scope.users[i].name)
         {
            valid = false;
         }

      }

      return valid;
   };
*/
/*
   $scope.passwordValidation = function()
   {

      match = false;

      if($scope.user.password == $scope.user.passVerification)
      {
         match = true;
      }

      return match;

   };
*/
 /*  $scope.validSubmit = function(){

      valid = false;

      if($scope.validName && $scope.validRegistration)
      {
         valid = true;
      }

      return valid;
   };*/


   //$scope.user = {};
   //$scope.validRegistration = false;
   //$scope.validName = $scope.validUsername($scope.user.name);

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


app.controller("playerController", function($scope, $routeParams, clickedMovie)
{  

   $scope.title = clickedMovie.getMovie().title;
   $scope.cover = clickedMovie.getMovie().cover;
   //$scope.clickerinoMovie = clickedMovie.getMovie();
   //console.log($scope.clickerinoMovie);
   /*
   $scope.$on('movieClick', function(event, movies){
      console.log("entro on");
      //$scope.movies = movies;
      for (var i = 0; i < movies.length; i++) 
      {
         if($scope.title == /*$scope.movies[i].title)
         {
            $scope.clickerinoMovie = /*$scope.movies[i];
            //console.log($scope.clickedMovie.title);
            console.log($scope.clickerinoMovie);
         }
         else
         {
            console.log("else");
         }

      };*/
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

/*----------------------------------------------------------------------------------------------------------------*/

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'pages/home.html'
      //controller: 'movieController'
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
   //.when('/player',{
   //   templateUrl:'pages/player.html',
   //   controller: 'playerController'
   //})
	.otherwise({
		redirectTo:'/'
	})

});

/*----------------------------------------------------------------------------------------------------------------*/

app.directive('loadMovies', function($location, clickedMovie)
{
   return{
      restrict : 'E',
      scope : 
      {
         movie : "="
      },
      template: '<a href = "#player/{{movie.title}}" ng-click = "showMovie(movie)"><img src = "{{movie.cover}}" class = "img-thumbnail">{{movie.title}}</img>'+
      '<br/>'+
      '{{movie.genre}}'+
      '<br/>'+
      '{{movie.year}}'+
      '</a>',

      link:function(scope, element, attrs)
      {
         scope.showMovie = function(movie){
            clickedMovie.setMovie(movie);
            $location.path('/#player/'+clickedMovie.getMovie().title);
         }
      }
   }
});

/*----------------------------------------------------------------------------------------------------------------*/

app.factory('clickedMovie',function(){
   var movie = {};
   var myMovie = {
      getMovie: function(){
            return movie;
      },
      setMovie: function(moobee){
            movie = moobee;
      }
  };
  return myMovie;
   
});



/*----------------------------------------------------------------------------------------------------------------*/

app.factory('registerFactory',function(){
   var user = {};
   var validRegistration = false;
   var validName = validUsername(user.name);
   var newUser = {
      getUser: function(){
            return user;
        },
      setUser: function(user){
            user = user;
        },
      validUsername : function()
      {

      valid = false;
      usrRE = /^([A-Z]|[a-z]|[0-9]){6,}$/;

         if(usrRE.test(user.name))
         {
            valid = true;
         }

         for (var i = 0; i < users.length; i++) 
         {
            if(user.name == users[i].name)
            {
               valid = false;
            }
         }

         return valid;
      },
      passwordValidation : function()
      {
         match = false;

         if(user.password == user.passVerification)
         {
            match = true;
         }

         return match;

      },
      validSubmit : function()
      {

            valid = false;

            if(validName && validRegistration)
            {
               valid = true;
            }

            return valid;
      },
      register : function(name,password,passVerification, email)
      {
         user.name = name;
         validName = validUsername();
         user.password = password;
         user.passVerification = passVerification;
         validRegistration = passwordValidation();
         user.email = email;
         if(validSubmit())
         {
            console.log("OOO SI");
            console.log(user);
         }
         else
         {
            console.log("oooo NO");
         }
      }


  };
  return newUser; 
});

/*----------------------------------------------------------------------------------------------------------------*/

app.factory('searchFactory',function(){
   var criteria = "genre";
   var searchVal = "action";
   var searchMethod = {
      setParams: function(criteria, searchVal){
            criteria = criteria;
            searchVal = searchVal;     
      },
      getCriteria: function()
      {
         return criteria;
      },
      getSearchVal: function()
      {
         return searchVal;
      }
      
  };
  return searchMethod;
   
});

/*----------------------------------------------------------------------------------------------------------------*/

