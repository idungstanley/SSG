import React, { useState } from 'react';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { Menu as HeadMenu } from '@headlessui/react';
import ChatReply from '../../../../../assets/icons/ChatReply';
import { useAppDispatch } from '../../../../../app/hooks';
import { setSelectedMessage } from '../../../../../features/chat/chatSlice';
import { IMessage } from '../../../../../features/chat/chat.interfaces';
import AlsoitMenuDropdown from '../../../../DropDowns';
import DropdownTitle from '../../../../DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../../DropDowns/DropdownSubtitle';

interface IDropdownMenuForMessageProps {
  message: IMessage;
}

export default function DropdownMenuForMessage({ message }: IDropdownMenuForMessageProps) {
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const options = [
    {
      title: 'Reply',
      icon: <ChatReply />,
      onClick: () => {
        dispatch(setSelectedMessage(message));
        setAnchorEl(null);
      }
    }
  ];

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <HeadMenu as="div" className="relative inline-block text-left">
          <HeadMenu.Button className="flex opacity-0 group-hover:opacity-100 transition-all duration-150 items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none ring-0 focus:ring-0">
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </HeadMenu.Button>
        </HeadMenu>
      </div>
      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="p-1" style={{ minWidth: '147px' }}>
          <DropdownTitle content="DROPDOWN" />
          <DropdownSubtitle content="DROPDOWN OPTIONS" />
          {options.map((option) => (
            <div
              key={option.title}
              onClick={option.onClick}
              className="flex items-center px-2 py-1 hover:bg-alsoit-gray-50 text-sm text-gray-600 text-left space-x-2 w-full rounded-md cursor-pointer"
            >
              <span className="mr-2">{option.icon}</span>
              {option.title}
            </div>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </>
  );
}
