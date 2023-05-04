import { IPilotSection, IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { useAppSelector } from '../../../../app/hooks';
import FullHotkeysList from '../HotKeys/FullHotKeys';
import FullTabs from '../Tabs/FullTabs';
import { useResize } from '../../../../hooks/useResize';
import Header from '../Header';
import { ShareIcon, EditPageIcon, PrintIcon, CopyIcon, UploadIcon } from '../../../../assets/icons';
import { dimensions } from '../../../../app/config/dimensions';

interface FullPilotProps {
  activeTabId: number | null;
  featureTabs: IPilotTab[];
  setActiveTabId: (i: number | null) => void;
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

const DEFAULT_PILOT_WIDTH = dimensions.pilot.default;
const LS_PILOT_KEY = 'pilotWidth';

const pilotWidthFromLS = DEFAULT_PILOT_WIDTH; // JSON.parse(localStorage.getItem(LS_PILOT_KEY) ?? `${DEFAULT_PILOT_WIDTH}`) as number;

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
      min: dimensions.pilot.min,
      max: dimensions.pilot.max
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
        showFullPilot ? 'relative translate-x-0' : 'w-96 absolute top-0 translate-x-full z-10',
        'right-0 border-l bottom-0 overflow-y-scroll mb-10 pb-6 transform bg-white grid grid-rows-autoAutoAutoFr grid-col-1 transition-transform duration-500'
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

            <CopyIcon className="w-6 h-6" />

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
