import React from 'react';
import SVGCurvedPath from '../svgHelpers/svgCurvedPath';
import config from '../../config/config';

/**
 * @typedef {Object} CalcularorBodyProps
 * @property {number} height
 * @property {number} width
 * @property {number} top
 * @property {number} left
 * @property {string} backgroundColor
 * @property {*} children
 */

/**
 * this is the calculator body
 * @param {CalcularorBodyProps} prps
 */
const CalcularorBody = ({ height, width, top, left, backgroundColor, children }) => {
  
  const style = {
    position: 'absolute',
    top: top,
    left: left
  };

  // next then lined so as to avoid the case when a long side has an bigger corner radius, so I scale x and y equally, and instead of using [0->1] ranges for both x and y I use [0->1] for the smaller dimention and [0-><big_dimention>/<small_dimention>] for the larger dimention
  const max = Math.max(height, width);
  const min = Math.min(height, width);
  const ratio = max/min;
  let x, y;
  if(height === max) {
    [x, y] = [1, ratio];
  }
  else {
    [x, y] = [ratio, 1];
  }
  const points = [
    { x: 0, y: config.calculatorBodyTopVerticalPadding, r: config.calculatorBodyTopRadius },
    { x: config.calculatorBodyTopHorizontalPadding, y: 0, r: config.calculatorBodyTopRadius },
    { x: x - config.calculatorBodyTopHorizontalPadding, y: 0, r: config.calculatorBodyTopRadius },
    { x: x, y: config.calculatorBodyTopVerticalPadding, r: config.calculatorBodyTopRadius },
    { x: x - config.calculatorBodyBottomHorizontalPadding, y: y, r: config.calculatorBodyBottomCornerRadius },
    { x: config.calculatorBodyBottomHorizontalPadding, y: y, r: config.calculatorBodyBottomCornerRadius },
  ];

  return (
    <div style={style}>
      <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width + 'px'} height={height + 'px'} viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio="xMidYMid meet">
        <SVGCurvedPath fill={backgroundColor} points={points} scaleX={min} scaleY={min} />
      </svg>
      { children ? {...children} : null }
    </div>
  );
};

export default CalcularorBody;