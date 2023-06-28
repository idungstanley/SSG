import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';

interface AdditionalListBoxProps {
  selected: string;
  setSelected: (i: string) => void;
  values: string[];
}

export function AdditionalListBox({ selected, setSelected, values }: AdditionalListBoxProps) {
  return (
    <div className="absolute top-0 right-1.5">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1 text-xs">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white p-1 text-left focus:outline-none border focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
            <span className="block truncate">{selected}</span>
          </Listbox.Button>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {values.map((i) => (
                <Listbox.Option key={i} className="relative cursor-default select-none p-2 text-gray-900" value={i}>
                  <span className="block truncate font-normal hover:bg-primary-100">{i}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
