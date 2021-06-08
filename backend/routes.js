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

  app.use("", router);
};
