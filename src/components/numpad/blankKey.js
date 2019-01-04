import React from 'react';
import { connect } from 'react-redux';
import SVGCurvedPath from '../svgHelpers/svgCurvedPath';
import config from '../../config/config';
import { mouseDownKey, mouseEnterKey, mouseLeaveKey } from '../../actions/index';

/**
 * this is a generic svg button (without text)
 */

function BlankKey({ id, top, left, width, height, isMouseOver, isMouseDown, isKeyboardDown, backgroundColor, onClick, mouseDown, mouseEnter, mouseLeave, children}) {

  const pathStyle = {
    stroke: 'none',
    fill: backgroundColor,
    strokeWidth: '0px'
  };
  if(!((isMouseDown && isMouseOver) || isKeyboardDown)) {
    pathStyle.filter = 'url(#' + id + 'Dropshadow)'
  }
  
  const divStyle = {
    position: 'absolute',
    top: top,
    left: left,
    width: width,
    height: height
  };
  
  const topPadding = config.keyTopPadding;
  const bottomPadding = config.keyBottomPadding;
  const minPadding = Math.min(topPadding, bottomPadding);
  const topRadius = config.keyTopRadius;
  const bottomRadius = config.keyBottomRadius;
  const isCubic = config.isKeyCubic;

  const svgStyle = {
    transform: 'scale(' + 1 / (1 - 2 * minPadding) +')'
  };
  if(!isKeyboardDown && !isMouseDown && isMouseOver) {
    svgStyle.transform += ' translateY(-1px)'; 
  }

  const points = [
    { x: topPadding, y: minPadding, r: topRadius },
    { x: 1 - topPadding, y: minPadding, r: topRadius },
    { x: 1 - bottomPadding, y: 1 - minPadding, r: bottomRadius },
    { x: bottomPadding, y: 1 - minPadding, r: bottomRadius },
  ];

  return (
    <div style={divStyle}>
      <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width={width+'px'} height={height+'px'} viewBox={'0 0 ' + width + ' ' + height} preserveAspectRatio="xMidYMid meet">
        {
          !((isMouseDown && isMouseOver) || isKeyboardDown) ?
          <defs id={id + 'Defs'}>
              <filter xmlns="http://www.w3.org/2000/svg" filterUnits="objectBoundingBox" width="200%" height="200%" id={id + 'Dropshadow'}>
                <feGaussianBlur in="SourceAlpha" result="shadow" stdDeviation="2"/>
                <feOffset dx="0" dy="3" in="shadow" result="shadowoffset"/>
                <feFlood floodColor="rgba(0,0,0,0.5)"/>
                <feComposite in2="shadowoffset" operator="in"/>
                <feMerge result="dropshadowresult"><feMergeNode/>
                <feMergeNode in="SourceGraphic"/></feMerge>
              </filter> : null
          </defs> : null
        }
        <SVGCurvedPath style={pathStyle} id={id} points={points} cubic={isCubic} scaleX={width} scaleY={height} onClick={onClick} onMouseDown={mouseDown} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}/>
        <g onClick={onClick} onMouseDown={mouseDown} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
          {children}
        </g>
      </svg>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => ({
  isMouseOver: state.mouseState.over === ownProps.id,
  isMouseDown: state.mouseState.down === ownProps.id,
  isKeyboardDown: state.keyboardState[ownProps.id] === true 
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  mouseEnter: () => dispatch(mouseEnterKey(ownProps.id)),
  mouseLeave: () => dispatch(mouseLeaveKey(ownProps.id)),
  mouseDown: () => dispatch(mouseDownKey(ownProps.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlankKey);
