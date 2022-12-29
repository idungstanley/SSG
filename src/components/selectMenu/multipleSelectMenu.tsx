import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { classNames } from "../../utils";

interface itemType {
  name: string;
  id: string;
}
interface MultipleSelectMenuType {
  data: itemType[];
  selectedData: {
    name: string;
  };
  title: string;
  setSelectedData: (value: {name: string})=>void
}
export default function MultipleSelectMenu({
  data,
  selectedData,
  setSelectedData,
  title,
}: MultipleSelectMenuType) {
  if (!data.length) {
    return <> </>;
  }
  return (
    <Listbox value={selectedData} onChange={setSelectedData}>
      {({ open }) => (
        <div>
          <Listbox.Label className="block text-sm font-medium text-gray-700">{title}</Listbox.Label>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              {/* <span className="block h-5 truncate">{selectedData ? (type === 'user' ? selectedData.team_member.user.name : selectedData.team_member_group.name) : null}</span> */}
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                </svg>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {data.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) => classNames(active ? 'text-white bg-indigo-600' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9')}
                    value={item}
                    onClick={() => console.log(item)}
                  >
                    {({ selectedId, active }) => (
                      <>
                        <span className={classNames(selectedId ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>

                        {selectedData ? (
                          <span
                            className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                            </svg>
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </div>
      )}
    </Listbox>
  );
}

MultipleSelectMenu.defaultProps = {
  selectedData: null,
};