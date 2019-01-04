import React from 'react';
import { connect } from 'react-redux';
import TextKey from './textKey';
import { isObject } from 'lodash';
import config from '../../config/config';
import { inputKey } from '../../actions/index';
import * as keys from '../../config/keys';

/**
 * this is the numpad
 */
function NumPad({ enabled, inputKey, top, left, keyHeight, keyWidth, smallKeyHeight, verticalPadding, horizontalPadding, fontSize, smallFontSize }) {
  let keyTop = 0, gridWidth = 0, gridHeight;
  const buttons = [];
  const grid = [ // all the buttons except for the +
    [null, null, null, { keyValue: keys.SQRT, small: true }, { keyValue: keys.OFF, small: true }],
    [keys.MEM_RECALL, keys.MEM_CLEAR, keys.MEM_SUBTRACT, keys.MEM_ADD, keys.DIVIDE],
    [keys.PERCENT, 7, 8, 9,keys.MULTIPLY],
    [keys.SWITCH_SIGN, 4, 5, 6,keys.SUBTRACT],
    [{ keyValue: keys.CLEAR, backgroundColor: config.acKeyColor }, 1, 2, 3],
    [{ keyValue: keys.ALL_CLEAR, backgroundColor: config.acKeyColor }, 0, keys.DOT,keys.EQUALS],
  ];
  const backgroundColor = config.keyColor;
  for(let row = 0; row < grid.length; row++) {
    let rowHeight = 0, keyLeft = 0;
    for(let col = 0; col < grid[row].length; col++) {
      let keyProps = grid[row][col];
      let currKeyHeight = keyHeight;
      if(keyProps !== null) {
        if(!isObject(keyProps)) {
          keyProps = { keyValue: keyProps };
        }
        currKeyHeight = keyProps.small ? smallKeyHeight : keyHeight;
        const currFontSize = keyProps.small ? smallFontSize : fontSize;
        buttons.push(<TextKey backgroundColor={keyProps.backgroundColor || backgroundColor} left={keyLeft} top={keyTop} width={keyWidth} height={currKeyHeight} fontSize={currFontSize} fontColor={config.keyFontColor} key={keyProps.keyValue} id={keyProps.keyValue} onClick={inputKey.bind(null,keyProps.keyValue, enabled)}>{keyProps.text || keyProps.keyValue}</TextKey>)
      }
      else {
        currKeyHeight = 0; // no button no need to reserve height
      }
      keyLeft += keyWidth + horizontalPadding;
      if(currKeyHeight > rowHeight) {
        rowHeight = currKeyHeight
      }
    }
    keyLeft -= horizontalPadding;
    if(gridWidth < keyLeft) {
      gridWidth = keyLeft;
    }
    keyTop += rowHeight + verticalPadding;
  }
  gridHeight = keyTop - verticalPadding;

  const style = {
    position: 'absolute',
    top: top,
    left: left,
    width: gridWidth,
    height: gridHeight
  };

  const plusTop = (keyHeight * 3 + smallKeyHeight + verticalPadding * 4);
  const plusLeft = keyWidth * 4 + horizontalPadding * 4;
  const plusHeight = (keyHeight * 2 + verticalPadding);
  
  return (
    <div style={style}>
      { buttons }
      <TextKey backgroundColor={backgroundColor} left={plusLeft} top={plusTop} width={keyWidth} height={plusHeight} fontSize={fontSize} fontColor={config.keyFontColor} id={keys.ADD} onClick={inputKey.bind(null,keys.ADD,enabled)}>{keys.ADD}</TextKey>
    </div>
  );
}

const mapStateToProps = (state) => ({
  enabled: state.calculatorState.on
});

const mapDispatchToProps = (dispatch) => ({
  inputKey: (key, enabled) => { 
    if(enabled || key === keys.ALL_CLEAR) {
      return dispatch(inputKey(key));
    }
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NumPad);
