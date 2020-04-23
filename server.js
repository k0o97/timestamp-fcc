// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/timestamp/:datestring?', function(req, res) {
  let str = req.params.datestring;

  if (!str.match(/^[0-9|\-+]{0,}$/i)) {
    return res.json({ error: 'Invalid Date' });
  }

  let dateString = str.match(/[-|+]/i) ? str : parseInt(str);
  let date = dateString ? new Date(dateString) : new Date();

  if (date.toDateString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});