/**
 * New node file
 */


var fs = require('fs');
var csv = require('../node_modules/csv');
var _ = require('underscore');


exports.list = function(req, res){

  //res.send(__dirname + "..\\exams");
  if(fs.readdir === undefined){
  	res.send('can not read the exams folder');
  } else {
  	fs.readdir(__dirname + "\\..\\exams", function(a,b){

         res.send(b);
  	})
  }
} 

exports.file = function(req, res){
    console.log(req.query.n);
	//
	fs.readFile('./exams/' + req.query.n, 'utf8', function (err,data) {
		  if (err) {
		    return res.send(err);
		  }
		  console.log(data);
		  //res.send(data);
		  csv().from.string(data).to.array(function(data){
			  z = _.zip.apply(_ , data);
			  out = '{"Words":['
			   
			  for(var i = 0 ; i < z[0].length ; i++ ){
				  out += '{';
				  out += '"_TO":"'  + z[0][i].trim() +'",'
				  out += '"_FROM":"' + z[1][i].trim() +'"'
				  out += '}'
				  if(i+1 < z[0].length){
					  out += ',';
				  }
			  }
				  
			  
			 out+= ']}'	  
			  res.render('file', {d : data , words : out});
			  //.send(data);
		  })
		  
		});
	//
};


exports.file_jason = function(req, res){
	  
	//
	fs.readFile('./words', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  console.log(data);
		  rows = data.split('\n');
		  header = rows[0];
		  
		  
		  
		  h = _.toArray(header.split(','));
		  r1 = _.toArray(rows[1].split(','));
		  r2 = _.toArray(rows[2].split(','));
		  var json = _.object(h, rows);
		  
		  res.send(json);	  
		});
	//
};

exports.file_words = function(req, res){
	  
	//
	fs.readFile('./words', 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  console.log(data);
		  csv().from.string(data).to.array(function(data){
			  //res.render('file', {d : data});
			  z = _.zip.apply(_ , data);
			  res.send(z);
		  })	  
		});
	//
};




