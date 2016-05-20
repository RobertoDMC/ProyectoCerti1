var app = angular.module("main",['ngRoute']);

app.controller("movieController", function($scope, $filter, $http, $rootScope, searchFactory, getMoobeez)
{

   $scope.algo = getMoobeez.getMovies().then(function successCallback(response){
         console.log(response.data);
         $scope.movies = response.data;
         if(response.data.resp)
         {
            $location.path('/');
         }else{
            console.log('Failed loading mooooooobeez');
         }
      },
      function errorCallback(response)
      {  
         console.log('ERROR')
      });

   $scope.$on('search', function(event, criteria, searchVal)
   {
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

app.controller("headerController", function($scope, $location, $rootScope, searchFactory, registerFactory)
{  
   $scope.displayModal = false;
   $scope.searchVal = "";
   $scope.criteria = "";
   $scope.validUsername = false;
   $scope.validPassword = false;
   $scope.user = {};
   $scope.userLogged = false; 

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

   $scope.login = function(){
      registerFactory.loginUser($scope.user).then(function successCallback(response){
         console.log(response.data);
         if(response.data.resp)
         {
            $scope.userLogged = true;
            $scope.username = $scope.user.name;
            $scope.hideModal();
            $location.path('/');
         }else{
            $scope.user.name = "ERROR";
         }
      },
      function errorCallback(response)
      {  
         $scope.user.name = response;
      });
   }  

});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("genreController", function($scope, $routeParams, $rootScope, getGenres)
{

   $scope.algo = getGenres.getGenre().then(function successCallback(response){
         console.log(response.data);
         $scope.genres = response.data;
         //console.log($scope.movies);
         if(response.data.resp)
         {
            console.log('esty en el if :D');
            $location.path('/');
         }else{
            console.log('el else :(');
         }
      },
      function errorCallback(response)
      {  
         console.log('ERROR')
      });

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


app.controller("playerController", function($scope, $routeParams, $sce,clickedMovie)
{  

   $scope.title = clickedMovie.getMovie().title;
   $scope.video = $sce.trustAsResourceUrl(clickedMovie.getMovie().video);

});

/*----------------------------------------------------------------------------------------------------------------*/

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl:'pages/home.html'
      //controller: 'movieController'
	})
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

app.factory('getMoobeez',function($http){
   var myMovies = {
      getMovies:function(){
         return $http.get('http://localhost:3000/api/movies')
      }
   };
   return myMovies;
});

/*----------------------------------------------------------------------------------------------------------------*/

app.factory('getGenres',function($http){
   var myGenres = {
      getGenre:function(){
         return $http.get('http://localhost:3000/api/genres')
      }
   };
   return myGenres;
});

/*----------------------------------------------------------------------------------------------------------------*/

app.factory('registerFactory',function($http){
   var user = {};
   var newUser = {
      getUser: function(){
            return user;
        },
      setUser: function(name,password){
            user.name = name;
            user.password = password;
        },
      validUsername : function()
      {

         valid = false;
         usrRE = /^([A-Z]|[a-z]|[0-9]){6,}$/;

         if(usrRE.test(user.name))
         {
            valid = true;
         }

         //for (var i = 0; i < users.length; i++) 
         //{
          //  if(user.name == users[i].name)
           // {
            //   valid = false;
            //}
         //}

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
      },
      loginUser:function(user){
         return $http.get(
            'http://localhost:3000/api/user',
         {
            params: {
               name:user.name,
               password:user.password
            }
         }
         )
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

