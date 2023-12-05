import React, { useMemo } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import CommunicationSubTab from './CommunicationSubTab';
import ChatForPilot from '../../../../../components/Chat/ChatForPilot';
import { pilotTabs } from '../../../../../app/constants/pilotTabs';
import CommentsForPilot from '../../../../../components/Comments/CommentsForPilot';
import { SignalIcon } from '@heroicons/react/24/outline';
import SectionArea from '../../../../../components/Pilot/components/SectionArea';

export const communicationOptions = [
  {
    id: pilotTabs.EMAIL,
    element: <></>
  },
  { id: pilotTabs.CHAT, element: <ChatForPilot /> },
  { id: pilotTabs.PHONE, element: <></> },
  { id: pilotTabs.COMMENTS, element: <CommentsForPilot /> }
];
export default function Commnunication() {
  const { activeSubCommunicationTabId, showPilot } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => communicationOptions.find((option) => option.id === activeSubCommunicationTabId),
    [activeSubCommunicationTabId]
  );
  return (
    <>
      <div>
        <SectionArea label="Connect" icon={<SignalIcon className="w-4 h-4" />} />
      </div>
      <section className="flex flex-col overflow-y-auto h-fit mb-11 bg-alsoit-gray-125">
        {showPilot && <CommunicationSubTab />}
        <div className="bg-white">{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
