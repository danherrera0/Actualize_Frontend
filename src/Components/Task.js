import React from "react";
import "../App.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import "react-sweet-progress/lib/style.css";

const Container = styled.div`
background-color: ${props => (props.isDragging ? "#ba6effb5" : "white")};
`;

export default class Task extends React.Component {

  render() {
    return (
      <Draggable draggableId={this.props.task.task_id} index={this.props.index}>
        {(provided, snapshot)=> (
          <Container
            className="card wiggle"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isDragging={snapshot.isDragging}
          >
            <button
              onClick={event => this.props.delete(event, this.props.task)}
              id={this.props.task.task_id}
              className="delete"
            >
              X
            </button>
            <p
              className="task-text"
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
