import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import Button from '../../../../../../../components/Buttons/Button';
import SubtaskIcon from '../../../../../../../assets/icons/SubtaskIcon';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { setSeparateSubtasksMode, setToggleAllSubtask } from '../../../../../../../features/task/taskSlice';
import ArrowDownFilled from '../../../../../../../assets/icons/ArrowDownFilled';

export default function ListSubtasks({ subtasksTitle }: { subtasksTitle: string }) {
  const dispatch = useAppDispatch();

  const { toggleAllSubtask } = useAppSelector((state) => state.task);

  const [activeViewId, setActiveViewId] = useState<string>('collapse_all');
  const [listView] = useState<boolean>(true);
  const [activeLabel, setActiveLabel] = useState<string>('');

  const viewSettings = [
    {
      id: 'collapse_all',
      label: 'Collapse all',
      subLabel: '(Default)',
      handleClick: () => {
        dispatch(setToggleAllSubtask(false));
      }
    },
    {
      id: 'expand_all',
      label: 'Expand all',
      handleClick: () => {
        dispatch(setToggleAllSubtask(true));
      }
    },
    {
      id: 'separate_tasks',
      label: 'As separate tasks',
      handleClick: () => {
        dispatch(setSeparateSubtasksMode(true));
      }
    }
  ];

  return (
    <div className="flex items-center justify-start space-x-1 ">
      <span className="group cursor-pointer gap-2">
        <Menu>
          <div className="flex items-center justify-center viewSettingsParent">
            <Menu.Button>
              <Button active={toggleAllSubtask}>
                <SubtaskIcon color={toggleAllSubtask ? '#BF01FE' : '#424242'} />
                <span>
                  {subtasksTitle}
                  {activeLabel ? `: ${activeLabel}` : ''}
                </span>
                <ArrowDownFilled active={toggleAllSubtask} />
              </Button>
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
            <Menu.Items
              style={{ zIndex: 61 }}
              className="absolute w-48 mt-3 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {viewSettings.map((view) => (
                <Menu.Item
                  as="div"
                  key={view.id}
                  className={`${
                    view.id !== activeViewId
                      ? 'flex items-center text-sm text-gray-600 text-left w-full hover:bg-gray-300'
                      : listView && view.id === activeViewId
                      ? 'flex items-center text-sm text-gray-600 text-left w-full bg-primary-200'
                      : 'flex items-center text-sm text-gray-600 text-left w-full'
                  }`}
                  onClick={() => {
                    setActiveLabel(view.id === 'collapse_all' ? '' : view.label);
                    setActiveViewId(view.id);
                  }}
                >
                  <button onClick={view.handleClick} className="flex items-center justify-between w-full py-2 group">
                    <p className="flex items-center pl-2 space-x-2 text-md">
                      <span>{view.label}</span>
                      {view?.subLabel ? <span className="text-xs italic">{view.subLabel}</span> : null}
                    </p>
                  </button>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </span>
    </div>
  );
}
