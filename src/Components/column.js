import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
padding-left: 5px;
margin-left:auto;
margin-right:auto;
border-radius:5%;
font-size: 24px;
`;

const Title = styled.h3`
width: 100%;

`;

const TaskList = styled.div`
`;

class Column extends React.Component {
  render() {
    return (
      <Droppable droppableId={`column-${this.props.column.id}`}>
        {provided => (
          <TaskList
            className="container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
          <Container>
              <Title
                style={
                  this.props.column.id === 3
                  ? { backgroundColor: "#04cc6e",
                      borderRadius: "15px",
                      marginBottom: "1%",
                    }
                  : { backgroundColor: "#ffcb02",
                      borderRadius: "15px",
                      marginBottom: "1%",
                    }
                  }
                > <div>{this.props.column.title}</div>
                </Title>
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
