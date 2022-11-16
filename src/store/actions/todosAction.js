import { GET_DATA_TODOS } from "../types/index";
import axios from "axios";
// const baseUrl = "";

export const getDataTodos = () => (dispatch, getState) => {
  axios
    .get("https://todo.api.devcode.gethired.id/activity-groups?email=sajadhijir@gmail.com")
    .then(({ data }) => {
      dispatch({
        type: GET_DATA_TODOS,
        payload: data.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
