import React from "react";
import "./App.css";

import ReactChartkick, { LineChart, PieChart } from "react-chartkick";
import Chart from "chart.js";
ReactChartkick.addAdapter(Chart);

function MYChart(props) {
  console.log(props);
  let numberOfCompletedTasks = 0;
  let truTasks = [];
  let tasksLength =
    props.state.col1Tasks.length +
    props.state.col2Tasks.length +
    props.state.col3Tasks.length;

  let allTasks = [];

  allTasks.push(props.state.col1Tasks);
  allTasks.push(props.state.col2Tasks);
  allTasks.push(props.state.col3Tasks);
  let flatTasks = allTasks.flat();

  if (props.state.tasks) {
    let completed = flatTasks.map(task => {
      return props.state.tasks[task];
      let completedTasks = completed.filter(task => {
        if (task.completed === true) {
          return truTasks.push(task);
        }
      });
    });
    if (truTasks.length > 0) {
      numberOfCompletedTasks = truTasks.length;
    }
  }

  // console.log(truTasks);
  // console.log(this.state.tasks["task-78"]);
  console.log(tasksLength);
  console.log(numberOfCompletedTasks);

  return (
    <div className="chart">
      <PieChart
        style={{ color: "white" }}
        donut={true}
        data={[
          ["Complete", numberOfCompletedTasks],
          ["Not Complete", tasksLength]
        ]}
        colors={["red", "yellow"]}
      />
    </div>
  );
}
export default MYChart;
