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
  render() {
    // console.log(this.props);
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
              <button className="delete">X</button>
            </span>
            <p className="text">{this.props.task.content}</p>
          </Container>
        )}
      </Draggable>
    );
  }
}
