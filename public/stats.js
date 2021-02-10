// get all workout data from back-end

fetch("/api/workouts/range")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log("range populate", data);
    populateChart(data);
  });

API.getWorkoutsInRange();

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "ffa600",
  ];

  return arr;
}
function populateChart(data) {
  const durations = duration(data);
  const pounds = calculateTotalWeight(data);
  const workouts = workoutNames(data);
  const days = calculateDays(data);
  const colors = generatePalette();
  console.log("durations", durations);
  console.log("pounds", pounds);
  console.log("workouts", workouts);
  console.log("days", days);

  const line = document.querySelector("#canvas").getContext("2d");
  const bar = document.querySelector("#canvas2").getContext("2d");
  const pie = document.querySelector("#canvas3").getContext("2d");
  const pie2 = document.querySelector("#canvas4").getContext("2d");

  const lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: days,
      datasets: [
        {
          label: "Workout Duration In Minutes",
          backgroundColor: "red",
          borderColor: "red",
          data: durations,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  const barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          label: "Pounds",
          data: pounds,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "#000000",
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Pounds Lifted",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  const pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: durations,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed",
      },
    },
  });

  const donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: workouts,
      datasets: [
        {
          label: "Excercises Performed",
          backgroundColor: colors,
          data: pounds,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Excercises Performed",
      },
    },
  });
}

function duration(data) {
  const durations = [];

  data.forEach((workout) => {
    const totalDuration = workout.exercises.map((e) => e.duration).reduce((a, b) => a + b);
    durations.push(totalDuration);
    // workout.exercises.forEach((exercise) => {
    //   durations.push(exercise.duration);
    // });
  });

  return durations;
}

function calculateTotalWeight(data) {
  const total = [];

  data.forEach((workout) => {
    const totalWeight = workout.exercises.map((e) => e.duration).reduce((a, b) => a + b);
    total.push(totalWeight);
    // workout.exercises.forEach((exercise) => {
    //   total.push(exercise.weight);
    // });
  });

  return total;
}

function workoutNames(data) {
  const workouts = [];

  data.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      workouts.push(exercise.name);
    });
  });

  return workouts;
}

function calculateDays(data) {
  const days = [];

  data.forEach((workout) => {
    const date = new Date(workout.day).getDate();
    // getMonth() returns months 0-11, so add one
    const month = new Date(workout.day).getMonth() + 1;
    const day = new Date(workout.day).getDay();
    const dateFormat = `${dayIndexMap(day)} ${month}/${date}`;
    days.push(dateFormat);
  });

  return days;
}

function dayIndexMap(index) {
  const map = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
    7: "Sun",
  };

  return map[index];
}
