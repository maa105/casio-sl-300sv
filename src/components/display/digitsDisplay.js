import React from 'react';
import { connect } from 'react-redux';
import Digit from './digit';
import TopComma from './topComma';
import BottomDot from './bottomDot';
import MinusSign from './minusSign';

/**
 * @typedef {Object} DigitsDisplayProps
 * @property {boolean} enabled
 * @property {import("../../models/parsedNumber.js").ParsedNumber} parsedNum
 * @property {boolean} hasMemory
 * @property {number} top
 * @property {number} left
 * @property {number} width
 */

/**
 * this is the display screen
 * @param {DigitsDisplayProps} props
 */
function DigitsDisplay({ enabled, parsedNum, hasMemory, top, left, width, height, digitsCount, padding, lineWidth, commaWidth, commaHeight, verticalPadding, horizontalPadding, minusSignWidth, minusSignHeight, minusSignRightMargin, memoryAndErrorSpacing, memoryAndErrorFontSize }) {

  const digitsStartLeft = horizontalPadding + minusSignWidth + minusSignRightMargin;
  const digitsTop = verticalPadding;

  const digitHeight = height - verticalPadding * 2;
  const digitWidth = (width - horizontalPadding * 2 - minusSignWidth - minusSignRightMargin) / digitsCount - commaWidth - 2 * padding;
  
  const minusSignProps = {
    top: (height - minusSignHeight) / 2,
    left: horizontalPadding,
    height: minusSignHeight,
    width: minusSignWidth
  };

  const memoryStyle = {
    position: 'absolute',
    bottom: memoryAndErrorSpacing + (height + minusSignHeight) / 2,
    left: horizontalPadding,
    width: minusSignWidth,
    fontSize: memoryAndErrorFontSize,
    textAlign: 'center',
    display: hasMemory ? '' : 'none'
  };

  const errorStyle = {
    position: 'absolute',
    top: memoryAndErrorSpacing + (height + minusSignHeight) / 2,
    left: horizontalPadding,
    width: minusSignWidth,
    fontSize: memoryAndErrorFontSize,
    textAlign: 'center',
    display: (parsedNum.overflow || parsedNum.invalid) ? '' : 'none'
  };

  const digits = [];
  let baseLeft = 0;
  for(let i = 0; i < parsedNum.digits.length; i++) {
    const digitPlace = (parsedNum.digits.length - i - parsedNum.decimalPlaces - 1);
    const displayComma = digitPlace > 0 && digitPlace % 3 === 0 && digitPlace < parsedNum.wholeNumberCount;
    const displayDot = i === (parsedNum.emptyCount + parsedNum.wholeNumberCount - 1);
    const digit = <div key={i}>
      <Digit left={baseLeft} width={digitWidth} height={digitHeight} lineWidth={lineWidth} digit={parsedNum.digits[i]}/>
      <TopComma left={baseLeft + digitWidth + padding} width={commaWidth} height={commaHeight} display={displayComma}/>
      <BottomDot left={baseLeft + digitWidth + padding} radius={commaWidth} display={displayDot}/>
    </div>;
    digits.push(digit);
    baseLeft += (digitWidth + 2 * padding + commaWidth);
  }
  
  const rootStyle = { 
    position: 'absolute', 
    top: top,
    left: left, 
    height: height, 
    width: width
  };

  const digitsStyle = {
    position: 'absolute', 
    height: digitHeight, 
    width:digitsCount * (digitWidth + 2 * padding * commaWidth), 
    top: digitsTop, 
    left: digitsStartLeft
  };

  return (
    enabled ? 
    <div style={rootStyle}>
      <MinusSign {...minusSignProps} display={parsedNum.sign < 0} />
      <div style={memoryStyle}>M</div>
      <div style={errorStyle}>E</div>
      <div style={digitsStyle}>
        {digits}
      </div>
    </div> : null
  );
}

const mapStateToProps = (state) => ({
  parsedNum: state.calculatorState.parsedNum,
  enabled: state.calculatorState.on,
  hasMemory: state.calculatorState.memory.comparedTo(0) !== 0
});

export default connect(mapStateToProps)(DigitsDisplay);
