import React from 'react';
import { connect } from 'react-redux';
import config from '../config/config';
import NumPad from './numpad/numPad';
import DigitsDisplay from './display/digitsDisplay';
import DisplayCadre from './calculatorStaticParts/displayCadre';
import CalcularorBody from './calculatorStaticParts/calculatorBody';

/**
 * the calculator
 */

function Calculator({ width, height }) {
  const windowAspectRatio = width / height
  const calculatorAspectRatio = config.calculatorAspectRatio;

  let calculatorWidth, calculatorHeight, calculatorTop, calculatorLeft;
  if(windowAspectRatio > calculatorAspectRatio) {
    calculatorHeight = height;
    calculatorWidth = calculatorAspectRatio * height;
    calculatorTop = 0;
    calculatorLeft = (width - calculatorWidth) / 2;
  }
  else {
    calculatorHeight = width / calculatorAspectRatio;
    calculatorWidth = width;
    calculatorTop = (height - calculatorHeight) / 2;
    calculatorLeft = 0;
  }

  const calculatorProps = {
    top: calculatorTop,
    left: calculatorLeft,
    width: calculatorWidth,
    height: calculatorHeight,
    backgroundColor: config.calculatorBgColor
  };

  const casioTextStyle = {
    position:'absolute',
    top: config.casioTop * calculatorHeight,
    left: config.casioLeft * calculatorHeight,
    fontSize: config.casioFontSize * calculatorHeight,
    color: 'black',
    fontWeight: 'bold'
  };

  const solarChargerStyle = {
    position:'absolute',
    top: config.solarChargerTop * calculatorHeight,
    right: config.solarChargerRight * calculatorHeight,
    width: (config.solarChargerWidth - 2 * config.solarChargerBorderWidth) * calculatorHeight,
    height: (config.solarChargerHeight - 2 * config.solarChargerBorderWidth) * calculatorHeight,
    backgroundColor: config.solarChargerColor,
    borderRadius: config.solarChargerBorderRadius * calculatorHeight,
    borderWidth: config.solarChargerBorderWidth * calculatorHeight,
    borderColor: config.solarChargerBorderColor,
    borderStyle: 'solid',
  };

  const displayScreenCadreProps = {
    top: config.displayScreenCadreTop * calculatorHeight,
    left: config.displayScreenCadreHorizontalPadding * calculatorHeight,
    width: calculatorWidth - 2 * config.displayScreenCadreHorizontalPadding * calculatorHeight,
    height: (config.displayScreenHeight + config.displayScreenCadreTopPadding + config.displayScreenCadreBottomPadding) * calculatorHeight,
    backgroundColor: config.displayScreenCadreColor
  };

  const displayScreenStyle = {
    position:'absolute',
    top: (config.displayScreenCadreTop + config.displayScreenCadreTopPadding) * calculatorHeight,
    left: (calculatorWidth - config.displayScreenWidth * calculatorHeight) / 2,
    width: config.displayScreenWidth * calculatorHeight,
    height: config.displayScreenHeight * calculatorHeight,
    backgroundColor: config.displayScreenColor
  };

  const sl300SVStyle = {
    position:'absolute',
    top: config.sl300SVTop * calculatorHeight,
    left: config.sl300SVLeft * calculatorHeight,
    fontSize: config.sl300SVFontSize * calculatorHeight,
    color: 'black',
  };

  const twoWayStyle = {
    position:'absolute',
    top: config.twoWayPowerTop * calculatorHeight,
    right: config.solarChargerRight * calculatorHeight,
    width: config.solarChargerWidth * calculatorHeight,
    textAlign: 'center',
    fontSize: config.twoWayPowerFontSize * calculatorHeight,
    letterSpacing: config.twoWayPowerLetterSpacing * calculatorHeight,
    fontWeight: 'bold',
    color: 'black',
  };

  const onStyle = {
    position:'absolute',
    top: config.onTop * calculatorHeight,
    left: (calculatorWidth - (config.keyWidth * 5 + config.keyHorizontalPadding * 4) * calculatorHeight) / 2,
    width: config.keyWidth * calculatorHeight,
    textAlign: 'center',
    fontSize: config.onFontSize * calculatorHeight,
    color: 'black',
  };

  const numPadProps = {
    top: config.numPadTop * calculatorHeight,
    left: (calculatorWidth - (5 * config.keyWidth + 4 * config.keyHorizontalPadding) * calculatorHeight) / 2,
    keyHeight: config.keyHeight * calculatorHeight,
    smallKeyHeight: config.smallKeyHeight * calculatorHeight,
    keyWidth: config.keyWidth * calculatorHeight,
    verticalPadding: config.keyVerticalPadding * calculatorHeight,
    horizontalPadding: config.keyHorizontalPadding * calculatorHeight,
    fontSize: config.keyFontSize * calculatorHeight,
    smallFontSize: config.smallKeyFontSize * calculatorHeight
  };

  const onBaselStyle = {
    position: 'absolute',
    top: (config.numPadTop + config.keyHeight * 5  + config.smallKeyHeight + config.keyVerticalPadding * 5 - config.onBazelBottomPadding - config.onBazelHeight) * calculatorHeight,
    left: (calculatorWidth - (5 * config.keyWidth + 4 * config.keyHorizontalPadding) * calculatorHeight) / 2 - config.onBazelHorizontalPadding * calculatorHeight,
    height: config.onBazelHeight * calculatorHeight,
    width: (config.keyWidth + 2 * config.onBazelHorizontalPadding) * calculatorHeight,
    borderRadius: config.onBazelBorderRadius * calculatorHeight,
    backgroundColor: config.onBazelColor
  };

  const digitsDisplayProps = {
    top: (config.displayScreenCadreTop + config.displayScreenCadreTopPadding) * calculatorHeight,
    left: (calculatorWidth - config.displayScreenWidth * calculatorHeight) / 2,
    width: config.displayScreenWidth * calculatorHeight,//((config.displayScreenWidth - config.digitsCommaWidth * config.digitsCount - config.digitsPadding * 2 * config.digitsCount) / config.digitsCount) * calculatorHeight,
    height: config.displayScreenHeight * calculatorHeight,
    lineWidth: config.digitsLineWidth * calculatorHeight,
    commaWidth: config.digitsCommaWidth * calculatorHeight,
    commaHeight: config.digitsCommaHeight * calculatorHeight,
    padding: config.digitsPadding * calculatorHeight,
    digitsCount: config.digitsCount,
    verticalPadding: config.displayScreenInnerVerticalPadding * calculatorHeight,
    horizontalPadding: config.displayScreenInnerHorizontalPadding * calculatorHeight,
    minusSignWidth: config.digitsMinusSignWidth * calculatorHeight,
    minusSignHeight: config.digitsMinusSignHeight * calculatorHeight,
    minusSignRightMargin: config.digitsMinusSignRightMargin * calculatorHeight,
    memoryAndErrorSpacing: config.digitsMemoryAndErrorSpacing * calculatorHeight,
    memoryAndErrorFontSize: config.digitsMemoryAndErrorFontSize * calculatorHeight,
  };

  return (
    <CalcularorBody {...calculatorProps}>
      <div>
        <div style={casioTextStyle}>CASIO</div>
        <div style={solarChargerStyle}></div>
        <div style={twoWayStyle}>TWO WAY POWER</div>
        <DisplayCadre {...displayScreenCadreProps} />
        <div style={displayScreenStyle}></div>
        <div style={sl300SVStyle}>SL-300SV</div>
        <div style={onStyle}>ON</div>
        <div style={onBaselStyle}></div>
        <NumPad {...numPadProps}/>
        <DigitsDisplay {...digitsDisplayProps}/>
      </div>
    </CalcularorBody>
  );
}

const mapStateToProps = (state) => ({
  width: state.globalState.windowWidth,
  height: state.globalState.windowHeight,
});

export default connect(mapStateToProps)(Calculator);
