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
      <button
        style={style}
        className={cl(
          'flex items-center font-semibold',
          active ? 'bg-alsoit-gray-bg-hover' : 'bg-alsoit-gray-bg hover:bg-alsoit-gray-bg-hover'
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
