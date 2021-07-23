import React, { useEffect } from 'react';
import Task from './Task.jsx';
import CreateTaskInput from './CreateTaskInput.jsx';
import { connect } from 'react-redux';
import * as tasksActions from '../tasks.actions';
import { sortedTasksListSelector } from '../tasks.selectors';

const TasksList = ({ tasks, getTasksList, createTask, updateTask, deleteTask }) => {
  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <div className="todo-list">
      <CreateTaskInput onCreate={createTask} />
      <ul className="list">
        {tasks.map(task => (
          <Task key={task.id} {...task} onChange={updateTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

const mapState = state => {
  return {
    tasks: sortedTasksListSelector(state),
  };
};

const mapDispatch = {
  getTasksList: tasksActions.getTasksList,
  updateTask: tasksActions.updateTask,
  deleteTask: tasksActions.deleteTask,
  createTask: tasksActions.createTask,
};

export default connect(mapState, mapDispatch)(TasksList);
