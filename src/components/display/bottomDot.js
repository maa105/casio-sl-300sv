import React from 'react';

/**
 * @typedef {Object} BottomDotProps
 * @property {boolean} display
 * @property {number} left
 * @property {number} radius
 */


/**
 * this is the decimal dot in the display screen
 * @param {BottomDotProps} props
 */
const BottomDot = ({ display, left, radius }) => {
  if(!display) {
    return null;
  }
  const style = {
    position: 'absolute',
    bottom: -radius / 2,
    left: left,
    'borderRadius': '50%',
    'width': radius,
    'height': radius,
    'backgroundColor': 'black'
  };
  return (
    <div style={style}></div>
  );
};

export default BottomDot;
