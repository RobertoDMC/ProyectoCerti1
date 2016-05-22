var app = angular.module("main",['ngRoute']);

app.controller("movieController", function($scope, $filter, $http, $location ,$rootScope, searchFactory, getMoobeez)
{
   $scope.title = "Movies";
   $scope.refreshMovies = function()
   {
      $scope.title = "Movies";
      getMoobeez.getMovies().then(function successCallback(response){
      //console.log(response.data);
      $scope.movies = response.data;
      if(response.data.resp)
      {
         $location.path('/');
      }else{
        //console.log('Failed loading mooooooobeez');
      }
      },
         function errorCallback(response)
      {  
         console.log('ERROR')
      });
   }

   $scope.refreshMovies();

   $scope.movieClicked = function(){
      //$location.path('/player/' + title);
      $rootScope.$broadcast('movieClick',$scope.movies);
      //console.log($scope.movies[1]);  
   };

   $scope.$on('search',function(event, movies)
   {
      //$location.path('/');
      $scope.movies = movies;
      $scope.title = "Search Results"
   });

   $scope.clear = function()
   {
      $scope.movies = {};
   };

   $scope.$on('home',function(event)
   {
      $scope.refreshMovies();
   });

   $scope.$on('clear',function(event)
   {
      $scope.clear();
   });

});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("headerController", function($scope, $location, $rootScope, searchFactory, registerFactory, getMoobeez)
{  
   $scope.search = {};
   $scope.displayModal = false;
   $scope.user = {};
   $scope.userLogged = false; 
   $scope.movieList = {};

   $scope.showModal = function()
   {
      $scope.displayModal = true;
   };

   $scope.hideModal = function()
   {
      $scope.displayModal = false;
      $scope.user.name = "";
      $scope.user.password = "";
   };

   $scope.searchFor = function()
   {
      $rootScope.$broadcast('clear');
      console.log($scope.search);
      searchFactory.setParams($scope.search);
      getMoobeez.getMovies().then(function successCallback(response){
      //console.log(response.data);
      $scope.movieList = response.data;
      console.log($scope.movieList);
      $location.path('/'); 
      $rootScope.$broadcast('search',searchFactory.filterMovies($scope.movieList));
      },
         function errorCallback(response)
      {  
         console.log('ERROR')
      });

   };

   $scope.searchGenre = function(criteria, value)
   {
      $scope.search.criteria = criteria;
      $scope.search.value = value;
      $rootScope.$broadcast('clear');
      console.log($scope.search);
      searchFactory.setParams($scope.search);
      getMoobeez.getMovies().then(function successCallback(response){
      //console.log(response.data);
      $scope.movieList = response.data;
      console.log($scope.movieList);
      $location.path('/'); 
      $rootScope.$broadcast('search',searchFactory.filterMovies($scope.movieList));
      },
         function errorCallback(response)
      {  
         console.log('ERROR')
      });

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
      $scope.searchGenre('genre', genre);
      //console.log($scope.movies[1]);  
   }); 
      //$scope.apply();

   $scope.home = function()
   {
      $rootScope.$broadcast('home');
   };


   $scope.login = function(){
      registerFactory.loginUser($scope.user).then(function successCallback(response){
         //console.log(response.data);
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

   $scope.logOut = function(){
      $scope.userLogged = false;
   }
});
/*----------------------------------------------------------------------------------------------------------------*/

app.controller("genreController", function($scope, $routeParams, $rootScope, getGenres)
{

   $scope.algo = getGenres.getGenre().then(function successCallback(response){
         //console.log(response.data);
         $scope.genres = response.data;
         //console.log($scope.movies);
         if(response.data.resp)
         {
            //console.log('esty en el if :D');
            $location.path('/');
         }else{
            //console.log('el else :(');
         }
      },
      function errorCallback(response)
      {  
         console.log('ERROR')
      });

   $scope.genreClicked = function(genre)
   {
      $scope.genre = genre;
      console.log($scope.genre);
      $rootScope.$broadcast('genreClicked',$scope.genre); 
   };


});

/*----------------------------------------------------------------------------------------------------------------*/

app.controller("registerController", function($scope, $http, registerFactory,$location)//
{  

   $scope.user = {};
      
   registerFactory.getUsers().then(function successCallback(response){
      $scope.users = response.data;
      console.log($scope.users);
   },function errorCallback(response){
         console.log('Error');
   });
   console.log($scope.users);
   $scope.newUser = function(name,password,passVerification, email)
   {
      $scope.user.name = name;
      $scope.user.password = password;
      $scope.user.passVerification = passVerification;
      $scope.user.email = email;
      $scope.validName = registerFactory.validUsername($scope.user.name, $scope.users);
      $scope.validPassword = registerFactory.passwordValidation($scope.user.password, $scope.user.passVerification);
      $scope.validSubmit = registerFactory.validSubmit($scope.validName, $scope.validPassword);
      if($scope.validSubmit)
      {
         registerFactory.register($scope.user).then(function successCallback(response){
            alert("Registro Creado");
            $location.path('/');
         }, function errorCallback(response){
         console.log('error');
         })   
      }
      else
      {
         console.log('Error');
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
   //.when('/',{
   //   templateUrl:'pages/home.html',
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
      var newUser = {
      validUsername : function(name, users)
      {

         valid = false;
         usrRE = /^([A-Z]|[a-z]|[0-9]){6,}$/;

         if(usrRE.test(name))
         {
            valid = true;
         }

         for(var i=0; i < users.length; i++)
         {
            if(name==users[i].name)
            {
               valid = false;
            }
         }

         return valid;
      },
      passwordValidation : function(password, passVerification)
      {
         match = false;

         if(password == passVerification)
         {
            match = true;
         }

         return match;

      },
      validSubmit : function(validName, validPass)
      {

            valid = false;

            if(validName && validPass)
            {
               valid = true;
            }

            return valid;
      },
      register : function(user)
      {
         return $http.post('http://localhost:3000/api/user',user);   
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
         );
      },
      getUsers: function()
      {
         return $http.get('http://localhost:3000/api/userlist');
      }

  };
  return newUser; 
});

/*----------------------------------------------------------------------------------------------------------------*/

app.factory('searchFactory',function(){
   var criteria = "";
   var value = "";
   var lcValue = "";
   var splitted;
   var keywords;
   var results = []; 
   

   var listMovies = [];

   var searchMethod = {
      setParams: function(search){
            criteria = search.criteria;
            value = search.value;     
            lcValue = value.toLowerCase();
            splitted = lcValue.split(" ");

            keywords = new Array;
            //var re = new Array;
             
               //Initial keyword is by default the first word
            keywords[0] = splitted[0];
             
            var index = 1;
             
            //Making the elements of the search unique (avoid looking for "The" twice)
            for (var i = 1; i < splitted.length; i++) 
            {
               if (keywords.indexOf(splitted[i]) == -1) 
               {
                  keywords[index] = splitted[i];
                  //console.log('THIS IS THE KEYWORD '  +keywords[index]);
                  index++;
               } 
            }  

            
      },
      filterMovies: function(movies)
      {
         listMovies = [];
         //angular.forEach(movies, function(movie,key)
         //{
          //  angular.forEach(movie, function(values,keys)
           // {
               //Looking for matches using each single word
               for(var i=0; i < movies.length; i++)
               {
                  for( var j = 0; j<keywords.length; j++)
                  {
                     if(criteria=="title")
                     {
                        if(movies[i].title.toLowerCase().indexOf(keywords[j]) != -1)
                        {   
                           listMovies.push(movies[i]);
                        }
                     }
                     else if(criteria=="genre")
                     {
                        if(movies[i].genre.toLowerCase().indexOf(keywords[j]) != -1)
                        {   
                           listMovies.push(movies[i]);
                        }
                     }
                     else
                     {
                        if(movies[i].year==value)
                        {   
                           listMovies.push(movies[i]);
                        }
                     }
                  } 
               }
               /*
               if(criteria=="title")
               {
                  if(value==values)
                  {
                     movieList.push(movie);
                  }
               }else if(criteria=="genre")
               {
                  if(value==values)
                  {
                     movieList.push(movie);
                  }
               }else
               {
                  if(value==values)
                  {
                     movieList.push(movie);
                  }
               }*/
           // })

         //})
         return listMovies; 
      }
      
  };
  return searchMethod;

});

/*----------------------------------------------------------------------------------------------------------------*/

