import { useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { IPilotSection, IPilotTab } from '../../types';
import MinPilot from './components/Layout/MinPilot';
import FullPilot from './components/Layout/FullPilot';

export const TAB_LIMIT = 8;

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  // const dispatch = useAppDispatch();
  const [activeTabId, setActiveTabId] = useState<null | number>(1);
  const [showModal, setShowModal] = useState(false);
  const { sections, tabs } = pilotConfig;

  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);

  // set first tab as active on open full pilot
  useEffect(() => {
    if (showFullPilot && !activeTabId) {
      setActiveTabId(1);
    }
  }, [showFullPilot]);

  // find active section
  const activeSection = useMemo(() => sections.find((section) => section.id === activeTabId), [activeTabId]);

  return id ? (
    <>
      {!showFullPilot ? (
        <MinPilot
          activeTabId={activeTabId}
          featureTabs={tabs}
          setActiveTabId={setActiveTabId}
          activeSection={activeSection}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      ) : null}

      <FullPilot
        activeTabId={activeTabId}
        featureTabs={tabs}
        setActiveTabId={setActiveTabId}
        activeSection={activeSection}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  ) : null;
}
