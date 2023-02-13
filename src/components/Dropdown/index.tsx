import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { classNames } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { BsPlusLg } from 'react-icons/bs';

interface IDropdownItem {
  label: string;
  onClick?: () => void;
  link?: string;
  icon: JSX.Element;
}

interface DropdownProps {
  config: IDropdownItem[];
  iconType: 'dots' | 'plus';
}

export default function Dropdown({ config, iconType }: DropdownProps) {
  const navigate = useNavigate();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full cursor-pointer text-gray-500 hover:text-gray-600 focus:outline-none ring-0 focus:ring-0">
          <span className="sr-only">Open options</span>

          {iconType === 'dots' ? (
            <AiOutlineEllipsis
              className="w-4 h-4 text-black"
              aria-hidden="true"
            />
          ) : (
            <BsPlusLg className="w-2.5 h-2.5" aria-hidden="true" />
          )}
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
        <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {config.map((i) => (
            <Menu.Item key={i.label}>
              {({ active }) => (
                <button
                  onClick={i.link ? () => navigate(i.link || '') : i.onClick}
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'px-4 py-2 text-sm flex w-full items-center gap-3'
                  )}
                >
                  {i.icon}
                  <span>{i.label}</span>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
