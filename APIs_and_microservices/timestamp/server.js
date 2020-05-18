var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200})); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/timestamp/:date_string?", (req, res) => {
    if (req.params.date_string === undefined) {
        const date = new Date();
        res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
    } else {
        var dateInput;
        
        if (Number.isInteger(Number(req.params.date_string))) {
            // unix input
            dateInput = Number(req.params.date_string)
        } else {
            // utc input
            dateInput = req.params.date_string;
        }
        
        const date = new Date(dateInput);
        if (isNaN(Number(date))) {
            res.json({ "error": "Invalid Date"});
        }
        
        res.json({ "unix": date.getTime(), "utc" : date.toUTCString() });
    }
});

// listen for requests :)
const port = 3000;
var listener = app.listen(port, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});