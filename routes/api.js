/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
const MONGODB_CONNECTION_STRING = process.env.DB;
//Example connection: MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/books')
    .get(function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
    var searchQuery = req.query;
   MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
        var db = db.db("test");
        var collection = db.collection("books");
   //     collection.find(searchQuery).toArray(function(err, docs) {
   //       res.json(docs);
   //     });
     
       collection.find(searchQuery, (err, books) => {
    if (err) return res.send(err);
    let result = [];
    books.forEach(book => {
      result.push({ title: book.title, _id: book._id });
    });
    res.json(result);
  });
     
     
      });
  
  
  
  })
    
    .post(function (req, res){
      var title = req.body.title;
    
      var book = {
        title: req.body.title,
        comment:[]
    //    issue_text: req.body.issue_text,
    //    created_on: new Date(),
    //    updated_on: new Date(),
    //    created_by: req.body.created_by,
  //      assigned_to: req.body.assigned_to || "",
       
    //    open: true,
    //    status_text: req.body.status_text || ""
      };
      
        MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          var db = db.db("test");
        //  var books;
          var collection = db.collection("books");
          collection.insertOne(book, function(err, doc) {
           
            res.json({
              _id: book._id,
              title: book.title,
  //            comment:book.comment
              
            });
            console.log("DB updated");
          });
        });
      
    
      //response will contain new book object including atleast _id and title
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
    });



  app.route('/api/books/:id')
    .get(function (req, res){
      var bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params.id;
      var comment = req.body.comment;
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
