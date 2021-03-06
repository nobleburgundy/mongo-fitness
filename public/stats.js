// default value for data range
let dataLimit = "7";
let lineChart;
let barChart;
let pieChart;
let donutChart;

// listen for change on the range dropdown
document.getElementById("dataLimitSelect").addEventListener("change", () => {
  dataLimit = document.getElementById("dataLimitSelect").value;
  fetchWorkoutData();
});

fetchWorkoutData = () => {
  fetch("/api/workouts/range")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // if the dataLimit is set to 'all' don't filter the data
      if (dataLimit !== "all") {
        dataLimit = parseInt(dataLimit);
        dataLimitDate = new Date().setDate(new Date().getDate() - dataLimit);
        // filter the data to the last 'dataLimit' days
        data = data.filter((e) => new Date(e.day) >= new Date(dataLimitDate));
      }
      // To fix an issue with previous charts artifacts cause weird hover issues
      // If the chart is 'defined' destroy it (it's the old version), then re-poulate it
      if (typeof lineChart !== "undefined") {
        destroyCharts();
      }
      populateChart(data);
    });
};

// Fixes issue with previous chart artifacts after updating data range
destroyCharts = () => {
  if (typeof lineChart !== "undefined") {
    lineChart.destroy();
    barChart.destroy();
    pieChart.destroy();
    donutChart.destroy();
  }
};

fetchWorkoutData();
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

  const line = document.querySelector("#canvas").getContext("2d");
  const bar = document.querySelector("#canvas2").getContext("2d");
  const pie = document.querySelector("#canvas3").getContext("2d");
  const pie2 = document.querySelector("#canvas4").getContext("2d");

  lineChart = new Chart(line, {
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

  barChart = new Chart(bar, {
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

  pieChart = new Chart(pie, {
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

  donutChart = new Chart(pie2, {
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
    const totalDuration = workout.exercises.map((e) => e.duration).reduce(reducer);
    durations.push(totalDuration);
  });

  return durations;
}

reducer = (a, b) => a + b;

function calculateTotalWeight(data) {
  const total = [];

  data.forEach((workout) => {
    // grab the weight if it's present, or 0 (for cardio)
    const totalWeight = workout.exercises.map((e) => e.weight || 0).reduce(reducer);
    total.push(totalWeight);
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

// Get the day abbriviation for use in chart labels
function dayIndexMap(dayIndex) {
  if (dayIndex < 0) {
    throw new Error("dayIndex should not be less than zero");
  } else if (dayIndex < 6) {
    // if the number is greater than 6, return mod 7 for 0-6
    dayIndex = dayIndex % 7;
  }

  const map = {
    0: "Sun",
    1: "Mon",
    2: "Tue",
    3: "Wed",
    4: "Thu",
    5: "Fri",
    6: "Sat",
  };

  return map[dayIndex];
}
