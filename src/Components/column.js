import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
height:2.5em;
margin-left:auto;
margin-right:auto;
border-radius:15px;
font-size: 24px;

`;

const Title = styled.h3`
`;

const TaskList = styled.div`
`;

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
          <Container>

              <Title
                style={
                  this.props.column.id === 3
                  ? { backgroundColor: "#04cc6e",
                      borderRadius: "10px",
                      width: "9.7em",
                      marginBottom: "1%",
                      height: "1.7em"
                    }
                  : { backgroundColor: "#ffcb02",
                      borderRadius: "10px",
                      width: "9.7em",
                      marginBottom: "1%",
                      height: "1.7em"
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
