import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setShowPilotSideOver } from '../../features/general/slideOver/slideOverSlice';
import { IPilotSection, IPilotTab } from '../../types';
import MinPilot from './components/Layout/MinPilot';
import FullPilot from './components/Layout/FullPilot';

export const MIN_PILOT_WIDTH = 300;
export const MAX_PILOT_WIDTH = 500;

export const TAB_LIMIT = 8;

interface PilotProps {
  pilotConfig: { tabs: IPilotTab[]; sections: IPilotSection[] };
}

export default function Pilot({ pilotConfig }: PilotProps) {
  const dispatch = useAppDispatch();
  const [activeTabId, setActiveTabId] = useState<null | number>(1);
  const [showModal, setShowModal] = useState(false);
  const { sections, tabs } = pilotConfig;

  const { show: showFullPilot, id } = useAppSelector((state) => state.slideOver.pilotSideOver);

  // reset active tab and current item id on unmount
  useEffect(() => {
    return () => {
      setActiveTabId(1);
      dispatch(setShowPilotSideOver({ show: true }));
    };
  }, []);

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
