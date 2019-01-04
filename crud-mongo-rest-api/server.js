const express = require('express');
const mongodb = require('mongodb');
const errorhandler = require('errorhandler');
const logger = require('morgan');
const bodyParser = require('body-parser');

const myIP = process.env.IP;
const url = 'mongodb://' + myIP + ':27017';

let app = express();
// app.use(logger('dev'));
app.use(bodyParser.json());

mongodb.MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {
    if(err){
        return process.exit(1);
    } 
    const db = client.db('edx-course-db');
    console.log('Connection is okay');
    
    app.get('/accounts', (req, res, next) => {
        db.collection('accounts')
        .find({}, {sort: {_id: -1}})
        .toArray((error, accounts) => {
            if (error) {
                return next(error);
            }
         res.send(accounts);
        });
    });
    
    app.post('/accounts', (req, res, next) => {
        let newAccount = req.body
        db.collection('accounts').insertOne(newAccount, (error, results) => {
          if (error) {
              return next(error);
          }
          res.send(results);
        });
    });
    
    app.put('/accounts:id', (req, res, next) => {
        db.collection('accounts').update({_id: mongodb.ObjectID(req.params.id)}, 
            {$set: req.body}, (error, results) => {
            if (error) {
             return next(error);
            }
            res.send(results);
        });
    });
    
    app.delete('accounts:id', (req, res, next) => {
      db.collection('accounts').remove({_id: mongodb.ObjectID( req.params.id)}, (error, results) => {
          if (error) {
              return next(error);
          }
          res.send(results);
      });
    });
}); 

// app.use(errorhandler());
app.listen(process.env.PORT, process.env.IP);