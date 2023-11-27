import { IPilotSection, IPilotTab } from '../../../../types';
import { cl } from '../../../../utils';
import { useAppSelector } from '../../../../app/hooks';
import FullHotkeysList from '../HotKeys/FullHotKeys';
import FullTabs from '../Tabs/FullTabs';
import Header from '../Header';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import useAdjustedHeight from '../../../../hooks/useAdjustedHeight';
import ToolbarNav from '../ToolbarNav';
import EditDocumentIcon from '../../../../assets/icons/EditDocumentIcon';
import DownloadIcon from '../../../../assets/icons/DownloadIcon';
import FileCopyIcon from '../../../../assets/icons/FileCopyIcon';
import SharePilotIcon from '../../../../assets/icons/SharePilotIcon';
import PrintPilotIcon from '../../../../assets/icons/PrintPilotIcon';
import BlurEffect from '../../../BlurEffect';

interface FullPilotProps {
  featureTabs: IPilotTab[];
  activeSection?: IPilotSection;
  setShowModal: (i: boolean) => void;
  showModal: boolean;
}

export default function FullPilot({ featureTabs, activeSection, setShowModal, showModal }: FullPilotProps) {
  const { showOverlay } = useAppSelector((state) => state.workspace);
  const adjustedHeight = useAdjustedHeight(100);
  const { show: showFullPilot } = useAppSelector((state) => state.slideOver.pilotSideOver);

  return (
    <VerticalScroll bgColor="bg-white">
      <div
        style={{
          height: `${adjustedHeight}px`
        }}
        className={cl(
          showFullPilot ? 'relative translate-x-0' : 'w-96 absolute top-0 translate-x-full z-10',
          'right-0  bottom-0 mb-10 pb-6 transform bg-white flex flex-col transition-transform duration-500'
        )}
      >
        <div className="relative grid grid-rows-autoAutoAutoFr grid-col-1">
          {showOverlay && <div className="absolute inset-0 top-0 left-0 z-10 bg-black opacity-50" />}
          <Header
            isMinified={false}
            menu={<Header.Menu setShowModal={setShowModal} />}
            additionalNavItems={
              <>
                <div
                  className="flex"
                  style={{
                    padding: '4px 5px 3px 0',
                    borderRight: '0.3px solid #B2B2B2',
                    marginRight: '5px',
                    gap: '0.35rem'
                  }}
                >
                  <div
                    className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500"
                    style={{
                      borderRadius: '3.6px',
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    <EditDocumentIcon style={{ width: '16.43', height: '18.2' }} />
                  </div>

                  <div
                    className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500"
                    style={{
                      borderRadius: '3.6px',
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    <DownloadIcon style={{ width: '15', height: '15.7' }} />
                  </div>

                  <div
                    className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500"
                    style={{
                      borderRadius: '3.6px',
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    <FileCopyIcon style={{ width: '15.02', height: '18.2' }} />
                  </div>

                  <div
                    className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500"
                    style={{
                      borderRadius: '3.6px',
                      width: '24px',
                      height: '24px'
                    }}
                  >
                    <SharePilotIcon style={{ width: '16.3', height: '18.7' }} />
                  </div>

                  <div
                    className="flex justify-center items-center hover:bg-alsoit-gray-125 transition duration-500"
                    style={{
                      borderRadius: '3.6px',
                      width: '24px',
                      height: '24px',
                      paddingTop: '2px'
                    }}
                  >
                    <PrintPilotIcon />
                  </div>
                </div>
              </>
            }
          >
            <div
              className="flex overflow-hidden relative"
              style={{
                padding: '18px 10px 15px 8px',
                maxWidth: '98%'
              }}
            >
              <div className="flex items-center" style={{ paddingLeft: '2px', marginTop: '-2px' }}>
                <ToolbarNav />
              </div>
              <BlurEffect
                top="0"
                right="-5px"
                bottom="0"
                left="auto"
                width="20px"
                height="45px"
                backgroundImage="linear-gradient(to right, transparent , white)"
              />
            </div>
          </Header>

          <FullHotkeysList tabs={featureTabs} setShowModal={setShowModal} showModal={showModal} />
          <FullTabs tabs={featureTabs} />
        </div>
        <div className="relative z-50">{activeSection?.element}</div>
      </div>
    </VerticalScroll>
  );
}
