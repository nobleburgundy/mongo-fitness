const Workout = require("../models/Workout");

describe("Get all workouts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("Should validate", async () => {
    const workout = new Workout({
      day: Date.now(),
      exercises: ["1", "2"],
    });

    await workout.validate();
    expect(workout.toObject()).toHaveProperty("_id");
    expect(workout.toObject()).toHaveProperty("day");
    expect(workout.toObject()).toHaveProperty("exercises");
  });
});
