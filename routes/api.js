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
     let result=[];
        collection.find(searchQuery).toArray(function(err, docs) {
          docs.forEach(item=>{
  result.push({_id:item._id, title:item.title, countcomment:item.comment.length})

})
          
          res.json(result);
  // console.log("docs", docs);
        });
     

     
      });
  
  
  
  })

    .post(function (req, res){
      var title = req.body.title;
    
      var book = {
        title: req.body.title,
        comment:[]
    
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
         MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          var db = db.db("test");
          var collection = db.collection("books");
          collection.deleteMany({}, function(
            err,
            doc
          ) {
            !err
              ? res.send("complete delete successful")
              : res.send("could not delete  " + err);
          });
        });
 
  
  
  
  
  });



  app.route('/api/books/:id')

  
  
    .get(function (req, res){
      var bookid = req.params._id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
    })
    
    .post(function(req, res){
      var bookid = req.params._id;
      var comment = req.body.comment;
    //
    
         MongoClient.connect(MONGODB_CONNECTION_STRING, function(err, db) {
          var db = db.db("test");
          var collection = db.collection("books");

          collection.findOneAndUpdate(
            { _id: new ObjectId(bookid) },
                    { $push: comment},
                      function(err, doc) {
              !err
                ? res.send({title:req.body.title, _id:req.body._id, commments:req.body.comment})
                : res.send("could not update " + bookid + " " + err);
            }
          );
        });
    
    
      //json res format same as .get
    })
    
    .delete(function(req, res){
      var bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
  
};
