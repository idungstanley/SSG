import React, { ReactNode } from 'react';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../utils/Constants/ButtonInteractions';
import { cl } from '../../utils';

interface buttonComponentProps {
  active: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

function Button({ active, children, onClick }: buttonComponentProps) {
  const style = active ? ACTIVE_BUTTON : DEFAULT_BUTTON;
  return (
    <div>
      <div
        style={style}
        className={cl(
          'flex items-center font-semibold',
          active ? 'bg-alsoit-purple-50' : 'bg-alsoit-gray-50 hover:bg-alsoit-purple-50'
        )}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

export default Button;
