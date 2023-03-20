import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../../app/hooks';
import {
  getCompactView,
  getCompactViewWrap,
  getComfortableView,
  getComfortableViewWrap
} from '../../../../features/task/taskSlice';

export default function ListViewSettingsModal({
  viewSettings,
  comfortableView,
  comfortableViewWrap,
  compactViews,
  compactViewsWrap
}: {
  viewSettings: string;
  comfortableView: string;
  comfortableViewWrap: string;
  compactViews: string;
  compactViewsWrap: string;
}) {
  const dispatch = useAppDispatch();

  const ViewSettings = [
    {
      id: 1,
      label: viewSettings,
      handleClick: () => dispatch(getComfortableView(true))
    },
    {
      id: 2,
      label: comfortableView,
      handleClick: () => {
        dispatch(getComfortableView(true));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 3,
      label: comfortableViewWrap,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(true));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 4,
      label: compactViews,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(true));
        dispatch(getCompactViewWrap(false));
      }
    },
    {
      id: 4,
      label: compactViewsWrap,
      handleClick: () => {
        dispatch(getComfortableView(false));
        dispatch(getComfortableViewWrap(false));
        dispatch(getCompactView(false));
        dispatch(getCompactViewWrap(true));
      }
    }
  ];

  return (
    <Menu>
      <div className="viewSettingsParent flex justify-center items-center">
        <Menu.Button>
          <BsThreeDots className={' viewSettings '} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          {ViewSettings.map((View) => (
            <Menu.Item
              as="a"
              key={View.id}
              className="flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full"
            >
              {View.label == 'View Settings' ? (
                <p className="flex justify-center items-center text-center w-full text-black">{View.label}</p>
              ) : (
                <button onClick={View.handleClick}>
                  <p>{View.label}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
