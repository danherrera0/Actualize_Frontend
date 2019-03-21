import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div``;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div``;

class Column extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Droppable droppableId={`column-${this.props.column.id}`}>
        {provided => (
          <TaskList
            className="Container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <Container>
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
