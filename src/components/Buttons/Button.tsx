import React, { ReactNode } from 'react';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../utils/Constants/ButtonInteractions';

type propTypes = string;

interface buttonComponentProps {
  active: boolean;
  children?: ReactNode;
  width?: propTypes;
  height?: propTypes;
  onClick?: () => void;
}

function Button({ active, width, height, children, onClick }: buttonComponentProps) {
  const style = active ? ACTIVE_BUTTON : DEFAULT_BUTTON;
  return (
    <div>
      <button style={style} className={`${width} ${height} flex items-center`} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
