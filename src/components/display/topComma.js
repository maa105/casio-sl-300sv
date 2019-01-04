import React from 'react';

/**
 * this is the comma at the top that seperated each thousands digits group
 */

function TopComma({ display, left, width, height }) {
  if(!display) {
    return null;
  }
  const style = {
    position: 'absolute',
    top: 0,
    left: left + 'px',
    border: 0,
    'borderLeft': width + 'px solid black',
    'borderBottom': height + 'px solid transparent',
  };
  return (
    <div style={style}></div>
  );
}

export default TopComma;
