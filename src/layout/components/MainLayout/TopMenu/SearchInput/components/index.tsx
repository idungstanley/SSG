import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BookmarkIcon } from '@heroicons/react/outline';
import { useGetSavedSearches } from '../../../../../../features/search/searchService';
import { Spinner } from '../../../../../../common';
import { useAppDispatch } from '../../../../../../app/hooks';
import { setSearchQuery } from '../../../../../../features/search/searchSlice';

export default function SavedSearches() {
  const dispatch = useAppDispatch();
  const { data, status } = useGetSavedSearches();

  const handleClick = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  return (
    <Menu as="div" className="relative inline-block text-left right-7">
      <div>
        <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none ring-0 focus:ring-0">
          <span className="sr-only">Open options</span>
          <BookmarkIcon className="h-5 w-5" aria-hidden="true" />
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
        <Menu.Items className="absolute right-0 py-1 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {status === 'loading' ? (
            <div className="mx-auto w-6 mt-5 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : data ? (
            <>
              <p className="text-sm text-black px-4 py-3 border-b">Saved search values:</p>

              {data.map((saved) => (
                <Menu.Item key={saved.value}>
                  <button
                    onClick={() => handleClick(saved.value)}
                    className="block px-4 py-2 w-full text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {saved.value}
                  </button>
                </Menu.Item>
              ))}
            </>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
