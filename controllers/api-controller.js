const express = require("express");
const router = express.Router();
const db = require("../models");
const mongoose = require("mongoose");
const mongo = require("mongodb");

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/:id", (req, res) => {
  db.Workout.find({ _id: mongo.ObjectID(req.params.id) })
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/exercises", (req, res) => {
  db.Exercise.find({})
    .then((exercises) => {
      res.json(exercises);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Export the routes for use in server.js
module.exports = router;
