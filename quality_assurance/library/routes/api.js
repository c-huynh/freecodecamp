/* *
*
*       Complete the API routing below
*
* */

'use strict';

require('dotenv').config();

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function(app, db) {
    
    app.route('/api/books').get(function(req, res) {
        //response will be array of book objects
        //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
        db.collection('library').find({}).toArray((err, data) => {
            if (err) return res.json(err);
            return res.json(data);
        })
        
    }).post(function(req, res) {
        //response will contain new book object including atleast _id and title
        var title = req.body.title;
        if (title === undefined) return res.json('missing title');
        
        db.collection('library').findOne({title: title}, (err, data) => {
            if (err) {
                console.log('error seaching DB during post request');
                done(err);
            }
            
            if (data === null) {
                var book = {
                    title: title,
                    comments: []
                }
                db.collection('library').insertOne(book, (err, insertData) => {
                    if (err) {
                        console.log('error inserting new book');
                        done(err);
                    }
                    const inserted = insertData.ops[0];
                    console.log('new book inserted: ' + inserted.title);
                    return res.json({
                        title: inserted.title,
                        comments: inserted.comments,
                        _id: inserted._id
                    })
                })
            } else {
                return res.json(data);
            }
        })
    }).delete(function(req, res) {
        //if successful response will be 'complete delete successful'
        db.collection('library').deleteMany({}, (err, data) => {
            if (err) res.json(err);
            console.log('deleting all books...');
            return res.json('complete delete successfull');
        })
    });
    
    app.route('/api/books/:id').get(function(req, res) {
        var bookid = req.params.id;
        //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
        
        if (ObjectId.isValid(bookid)) {
            bookid = ObjectId(bookid);
        } else {
            return res.json('no book exists');
        }
        
        db.collection('library').findOne({_id: bookid}, (err, data) => {
            if (err) return res.json('error getting book');
            if (data === null) return res.json('no book exists');
            return res.json(data);
        })
    }).post(function(req, res) {
        var bookid = req.params.id;
        var comment = req.body.comment;
        var update = { comments: comment }
        //json res format same as .get
        
        if (ObjectId.isValid(bookid)) {
            bookid = ObjectId(bookid);
        } else {
            return res.json('no book exists');
        }
        
        db.collection('library').findAndModify(
            {_id: bookid},
            {},
            {$push: update},
            {new: true},
            (err, data) => {
                if (err) return res.json('could not add comment');
                if (data.lastErrorObject.updatedExisting) {
                    return res.json(data.value);
                } else {
                    res.json('could not add comment');
                }
            }
        )
    }).delete(function(req, res) {
        var bookid = req.params.id;
        //if successful response will be 'delete successful'
        
        if (ObjectId.isValid(bookid)) {
            bookid = ObjectId(bookid);
        } else {
            return res.json('no book exists');
        }
        
        db.collection('library').deleteOne(
            {_id: bookid},
            (err, data) => {
                if (err) return res.json('could not delete ' + bookid);
                if (data.deletedCount === 1) {
                    return res.json('deleted successful');
                } else {
                    return res.json('could not delete ' + bookid);
                }
            }
        )
    });

};
