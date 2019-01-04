import React from 'react';
import Victor from 'victor';

/**
 * draws an svg path (tested convex colockwise) with corner rounded up according to a given radius using either cubic or quadratic functions VERY USEFUL AND AWESOME!
 * @param {Array<Object>} points { x, y, r(corner radius), rPrev(corner radius from the point before), rNext(corner radius to the next point), C(set to true to have qubic corner curve), Q(set to true to have quadratic corner curve [quadratic is default unless "cubic" parameter is true]) }
 * @param {boolean} cubic make cubic corners the default
 * @param {number} scaleX
 * @param {number} scaleY
 */
function SVGCurvedPath({ points, cubic, scaleX, scaleY, ...restProps }) {

  const vectors = points.map((point, i, points) => {
    const next = points[(i + 1 + points.length) % points.length];
    return new Victor(next.x, next.y).subtract(Victor(point.x, point.y)).normalize();
  });

  const scaleVector = new Victor(scaleX || 1, scaleY || 1);

  const pathPoints = vectors.map((nextVector, i, vectors) => {
    const point = points[i];
    const positionVector = new Victor(point.x, point.y);
    
    const prevVector = vectors[(i - 1 + vectors.length) % vectors.length];

    const corner1 = positionVector.clone().subtract(prevVector.clone().multiplyScalar(point.rPrev || point.r)).multiply(scaleVector);
    const corner2 = positionVector.clone().add(nextVector.clone().multiplyScalar(point.rNext || point.r)).multiply(scaleVector);

    positionVector.multiply(scaleVector);

    const isCubic = point.C || (!point.Q && cubic && point.C !== false);
    return (i === 0 ? 'M' : 'L') + corner1.x + ',' + corner1.y + ' ' + (isCubic ? ('C' + positionVector.x + ',' + positionVector.y + ' ' + positionVector.x + ',' + positionVector.y) : ('Q' + positionVector.x + ',' + positionVector.y)) + ' ' + corner2.x + ',' + corner2.y;
  }).join(' ') + ' Z';

  return (
    <path {...restProps} d={pathPoints}></path>
  );
}

export default SVGCurvedPath;
