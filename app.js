
/**
 * Module dependencies.
 */
/*jslint smarttabs:true */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var _file = require('./routes/file');
var _fs = require('fs-utils');
//var index = require('./routes/index');
var fs = require('fs');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/file',_file.file);
app.get('/jason',_file.file_jason);
app.get('/words',_file.file_words);
app.get('/list' , _file.list);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
