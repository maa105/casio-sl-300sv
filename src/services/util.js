import { MULTIPLY, DIVIDE, ADD, SUBTRACT } from '../config/keys';
import BigNumber from 'bignumber.js';
import * as keys from '../config/keys';

/**
 * @description epsilon represents the precision error tolerance
 */
export const eps = 1e-10;

export const tryParseBigNumber = (str, def) => {
  const num = str && BigNumber(str);
  return (num && !num.isNaN() && num.isFinite() && num) || BigNumber(def);
};

/**
 * 
 * @param {BigNumber} op1 the first operand of the equation
 * @param {string} cmd the command to execute (+-/*)
 * @param {BigNumber} op2 the second operand of the equation
 */
export const executeCommand = (op1, cmd, op2) => {
  switch(cmd) {
    case ADD:
      return op1.plus(op2);
    case SUBTRACT:
      return op1.minus(op2);
    case DIVIDE:
      return op1.dividedBy(op2);
    case MULTIPLY:
      return op1.multipliedBy(op2);
    default:
      return op2
  }
};

/**
 * 
 * @param {number} keyCode the  keycode of the key
 * @returns {string|number|null} the euivalent numpad key
 */
export const getNumpadKeyEquivalentOfKeyboardKeyCode = (keyCode) => {
  switch(keyCode) {
    case 13:  // enter key
      return keys.EQUALS;
    case 27:  // escape key
      return keys.ALL_CLEAR;
    case 8:   // backspace
      return keys.BACK_SPACE;
    default:
      break;
  }

  const key = String.fromCharCode(keyCode);
  switch(key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return parseInt(key, 10);
    case '+':
      return keys.ADD;
    case '-':
      return keys.SUBTRACT;
    case 'X':
    case 'x':
    case '*':
      return keys.MULTIPLY;
    case '/':
      return keys.DIVIDE;
    case '=':
      return keys.EQUALS;
    case 'M':
    case 'm':
      return keys.MEM_RECALL;
    case 'C':
    case 'c':
      return keys.CLEAR;
    case '%':
      return keys.PERCENT;
    case '.':
      return keys.DOT;
    default:
      return null;
  }
};
