import { IPilotSection, IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { useAppSelector } from '../../../../app/hooks';
import FullHotkeysList from '../HotKeys/FullHotKeys';
import FullTabs from '../Tabs/FullTabs';
import { useResize } from '../../../../hooks/useResize';
import Header from '../Header';
import { ShareIcon, EditPageIcon, PrintIcon, CopyIcon, UploadIcon } from '../../../../assets/icons';
import { dimensions } from '../../../../app/config/dimensions';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import useAdjustedHeight from '../../../../hooks/useAdjustedHeight';

interface FullPilotProps {
  featureTabs: IPilotTab[];
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

const DEFAULT_PILOT_WIDTH = dimensions.pilot.default;
const LS_PILOT_KEY = 'pilotWidth';
const pilotWidthFromLS = JSON.parse(localStorage.getItem(LS_PILOT_KEY) ?? `${DEFAULT_PILOT_WIDTH}`) as number;

export default function FullPilot({ featureTabs, activeSection, setShowModal, showModal }: FullPilotProps) {
  const { blockRef, Dividers } = useResize({
    dimensions: {
      min: dimensions.pilot.min,
      max: dimensions.pilot.max
    },
    storageKey: LS_PILOT_KEY,
    direction: 'XL'
  });
  const { showOverlay } = useAppSelector((state) => state.workspace);
  const adjustedHeight = useAdjustedHeight(100);
  const { show: showFullPilot, title } = useAppSelector((state) => state.slideOver.pilotSideOver);
  const { activeItemType } = useAppSelector((state) => state.workspace);

  return (
    <VerticalScroll>
      <div
        ref={blockRef}
        style={{
          width: showFullPilot ? pilotWidthFromLS : undefined
        }}
        className={cl(
          showFullPilot ? 'relative translate-x-0' : 'w-96 absolute top-0 translate-x-full z-10',
          !showOverlay ? 'border-l' : '',
          'right-0  bottom-0 mb-10 pb-6 transform bg-white flex flex-col transition-transform duration-500 h-full'
        )}
      >
        {showFullPilot ? <Dividers /> : null}
        <div className="relative grid grid-rows-autoAutoAutoFr grid-col-1">
          {showOverlay && <div className="absolute inset-0 top-0 left-0 z-10 bg-black opacity-50" />}
          <Header
            isMinified={false}
            menu={<Header.Menu setShowModal={setShowModal} />}
            additionalNavItems={
              <>
                <EditPageIcon className="w-4 h-4" stroke="orange" />

                <UploadIcon className="w-4 h-4" stroke="orange" />

                <CopyIcon className="w-6 h-6" stroke="orange" />

                <ShareIcon active={false} color="orange" />

                <PrintIcon className="w-4 h-4" stroke="orange" />
              </>
            }
          >
            <p className="text-xs font-semibold capitalize truncate">
              {activeItemType} | <span className="font-normal">{title}</span>
            </p>
          </Header>

          <FullHotkeysList tabs={featureTabs} setShowModal={setShowModal} showModal={showModal} />
          <FullTabs tabs={featureTabs} />
        </div>
        <div className="relative z-50">{activeSection?.element}</div>
      </div>
    </VerticalScroll>
  );
}
