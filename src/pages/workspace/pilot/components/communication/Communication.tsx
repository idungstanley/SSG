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
  { id: pilotTabs.VOICE_CALL, element: <></> },
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
      <section className="flex flex-col pl-px overflow-y-scroll h-fit mb-11">
        {showPilot && <CommunicationSubTab />}
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
