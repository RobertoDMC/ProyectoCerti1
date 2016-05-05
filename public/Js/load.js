function load(){
	$(document).ready(function () 
	{
		$.getJSON('movies.json', function (data) 
		{
		//console.log(data[0].title);
			for(var i in data)
			{
				var movie = data[i];
				var title = movie.title;
				var container = '<div id="'+ title +'" class="home_movies">';
				var img = '<img src="' + movie.cover + '"><br>';
				console.log(img);
				var span = /*'<a href=#>'+*/title/*+'</a>' */;
				var append = container + img + span + '</div>';
				$('.movie_container').append(append);
			}
		});
	});
}

/*function load(results){
	$(document).ready(function () 
	{
		
				var movie = resul[i];
				var title = movie.title;
				var container = '<div id="'+ title +'" class="home_movies">';
				var img = '<img src="' + movie.cover + '"><br>';
				console.log(img);
				var span = /*'<a href=#>'+*//*title*//*+'</a>' ;
			var append = container + img + span + '</div>';
				$('.movie_container').append(append);
	
	});
}
*/


function searchFor()
{
	var json = '{ "movies" : [' +
   	'{ "title" : "Doge the Movie" , "cover" : "Imagenes/doge.png" },' +
   	'{ "title" : "Batman vs Superman" , "cover" : "Imagenes/bvs.png" } ]}'; 

   	var criteria = document.getElementById("searchBox").value;
    
   	var data = JSON.parse(json);

	//Taking all to lower case
	var lcCriteria = criteria.toLowerCase();

	//Splitting the string into words to search for each one
	var splitted = lcCriteria.split(" ");

	//The set containing each of the keywords
	var keywords = new Array;
	var re = new Array;

	//Initial keyword is by default the first word
	keywords[0] = splitted[0];

	var index = 1;

	//Making the elements of the search unique (avoid looking for "The" twice)
	for (var i = 1; i < splitted.length; i++) 
	{
		if (keywords.indexOf(splitted[i]) == -1) 
	    {
		    keywords[index] = splitted[i];
	    	//console.log('THIS IS THE KEYWORD ' + keywords[index]);
		    index++;
		} 
	}	

	//Creating regular Expressions to match with the JSON file
	/*for(var i = 0; i < keywords.length; i++)
	{
		//Case insensitive regExp
		re[i] = new RegExp(keywords[i], 'i');

	}
*/
	//Declaring an array for results
	var results = [];	

	//Looking for matches using each single word
  	for(var i=0; i < data.movies.length; i++)
	{
		for( var j = 0; j<keywords.length; j++)
    	{
      		if(data.movies[i].title.toLowerCase().indexOf(keywords[j]) != -1)
        	{   
        		console.log('FOUND MATCH');
        		//Adds the element to the results if it's not already in it
          		if(!containsObject(data.movies[i], results))
          			{
          				results.push(data.movies[i]);
          				console.log('ADDING MATCH: ' + data.movies[i].title);
          			}
        	}
        } 
	}
}


//Check if an object is in a list/array
function containsObject(obj, list)
{
    var i;
    for (i = 0; i < list.length; i++) 
    {
        if (list[i] === obj) 
        {
            return true;
        }
    }

    return false;
}