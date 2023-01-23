import React, { useMemo, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import CreateChatSideOver from './components/CreateChatSideOver';
import { setShowCreateChatSideOver } from '../../features/chat/chatSlice';
import {
  PlusIcon,
  ChatBubbleBottomCenterTextIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import ToolTip from '../Tooltip';
import ChatSection from './components/ChatSection';
import Contacts from './components/Contacts';
import { classNames } from '../../utils';

export default function ChatForPilot() {
  const dispatch = useAppDispatch();
  const [activeTabId, setActiveTabId] = useState(0);

  const navItems = [
    {
      id: 0,
      label: 'Chats',
      icon: (
        <ChatBubbleBottomCenterTextIcon
          className="h-7 w-7 stroke-current"
          aria-hidden="true"
        />
      ),
    },
    {
      id: 1,
      label: 'Contacts',
      icon: <UsersIcon className="h-7 w-7 stroke-current" aria-hidden="true" />,
    },
  ];

  const sections = [
    { id: 0, element: <ChatSection /> },
    { id: 1, element: <Contacts /> },
  ];

  const selectedSection = useMemo(
    () => sections.find((section) => section.id === activeTabId),
    [activeTabId]
  );

  return (
    <>
      <div className="h-full w-full flex border-r border-l border-b">
        {/* nav */}
        <div className="h-full flex flex-col items-center border-r w-20 p-2 gap-10">
          <ToolTip tooltip="Create chat">
            <button
              onClick={() => dispatch(setShowCreateChatSideOver(true))}
              type="button"
              className="inline-flex text-gray-500 hover:text-gray-700 items-center rounded-full focus:outline-none ring-0 focus:ring-0"
            >
              <PlusIcon className="h-7 w-7" aria-hidden="true" />
            </button>
          </ToolTip>

          <div className="flex flex-col items-center gap-2">
            {navItems.map((tab) => (
              <ToolTip key={tab.id} tooltip={tab.label}>
                <button
                  onClick={() => setActiveTabId(tab.id)}
                  type="button"
                  className={classNames(
                    'inline-flex items-center p-1 focus:outline-none ring-0 focus:ring-0',
                    activeTabId === tab.id
                      ? 'text-indigo-500 hover:text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700'
                  )}
                >
                  {tab.icon}
                </button>
              </ToolTip>
            ))}
          </div>
        </div>

        {/* main section */}
        <div className="h-full w-full">
          {/* main section depends of active tab */}
          {selectedSection ? selectedSection.element : null}
        </div>
      </div>

      <CreateChatSideOver />
    </>
  );
}
