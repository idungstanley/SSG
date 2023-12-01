import React, { useMemo, useState } from 'react';
import AddTo from './properties/attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
import DetailsSubTab from './DetailsSubTab';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import { pilotTabs } from '../../../../app/constants/pilotTabs';
import Checklists from '../Checklist/Checklist';
import PilotDetailsIcon from '../../../../assets/icons/PilotDetailsIcon';

export const DetailOptions = [
  {
    id: pilotTabs.PROPERTIES,
    element: <DetailsIndex />
  },
  { id: pilotTabs.SUBTASK, element: <></> },
  { id: pilotTabs.CHECKLISTS, element: <Checklists /> },
  {
    id: pilotTabs.ATTACHMENTS,
    element: <AddTo />
  },
  { id: pilotTabs.TIES, element: <></> }
];
export default function Details() {
  const { activeSubDetailsTabId } = useAppSelector((state) => state.workspace);

  const [iconToggle, setIconToggle] = useState<boolean>(false);

  const selectedSubSection = useMemo(
    () => DetailOptions.find((option) => option.id === activeSubDetailsTabId),
    [activeSubDetailsTabId]
  );

  return (
    <>
      <div onMouseEnter={() => setIconToggle(true)} onMouseLeave={() => setIconToggle(false)}>
        <SectionArea
          label="Details"
          icon={<PilotDetailsIcon active={iconToggle} dimensions={{ width: 15, height: 15 }} />}
        />
      </div>
      <section className="flex flex-col pl-px overflow-y-scroll h-fit mb-11 bg-alsoit-gray-125">
        <DetailsSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
