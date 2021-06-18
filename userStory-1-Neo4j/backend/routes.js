module.exports = (app) => {
  const contrl = require("./controller.js");
  var path = require("path");
  var router = require("express").Router();

  router.get("/", function (req, res) {
    contrl.getAllPlaces().then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  //--------------------------------user story 1-------------------------------------//

  router.get("/getPlacesBasedOnLikes/:likes", function (req, res) {
    contrl.getPlacesBasedOnLikes(req.params.likes).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get(
    "/getPlacesBasedOnPreviousWebsitesVisited/:website",
    function (req, res) {
      contrl
        .getPlacesBasedOnPreviousWebsitesVisited(req.params.website)
        .then((plane) => {
          // res.json({ result: plane });
          res.send({ result: plane });
        });
    }
  );

  router.get("/getShortestAndFurthest/:flight", function (req, res) {
    contrl.getShortestAndFurthest(req.params.flight).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/getDirectFlights", function (req, res) {
    contrl.getDirectFlights().then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/getFLightsByLayoverDuration/:time", function (req, res) {
    contrl.getFLightsByLayoverDuration(req.params.time).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/getNumberOfHops/:airline", function (req, res) {
    contrl.getNumberOfHops(req.params.airline).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  app.use("", router);
};
