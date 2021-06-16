var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var neo4j = require("neo4j-driver");
var app = express();
const cors = require("cors");
//Engine code
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

var driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "123")
);
const database = "neo4j";
exports.session = driver.session({ database: database });

// app.get("/", function (req, res) {
//   session.run("MATCH(n) RETURN(n)").then((result) => {
//     res.json({
//       status: "ok",
//       path: result.records.map((record) =>
//         record.get(record.)
//       ),
//     });
//   });
//   // .run("MATCH(n) RETURN(n)")
//   // .then((result) => {
//   //   result.records.forEach((record) => {
//   //     console.log(result._fields[0].properties);
//   //     res.send(record._fields.properties);
//   //   });
//   // })
//   // .catch((err) => {
//   //   //  res.send(err);
//   // });
// });

app.listen(3000);
console.log("yayayyaya");

// app.get("/", function (req, res) {
//   getAllPlaces().then((plane) => {
//     // res.json({ result: plane });
//     res.send({ result: plane });
//   });
// });
require("./routes.js")(app);
module.exports = app;
