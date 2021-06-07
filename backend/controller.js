var neo4j = require("neo4j-driver");
var driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "12345")
);
const database = "neo4j";
const session = driver.session({ database: database });

exports.getAllPlaces = (req, res) => {
  return session
    .readTransaction((tx) => tx.run("MATCH (n) return n"))
    .then((res) => {
      return res.records.map((record) => {
        return record.get("n");
      });
    });
};

// function getAllPlaces(req, res) {
//   return session
//     .readTransaction((tx) => tx.run("MATCH (n) RETURN n"))
//     .then((res) => {
//       return res.records.map((record) => {
//         return record.get("n");
//       });
//     });
// }
