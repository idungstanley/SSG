import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../utils';
import { FlagOutlined } from '@ant-design/icons';

interface priorityType {
  id: number;
  title: string;
  handleClick: () => void;
  color: string;
  bg: string;
}
export default function PriorityDropdown() {
  const [priorityValue, setPriority] = useState('');
  const priorityList: priorityType[] = [
    {
      id: 1,
      title: 'Low',
      handleClick: () => {
        setPriority('low');
      },
      color: '#d3d3d3',
      bg: 'gray',
    },
    {
      id: 2,
      title: 'Normal',
      handleClick: () => {
        setPriority('normal');
      },
      color: '#6fddff',
      bg: 'purple',
    },
    {
      id: 3,
      title: 'High',
      handleClick: () => {
        setPriority('high');
      },
      color: '#f7cb04',
      bg: 'yellow',
    },
    {
      id: 4,
      title: 'Urgent',
      handleClick: () => {
        setPriority('urgent');
      },
      color: '#f32100',
      bg: 'red',
    },
  ];
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          {/* {setStatusColor(TaskCurrentStatus)} */}
          <FlagOutlined
            className="h-5 w-7  text-gray-400 "
            aria-hidden="true"
          />
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
        // show={sidebarSettings}
      >
        <Menu.Items className="origin-top-right absolute z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none ">
          {priorityList.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (
                <button
                  type="button"
                  className={classNames(
                    active ? `bg-${i.bg}-200` : '',
                    'flex items-center px-4 py-2 text-sm text-gray-600 text-left space-x-2 w-full'
                  )}
                  onClick={i.handleClick}
                >
                  <p>
                    {/* <RiCheckboxBlankFill
                      className="pl-px text-xs "
                      aria-hidden="true"
                      style={{ color: `${i.color}` }}
                    /> */}
                    <FlagOutlined
                      className="h-5 w-7  "
                      aria-hidden="true"
                      style={{ color: `${i.color}` }}
                    />
                  </p>
                  <p>{i.title}</p>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
