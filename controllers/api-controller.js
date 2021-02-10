const express = require("express");
const router = express.Router();
const db = require("../models");
const mongo = require("mongodb");

// GET Routes
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((workouts) => {
      res.json(workouts);
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

router.get("/api/workouts/:id", (req, res) => {
  db.Workout.find({ _id: mongo.ObjectID(req.params.id) })
    .then((workout) => {
      res.json(workout);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST routes
router.post("/api/workouts", (req, res) => {
  db.Workout.create({ exercises: [] })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// PUT route
router.put("/api/workouts/:id", (req, res) => {
  const exercise = {};
  if (req.body.type === "cardio") {
    exercise.type = "cardio";
    exercise.name = req.body.name;
    exercise.distance = req.body.distance;
    exercise.duration = req.body.duration;
  } else {
    exercise.type = "resistance";
    exercise.name = req.body.name;
    exercise.weight = req.body.weight;
    exercise.duration = req.body.duration;
    exercise.reps = req.body.reps;
    exercise.sets = req.body.sets;
  }
  db.Workout.updateOne({ _id: mongo.ObjectID(req.params.id) }, { $push: { exercises: exercise } })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Export the routes for use in server.js
module.exports = router;
