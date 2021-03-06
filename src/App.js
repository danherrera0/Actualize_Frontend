import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Components/column";
import NavBar from "./Components/NavBar";
import Progressbar from "./Components/Progressbar"
import Dashboard from "./Components/Dashboard"
import styled from "styled-components";
import Form from "./Components/Form"
import "./App.css";
import Sidebar from "./Components/Sidebar"

const Container = styled.div``;

const heroku_url= "https://actualize-backend.herokuapp.com/api/v1/"
const localhost_url= "http://localhost:3000/api/v1/"

class App extends React.Component {
  state = {
    tasks: [],
    showGif:false,
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
    col3Tasks: [],
  };

  componentDidMount() {
    fetch(`${heroku_url}tasks`)
      .then(r => r.json())
      .then(tasks => {
        let myTasks = tasks.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});
        this.setState({
          tasks: myTasks
        });
      });
    fetch(`${heroku_url}columns`)
      .then(r => r.json())
      .then(apiColumns => {
        let myColumns = apiColumns.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});

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
  patchStartAfterDrop = start => {
    let startIds = start.task_ids.map(task_id => {
      return this.state.tasks[task_id];
    });
    fetch(`${heroku_url}columns/${start.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: start.id,
        title: start.title,
        task_ids: startIds
      })
    });
  };
  //this function updates the task ids in the backend for the column that lost a card

  patchFinishAfterDrop = finish => {
    let finishIds = finish.task_ids.map(task_id => {
      return this.state.tasks[task_id];
    });
    fetch(`${heroku_url}columns/${finish.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: finish.id,
        title: finish.title,
        task_ids: finishIds
      })
    });
  };
  //this function updates the task ids in the backend for the column that gained a card

  updateTasks = (draggableId, finish) => {
    let dragged = this.state.tasks[draggableId];
    let draggedId = parseInt(draggableId.split("-").flat()[1]);

    if (finish.id === 3) {
      dragged.completed = true;
    } else if (finish.id === 1 || finish.id === 2) {
      dragged.completed = false;
    }
    console.log(draggedId)
    fetch(`${heroku_url}tasks/${draggedId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        completed: dragged.completed,
        column_id: finish.id,
        content: dragged.content,
      })
    }).then(response => fetch(`${heroku_url}tasks`)
      .then(r => r.json())
      .then(tasks => {
        let myTasks = tasks.reduce((final, elem) => {
          return Object.assign(final, elem);
        }, {});
        this.setState({
          tasks: myTasks
        });
      }))
  };
  //this function updates the tasks the backend for the card that was dragged

  onDragStart = () => {
    const homeIndex = start =>
      this.state.columnOrder.indexOf(start.source.droppableId);
    this.setState({
      homeIndex
    });
  };
/////////////////////////////////////////ON DRAG END FUNCTION/////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    }

    this.setState(newState);
    this.patchStartAfterDrop(start);
    this.patchFinishAfterDrop(finish);
    this.updateTasks(draggableId, finish);
    this.showGif(finish)
    setTimeout(this.resetGif, 5000)
  };

  /////////////////////////////////////////END OF ON DRAG END FUNCTION/////////////////////////////////////////////////////////////////////////////////////////////////////////
  showGif=(finish)=>{
    if(finish.id===3){
      this.setState({showGif:true})
    }
  }

  resetGif=(finish)=>{
    this.setState({showGif:false})
  }

  addCard = task => {
    task.tasks_name = `task-${task.id}`;
    task.task_id = `task-${task.id}`;
    let taskId = task.task_id;
    let newKey = task.tasks_name;
    delete task.tasks_name;
    delete task.id;
    let column1task_ids = this.state.columns["column-1"].task_ids;
    let newtaskIds = column1task_ids.push(taskId);
    this.setState({
      "column-1": {
        id: this.state.columns["column-1"]["id"],
        title: this.state.columns["column-1"]["title"],
        task_ids: newtaskIds,
      },
      tasks: { ...this.state.tasks, [`${newKey}`]: { ...task } }
    });
  }; //end of addCard function

  deleteCard = (event, card) => {
    delete this.state.tasks[card.task_id]
    let deletedId = parseInt(event.target.id.split("-").flat()[1]);
    fetch(`${heroku_url}tasks/${deletedId}`, {
      method: "DELETE"
    });
    let column1task_ids = this.state.columns["column-1"].task_ids;
    let column2task_ids = this.state.columns["column-2"].task_ids;
    let column3task_ids = this.state.columns["column-3"].task_ids;

    if (column1task_ids.includes(card.task_id)) {
      let deletedIndex = this.state.columns["column-1"].task_ids.indexOf(
        card.task_id
      );
      column1task_ids.splice(deletedIndex, 1);
      this.setState({
        "column-1": {
          id: this.state.columns["column-1"]["id"],
          title: this.state.columns["column-1"]["title"],
          task_ids: column1task_ids
        }
      });
    }
    if (column2task_ids.includes(card.task_id)) {
      let deletedIndex = this.state.columns["column-2"].task_ids.indexOf(
        card.task_id
      );
      column2task_ids.splice(deletedIndex, 1);
      this.setState({
        "column-2": {
          id: this.state.columns["column-2"]["id"],
          title: this.state.columns["column-2"]["title"],
          task_ids: column2task_ids
        }
      });
    }
    if (column3task_ids.includes(card.task_id)) {
      let deletedIndex = this.state.columns["column-3"].task_ids.indexOf(
        card.task_id
      );
      column3task_ids.splice(deletedIndex, 1);
      this.setState({
        "column-3": {
          id: this.state.columns["column-3"]["id"],
          title: this.state.columns["column-3"]["title"],
          task_ids: column3task_ids
        }
      });
    } else {
      return;
    }
  }; //end of deleteCard fn

getPercent=()=>{
  if(Object.values(this.state.tasks).length>0){
    let temp1 = Object.values(this.state.tasks)
    if(temp1.length > 0 ){
      let truthy =[]
    temp1.map(task => {
      truthy.push(Object.values(task)[1])
    })
    let trueTasks =[]
    let falseTasks =[]
    truthy.map(value=>{
      if(value === true) {
        trueTasks.push(value)
      }else{
        falseTasks.push(value)
      }
    })
    let percentageComplete = ((trueTasks.length/truthy.length * 100).toFixed(0));
    return percentageComplete
    }
  }else{
    let percentageComplete = 0
    return percentageComplete
  }
}

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
      >

        <NavBar />
        <Form showform={this.showform} addCard={this.addCard}/>
        <Sidebar clicked={this.state.showGif}/>
        <Progressbar percentage={this.getPercent()}/>
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
      </DragDropContext>

    );
  }
}

export default App;
