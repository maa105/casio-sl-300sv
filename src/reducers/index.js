import { combineReducers } from 'redux';
import mouseReducer from './mouseReducer';
import keyboardReducer from './keyboardReducer';
import calculatorReducer from './calculatorReducer';
import globalReducer from './globalReducer';

/**
 * combines all reducers
 */
export default combineReducers({
  mouseState: mouseReducer,
  keyboardState: keyboardReducer,
  calculatorState: calculatorReducer,
  globalState: globalReducer
});
