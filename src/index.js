import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = {
    tasks: [],
    columns: {
      "column-1": {
        id: "column-1",
        title: "To do",
        task_ids: ["task-1"]
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        task_ids: ["task-2"]
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        task_ids: ["task-3"]
        // task_ids are used to indicate ownership and maintain order in the lists
      }
    },
    columnOrder: ["column-1", "column-2", "column-3"]
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tasks")
      .then(r => r.json())
      .then(tasks => {
        const firstMap = tasks.map(task => {
          return Object.values(task);
        });
        let flattened = firstMap.flat();
        let second = flattened.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});
        console.log(second);
        this.setState({
          tasks: second
        });
      });
  }

  onDragStart = () => {
    const homeIndex = start =>
      this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex
    });
  };

  onDragUpdate = update => {
    const { destination } = update;
    const opacity = destination
      ? destination.index / Object.keys(this.state.tasks).length
      : 0;
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  };

  onDragEnd = result => {
    this.setState({
      homeIndex: null
    });
    document.body.style.color = "inherit";
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = this.state.columns[source.droppableId];
    const finish = this.state.columns[destination.droppableId];

    if (start === finish) {
      const newtask_ids = Array.from(start.task_ids);
      newtask_ids.splice(source.index, 1);
      newtask_ids.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        task_ids: newtask_ids
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      };
      this.setState(newState);
      return;
    }
    const starttask_ids = Array.from(start.task_ids);
    starttask_ids.splice(source.index, 1);
    const newStart = {
      ...start,
      task_ids: starttask_ids
    };
    const finishtask_ids = Array.from(finish.task_ids);
    finishtask_ids.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      task_ids: finishtask_ids
    };
    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    };
    this.setState(newState);
  };

  render() {
    console.log(this.state.tasks);
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = column.task_ids.map(taskId => {
              return this.state.tasks[taskId];
            });
            console.log(this.state.tasks);
            console.log(tasks);
            console.log(column.id);
            // return <Column key={column.id} column={column} tasks={tasks} />;
          })}
        </Container>
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
