import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  /* border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px; */
  /* background-color: ${props => (props.isDragging ? "white" : "white")}; */
`;

export default class Task extends React.Component {
  deleteCard = event => {
    let deletedId = parseInt(event.target.id.split("-").flat()[1]);
    fetch(`http://localhost:3000/api/v1/tasks/${deletedId}`, {
      method: "DELETE"
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
            <span>
              <button
                onClick={this.deleteCard}
                id={this.props.task.task_id}
                className="delete"
              >
                X
              </button>
            </span>
            <p className="text">{this.props.task.content}</p>
          </Container>
        )}
      </Draggable>
    );
  }
}
