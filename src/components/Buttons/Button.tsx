import React, { ReactNode } from 'react';
import { ACTIVE_BUTTON, DEFAULT_BUTTON } from '../../utils/Constants/ButtonInteractions';
import { cl } from '../../utils';

interface buttonComponentProps {
  active: boolean;
  children?: ReactNode;
  withoutBg?: boolean;
  unusing?: boolean;
  onClick?: () => void;
  place?: string;
}

function Button({ active, children, withoutBg, unusing, onClick, place }: buttonComponentProps) {
  const style = active ? ACTIVE_BUTTON : DEFAULT_BUTTON;

  const assigneeModeStyles = place == 'assigneeMode' && { borderRadius: '0 5px 5px 0' };
  const meModeStyles = place == 'meMode' && { borderRadius: '5px 0 0 5px' };

  const generateBg = () => {
    if (withoutBg) return 'hover:bg-alsoit-purple-50';
    if (active) {
      return 'bg-alsoit-purple-50';
    }
    return 'bg-alsoit-gray-50 hover:bg-alsoit-purple-50';
  };

  const unusingStyles = unusing
    ? {
        background: 'orange',
        opacity: '0.5'
      }
    : {};

  return (
    <div>
      <div
        style={{ ...style, ...unusingStyles, ...assigneeModeStyles, ...meModeStyles }}
        className={cl('flex items-center font-semibold', generateBg())}
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}

export default Button;
