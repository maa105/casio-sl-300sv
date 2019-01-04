import { MOUSE_ENTER_KEY, MOUSE_LEAVE_KEY, MOUSE_DOWN_KEY, MOUSE_UP } from '../actions'

/**
 * tracks the states of the numpad's key i.e. key 1 is hovered/pressed or both etc...
 */
const mouseReducer = (state = { over: null, down: null }, action) => {
  switch (action.type) {
    case MOUSE_ENTER_KEY:
      if(action.key !== state.key) {
        return Object.assign({}, state, { over: action.key });
      }
      return state;
    case MOUSE_LEAVE_KEY:
      if(action.key === state.over) {
        return Object.assign({}, state, { over: null });
      }
      return state;
    case MOUSE_DOWN_KEY:
      return Object.assign({}, state, { down: action.key });
    case MOUSE_UP:
      return Object.assign({}, state, { down: null });
    default:
      return state;
  }
};

export default mouseReducer;
