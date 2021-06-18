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

MongoClient.connect('mongodb://localhost:27017',{ useUnifiedTopology: true } ,  (err, client) => {
  // Client returned
  var db = client.db('TeamQuartz');

  app.get("/a", function(req, res, next) {
    db.collection("airplanes").find({}).toArray(function(err, docs) {

          console.log(docs);
          res.send(docs);

    });
  });



 /* app.get("/getPreviousMealTypeId", function(req, res, next) {

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
       { $match: { "orders.Customer_Id": 1 } },
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


  app.get("/getMealNameById", function(req, res, next) {

    db.collection("meal").find({Meal_Type_Id:1},{Meal_Name:true, _id:false}).toArray(function(err, docs) {

        console.log(docs);
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
*/

//----------------------------------------------------User Story-5-----------------------------------------------------------//




//Querry 1

app.get("/getboardingPassIssued", function(req, res, next) {
    var queryy1 = 
    {
  "_id":"999",
  "Name":{"firstName":"Jon","lastName":"Smith"},
  "Flight_ID":"0",
  "Flight_Number" : "A0157",  
  "Seat No":"B7",  
  "Flight_Name":"Air India",
  "Departure_Place":"Surat",
  "No Of Bags":"3", 
  "Arrival_Place":"Frankfurt,Germany",
  "V_Id":"0",
  "V_Code":"VC012",
 
  "Start_Time":"08.06.2021",
  "End_Time":"08.09.2021"
}

     
    db.collection("User_Info").Insert(queryy1, function(err, docs) {
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

//Query 2  
app.get("/getVoucherInfo", function(req, res, next) {

  
  db.collection("Voucher_Info").find({
    $and: [
        { vouchercode: { $ne: "JULY@2021", $exists: true } },
        { $or: [ { voucherID: { $eq : 2019 } }, { userID: { $gt: 21} }, { "name": { $elemMatch: { firstname: "Jon", lastname: "Smith" } } } ] }
    ]
}, function(err, docs) {
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


//Query 3
app.get("/getDirectFlight", function(req, res, next) {

  
  db.collection("Voucher_Info").find({ ISConnectingFlight: { $eq: false, $exists: true }, From: "Newyork"}, function(err, docs) {
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


//Query 4
app.get("/getShortestPath", function(req, res, next) {

  
  db.collection("airplane").aggregate(({location:{$near:{$maxDistance : 10000 ,  $geometry: {type:"point",coordinates:[-79.3,43.6]}}}}), function(err, docs) {
     if(err) return next(err);
     docs.forEach(function(err, doc) {
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



