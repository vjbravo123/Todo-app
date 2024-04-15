export const SET_TODOS = 'SET_TODOS';
export const SET_TITLE = 'SET_TITLE'; // Corrected action type
export const SET_TEXT = 'SET_TEXT'; // Corrected action type
export const SET_MODE = 'SET_MODE'; // Corrected action type

// Action creators
export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos
});

export const setTitle = (title) => ({
  type: SET_TITLE,
  payload: title
});

export const setText = (text) => ({
  type: SET_TEXT,
  payload: text
});
export const setDarkMode = (text) => ({
  type: SET_MODE,
  payload: text
});
