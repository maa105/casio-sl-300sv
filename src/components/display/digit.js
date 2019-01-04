import React from 'react';

/**
 * @typedef {Object} DigitProps
 * @property {string|number} digit
 * @property {number} left
 * @property {number} width
 * @property {number} height
 * @property {number} lineWidth
 */

/**
 * this is the digit in the display screen
 *    2
 *    _
 * 1 |_| 3    -- 4 the inside one
 * 5 |_| 7
 *    6
 * @param {DigitProps} props
 */
function Digit({ digit, left, width, height, lineWidth }) {

  const containerStyle = { 
    position: 'absolute', 
    width: width, 
    height: height, 
    left: left
  };

  // for the sides im using a tweek where intersecting borders intersect at an angle :)
  const side1 = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: '50%',
    border: '0',
    'borderLeft': lineWidth + 'px solid black',
    'borderBottom': (lineWidth / 2) + 'px solid transparent',
    'borderTop': lineWidth + 'px solid transparent'
  };
  const side2 = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    border: 0,
    'borderTop': lineWidth + 'px solid black',
    'borderLeft': lineWidth + 'px solid transparent',
    'borderRight': lineWidth + 'px solid transparent',
  };
  const side3 = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: '50%',
    border: 0,
    'borderRight': lineWidth + 'px solid black',
    'borderBottom': (lineWidth / 2) + 'px solid transparent',
    'borderTop': lineWidth + 'px solid transparent'
  };
  const side4_top = {
    position: 'absolute',
    bottom: '50%',
    left: 0,
    right: 0,
    border: 0,
    'borderBottom': (lineWidth / 2) + 'px solid black',
    'borderLeft': (lineWidth / 2) + 'px solid transparent',
    'borderRight': (lineWidth / 2) + 'px solid transparent',
  };
  const side4_bottom = {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    border: 0,
    'borderTop': (lineWidth / 2) + 'px solid black',
    'borderLeft': (lineWidth / 2) + 'px solid transparent',
    'borderRight': (lineWidth / 2) + 'px solid transparent',
  };
  const side5 = {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    border: 0,
    'borderLeft': lineWidth + 'px solid black',
    'borderBottom': lineWidth + 'px solid transparent',
    'borderTop': (lineWidth / 2) + 'px solid transparent',
  };
  const side6 = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    'borderBottom': lineWidth + 'px solid black',
    'borderLeft': lineWidth + 'px solid transparent',
    'borderRight': lineWidth + 'px solid transparent',
  };
  const side7 = {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    right: 0,
    border: 0,
    'borderRight': lineWidth + 'px solid black',
    'borderBottom': lineWidth + 'px solid transparent',
    'borderTop': (lineWidth / 2) + 'px solid transparent',
  };
  return (
    <div style={containerStyle}>
      { ['F','A','N','E',0,4,5,6,8,9].includes(digit)? <div style={side1}></div> : null }
      { ['F','A','N','E',0,2,3,5,6,7,8,9].includes(digit)? <div style={side2}></div> : null }
      { ['I','A','N',0,1,2,3,4,7,8,9].includes(digit)? <div style={side3}></div> : null }
      { ['F','A','E',2,3,4,5,6,8,9].includes(digit)? <div style={side4_top}></div> : null }
      { ['F','A','E',2,3,4,5,6,8,9].includes(digit)? <div style={side4_bottom}></div> : null }
      { ['F','A','N','E',0,2,6,8].includes(digit)? <div style={side5}></div> : null }
      { ['E',0,2,3,5,6,8,9].includes(digit)? <div style={side6}></div> : null }
      { ['I','A','N',0,1,3,4,5,6,7,8,9].includes(digit)? <div style={side7}></div> : null }
    </div>
  );
}

export default Digit;
