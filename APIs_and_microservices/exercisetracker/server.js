require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Models
const User = require('./schemas/UserSchema');
const Exercise = require('./schemas/ExerciseSchema');

// dev mode cleanup
const devModeCleanup = async () => {
    await User.deleteMany({}, (err, data) => {
        if (err) {
            console.log('Error deleting Users during cleanup...');
        } else {
            console.log('Users deleted during cleanup');
        }
    });
    
    await Exercise.deleteMany({}, (err, data) => {
        if (err) {
            console.log('Error deleting Exercises during cleanup...');
        } else {
            console.log('Exercises deleted during cleanup');
        }
    });
}
devModeCleanup();

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/exercise/users', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);
        res.send(users);
    })
})

app.post('/api/exercise/new-user', (req, res, next) => {
    User.findOne({username: req.body.username}, (err, found) => {
        if (err) return next(err);
        console.log('checking if username already taken...')
        if (!found) {   
            console.log('username available...');
            const id = shortid.generate();
            const user = new User({
                username: req.body.username,
                _id: id
            });
            user.save((err, data) => {
                if (err) return next(err);
                console.log('new user created...');
                console.log(data);
                res.send(data);
            })
        } else {
            console.log('username already in database');
            res.send('username already taken');
        }
    })
})

app.post('/api/exercise/add', async (req, res, next) => {
    const id = req.body.userId;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;
    
    User.findById(id, (err, user) => {
        if (err) return next(err);
        
        if (user === null) {
            console.log('userId not found in database during exercise add');
            res.send('userId not found');
        } else{
            console.log('user found during exercise add...');
            const newExercise = new Exercise({
                userId: id,
                description: description,
                duration: duration,
                date: date === '' ? undefined: date
            });
            newExercise.save((err, exercise) => {
                if (err) return next(err);
                console.log('new exercise created...');
                console.log(exercise);
                res.json({
                    _id: user._id,
                    description: exercise.description,
                    duration: exercise.duration,
                    date: exercise.date.toDateString(),
                    username: user.username
                });
            })
        }
    });
    
});

app.get('/api/exercise/log', (req, res, next) => {
    const userId = req.query.userId;
    const from = req.query.from;
    const to = req.query.to;
    const limit = parseInt(req.query.limit);
    
    if (userId === undefined) {
        console.log('getting log failed due to no userId')
        return next({message: 'userId required to get log'});
    }
    
    User.findById(userId, (err, user) => {
        if (err) return next(err);
        
        console.log('searching for user to retrieve log');
        if (user === null) {
            console.log('user not found, cannot retrieve log');
            next({message: 'user not found'});
        } else {
            console.log('user found, retrieving log...');
            
            var query;
            if (from !== undefined && to !== undefined) {
                query = { 
                    userId: userId,
                    date: { $gte: new Date(from), $lte: new Date(to) }
                };
            } else if (from !== undefined) {
                query = {
                    userId: userId,
                    date: {$gte: new Date(from) }
                };
            } else if (to !== undefined) {
                query = {
                    userId: userId,
                    date: { $lte: new Date(to) }
                };
            } else {
                query = { userId: userId };
            }
            
            Exercise.find(query)
                .limit(limit)
                .exec((err, log) => {
                    if (err) return next(err);
                    console.log(`exercises for userId = ${user._id} found...`);
                    res.json({
                        userId: user._id,
                        username: user.username,
                        count: log.length,
                        log: log.map(item => {
                            return {
                                description: item.description,
                                duration: item.duration,
                                date: item.date.toDateString()
                            }
                        })
                    });
                })
        }
    });
})

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'});
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage;

  if (err.errors) {
    // mongoose validation error
    errCode = 400; // bad request
    const keys = Object.keys(err.errors);
    // report the first validation error
    errMessage = err.errors[keys[0]].message;
  } else {
    // generic or custom error
    errCode = err.status || 500;
    errMessage = err.message || 'Internal Server Error';
  }
  res.status(errCode).type('txt')
    .send(errMessage);
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
})
