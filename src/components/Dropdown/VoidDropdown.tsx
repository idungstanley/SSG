import { Menu, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectCalendar } from '../../features/calendar/slice/calendarSlice';
import { useAbsolute } from '../../hooks/useAbsolute';

interface DropdownProps {
  title: JSX.Element;
  children: ReactNode;
}

const HEIGHT = 100;

export default function Dropdown({ title, children }: DropdownProps) {
  const { updateCords } = useAppSelector(selectCalendar);
  const {
    cords: { top, left },
    relativeRef
  } = useAbsolute(updateCords, HEIGHT);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div ref={relativeRef}>
        <Menu.Button className="flex items-center rounded-full focus:outline-none">{title}</Menu.Button>
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
          style={{
            left,
            top
            // height: HEIGHT
          }}
          className="fixed h-fit p-2 divide-y z-10 mt-2 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

Dropdown.Item = Menu.Item;
