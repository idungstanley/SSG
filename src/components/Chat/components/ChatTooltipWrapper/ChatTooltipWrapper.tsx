import React from 'react';
import Close from '../../../../assets/icons/Close';
import NotificationIcon from '../../../../assets/icons/NotificationIcon';
import BlurEffect from '../../../BlurEffect';

interface IChatTooltipWrapperProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  showNotifications?: boolean;
  onClose: () => void;
}

export default function ChatTooltipWrapper({
  title,
  icon,
  children,
  showNotifications,
  onClose
}: IChatTooltipWrapperProps) {
  return (
    <div className="bg-alsoit-gray-125 rounded-[2px]" style={{ fontFamily: 'montserrat' }}>
      <div className="flex justify-between">
        <div className="flex items-center pl-[5px] pr-[7px] h-6 bg-black rounded-br-[5px]">
          <div className="flex justify-between items-center mr-1">{icon ? icon : null}</div>
          <div className="relative whitespace-nowrap overflow-hidden w-[55px]">
            {title}
            <BlurEffect
              top="0"
              right="0px"
              bottom="0"
              left="auto"
              width="20px"
              height="17px"
              backgroundImage="linear-gradient(to right, transparent 0%, black 80%)"
              style={{ borderTopRightRadius: '6px' }}
            />
          </div>
          {showNotifications ? (
            <div className="relative ml-1">
              <NotificationIcon width="13" height="17" color="white" />
              <span className="absolute px-[1.5px] flex justify-center items-center top-[0px] right-[3px] min-w-[8px] h-[10px] rounded-[4px] bg-[#B30A0B] text-[8px] text-white">
                7
              </span>
            </div>
          ) : null}
        </div>
        <div
          className="w-[15px] h-[15px] m-[2px] flex justify-center items-center bg-white rounded-full cursor-pointer"
          onClick={onClose}
        >
          <Close active={false} width="15" height="15" />
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}
