import { useAppSelector } from '../../../../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { setActiveSubTimeClockTabId } from '../../../../../../../../features/workspace/workspaceSlice';
import { ClockIcon } from '../../../../../../../../assets/icons/ClockIcon';
import { ScreenRecordIcon } from '../../../../../../../../assets/icons/ScreenRecordIcon';

export const TimeClockOptions = [
  {
    id: 0,
    name: 'Timeclock',
    icon: <ClockIcon />,
    isVisible: false
  },
  {
    id: 1,
    name: 'Screen Record',
    icon: <ScreenRecordIcon />,
    isVisible: false
  }
];
export default function TimeSubTab() {
  const { showPilot, activeSubTimeClockTabId } = useAppSelector((state) => state.workspace);
  const dispatch = useDispatch();
  return (
    <section>
      <div className={`flex bg-white pt-0.5 ${showPilot ? 'flex-row' : 'flex-col'}`}>
        {TimeClockOptions.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubTimeClockTabId && showPilot ? 'rounded-t-lg bg-white' : ''
            }`}
            key={item.id}
          >
            <div
              key={item.id}
              onClick={() => dispatch(setActiveSubTimeClockTabId(item.id))}
              className={`relative flex px-2 flex-grow py-2 font-medium text-alsoit-gray-200 transition cursor-pointer group hover:text-alsoit-gray-300 ${
                item.id === activeSubTimeClockTabId && showPilot && 'rounded-t-lg bg-alsoit-purple-50'
              } ${item.id != activeSubTimeClockTabId && showPilot && ' bg-white'}`}
            >
              {/* <span
                className={`absolute left-2 text-alsoit-gray-300 text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? 'block' : 'hidden'
                }`}
              >
                <MdDragIndicator />
              </span> */}
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
