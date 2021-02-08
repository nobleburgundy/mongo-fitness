const express = require("express");
const serverRoutes = require("../controllers/api-controller");
const request = require("supertest");

// Good example of testing api with express...
// https://stackoverflow.com/questions/30109806/how-to-test-put-method-using-supertest-and-jasmine-node

const app = express();
app.use("/api", serverRoutes);
app.get("/api/workouts", (req, res) => {
  res.status(200).json({ day: Date.now, exercises: [] });
});
app.get("/api/workouts/range", (req, res) => {
  res.status(200).json(res.body);
});
app.post("/api/workouts", (req, res) => {
  res.status(200).json(res.body);
});

let testWorkout = {
  day: Date.now,
  exercises: [
    {
      type: "resistance",
      name: "Bicep Curl",
      duration: 20,
      weight: 100,
      reps: 10,
      sets: 4,
    },
    {
      type: "resistance",
      name: "Lateral Pull",
      duration: 20,
      weight: 300,
      reps: 10,
      sets: 4,
    },
  ],
};

describe("Api routes", () => {
  it("GET /api/workouts", (done) => {
    request(app).get("/api/workouts").expect("Content-Type", /json/).expect(200, done);
  });

  it("GET /api/workouts/range", (done) => {
    request(app).get("/api/workouts/range").expect(200, done);
  });

  it("POST /api/workouts", (done) => {
    request(app)
      .post("/api/workouts")
      .send(testWorkout)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        console.log(res.body);
        testWorkout = res.body;
        done();
      });
  });

  it("PUT /api/workouts/:id", (done) => {
    let testWorkoutEdit = {
      day: new Date().setDate(new Date().getDate() - 10),
      exercises: [
        {
          type: "resistance",
          name: "Squat",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    };
    request(app)
      .put("/api/workouts/" + testWorkout._id)
      .send(testWorkoutEdit)
      .expect(200, done);
  });
});
