const app = require("../server");
const supertest = require("supertest");
const request = supertest(app);
const Workout = require("../models/Workout");
const mongo = require("mongodb");

// Good example of testing api with express...
// https://stackoverflow.com/questions/30109806/how-to-test-put-method-using-supertest-and-jasmine-node
// another helpful example....
// https://zellwk.com/blog/endpoint-testing/

const testWorkout = {
  day: new Date(),
  exercises: [
    {
      type: "resistance",
      name: "Bicep Curl",
      duration: 20,
      weight: 100,
      reps: 10,
      sets: 4,
    },
  ],
};

describe("Api routes", () => {
  it("GET /api/workouts", async (done) => {
    const response = await request.get("/api/workouts");
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.status).toBe(200);
    done();
  });

  it("GET /api/workouts/range", async (done) => {
    const res = await request.get("/api/workouts/range");
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.status).toBe(200);
    done();
  });

  it("POST /api/workouts", async (done) => {
    const res = await request.post("/api/workouts").send(testWorkout);
    const workout = await Workout.findOne({ _id: mongo.ObjectId(res.body._id) }).lean();
    expect(workout.day).toBeTruthy();
    expect(workout._id).toBeTruthy();
    done();
  });
});

afterAll(async (done) => {
  done();
});
