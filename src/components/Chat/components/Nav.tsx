import React from 'react';
import { ChatBubbleBottomCenterTextIcon, UsersIcon } from '@heroicons/react/24/outline';
import ToolTip from '../../Tooltip/Tooltip';
import { cl } from '../../../utils';

const navItems = [
  {
    id: 0,
    label: 'Chats',
    icon: <ChatBubbleBottomCenterTextIcon className="h-7 w-7 stroke-current" aria-hidden="true" />
  },
  {
    id: 1,
    label: 'Contacts',
    icon: <UsersIcon className="h-7 w-7 stroke-current" aria-hidden="true" />
  }
];

interface NavProps {
  activeTabId: number;
  setActiveTabId: (i: number) => void;
}

export default function Nav({ activeTabId, setActiveTabId }: NavProps) {
  return (
    <div className="h-full flex flex-col items-center border-r w-20 p-2 gap-10 bg-gray-400">
      <div className="flex flex-col items-center gap-2">
        {navItems.map((tab) => (
          <ToolTip key={tab.id} tooltip={tab.label}>
            <button
              onClick={() => setActiveTabId(tab.id)}
              type="button"
              className={cl(
                'inline-flex items-center p-1 focus:outline-none ring-0 focus:ring-0',
                activeTabId === tab.id ? 'text-indigo-500 hover:text-indigo-700' : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.icon}
            </button>
          </ToolTip>
        ))}
      </div>
    </div>
  );
}
