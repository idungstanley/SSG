import { IPilotSection, IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { MAX_PILOT_WIDTH, MIN_PILOT_WIDTH } from '../..';
import { useAppSelector } from '../../../../app/hooks';
import FullHotkeysList from '../HotKeys/FullHotKeys';
import FullTabs from '../Tabs/FullTabs';
import { useResize } from '../../../../hooks/useResize';
import Header from '../Header';
import { ShareIcon, EditPageIcon, PrintIcon, CopyIcon, UploadIcon } from '../../../../assets/icons';

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

  const { show: showFullPilot, title, type } = useAppSelector((state) => state.slideOver.pilotSideOver);

  return (
    <div
      ref={blockRef}
      style={{
        width: showFullPilot ? pilotWidthFromLS : undefined
      }}
      className={cl(
        showFullPilot ? 'relative translate-x-0' : 'w-96 absolute top-0 translate-x-full',
        'right-0 border-l bottom-0 transform bg-white grid grid-rows-autoAutoAutoFr grid-col-1 transition-transform duration-1000'
      )}
    >
      {showFullPilot ? <Dividers /> : null}

      <Header
        isMinified={false}
        setActiveTabId={setActiveTabId}
        menu={<Header.Menu setShowModal={setShowModal} />}
        additionalNavItems={
          <>
            <EditPageIcon className="w-4 h-4" />

            <UploadIcon className="w-4 h-4" />

            <CopyIcon className="w-4 h-4" />

            <ShareIcon className="w-4 h-4" />

            <PrintIcon className="w-4 h-4" />
          </>
        }
      >
        <p className="truncate capitalize text-xs font-semibold">
          {type} | <span className="font-normal">{title}</span>
        </p>
      </Header>

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
