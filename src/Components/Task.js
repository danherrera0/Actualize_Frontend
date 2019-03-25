import React from "react";
import "../App.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "react-sweet-progress/lib/style.css";

const Container = styled.div``;

export default class Task extends React.Component {

  render() {
    return (
      <Draggable draggableId={this.props.task.task_id} index={this.props.index}
      >
        {provided => (
          <Container
            className="Card wiggle"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <button
              onClick={event => this.props.delete(event, this.props.task)}
              id={this.props.task.task_id}
              className="delete"
            >
              X
            </button>
            <p
              className="text"
              style={
                this.props.task.completed
                  ? {
                      textDecoration: "line-through"
                    }
                  : { textDecoration: "none"
                   }
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
