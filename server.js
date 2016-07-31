var express = require('express');
var pug = require('pug')
var app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')


app.get('/:string', function(req, res) {
  var string = req.params.string.replace('%20', '')
  var num = string.match(/\d{5,9}/g)
  var date = string.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w+\s\d{1,2}\,\s\d{4}/g);
  if (num!==[] && date!==[]) {
    res.send('You\'ve provided both a unix timestamp and natural date. Please pick one or the other');
  }
  
  else if (num.length>0 && date.length===null) {
    num = +num.shift();
    date = new Date(num);
    res.render('index', {
      title: 'Timestamp Microservice',
      num: num,
      date: date
      
      
    })
  }
  
    
  else if (num.length===null && date.length>0) {
    date = date.shift()
    num = Date.parse(date)
    res.render('index', {
      title: 'Timestamp Microservice',
      num: num,
      date: date
  
  })
  }
  
  
  else {
    res.render('index', {
      title: 'Timestamp Microservice',
      num: null,
      date: null
  })
  }
  
  
})



app.get('/', function(req, res) {
  res.send('Hello Earth')
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});