import { IPilotSection, IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import Menu from '../HotKeys/components/Dropdown';
import { MAX_PILOT_WIDTH, MIN_PILOT_WIDTH } from '../..';
import { useAppSelector } from '../../../../app/hooks';
import FullHeader from '../Header/FullHeader';
import FullHotkeysList from '../HotKeys/FullHotKeys';
import FullTabs from '../Tabs/FullTabs';
import { useResize } from '../../../../hooks/useResize';

interface FullPilotProps {
  activeTabId: number | null;
  featureTabs: IPilotTab[];
  setActiveTabId: (i: number | null) => void;
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

const DEFAULT_PILOT_WIDTH = 400;
const LS_PILOT_KEY = 'pilotWidth';

const pilotWidthFromLS = JSON.parse(localStorage.getItem(LS_PILOT_KEY) ?? `${DEFAULT_PILOT_WIDTH}`) as number;

export default function FullPilot({
  activeTabId,
  featureTabs,
  setActiveTabId,
  activeSection,
  setShowModal,
  showModal
}: FullPilotProps) {
  const { blockRef, Dividers } = useResize({
    dimensions: {
      min: MIN_PILOT_WIDTH,
      max: MAX_PILOT_WIDTH
    },
    storageKey: LS_PILOT_KEY,
    direction: 'X'
  });

  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  return (
    <div
      ref={blockRef}
      style={{
        width: showFullPilot ? pilotWidthFromLS : undefined
      }}
      className={cl(
        showFullPilot ? 'relative translate-x-0' : 'w-96 absolute top-10 translate-x-full',
        'right-0 border-l bottom-0 transform bg-white grid grid-rows-autoAutoAutoFr grid-col-1 p-2 transition-transform duration-500'
      )}
    >
      {showFullPilot ? <Dividers /> : null}

      <FullHeader setActiveTabId={setActiveTabId}>
        <Menu setShowModal={setShowModal} />
      </FullHeader>

      <FullHotkeysList
        tabs={featureTabs}
        setShowModal={setShowModal}
        showModal={showModal}
        setActiveTabId={setActiveTabId}
        activeTabId={activeTabId}
      />

      <FullTabs tabs={featureTabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />

      {activeSection?.element}
    </div>
  );
}
