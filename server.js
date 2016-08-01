var express = require('express');
var pug = require('pug')
var app = express();

app.set('view engine', 'jade')
app.set('views', __dirname + '/views')


app.get('/:string', function(req, res) {
  var time;
  var date;
  var wrongInfo;
  var string = req.params.string
  //Test if string is number or natural date
  if (!isNaN(+string)) {
    time = +string.match(/\d+/).shift();
    date = new Date(time)
    var month = date.getMonth();
    switch(month) {
      case 0: month = "January";
      break;
      case 1: month = "February"
      break;
      case 2: month = "March"
      break;
      case 3: month = "April"
      break;
      case 4: month = "May"
      break;
      case 5: month = "June"
      break;
      case 6: month = "July"
      break;
      case 7: month = "August"
      break;
      case 8: month = "September"
      break;
      case 9: month = "October"
      break;
      case 10: month = "November"
      break;
      case 11: month = "December"
      break;
    }
    var year = date.getFullYear();
    var day = date.getDate()
    date = month + ' ' + day + ', ' + year;
    res.render('index', {
      title: 'Timestamp Microservice',
      time: time,
      date: date
    })
  }
  
  else if (string.search(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w+\s\d{1,2}\,\s\d{4}/)!==-1) {
    var newString = string.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w+\s\d{1,2}\,\s\d{4}/).shift().concat(" GMT")
    time = Date.parse(newString)
    date = req.params.string
    res.render('index', {
      title: 'Timestamp Microservice',
      time: time,
      date: date
      
    })
    
  }
  
  
  
  else {
    wrongInfo="bad string"
    res.render('directions', {
      title: 'Timestamp Microservice',
      wrongInfo: wrongInfo,
      time: "null",
      date: "null"
      
      
    })
  }
  
})



app.get('/', function(req, res) {
  wrongInfo = "no string"
  res.render('directions', {
    title: 'Timestamp Microservice',
    wrongInfo: wrongInfo
  
  })
});




app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});