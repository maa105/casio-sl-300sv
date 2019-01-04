import React from 'react';
import BlankKey from './blankKey';

/**
 * this is a calculator key with text in it
 */
function TextKey({ children, onClick, id, text, fontSize, fontColor, ...BlankKeyProps }) {
  return (
    <BlankKey onClick={onClick} id={id} {...BlankKeyProps}>
      <text textAnchor="middle" x="50%" y="50%" dy={fontSize * .4 + 'px'} fill={fontColor} fontSize={fontSize + 'px'}>
        {text || children}
      </text>
    </BlankKey>
  );
}

export default TextKey;
