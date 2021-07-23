import * as tasksGateway from './tasksGateway';
import { tasksListSelector } from './tasks.selectors';

export const TASKS_LIST_RECIEVED = 'TASKS_LIST_RECIEVED';

export const tasksListRecieved = tasksList => {
  return {
    type: TASKS_LIST_RECIEVED,
    payload: {
      tasksList,
    },
  };
};

export const getTasksList = () => {
  const thunkAction = function (dispatch) {
    tasksGateway.fetchTasksList().then(tasksList => {
      dispatch(tasksListRecieved(tasksList));
    });
  };

  return thunkAction;
};

export const updateTask = taskId => {
  const thunkAction = function (dispatch, getState) {
    const state = getState();
    const tasksList = tasksListSelector(state);
    const task = tasksList.find(task => task.id === taskId);
    const updatedTask = {
      ...task,
      done: !task.done,
    };

    tasksGateway.updateTask(taskId, updatedTask).then(() => dispatch(getTasksList()));
  };

  return thunkAction;
};

export const deleteTask = taskId => {
  const thunkAction = function (dispatch) {
    tasksGateway.deleteTask(taskId).then(() => dispatch(getTasksList()));
  };

  return thunkAction;
};

export const createTask = text => {
  const thunkAction = function (dispatch) {
    const taskData = {
      text,
      done: false,
    };
    tasksGateway.createTask(taskData).then(() => dispatch(getTasksList()));
  };

  return thunkAction;
};
