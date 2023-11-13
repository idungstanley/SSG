import React, { useState } from 'react';
import MyWorkTabs from './myWorkTabs';
import { myWorkTabsHeader } from './homeDatas';

export default function MyWork() {
  const [activeTab, setActiveTab] = useState('todo');

  return (
    <div className="mt-10">
      <h1 className="text-lg font-bold text-black py-4">My Work</h1>
      <div className="flex space-x-3 border-b">
        {myWorkTabsHeader.map((tab) => (
          <p
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`cursor-pointer text-alsoit-gray-100 hover:text-black ${
              activeTab == tab.id && 'border-b-4 pb-5  text-black border-alsoit-purple-300 rounded-sm'
            }`}
          >
            {tab.label}
          </p>
        ))}
      </div>

      <MyWorkTabs activeTab={activeTab} />
    </div>
  );
}
