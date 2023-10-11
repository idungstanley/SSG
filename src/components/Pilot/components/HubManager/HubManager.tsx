import { useMemo } from 'react';
import CreateHub from '../../../../pages/workspace/pilot/components/createEntity/createHub/CreateHub';
import CreateWallet from '../../../../pages/workspace/pilot/components/createEntity/createWallet/CreateWallet';
import CreateList from '../../../../pages/workspace/pilot/components/createEntity/createList/CreateList';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import HubManagerSubTab from './HubManagerSubTab';
import CustomSuggestion from '../../../DatePicker/CustomSuggestions';
import EntityManagerIcon from '../../../../assets/icons/EntityManagerIcon';
import StatusManagement from '../../../status/StatusManagement';
import { pilotTabs } from '../../../../app/constants/pilotTabs';

const HubsOptions = [
  { id: pilotTabs.CREATE_HUB, element: <CreateHub /> },
  { id: pilotTabs.CREATE_WALLET, element: <CreateWallet /> },
  { id: pilotTabs.CREATE_LIST, element: <CreateList /> },
  { id: 'calendar_settings', element: <CustomSuggestion /> },
  { id: 'status_management', element: <StatusManagement /> }
];

export default function HubManager() {
  const { activeSubHubManagerTabId } = useAppSelector((state) => state.workspace);

  const selectedSubSection = useMemo(
    () => HubsOptions.find((option) => option.id === activeSubHubManagerTabId),
    [activeSubHubManagerTabId]
  );

  return (
    <>
      <SectionArea label="Entity Manager" icon={<EntityManagerIcon />} />
      <section className="flex flex-col overflow-y-scroll h-fit mb-11 ">
        <HubManagerSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
