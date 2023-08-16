import React, { useMemo } from 'react';
import { useAppSelector } from '../../app/hooks';
import StatusManagementSubTab from './StatusManagementSubTab';
import CustomStatus from './PilotTabs/CustomStatus';

const HubsOptions = [{ id: 1, element: <CustomStatus /> }];
export default function StatusManagement() {
  const { activeStatusManagementTabId } = useAppSelector((state) => state.workspace);
  const selectedSubSection = useMemo(
    () => HubsOptions.find((option) => option.id === activeStatusManagementTabId),
    [activeStatusManagementTabId]
  );
  return (
    <>
      <section className="flex flex-col overflow-y-scroll h-fit mb-11 ">
        <StatusManagementSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
