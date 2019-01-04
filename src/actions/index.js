import config from '../config/config';
import { getNumpadKeyEquivalentOfKeyboardKeyCode } from '../services/util';

export const MOUSE_ENTER_KEY = 'MOUSE_ENTER_KEY';
export const MOUSE_LEAVE_KEY = 'MOUSE_LEAVE_KEY';
export const MOUSE_DOWN_KEY = 'MOUSE_DOWN_KEY';
export const MOUSE_UP = 'MOUSE_UP';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';
export const INPUT_KEY = 'INPUT_KEY';
export const KEYBOARD_KEY_UP = 'KEYBOARD_KEY_UP';
export const KEYBOARD_KEY_DOWN = 'KEYBOARD_KEY_DOWN';
export const KEYBOARD_KEY_PRESS = 'KEYBOARD_KEY_PRESS';
export const NOOP = 'NOOP';

let mouseEnterLeaveDebounceTimer;
let windowResizeDebounceTimer;

/**
 * @description action triggered when the user hovers over a key
 * @param {string|number} key the key that the mouse just entered
 */
export const mouseEnterKey = (key) => {
  return function(dispatch) {
    if(mouseEnterLeaveDebounceTimer) {
      clearTimeout(mouseEnterLeaveDebounceTimer);
    }
    mouseEnterLeaveDebounceTimer = setTimeout(() => { // debounce mouse enter
      mouseEnterLeaveDebounceTimer = null;
      dispatch({
        type: MOUSE_ENTER_KEY,
        key
      });
    }, 100);
  };
};

/**
 * @description action triggered when the user hovers away from a key
 * @param {string|number} key the key that the mouse just left
 */
export const mouseLeaveKey = (key) => {
  return function(dispatch) {
    if(mouseEnterLeaveDebounceTimer) {
      clearTimeout(mouseEnterLeaveDebounceTimer);
    }
    mouseEnterLeaveDebounceTimer = setTimeout(() => {
      mouseEnterLeaveDebounceTimer = null;
      dispatch({
        type: MOUSE_LEAVE_KEY,
        key
      });
    }, 100);
  };
};

/**
 * @description action triggered when the user presses the mouse down on a key
 * @param {string|number} key the key that the mouse pressed down on
 */
export const mouseDownKey = key => ({
  type: MOUSE_DOWN_KEY,
  key
});

/**
 * @description action triggered when the user releases the mouse down
 */
export const mouseUp = () => ({
  type: MOUSE_UP
});

/**
 * @description action triggered when the user presses a key on the keyboard
 * @param {string|number} keyCode the keyCode of what was pressed
 */
export const keyboardKeyPress = (keyCode) => {
  return function(dispatch) {
    let numpadKey = getNumpadKeyEquivalentOfKeyboardKeyCode(keyCode);
    if(numpadKey !== null) {
      dispatch(inputKey(numpadKey));
    }
  };
};

/**
 * @description action triggered when the user presses down on a key on the keyboard
 * @param {string|number} keyCode the keyCode of what was pressed down
 */
export const keyboardKeyDown =  (keyCode) => {
  let numpadKey = getNumpadKeyEquivalentOfKeyboardKeyCode(keyCode);
  if(numpadKey !== null) {
    return {
      type: KEYBOARD_KEY_DOWN,
      key: numpadKey
    };
  }
  return {
    type: NOOP
  };
};

/**
 * @description action triggered when the user presses up on a key on the keyboard
 * @param {string|number} keyCode the keyCode of what was pressed up
 */
export const keyboardKeyUp =  (keyCode) => {
  let numpadKey = getNumpadKeyEquivalentOfKeyboardKeyCode(keyCode);
  if(numpadKey !== null) {
    return {
      type: KEYBOARD_KEY_UP,
      key: numpadKey
    };
  }
  return {
    type: NOOP
  };
};

/**
 * @description action triggered the browser resizes
 */
export const resizeWindow = () => {
  if(!config.windowResizeDebounceInterval) { // conditionally debounce
    return {
      type: RESIZE_WINDOW
    };
  }
  return function(dispatch) {
    if(windowResizeDebounceTimer) {
      clearTimeout(windowResizeDebounceTimer);
    }
    windowResizeDebounceTimer = setTimeout(() => { // debounce window resize
      windowResizeDebounceTimer = null;
      dispatch({
        type: RESIZE_WINDOW
      });
    }, config.windowResizeDebounceInterval);
  };
};

/**
 * @description action triggered the user inputs a number/key
 * @param {string|number} key the key the user just inputed
 */
export const inputKey = key => ({
  type: INPUT_KEY,
  key
});
