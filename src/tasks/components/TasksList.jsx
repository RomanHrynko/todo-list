import React, { Component } from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import { createTask, updateTask, deleteTask } from '../tasksGateway.js';
import { connect } from 'react-redux';
import * as tasksActions from '../tasks.actions';
import { tasksListSelector } from '../tasks.selectors';

class TasksList extends Component {
  componentDidMount() {
    this.props.getTasksList();
  }

  onCreate = text => {
    const newTask = {
      text,
      done: false,
    };

    createTask(newTask).then(() => this.props.getTasksList());
  };

  handleTaskStatusChange = id => {
    const { done, text } = this.props.tasks.find(task => task.id === id);
    const updatedTask = {
      text,
      done: !done,
    };

    updateTask(id, updatedTask).then(() => this.props.getTasksList());
  };

  handleTaskDelete = id => {
    deleteTask(id).then(() => this.props.getTasksList());
  };

  render() {
    const sortedList = this.props.tasks.slice().sort((a, b) => a.done - b.done);

    return (
      <div className="todo-list">
        <CreateTaskInput onCreate={this.onCreate} />
        <ul className="list">
          {sortedList.map(task => (
            <Task
              key={task.id}
              {...task}
              onChange={this.handleTaskStatusChange}
              onDelete={this.handleTaskDelete}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tasks: tasksListSelector(state),
  };
};

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
};

export default connect(mapState, mapDispatch)(TasksList);
