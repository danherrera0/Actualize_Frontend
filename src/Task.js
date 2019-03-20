import React from "react";
import "./App.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Progressbar from "./Progressbar";
import "react-sweet-progress/lib/style.css";

const Container = styled.div`
  /* border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px; */
  /* background-color: ${props => (props.isDragging ? "white" : "white")}; */
`;

export default class Task extends React.Component {
  state = {
    percentage: 0
  };

  increaseProgress = () => {
    this.setState({
      percentage: this.state.percentage + 10
    });
  };

  decreaseProgress = () => {
    this.setState({
      percentage: this.state.percentage - 10
    });
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.task_id} index={this.props.index}>
        {provided => (
          <Container
            className="Card"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // isDragging={snapshot.isDragging}
          >
            <button
              onClick={event => this.props.delete(event, this.props.task)}
              id={this.props.task.task_id}
              className="delete"
            >
              X
            </button>
            <Progressbar percentage={this.state.percentage} />
            <span>
              <button onClick={() => this.decreaseProgress()}> - </button>
            </span>
            <span>
              <button onClick={() => this.increaseProgress()}>+ </button>
            </span>

            <p className="text">{this.props.task.content}</p>
          </Container>
        )}
      </Draggable>
    );
  }
}
