import React, { useMemo } from 'react';
import CreateHub from '../../../../pages/workspace/pilot/components/createEntity/createHub/CreateHub';
import CreateWallet from '../../../../pages/workspace/pilot/components/createEntity/createWallet/CreateWallet';
import CreateList from '../../../../pages/workspace/pilot/components/createEntity/createList/CreateList';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import hubIcon from '../../../../assets/branding/hub.svg';
import HubManagerSubTab from './HubManagerSubTab';

const HubsOptions = [
  { id: 1, element: <CreateHub /> },
  { id: 2, element: <CreateWallet /> },
  { id: 3, element: <CreateList /> }
];
export default function HubManager() {
  const { activeSubHubManagerTabId } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => HubsOptions.find((option) => option.id === activeSubHubManagerTabId),
    [activeSubHubManagerTabId]
  );
  return (
    <>
      <SectionArea label="Hub Manager" icon={<img src={hubIcon} alt="Hub Icon" className="w-4 h-4" />} />
      <section className="flex flex-col overflow-y-scroll h-fit mb-11 ">
        <HubManagerSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
