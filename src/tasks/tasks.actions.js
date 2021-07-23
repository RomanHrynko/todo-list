import { fetchTasksList } from './tasksGateway';

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
    fetchTasksList().then(tasksList => {
      dispatch(tasksListRecieved(tasksList));
    });
  };

  return thunkAction;
};
