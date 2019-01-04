import { KEYBOARD_KEY_DOWN, KEYBOARD_KEY_UP } from '../actions'

/**
 * tracks the states of the numpad's key i.e. key 1 is hovered/pressed or both etc...
 */
const keyboardReducer = (state = { down: null }, action) => {
  switch (action.type) {
    case KEYBOARD_KEY_DOWN:
      return Object.assign({}, state, { [action.key]: true });
    case KEYBOARD_KEY_UP:
      return Object.assign({}, state, { [action.key]: false });
    default:
      return state;
  }
};

export default keyboardReducer;
