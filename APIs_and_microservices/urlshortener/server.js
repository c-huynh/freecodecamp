'use strict';

require('dotenv').config()
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var lookup = require('dns-lookup');
var url = require('url');
var cors = require('cors');

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** setup DB !! **/
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    var Schema = mongoose.Schema;

    var ShortenedURLSchema = new Schema({
        originalURL: {
            type: String,
            required: true
        },
        shortURL: Number
    });

    // setup post hook to increment counter after new URL creation
    ShortenedURLSchema.post('save', doc => {
        Counter.findOneAndUpdate({
            counter: 'url'
        }, {
            $inc: {
                seq: 1
            }
        }, {
            new: true
        }, (err, data) => {
            if (err) 
                return console.log('error incrementing counter');
            console.log('counter successfully incremented');
            console.log(data);
        })
    })

    var ShortenedURL = mongoose.model('ShortenedURL', ShortenedURLSchema);

    var CounterSchema = new Schema({
        counter: String,
        seq: {
            type: Number,
            default: 1
        }
    })

    // setup counter to use as shortURL id
    var Counter = mongoose.model('Counter', CounterSchema);
    Counter.find({
        counter: 'url'
    }, (err, found) => {
        if (err) 
            return console.log('error finding counter')
        var URLCounter = new Counter({counter: 'url'});
        if (found.length === 0) {
            URLCounter.save((err, counter) => {
                if (err) 
                    return console.log('error creating url counter')
                console.log('url counter created');
            })
            console.log(URLCounter);
        } else {
            console.log(found[0]);
        }
        console.log('url counter set up');
    })

    app.use(cors());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use('/public', express.static(process.cwd() + '/public'));

    app.get('/', (req, res) => {
        res.sendFile(process.cwd() + '/views/index.html');
    });

    app.post('/api/shorturl/new', (req, res) => {

        // check url format
        const regex = /^https?:\/\/www\.[a-zA-Z0-9]*\.[a-zA-Z]+((\/[a-zA-Z0-9]+)*)?\/?$/
        if (regex.test(req.body.url)) {
            const URLobject = new URL(req.body.url);
            const hostname = URLobject.hostname;

            // check hostname validity
            lookup(hostname, err => {
                if (err) {
                    console.log(err);
                    res.json({error: "invalid hostname"});
                } else {
                    console.log('hostname valid: ' + hostname);
                    ShortenedURL.findOne({
                        originalURL: req.body.url
                    }, (err, foundURL) => {
                        if (err) 
                            return console.log('error seaching url database');
                        if (foundURL === null) {
                            console.log('URL not in database');

                            // create new URL in database
                            Counter.findOne({
                                counter: 'url'
                            }, (err, counter) => {
                                if (err) 
                                    return console.log('error finding counter during url creation')
                                var newURL = new ShortenedURL({originalURL: req.body.url, shortURL: counter.seq})
                                newURL.save((err, doc) => {
                                    if (err) 
                                        return console.log('error saving new URL');
                                    console.log('new URL created');
                                    console.log(doc);
                                    res.json({original_url: req.body.url, short_url: doc.shortURL});
                                })
                            })
                        } else {
                            console.log('original url already in database');
                            res.json({original_url: foundURL.originalURL, short_url: foundURL.shortURL});
                        }
                    });
                }
            });
        } else {
            res.json({error: "invalid URL"});
        }
    })

    app.get('/api/shorturl/:id', (req, res) => {
        console.log("id: " + req.params.id);
        ShortenedURL.findOne({
            shortURL: parseInt(req.params.id)
        }, (err, foundURL) => {
            if (err) 
                return console.log('error finding url during get request... ' + err);
            if (foundURL === null) {
                console.log('url short id not found...')
                res.json({error: 'No short URL found for the given input'});
            } else {
                console.log('redireting to original url: ' + foundURL.originalURL);
                res.redirect(foundURL.originalURL);
            }
        })
    })

    app.listen(port, () => {
        console.log('Node.js listening ...');
    });

});
