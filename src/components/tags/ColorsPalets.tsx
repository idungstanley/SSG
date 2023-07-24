import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BsDroplet } from 'react-icons/bs';
import { colors } from './colors';
import { RiCheckboxBlankFill } from 'react-icons/ri';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UseUpdateTagService } from '../../features/workspace/tags/tagService';

export default function ColorPallete({ tag_id }: { tag_id: string | null | undefined }) {
  const queryClient = useQueryClient();
  const changeColorMutation = useMutation(UseUpdateTagService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    }
  });
  const handleChangeColor = async (color: string) => {
    await changeColorMutation.mutateAsync({
      color,
      tag_id: tag_id
    });
  };
  return (
    <Menu as="div" className="group relative inline-block text-left w-48">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <div className={'p-2 w-full cursor-pointer hover:bg-purple-200'}>
            <div className="flex items-center space-x-2 text-xs text-gray-600 w-44">
              <BsDroplet />
              <p>Change Color</p>
            </div>
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
        <Menu.Items className="absolute px-3 py-2 z-20 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid grid-cols-8 cursor-pointer focus:outline-none">
          {colors?.map((color) => (
            <Menu.Item key={color.id}>
              {() => (
                <div className="items-center w-full py-2 space-x-2 text-sm text-left">
                  <div onClick={() => handleChangeColor(color.value)}>
                    <RiCheckboxBlankFill
                      className={`pl-px text-${color.value}-400 flex rounded-md text-sm cursor-pointer`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
