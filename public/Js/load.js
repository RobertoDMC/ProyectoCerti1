	function load(){
	$(document).ready(function () {

	$.getJSON('movies.json', function (data) {
	//console.log(data[0].title);
	for(var i in data){
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
	});}
