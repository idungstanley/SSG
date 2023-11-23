import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import SectionArea from '../SectionArea';
import { DetailsIcon } from '../../../../assets/icons';
import { pilotTabs } from '../../../../app/constants/pilotTabs';
import LogSubtabs from './LogSubtabs';
import History from '../History';

export const LogOptions = [
  {
    id: pilotTabs.HISTORY_LOG,
    element: <History />
  },
  { id: pilotTabs.ACTIVITY_LOG, element: <History /> },
  {
    id: pilotTabs.CUSTOM_LOG,
    element: (
      <div className="w-full h-36 text-center py-4">
        <span className="w-10/12 h-full mx-auto">Coming soon!</span>
      </div>
    )
  }
];
export default function Logs() {
  const { activeSubLogsTabId } = useAppSelector((state) => state.workspace);

  const [iconToggle, setIconToggle] = useState<boolean>(false);

  const selectedSubSection = useMemo(
    () => LogOptions.find((option) => option.id === activeSubLogsTabId),
    [activeSubLogsTabId]
  );

  return (
    <>
      <div onMouseEnter={() => setIconToggle(true)} onMouseLeave={() => setIconToggle(false)}>
        <SectionArea label="Logs" icon={<DetailsIcon active={iconToggle} dimensions={{ width: 18, height: 18 }} />} />
      </div>
      <section className="flex flex-col pl-px overflow-y-scroll h-fit mb-11">
        <LogSubtabs />
        <div>{selectedSubSection ? selectedSubSection.element : null}</div>
      </section>
    </>
  );
}
