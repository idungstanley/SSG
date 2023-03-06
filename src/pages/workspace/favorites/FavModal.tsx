import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsThreeDots } from 'react-icons/bs';
import { useAppDispatch } from '../../../app/hooks';
import { setDelFavId, setShowFavEditInput } from '../../../features/hubs/hubSlice';
// import { UseDeleteFav } from "../../../features/hubs/hubService";

export default function FavModal({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const options = [
    {
      id: 1,
      name: 'Unfavorite'
    },
    {
      id: 2,
      name: 'Rename'
    }
  ];

  const handleClick = (name: string) => {
    if (name === 'Unfavorite') {
      dispatch(setDelFavId(id));
    } else {
      dispatch(setShowFavEditInput(id));
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left absolute">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <BsThreeDots className="cursor-pointer" />
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
        <Menu.Items className="absolute z-20 w-40 mt-2 -ml-36 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <Menu.Item key={option.id}>
              {() => (
                <div
                  className="flex items-center text-gray-600 hover:bg-gray-300"
                  onClick={() => handleClick(option.name)}
                >
                  <button type="button" className="flex items-center w-11/12 px-4 py-2 space-x-2 text-sm text-left">
                    <p>{option.name}</p>
                  </button>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
