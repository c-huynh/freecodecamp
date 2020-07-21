/* *
*
*       Complete the API routing below
*
* */

'use strict';

var expect = require('chai').expect;
var ObjectId = require('mongodb').ObjectID;

// const CONNECTION_STRING = process.env.DB; MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function(app, db) {

    app.route('/api/issues/:project').get(function(req, res) {
        var project = req.params.project;
        var query = req.query;
        
        if (query._id !== undefined) {
            if (ObjectId.isValid(query._id)) {
                query._id = ObjectId(query._id);
            } else {
                return res.json('invalidi id: ' + update._id);
            }
        }
        
        if (query.open === 'true') {
            query.open = true;
        } else if (query.open === 'false') {
            query.opne = false;
        }
        
        db.collection(project).find(query).toArray((err, data) => {
            if (err) return res.json('error finding issues');
            return res.json(data);
        })
    }).post((req, res, done) => {
        var project = req.params.project;
        
        if (req.body.issue_title === undefined || req.body.issue_text === undefined || req.body.created_by === undefined) {
            return res.json('missing field required');
        }
        
        let issue = {
            issue_title: req.body.issue_title,
            issue_text: req.body.issue_text,
            created_by: req.body.created_by,
            assigned_to: req.body.assigned_to || "",
            status_text: req.body.status_text || "",
            open: true,
            created_on: new Date(),
            updated_on: new Date()
        };
        db.collection(project).insertOne(issue, (err, data) => {
            if (err) {
                console.log('error inserting POST request');
                return done(err);
            }
            var inserted = data.ops[0];
            return res.json({
                _id: inserted._id,
                issue_title: inserted.issue_title,
                issue_text: inserted.issue_text,
                created_by: inserted.created_by,
                assigned_to: inserted.assigned_to,
                status_text: inserted.status_text,
                open: inserted.open,
                created_on: inserted.created_on,
                updated_on: inserted.updated_on
            })
        })

    }).put(function(req, res, done) {
        var project = req.params.project;
        var update = {};
        
        if (req.body._id === undefined) {
            return res.json('missing field required');
        }

        Object.keys(req.body).forEach( key => {
            if (req.body[key] !== '') {
                update[key] = req.body[key];
            }
        })
        
        if (update.open === 'false') {
            update.open = false;
        }
        
        if (Object.keys(update).length === 1) {
            return res.json('no updated field sent');
        }
        
        if (ObjectId.isValid(update._id)) {
            update._id = ObjectId(update._id);
            update.updated_on = new Date();
        } else {
            return res.json('could not update ' + update._id);
        }
        
        db.collection(project).findAndModify(
            {_id: update._id},
            {},
            {$set: update},
            {new: true},
            (err, data) => {
                if (err) return res.json('could not update ' + update._id);
                if (data.lastErrorObject.updatedExisting) {
                    return res.json('successfully updated');
                } else {
                    res.json('could not update ' + update._id);
                }
            }
        )

    }).delete(function(req, res) {
        var project = req.params.project;
        var id;
        
        if (req.body._id === undefined) {
            return res.json('_id error');
        }
        
        if (ObjectId.isValid(req.body._id)) {
            id = ObjectId(req.body._id);
        } else {
            return res.json('could not delete ' + id);
        }
        
        db.collection(project).deleteOne(
            {_id: id},
            (err, data) => {
                if (err) return res.json('could not delete ' + id);
                if (data.deletedCount === 1) {
                    return res.json('deleted ' + id);
                } else {
                    return res.json('could not delete ' + id);
                }
            }
        )
    });

};
