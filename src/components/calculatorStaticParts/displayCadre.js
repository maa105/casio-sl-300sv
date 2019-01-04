import React from 'react';
import SVGCurvedPath from '../svgHelpers/svgCurvedPath';
import config from '../../config/config';

/**
 * @typedef {Object} DisplayCadreProps
 * @property {number} height
 * @property {number} width
 * @property {number} top
 * @property {number} left
 * @property {string} backgroundColor
 */

/**
 * this is the dark cadre encapsulating the display screen
 * @param {DisplayCadreProps} props
 */
const DisplayCadre = ({ height, width, top, left, backgroundColor }) => {
  
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
    { x: 0, y: 0, r: config.displayScreenCadreTopRadius },
    { x: x, y: 0, r: config.displayScreenCadreTopRadius },
    { x: x - config.displayScreenCadreBottomHorizontalPadding, y: y - config.displayScreenCadreBottomVerticalPadding, r: config.displayScreenCadreBottomCornerRadius },
    { x: x / 2, y: y, r: config.displayScreenCadreBottomCenterRadius },
    { x: config.displayScreenCadreBottomHorizontalPadding, y: y - config.displayScreenCadreBottomVerticalPadding, r: config.displayScreenCadreBottomCornerRadius },
  ];

  return (
    <svg style={style} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width + 'px'} height={height + 'px'} viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio="xMidYMid meet">
      <SVGCurvedPath fill={backgroundColor} points={points} scaleX={min} scaleY={min} />
    </svg>
  );
};

export default DisplayCadre;
