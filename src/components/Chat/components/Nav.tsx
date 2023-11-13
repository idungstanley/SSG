import React from 'react';
import { ChatBubbleBottomCenterTextIcon, UsersIcon } from '@heroicons/react/24/outline';
import ToolTip from '../../Tooltip/Tooltip';

const navItems = [
  {
    id: 'chats',
    label: 'Chats',
    icon: <ChatBubbleBottomCenterTextIcon className="stroke-current h-7 w-7" aria-hidden="true" />
  },
  {
    id: 'contacts',
    label: 'Contacts',
    icon: <UsersIcon className="stroke-current h-7 w-7" aria-hidden="true" />
  }
];

interface NavProps {
  activeTabId: string;
  setActiveTabId: (i: string) => void;
}

export default function Nav({ activeTabId, setActiveTabId }: NavProps) {
  return (
    <div className="w-full h-full p-2 border-r">
      <div className="flex justify-between items-center gap-2">
        {navItems.map((tab) => (
          <ToolTip key={tab.id} title={tab.label}>
            <div
              onClick={() => setActiveTabId(tab.id)}
              className={`relative w-full flex justify-center flex-grow p-1 font-medium transition cursor-pointer group hover:text-primary-700  ${
                activeTabId === tab.id && 'bg-primary-200 rounded-t-md text-primary-700'
              }`}
            >
              {tab.icon}
            </div>
          </ToolTip>
        ))}
      </div>
    </div>
  );
}
