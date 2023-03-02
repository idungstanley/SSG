import React from 'react';
import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { colors } from './colors';
import { RiCheckboxBlankFill } from 'react-icons/ri';

export default function ColorsModal() {
  const [isOpen, setIsOpen] = useState(true);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <>
      {/* <div className="relative inline-block text-left">
        <button
          type="button"
          onClick={openModal}
          className="flex text-sm font-bold"
        ></button>
      </div> */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed -top-20 bottom-36 right-40 -left-40 flex items-center justify-center">
          <Dialog.Panel className="absolute px-3 py-2 z-20 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 grid grid-cols-8 cursor-pointer focus:outline-none ">
            {colors?.map((color) => (
              <div key={color.id} className="flex">
                <RiCheckboxBlankFill
                  className={`pl-px text-${color.value}-400 flex rounded-md text-sm cursor-pointer`}
                  aria-hidden="true"
                />
              </div>
            ))}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
