import React, { useMemo, useState } from 'react';
import CreateChatSideOver from './components/CreateChatSideOver';
import ChatSection from './components/ChatSection';
import Contacts from './components/Contacts';
import Nav from './components/Nav';
import SectionArea from '../Pilot/components/SectionArea';
import { SignalIcon } from '@heroicons/react/24/outline';

export default function ChatForPilot() {
  const [activeTabId, setActiveTabId] = useState(0);

  const sections = [
    { id: 0, element: <ChatSection /> },
    { id: 1, element: <Contacts /> }
  ];

  const selectedSection = useMemo(() => sections.find((section) => section.id === activeTabId), [activeTabId]);

  return (
    <>
      <SectionArea label="Connect" icon={<SignalIcon className="w-4 h-4" />} />

      <div className="flex w-full h-full border-r border-l border-b">
        <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

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
