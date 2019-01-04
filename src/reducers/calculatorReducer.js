import config from '../config/config'
import { tryParseBigNumber, executeCommand } from '../services/util'
import * as keys from '../config/keys'
import BigNumber from 'bignumber.js';
import { INPUT_KEY } from '../actions';
import ParsedNumber from '../models/parsedNumber';

/**
 * @typedef CalculatorState
 * @property {boolean} on
 * @property {BigNumber} pastNumber
 * @property {BigNumber} memory
 * @property {string} command
 * @property {ParsedNumber} parsedNum
 * @property {boolean} inputing whether the user is currently in an inputing state. like when you press = the inputing is false so next time you click a key the input on the screen is reset
 * @property {boolean} dotClicked the decimal point button is clicked
 */

/**
 * 
 * @param {CalculatorState} currState 
 * @param {string|number} key 
 */
const handleNewInput = (currState, key) => {
  if(!currState.on && key !== keys.ALL_CLEAR) {
    return currState;
  }
  let parsedNum = currState.parsedNum;
  const nextState = Object.assign({}, currState, { dotClicked: false });

  if(typeof(key) === 'number') {
    if(!currState.inputing) {
      parsedNum = new ParsedNumber(0, config.digitsCount);
      parsedNum.insertDigit(key); // no need to clone, its ok to mutate sine i just created this object in prev line
      Object.assign(nextState,{ parsedNum: parsedNum, inputing: true });
    }
    else {
      const res = parsedNum.insertDigitNoMutate(key, currState.dotClicked);
      if(res !== null) {
        Object.assign(nextState,{ parsedNum: res.result });
      }
    }
  }
  else {
    let currNum;
    switch(key) {
      case keys.DOT:
        if(!currState.inputing) {
          parsedNum = new ParsedNumber(0, config.digitsCount);
          Object.assign(nextState,{ inputing: true, parsedNum: parsedNum });
        }
        if(parsedNum.decimalPlaces === 0) {
          Object.assign(nextState,{ dotClicked: true });
        }
        break;
      case keys.MEM_ADD:
        Object.assign(nextState,{ memory: currState.memory.plus(parsedNum.toBigNumber()) });
        break;
      case keys.MEM_SUBTRACT:
        Object.assign(nextState,{ memory: currState.memory.minus(parsedNum.toBigNumber()) });
        break;
      case keys.MEM_CLEAR:
        Object.assign(nextState,{ memory: BigNumber(0) });
        break;
      case keys.MEM_RECALL:
        parsedNum = new ParsedNumber(currState.memory, config.digitsCount);
        Object.assign(nextState,{ parsedNum: parsedNum, inputing: false });
        break;
      case keys.CLEAR:
        parsedNum = new ParsedNumber(0, config.digitsCount);
        Object.assign(nextState,{ parsedNum: parsedNum });
        break;
      case keys.ALL_CLEAR:
      case keys.OFF:
        parsedNum = new ParsedNumber(0, config.digitsCount);
        Object.assign(nextState,{ parsedNum: parsedNum, pastNumber: BigNumber(0), command: null, inputing: true });
        if(key === keys.OFF) {
          Object.assign(nextState,{ on: false });
        }
        else {
          Object.assign(nextState,{ on: true });
        }
        break;
      case keys.SQRT:
        Object.assign(nextState,{ inputing: false, parsedNum: parsedNum.sqrt() });
        break;
      case keys.SWITCH_SIGN:
        Object.assign(nextState,{ parsedNum: parsedNum.flipSignNoMutate() });
        break;
      case keys.PERCENT:
        let pastNum = currState.pastNumber;
        currNum = parsedNum.toBigNumber();
        currNum = pastNum.multipliedBy(currNum).dividedBy(100);
        parsedNum = new ParsedNumber(currNum, config.digitsCount);
        Object.assign(nextState,{ parsedNum: parsedNum });
        break;
      case keys.ADD:
      case keys.SUBTRACT:
      case keys.DIVIDE:
      case keys.MULTIPLY:
      case keys.EQUALS:
        currNum = parsedNum.toBigNumber();
        if(currState.command && currState.inputing) {
          currNum = executeCommand(currState.pastNumber, currState.command, currNum);
          parsedNum = new ParsedNumber(currNum, config.digitsCount);
          Object.assign(nextState,{ parsedNum: parsedNum });
        }
        Object.assign(nextState,{ inputing: false, pastNumber: currNum });
        if(key !== keys.EQUALS) {
          Object.assign(nextState,{ command: key });
        }
        else {
          Object.assign(nextState,{ command: null });
        }
        break;
      case keys.BACK_SPACE: // only available from keyboard
        Object.assign(nextState,{ inputing: true });
        if(currState.dotClicked) {
          Object.assign(nextState,{ dotClicked: false });
        }
        else {
          const res = parsedNum.backSpaceNoMutate();
          if(res !== null) {
            if(res.hitTheDecimalPlace) {
              Object.assign(nextState,{ dotClicked: true });
            }
            Object.assign(nextState,{ parsedNum: res.result });
          }
        }
        break;
      default:
        throw new Error('Weird key detected "' + key + '"');
    }
  }

  return nextState;
}

/**
 * handles the calculator logic, takes input and produces results
 */
const calculatorReducer = (state = {
  on: true,
  pastNumber: BigNumber(0),
  memory: tryParseBigNumber(localStorage.getItem('M'), 0),
  command: null,
  parsedNum: new ParsedNumber(0, config.digitsCount),
  inputing: true,
  dotClicked: false
}, action) => {
  switch (action.type) {
    case INPUT_KEY:
      return handleNewInput(state, action.key);
    default:
      return state;
  }
};

export default calculatorReducer;
