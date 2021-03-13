// test-setup.js
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.promise = global.Promise;

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany();
  }
}

async function seedDatabase() {
  const db = require("../models");

  const workoutSeed = [
    {
      day: new Date().setDate(new Date().getDate() - 10),
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
    },
    {
      day: new Date().setDate(new Date().getDate() - 9),
      exercises: [
        {
          type: "resistance",
          name: "Lateral Pull",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    },
    {
      day: new Date().setDate(new Date().getDate() - 8),
      exercises: [
        {
          type: "resistance",
          name: "Push Press",
          duration: 25,
          weight: 185,
          reps: 8,
          sets: 4,
        },
      ],
    },
    {
      day: new Date().setDate(new Date().getDate() - 7),
      exercises: [
        {
          type: "cardio",
          name: "Running",
          duration: 25,
          distance: 4,
        },
      ],
    },
    {
      day: new Date().setDate(new Date().getDate() - 6),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 285,
          reps: 10,
          sets: 4,
        },
      ],
    },
    {
      day: new Date().setDate(new Date().getDate() - 5),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    },
    {
      day: new Date(new Date().setDate(new Date().getDate() - 4)),
      exercises: [
        {
          type: "resistance",
          name: "Quad Press",
          duration: 30,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    },
    {
      day: new Date(new Date().setDate(new Date().getDate() - 3)),
      exercises: [
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    },
    {
      day: new Date(new Date().setDate(new Date().getDate() - 2)),
      exercises: [
        {
          type: "resistance",
          name: "Military Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
        {
          type: "resistance",
          name: "Bench Press",
          duration: 20,
          weight: 300,
          reps: 10,
          sets: 4,
        },
        {
          type: "resistance",
          name: "Quad Press",
          duration: 30,
          weight: 300,
          reps: 10,
          sets: 4,
        },
      ],
    },
  ];

  db.Workout.deleteMany({})
    .then(() => db.Workout.collection.insertMany(workoutSeed))
    .then((data) => {
      console.log(data.result.n + " records inserted!");
      //   process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      //   process.exit(1);
    });
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") {
        return;
      }
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running")) {
        return;
      }
      console.log(error.message);
    }
  }
}

module.exports = {
  setupDB(databaseName) {
    // Connect to Mongoose
    beforeAll(async () => {
      const url = `mongodb://127.0.0.1/${databaseName}`;
      await mongoose.connect(url, { useNewUrlParser: true });
    });

    beforeEach(async () => {
      await seedDatabase();
    });

    // Cleans up database between each test
    afterEach(async () => {
      await removeAllCollections();
    });

    // Disconnect Mongoose
    afterAll(async () => {
      await dropAllCollections();
      await mongoose.connection.close();
    });
  },
};
