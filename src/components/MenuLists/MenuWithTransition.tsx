import { Menu, Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { classNames } from "../../utils";

interface menuItemsType {
  id: string;
  title: string;
  type: string;
  onClick: string | React.MouseEventHandler<HTMLButtonElement>;
}
interface MenuWithTransitionType {
  icon: JSX.Element | string;
  menuItems: menuItemsType[];
}
export default function MenuWithTransition({ icon, menuItems }: MenuWithTransitionType) {
  return (
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex p-1 text-sm text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          {icon}
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
        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {menuItems.map((i) => (
            <Menu.Item key={i.id}>
              {({ active }) => (i.type === 'button' ? (
                <button
                  type="button"
                  onClick={i.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-left text-gray-700 w-full',
                  )}
                >
                  {i.title}
                </button>
              ) : (
                <Link
                  to={i.onClick}
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700 text-left',
                  )}
                >
                  {i.title}
                </Link>
              ))}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

MenuWithTransition.propTypes = {
  icon: PropTypes.object.isRequired,
  menuItems: PropTypes.array.isRequired,
};
