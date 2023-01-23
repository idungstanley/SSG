import React, { useMemo, useState } from 'react';
import CreateChatSideOver from './components/CreateChatSideOver';
import ChatSection from './components/ChatSection';
import Contacts from './components/Contacts';
import Nav from './components/Nav';

export default function ChatForPilot() {
  const [activeTabId, setActiveTabId] = useState(0);

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
