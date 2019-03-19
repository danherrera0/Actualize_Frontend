import React from "react";
import ReactDOM from "react-dom";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./column";
import NavBar from "./NavBar";
import Form from "./Form";
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
    columnOrder: ["column-1", "column-2", "column-3"],
    col1Tasks: [],
    col2Tasks: [],
    col3Tasks: []
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/tasks")
      .then(r => r.json())
      .then(tasks => {
        let myTasks = tasks.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});
        this.setState({
          tasks: myTasks
        });
      });
    fetch("http://localhost:3000/api/v1/columns")
      .then(r => r.json())
      .then(apiColumns => {
        let myColumns = apiColumns.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});
        // console.log(myColumns);

        let col1 = myColumns["column-1"].task_ids;
        let col2 = myColumns["column-2"].task_ids;
        let col3 = myColumns["column-3"].task_ids;

        let col1Tasks = col1.map(task => `task-${task.id}`);
        let col2Tasks = col2.map(task => `task-${task.id}`);
        let col3Tasks = col3.map(task => `task-${task.id}`);

        this.setState(
          {
            columns: myColumns,
            col1Tasks: col1Tasks,
            col2Tasks: col2Tasks,
            col3Tasks: col3Tasks
          },
          () => {
            this.setState({
              columns: {
                "column-1": {
                  id: this.state.columns["column-1"]["id"],
                  title: this.state.columns["column-1"]["title"],
                  task_ids: col1Tasks
                },
                "column-2": {
                  id: this.state.columns["column-2"]["id"],
                  title: this.state.columns["column-2"]["title"],
                  task_ids: col2Tasks
                },
                "column-3": {
                  id: this.state.columns["column-3"]["id"],
                  title: this.state.columns["column-3"]["title"],
                  task_ids: col3Tasks
                }
              }
            });
          }
        );
      });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
      newtask_ids.splice(source.index, 1); //from this index we want to remove one item - the dragged item
      newtask_ids.splice(destination.index, 0, draggableId); //Starting from destination index, insert draggableId which is the taskId

      const newColumn = {
        ...start,
        task_ids: newtask_ids
      };
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [`column-${newColumn.id}`]: newColumn
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
        [`column-${newStart.id}`]: newStart,
        [`column-${newFinish.id}`]: newFinish
      }
    };
    this.setState(newState);
  };

  deleteCard = (event, card) => {
    let deletedId = parseInt(event.target.id.split("-").flat()[1]);
    // fetch(`http://localhost:3000/api/v1/tasks/${deletedId}`, {
    //   method: "DELETE"
    // });
    // console.log(card.task_id);
    let column1task_ids = this.state.columns["column-1"].task_ids;
    if (column1task_ids.includes(card.task_id)) {
      let deletedIndex = this.state.columns["column-1"].task_ids.indexOf(
        card.task_id
      );
      column1task_ids.splice(deletedIndex, 1);
      console.log(column1task_ids);
      //set state here
    }
  };

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >
        <NavBar />
        <Container>
          {this.state.columnOrder.map((columnId, index) => {
            const column = this.state.columns[columnId];
            const tasks = [];
            column.task_ids.forEach(taskId => {
              if (this.state.tasks[taskId])
                return tasks.push(this.state.tasks[taskId]);
            });
            return (
              <Column
                delete={this.deleteCard}
                key={column.id}
                column={column}
                tasks={tasks}
              />
            );
          })}
        </Container>
        <Form />
      </DragDropContext>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
