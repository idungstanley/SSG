import React, { useMemo, useState } from 'react';
import ChatForPilot from '../../../../../components/Chat/ChatForPilot';
import CommunicationSubTab from './CommunicationSubTab';

const communicationOptions = [
  {
    id: 0,
    element: <ChatForPilot />,
  },
  { id: 1, element: <ChatForPilot /> },
  {
    id: 2,
    element: <ChatForPilot />,
  },
];
export default function Commnunication() {
  const [activeSubTabId, setActiveSubTabId] = useState<number>(0);
  const selectedSubSection = useMemo(
    () => communicationOptions.find((option) => option.id === activeSubTabId),
    [activeSubTabId]
  );
  return (
    <section className="flex flex-col h-full">
      <CommunicationSubTab
        activeSubTabId={activeSubTabId}
        setActiveSubTabId={setActiveSubTabId}
      />
      <div>{selectedSubSection ? selectedSubSection.element : null}</div>
    </section>
  );
}
