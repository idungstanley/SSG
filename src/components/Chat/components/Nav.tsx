import React from 'react';
import { ChatBubbleBottomCenterTextIcon, UsersIcon } from '@heroicons/react/24/outline';
import ToolTip from '../../Tooltip/Tooltip';
import { cl } from '../../../utils';

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
    <div className="flex flex-col items-center w-20 h-full gap-10 p-2 bg-gray-400 border-r">
      <div className="flex flex-col items-center gap-2">
        {navItems.map((tab) => (
          <ToolTip key={tab.id} title={tab.label}>
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
