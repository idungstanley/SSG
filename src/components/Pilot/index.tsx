import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { IPilotSection, IPilotTab } from '../../types';
import MinPilot from './components/Layout/MinPilot';
import FullPilot from './components/Layout/FullPilot';
import { setActiveTabId } from '../../features/workspace/workspaceSlice';

export const TAB_LIMIT = 8;

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const dispatch = useAppDispatch();
  // const [activeTabId, setActiveTabId] = useState<null | number>(1);
  const [showModal, setShowModal] = useState(false);
  const { sections, tabs } = pilotConfig;

  const { activeTabId } = useAppSelector((state) => state.workspace);
  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);

  // set first tab as active on open full pilot
  useEffect(() => {
    if (showFullPilot && !activeTabId) {
      dispatch(setActiveTabId(1));
    }
  }, [showFullPilot]);

  // find active section
  const activeSection = useMemo(() => sections.find((section) => section.id === activeTabId), [activeTabId]);

  return id ? (
    <>
      {!showFullPilot ? (
        <MinPilot featureTabs={tabs} activeSection={activeSection} setShowModal={setShowModal} showModal={showModal} />
      ) : null}

      <FullPilot featureTabs={tabs} activeSection={activeSection} setShowModal={setShowModal} showModal={showModal} />
    </>
  ) : null;
}
