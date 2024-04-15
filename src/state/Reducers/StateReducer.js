import {
  SET_TODOS,
  SET_TITLE,
  SET_TEXT,
  SET_MODE
} from '../ActionCreators/index';

const initialState = {
    todos:[],
    title:'',
    text:'',
    mode:"light"
  };

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_TODOS:
        return { ...state, todos: action.payload };
      case SET_TITLE:
        return { ...state, title: action.payload };
      case SET_TEXT:
        return { ...state, text: action.payload };
      case SET_MODE:
        return { ...state, mode: action.payload };
      default:
        return state;

    }
}
export default rootReducer;