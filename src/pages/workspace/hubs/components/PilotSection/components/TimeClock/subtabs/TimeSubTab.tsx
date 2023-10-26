import { useAppSelector } from '../../../../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setActiveSubTimeClockTabId } from '../../../../../../../../features/workspace/workspaceSlice';
import { ClockIcon } from '../../../../../../../../assets/icons/ClockIcon';
import { ScreenRecordIcon } from '../../../../../../../../assets/icons/ScreenRecordIcon';
import { pilotTabs } from '../../../../../../../../app/constants/pilotTabs';

export const TimeClockOptions = [
  {
    id: pilotTabs.TIME_CLOCK,
    name: 'Timeclock',
    icon: <ClockIcon />,
    isVisible: false
  },
  {
    id: pilotTabs.SCREEN_RECORD,
    name: 'Screen Record',
    icon: <ScreenRecordIcon />,
    isVisible: false
  }
];
export default function TimeSubTab() {
  const dispatch = useDispatch();

  const { showPilot, activeSubTimeClockTabId } = useAppSelector((state) => state.workspace);

  return (
    <section>
      <div className={`flex bg-white pt-0.5 ${showPilot ? 'flex-row' : 'flex-col'}`}>
        {TimeClockOptions.map((item) => (
          <section className={'flex flex-col w-full bg-white border-b-2 border-b-alsoit-purple-50'} key={item.id}>
            <div
              onClick={() => dispatch(setActiveSubTimeClockTabId(item.id))}
              className={`relative flex px-2 flex-grow py-2 font-medium text-alsoit-gray-200 transition cursor-pointer group hover:text-alsoit-gray-300 ${
                item.id === activeSubTimeClockTabId && showPilot ? 'rounded-t-lg bg-alsoit-purple-50' : ' bg-white'
              }`}
            >
              <div
                className={`${!showPilot && 'text-alsoit-text-md'} ${
                  item.id === activeSubTimeClockTabId && !showPilot && 'bg-alsoit-success p-2 rounded'
                } flex items-center space-x-1.5 justify-start`}
              >
                <span>{item.icon}</span>
                <span className="font-semibold">{item.name}</span>
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
