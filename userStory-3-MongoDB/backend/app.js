var express = require('express');
var mongodb = require('mongodb');
var app = express();
var path = require("path");
const cors = require("cors");
//Engine code
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
 
// app.use(logger("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var MongoClient = require('mongodb').MongoClient;
var db;

MongoClient.connect('mongodb://localhost:27017', (err, client) => {
  // Client returned
  var db = client.db('airlines');

  app.get("/a", function(req, res, next) {
    db.collection("airplanes").find({}).toArray(function(err, docs) {

          console.log(docs);
          res.send(docs);

    });
  });

  app.get("/getAvailableMeals", function(req, res, next) {
    db.collection("meal").find({Is_Available:1},{Meal_Name:true, _id:false}).toArray(function(err, docs) {
      console.log(docs);
        res.send(docs);
      });
  });

  app.get("/getPreviousMealTypeId:id", function(req, res, next) {
    id = req.params.id;
    var query1 = [
        {
          $lookup:
            {
              from: "order",
              localField: "Meal_Id",
              foreignField: "Meal_Id",
              as: "orders"
            }
       },
       { $match: { "orders.Customer_Id": id } },
              {
         $project: {
             "Meal_Type_Id": 1
         }
       }
     ];
     db.collection("meal").aggregate(query1, function(err, docs) {
        if(err) return next(err);
        docs.each(function(err, doc) {
          if(doc) {
            console.log(doc);
            res.send(doc);
          }
          else {
            res.end();
          }
        });
      });
  });


  app.get("/getMealNameById/:id", function(req, res, next) {

id = req.params.id
console.log(id);
console.log( "db.collection('meal').find({Meal_Type_Id:" + id +"},{Meal_Name:true, _id:false}).toArray(function(err, docs)1")
    db.collection("meal").find({Meal_Type_Id:id},{Meal_Name:true, _id:false}).toArray(function(err, docs) {

        // console.log(docs);
        res.send(docs);

    //  db.collection("meal").find({Meal_Type_Id:1},{Meal_Name:true, _id:false}, function(err, docs) {
    //     if(err) return next(err);
    //     docs.each(function(err, doc) {
    //       if(doc) {
    //         console.log(doc);
    //         res.send(doc);
    //       }
    //       else {
    //         res.end();
    //       }
    //     });
      });
  });

  app.get("/getNearestAirportsWithHospital", function(req, res, next) {
    var query = {
        $geoNear: {
           near: { type: "Point", coordinates: [ -73.9667, 40.78 ] },
           spherical: true,
           query: { has_hospital: 1 },
           distanceField: "calcDistance"
        }
     };
    db.collection("airplanes").aggregate(query, function(err, docs) {
      if(err) return next(err);
      docs.each(function(err, doc) {
        if(doc) {
          console.log(doc);
          res.send(doc);
        }
        else {
          res.end();
        }
      });
    });
  });


//   app.get("/getPreviousMealTypeId", function(req, res, next) {

//     var query1 = db.meal.aggregate([
//         {
//           $lookup:
//             {
//               from: "order",
//               localField: "Meal_Id",
//               foreignField: "Meal_Id",
//               as: "orders"
//             }
//        },
//        { $match: { "orders.Customer_Id": 1 } },
//               {
//          $project: {
//              "Meal_Type_Id": 1
//          }
//        }
//      ]);
//     const query2 = db.collection("meal").aggregate([
//         {
//           $lookup:
//             {
//               from: "order",
//               localField: "Meal_Id",
//               foreignField: "Meal_Id",
//               as: "orders"
//             }
//        },
//        { $match: { "orders.Customer_Id": 1 } },
//               {
//          $project: {
//              "Meal_Type_Id": 1
//          }
//        }
//      ]).toArray();

//      console.log(query2);
//   });


});




// var MongoClient = require('mongodb').MongoClient, format = require('util').format;

// MongoClient.connect('mongodb://127.0.0.1:27017', function(err, db){
//     if(err){
//         throw err;
//     }
//     else{
//         console.log("connected");
//     }
//     db.close(); 
// });
