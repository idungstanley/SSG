import React, { useMemo, useState } from 'react';
import AddTo from './properties/attachments/AddTo';
import DetailsIndex from './properties/DetailsIndex';
import DetailsSubTab from './DetailsSubTab';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import { DetailsIcon } from '../../../../assets/icons';
import { pilotTabs } from '../../../../app/constants/pilotTabs';
import Checklists from '../Checklist/Checklist';

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
          icon={<DetailsIcon active={iconToggle} dimensions={{ width: 18, height: 18 }} />}
        />
      </div>
      <section className="flex flex-col pl-px overflow-y-scroll h-fit mb-11">
        <DetailsSubTab />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
