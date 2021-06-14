var neo4j = require("neo4j-driver");
var driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "airlines")
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

exports.verifyPassenger = (req, res) => {
  console.log(req);
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Fraudster {passport:" +
          "'" +
          req +
          "'" +
          "}), (p:Passenger {passport:" +
          "'" +
          req +
          "'" +
          "}) return n ,p "
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let pass = record.get("p");
        let nfra = record.get("n");
        let body = {
          passenger: pass,
          fraudster: nfra,
        };
        return body;
      });
    });
};

exports.relatedPassenger = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (:Passenger {passport:" +
          "'" +
          req +
          "'" +
          "})--(p:Passenger)-->() WITH p, count(*) AS foaf WHERE foaf >= 1 RETURN p"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let details = record.get("p");

        let body = {
          details: details.properties,
        };
        return body;
      });
    });
};
//MATCH (p1:Passenger)-[r1]->(:Passenger {firstname: 'Will'})
//RETURN DISTINCT type(r1), p1.firstname
exports.getrelationship = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (p1:Passenger)-[r1]->(:Passenger {passport:" +
          "'" +
          req +
          "'" +
          "}) RETURN DISTINCT type(r1) as relation, p1.firstname"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let relation = record.get("relation");

        let body = {
          relation: relation,
        };
        return body;
      });
    });
};

//USE CASE 2

exports.getAllSeats = (req, res) => {
  return session
    .readTransaction((tx) => tx.run("MATCH (n:Seats) return n"))
    .then((res) => {
      return res.records.map((record) => {
        return record.get("n");
      });
    });
};

exports.getWindowSeat = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (a:Seats{available:'Yes'})-[r:HAS_WINDOW]->(w:Window {name:'Yes'}) RETURN a"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("a");
      });
    });
};

exports.getSeatLocation = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (g:Window{name:'Yes'})<-[r1:HAS_WINDOW]-(a:Seats{class:'Business'})-[r2:IS_NEAR_WASHROOM]->(f:Washroom), (a1:Seats{class:'Business'})-[r3:IS_NEAR_WASHROOM]->(f1:Washroom) RETURN a,a1"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let windowSide = record.get("a");
        let row = record.get("a1");
        let body = {
          windowside: windowSide,
          windowrow: row,
        };
        return body;
      });
    });
};

exports.getFlightDetails = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Airport {airport:" +
          "'" +
          req +
          "'" +
          "}) CALL gds.alpha.shortestPath.deltaStepping.stream({nodeProjection: 'Airport', \
        relationshipProjection: { \
            TO: { \
              type: 'TO', \
              properties: 'distance' \
            } \
          }, \
          startNode: n, \
          relationshipWeightProperty: 'distance', \
          delta: 3.0 \
        }) \
        YIELD nodeId, distance \
        RETURN gds.util.asNode(nodeId).airport AS Airport, distance AS distance LIMIT 7"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let Airport = record.get("Airport");
        let distance = record.get("distance");
        let body = {
          Airport: Airport,
          distance: distance,
        };
        return body;
      });
    });
};

exports.getHops = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (from:Airport {airport:'Madrid'}), (to:Airport  {airport:" +
          "'" +
          req +
          "'" +
          "}) , path = (from)-[:TO*]->(to)\
        RETURN path AS shortestPath,reduce(distance = 0, r in relationships(path) | distance+r.distance) AS totalDistance\
        ORDER BY totalDistance ASC\
        LIMIT 1"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("shortestPath");
      });
    });
};

//-----------------------------------user story 1----------------------------------------//
// exports.getGraph = (req, res) => {
//   return session
//     .readTransaction((tx) => tx.run("MATCH p return p"))
//     .then((res) => {
//       return res.records.map((record) => {
//         return record.get("p");
//       });
//     });
// };

exports.getShortestAndFurthest = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Airport {airport:" +
          "'" +
          req +
          "'" +
          "}) CALL gds.alpha.shortestPath.deltaStepping.stream({ nodeProjection: 'Airport',relationshipProjection: {ROAD: {type: 'TO',properties: 'distance'}}, startNode: n,relationshipWeightProperty: 'distance',delta: 3.0}) YIELD nodeId, distance RETURN gds.util.asNode(nodeId).airport AS Airport, distance AS Distance ORDER BY distance ASC, nodeId ASC"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let Airport = record.get("Airport");
        let distance = record.get("Distance");
        let body = {
          Airport: Airport,
          distance: distance,
        };
        return body;
      });
    });
};

exports.getDirectFlights = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Airports)<-[k:FLYING_TO]-(f) WHERE k.layover = 0 RETURN f.name AS airline"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("airline");
      });
    });
};

exports.getFLightsByLayoverDuration = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Airports)<-[k:FLYING_TO]-(b:Airports)<-[j:FLYING_TO_VIA]-(a) WHERE k.layover > 1 RETURN a.name AS hops"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("hops");
      });
    });
};

exports.getNumberOfHops = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH path = (start:Airlines {name:'Ryanair'})-[:FLYING_TO_VIA*]->(object:Airports) RETURN start.name as Airline, length(path) as hops"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        let Airline = record.get("Airline");
        let hops = record.get("hops");
        let body = {
          Airline: Airline,
          hops: hops,
        };
        return body;
      });
    });
};
