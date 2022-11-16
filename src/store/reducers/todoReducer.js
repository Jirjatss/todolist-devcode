import { GET_DATA_TODOS } from "../types/index";

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_DATA_TODOS:
      return { ...state, todos: payload };
    default:
      return state;
  }
};

export default todoReducer;
