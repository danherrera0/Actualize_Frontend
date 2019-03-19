import React from "react";
import Task from "./Task";
import styled from "styled-components";
import Form from "./Form";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin: 15px;
  padding: 1%;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding:8px;
  transition: background-color 0.2s ease;
  /* background-color: ${props => (props.isDraggingOver ? "pink" : "white")} */
  flex-grow: 1;
  min-height: 100px;
`;

class Column extends React.Component {
  state = {
    showForm: false,
    content: ""
  };

  toggleForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };

  render() {
    return (
      <Container className="Container">
        <Title>{this.props.column.title}</Title>
        <Droppable droppableId={`column-${this.props.column.id}`}>
          {provided => (
            <TaskList {...provided.droppableProps} ref={provided.innerRef}>
              {this.props.tasks.map((task, index) => (
                <Task key={task.task_id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>

        {this.state.showForm && this.props.column.title === "To do" ? (
          <div>
            <Form />
          </div>
        ) : null}
        {this.props.column.title === "To do" ? (
          <span>
            <button onClick={this.toggleForm} className="Add">
              {this.state.showForm ? "Close" : "Add"}
            </button>
          </span>
        ) : null}
      </Container>
    );
  }
}

export default Column;
