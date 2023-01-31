import React from 'react';
import { MdAddToPhotos, MdDragIndicator } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../../app/hooks';
import propertiesIcon from '../../../../../assets/branding/properties-icon.png';
import { setActiveSubDetailsTabId } from '../../../../../features/workspace/workspaceSlice';

const DetailOptions = [
  {
    id: 0,
    name: 'Properties',
    source: propertiesIcon,
  },
  {
    id: 1,
    label: 'attachments',
    icon: <MdAddToPhotos />,
  },
];
export default function DetailsSubTab() {
  const { showPilot, activeSubDetailsTabId } = useAppSelector(
    (state) => state.workspace
  );
  const dispatch = useDispatch();
  return (
    <section>
      <div
        className={`flex bg-gray-400 pt-0.5 ${
          showPilot ? 'flex-row' : 'flex-col'
        }`}
      >
        {DetailOptions.map((item) => (
          <section
            className={`flex flex-col w-full bg-white ${
              item.id === activeSubDetailsTabId && showPilot
                ? 'rounded-t-lg bg-white'
                : ''
            }`}
            key={item.id}
          >
            <div
              key={item.id}
              onClick={() => dispatch(setActiveSubDetailsTabId(item.id))}
              className={`relative flex justify-center flex-grow py-2 font-medium text-gray-500 transition cursor-pointer group hover:text-gray-700 border-y-2 ${
                item.id === activeSubDetailsTabId &&
                showPilot &&
                'rounded-t-lg bg-white'
              } ${
                item.id != activeSubDetailsTabId &&
                showPilot &&
                'rounded-b-lg bg-gray-400'
              }`}
            >
              <span
                className={`absolute left-2 text-gray-500 justify-center text-xl cursor-move opacity-0 group-hover:opacity-100 ${
                  showPilot ? 'block' : 'hidden'
                }`}
              >
                <MdDragIndicator />
              </span>
              <span
                className={`${!showPilot && 'text-xs'} ${
                  item.id === activeSubDetailsTabId &&
                  !showPilot &&
                  'bg-green-500 p-2 rounded'
                }`}
              >
                {item.icon ? (
                  item.icon
                ) : (
                  <img src={item.source} alt="Hub Icon" className="w-3 h-3" />
                )}
              </span>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
