var fortune = require('./lib/fortune.js');
var express = require('express'); 
var app = express();
 
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

app.use(function(req, res, next) { 
 	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1'; 
 	next(); 
});

var d = new Date();
var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
 
app.get('/', function(req, res) {
        res.render('home');
});
app.get('/about', function(req, res) {
        res.render('about', {fortune: fortune.getFortune(),
		pageTestScript: '/qa/tests-about.js'
	});
});

app.get('/datetime', function(req, res) {
        var today = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
	var t = d.getHours() + ':' + d.getMinutes();
	var tt = today + ' ' + t;
	res.render('datetime', {date: today, time: t});
});

// custom 404 page 
app.use(function(req, res) {  
	res.status(404); 
	res.render('404'); 
});

 
// custom 500 page 

app.use(function(err, req, res, next) { 
	console.error(err.stack); 
	res.status(500); 
	res.render('500');
});

app.listen(app.get('port'), function() {
	console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
 
