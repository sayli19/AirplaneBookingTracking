var neo4j = require("neo4j-driver");
var driver = neo4j.driver(
  "bolt://localhost:7687",
  neo4j.auth.basic("neo4j", "airlines")
);
const database = "neo4j";
const session = driver.session({ database: database });

//-----------------------------------user story 1----------------------------------------//

exports.getPlacesBasedOnLikes = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Highlights)<-[k:HAS_HIGHLIGHTS]-(b:Venue)<-[l:has]-(a) WHERE n.name = '" +
          req +
          "' RETURN b.name AS place"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("place");
      });
    });
};

exports.getPlacesBasedOnPreviousWebsitesVisited = (req, res) => {
  return session
    .readTransaction((tx) =>
      tx.run(
        "MATCH (n:Travel_Links)-[k:IS_CONNECTED]->(b:Venue)<-[l:has]-(a) WHERE n.name ='" +
          req +
          "' RETURN b.name AS places"
      )
    )
    .then((res) => {
      return res.records.map((record) => {
        return record.get("places");
      });
    });
};

exports.getShortestAndFurthest = (req, res) => {
  console.log(req);
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
        "MATCH (n:Airports)<-[k:FLYING_TO]-(f) WHERE k.layover = 0 AND n.name = 'Frankfurt' RETURN f.name AS airline"
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
        "MATCH (n:Airports)<-[k:FLYING_TO]-(b:Airports)<-[j:FLYING_TO_VIA]-(a) WHERE k.layover >= " +
          req +
          "AND n.name = 'Frankfurt' RETURN a.name AS hops"
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
        console.log(body);
        return body;
      });
    });
};
