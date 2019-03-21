import React from "react";
import "./App.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Progressbar from "./Progressbar";
import "react-sweet-progress/lib/style.css";

const Container = styled.div``;

export default class Task extends React.Component {
  state = {
    percentage: this.props.task.percentage
  };

  updateProgress = card => {
    let cardId = parseInt(card.task_id.split("-").flat()[1]);
    fetch(`http://localhost:3000/api/v1/tasks/${cardId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        percentage: this.state.percentage
      })
    });
  };

  increaseProgress = card => {
    this.setState(
      {
        percentage: this.state.percentage + 5
      },
      () => {
        console.log(this.state.percentage);
        this.updateProgress(card);
      }
    );
  };

  decreaseProgress = card => {
    this.setState(
      {
        percentage: this.state.percentage - 5
      },
      () => {
        console.log(this.state.percentage);
        this.updateProgress(card);
      }
    );
  };

  render() {
    return (
      <Draggable draggableId={this.props.task.task_id} index={this.props.index}>
        {provided => (
          <Container
            className="Card wiggle"
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
              <button
                className="subtract"
                onClick={() => this.decreaseProgress(this.props.task)}
              >
                -
              </button>
            </span>
            <span>
              <button
                className="add"
                onClick={() => this.increaseProgress(this.props.task)}
              >
                +
              </button>
            </span>
            <p
              className="text"
              style={
                this.props.task.completed
                  ? {
                      textDecoration: "line-through",
                      color: "#585858"
                    }
                  : { textDecoration: "none" }
              }
            >
              {this.props.task.content}
            </p>
          </Container>
        )}
      </Draggable>
    );
  }
}
