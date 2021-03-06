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

  router.get("/verify/:pnum", function (req, res) {
    contrl.verifyPassenger(req.params.pnum).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/related-passenger/:pnum", function (req, res) {
    contrl.relatedPassenger(req.params.pnum).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/relationship/:pnum", function (req, res) {
    contrl.getrelationship(req.params.pnum).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  //USE CASE 2

  router.get("/seats", function (req, res) {
    contrl.getAllSeats().then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/seats/window", function (req, res) {
    contrl.getWindowSeat().then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/seats/location", function (req, res) {
    contrl.getSeatLocation().then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/booking/:flight", function (req, res) {
    contrl.getFlightDetails(req.params.flight).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  router.get("/flight-hops/:to", function (req, res) {
    contrl.getHops(req.params.to).then((plane) => {
      // res.json({ result: plane });
      res.send({ result: plane });
    });
  });

  app.use("", router);
};
