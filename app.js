var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Schema = mongoose.Schema;

var uriString = 'mongodb://localhost/moobeez';

mongoose.connect(uriString, function(err, res){

	if(err){
		console.log('Error Connecting to: ' + uriString + err);
	}else{
		console.log('Succeded connected to: ' + uriString);
	}

});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({'type':'application/vnd.api+json'}));
app.use(methodOverride());
app.all('*',function(req, res, next){
	res.header('Access-Control-Allow-Origin',req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	res.header('Access-Control-Max-Agge','86400');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
	next();
});



app.listen(process.env.PORT || 3000);

var Movies = mongoose.model('movies', new Schema(
{
	title:String,
	genre:String,
	cover:String,
	video:String,
	year: Number
}));

var Users = mongoose.model('users', new Schema(
{
	name:String,
	password:String,
	email:String
}));

var Genres = mongoose.model('genres', new Schema(
{
	value:String,
}));

app.get('/api/movies', function(req,res){
	Movies.find(function(err, movieList){
		if(err)
		{
			res.send(err);
		}else
		{

			res.json(movieList);
		}
	});
});

app.post('/api/movies', function(req,res){
	Movies.create({
		title:req.body.title,
		genre:req.body.genre,
		cover:req.body.cover,
		video:req.body.video,
		year: req.body.year

	},function(err){
		if(err)
		{
			res.send(err);
		}	
	Movies.find(function(err, movieList){
		if(err){
			res.send(err);
		}else{
			res.json(movieList);
		}
		});
	});
});

app.get('/api/user', function(req,res)
{
	var query = {
		name:req.query.name,
		password:req.query.password
	};
	Users.find(query, function(err, userList)
	{
		if(err)
		{
			res.send(err);
		}else{
			if(userList.length>0)
			{
				res.json({'resp':true});
			}else{
				res.json({'resp':false})
			}
		}
	});

});

app.get('/api/userlist', function(req,res)
{
	Users.find(function(err, userList)
	{
		if(err)
		{
			res.send(err);
		}else{
			res.json(userList);
		}
	});

});


app.post('/api/user', function(req,res){
	Users.create({
		name:req.body.name,
		password:req.body.password,
		email:req.body.email
	},function(err){
		if(err)
		{
			res.send(err);
		}
		Users.find(function(err, userList){
		if(err){
			res.send(err);
		}else{
			res.json(userList);
		}
		});
	});
});

app.get('/api/genres', function(req,res){
	Genres.find(function(err, genreList){
		if(err)
		{
			res.send(err);
		}else{
			res.json(genreList);
		}
	});
});

app.post('/api/genres', function(req,res){
	Genres.create({
		value:req.body.value
	},function(err){
		if(err)
		{
			res.send(err);
		}	
	Movies.find(function(err, genreList){
		if(err){
			res.send(err);
		}else{
			res.json(genreList);
		}
		});
	});
});