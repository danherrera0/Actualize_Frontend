import React from "react";
import "./App.css";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import Progressbar from "./Progressbar";

const Container = styled.div`
  /* border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px; */
  /* background-color: ${props => (props.isDragging ? "white" : "white")}; */
`;

export default class Task extends React.Component {
  state = {
    percentage: 20
  };

  progressClick = () => {
    this.setState({
      percentage: this.state.percentage + 10
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
            <p className="text">{this.props.task.content}</p>
            <Progressbar
              click={this.progressClick}
              percentage={this.state.percentage}
            />
          </Container>
        )}
      </Draggable>
    );
  }
}
