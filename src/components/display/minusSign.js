import React from 'react';

/**
 * this is the minus sign
 */

function MinusSign({ display, top, left, width, height }) {
  if(!display) {
    return null;
  }
  const topStyle = {
    position: 'absolute',
    top: 0,
    bottom: '50%',
    left: 0,
    right: 0,
    border: 0,
    'borderBottom': (height / 2) + 'px solid black',
    'borderLeft': (height / 2) + 'px solid transparent',
    'borderRight': (height / 2) + 'px solid transparent',
  };
  const bottomStyle = {
    position: 'absolute',
    top: '50%',
    bottom: 0,
    left: 0,
    right: 0,
    border: 0,
    'borderTop': (height / 2) + 'px solid black',
    'borderLeft': (height / 2) + 'px solid transparent',
    'borderRight': (height / 2) + 'px solid transparent',
  };
  const style = {
    position: 'absolute',
    top: top,
    left: left,
    width: width,
    height: height
  };
  return (
    <div style={style}>
      <div style={topStyle}></div>
      <div style={bottomStyle}></div>
    </div>
  );
}

export default MinusSign;
