import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useAppSelector } from '../../../../../../../app/hooks';

export default function ShareModal() {
  const [isCopied, setIsCopied] = useState(false);

  const { activeItemId: taskId } = useAppSelector((state) => state.workspace);

  const handleCopy = () => {
    const tempInput = document.createElement('input');

    tempInput.value = taskId as string;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex text-sm text-gray-400">
          <p>Share</p>
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
          className="origin-top-right absolute z-50 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none -ml-32"
          style={{ height: '140px' }}
        >
          <p className="pt-5 pl-3 cursor-pointer bg-bl">
            <button
              className={`${
                !isCopied ? 'bg-blue-900 text-white p-1 rounded-md' : 'bg-green-900 text-white p-1 rounded-md'
              }`}
              onClick={handleCopy}
            >
              {!isCopied ? 'Copy task ID' : 'ID Copid'}
            </button>
          </p>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
