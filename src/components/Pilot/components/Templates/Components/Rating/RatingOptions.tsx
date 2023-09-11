import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ArrowRight from '../../../../../../assets/icons/ArrowRight';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../../features/task/taskSlice';
import { ImCheckboxChecked } from 'react-icons/im';

const items = [
  {
    id: 1,
    name: 'Rating',
    onclick: () => null
  }
];

export default function RatingOption() {
  const dispatch = useAppDispatch();
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="w-full">
        <Menu.Button className="inline-flex justify-center rounded-md p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full">
          <div className="w-full flex items-center justify-between h-full">
            <div className="flex items-center">
              <span className="mx-1 h-5 w-5">
                <ImCheckboxChecked />
              </span>
              <p className="text-alsoit-gray-300-lg text-alsoit-text-lg font-semibold">Rating</p>
            </div>
            <ArrowRight />
          </div>
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
        <Menu.Items className="z-50 absolute left-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none  ml-24">
          <div className="w-full mt-2 flex justify-center">
            <h1 className="text-alsoit-text-lg font-semibold">RATING</h1>
          </div>
          <div className="px-1 py-1">
            {items.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    onClick={() =>
                      dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, type: item.name }))
                    }
                    className={`${
                      active ? 'bg-alsoit-gray-50 text-gray-700' : 'text-gray-700'
                    } group flex gap-4 w-full items-center rounded-md px-2 py-2 text-alsoit-text-lg font-semibold`}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
