import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
border-radius: 5px;
width: 8.5em;
margin-left:auto;
margin-right:auto;
margin: 3%;
`;

const Title = styled.h3``;

const TaskList = styled.div``;

class Column extends React.Component {
  render() {
    return (
      <Droppable droppableId={`column-${this.props.column.id}`}>
        {provided => (
          <TaskList
            className="Container"
            {...provided.droppableProps}
            ref={provided.innerRef}

          >
            <Container
            style={
              this.props.column.id === 3
                ? {
                    backgroundColor: "#04cc6e"
                  }
                : { backgroundColor: "#ffcc01"
                 }
            }
            >

              <Title>{this.props.column.title}</Title>
              {this.props.tasks.map((task, index) => (
                <Task
                  delete={this.props.delete}
                  key={task.task_id}
                  task={task}
                  index={index}
                />
              ))}
              {provided.placeholder}
            </Container>
          </TaskList>
        )}
      </Droppable>
    );
  }
}

export default Column;
