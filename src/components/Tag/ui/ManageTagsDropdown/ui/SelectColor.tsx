import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { cl } from '../../../../../utils';
import { colors } from '../../../../tags/colors';

interface SelectProps {
  onClick: (color: string) => void;
  color: string;
  show: boolean;
}

export function SelectColor({ onClick, color, show }: SelectProps) {
  return (
    <Menu as="div" className="relative inline-block text-left w-48">
      <Transition
        show={show}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute flex flex-wrap items-center text-teal- space-x-3 left-0 h-fit p-2 divide-y z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none w-48 p">
          {colors.map((i, index) => (
            <Menu.Item key={index}>
              <button
                onClick={() => onClick(i.value)}
                className={cl(
                  `bg-${i}-700`,
                  'rounded-md cursor-pointer block m-1 p-2 text-sm ',
                  i.value === color ? 'h-5 w-5' : 'h-4 w-4'
                )}
                style={{ backgroundColor: i.value }}
              ></button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
