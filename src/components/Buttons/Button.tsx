import React, { ReactNode } from 'react';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../utils/Constants/ButtonInteractions';
import { cl } from '../../utils';

interface buttonComponentProps {
  active: boolean;
  children?: ReactNode;
  withoutBg?: boolean;
  onClick?: () => void;
}

function Button({ active, children, withoutBg, onClick }: buttonComponentProps) {
  const style = active ? ACTIVE_BUTTON : DEFAULT_BUTTON;

  const generateBg = () => {
    if (withoutBg) return 'hover:bg-alsoit-purple-50';
    if (active) {
      return 'bg-alsoit-purple-50';
    }
    return 'bg-alsoit-gray-50 hover:bg-alsoit-purple-50';
  };

  return (
    <div>
      <div style={style} className={cl('flex items-center font-semibold', generateBg())} onClick={onClick}>
        {children}
      </div>
    </div>
  );
}

export default Button;
