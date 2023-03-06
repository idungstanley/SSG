import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BookmarkIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useGetSavedSearches, useSaveSearchValue } from '../../../../../../features/search/searchService';
import { Spinner } from '../../../../../../common';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { setSearchQuery } from '../../../../../../features/search/searchSlice';

export default function SavedSearches() {
  const dispatch = useAppDispatch();
  const { searchQuery } = useAppSelector((state) => state.search);
  const { data, status } = useGetSavedSearches();

  const { mutate: onSaveValue } = useSaveSearchValue();

  const handlePasteValue = (value: string) => {
    dispatch(setSearchQuery(value));
  };

  const handleSaveOrRemoveItem = (value: string, type: 'save' | 'remove') => {
    if (data) {
      const oldData = data[0].value;

      if (type === 'save') {
        onSaveValue([...oldData, value]);
      } else {
        onSaveValue([...oldData.filter((i) => i !== value)]);
      }
    }
  };

  return (
    <Menu as="div" className="absolute inline-block text-left right-2">
      <div>
        <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0">
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
          {searchQuery.length > 2 ? (
            <Menu.Item>
              <div className="flex justify-center m-3 border">
                <button
                  type="button"
                  onClick={() => handleSaveOrRemoveItem(searchQuery, 'save')}
                  className="rounded w-full border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none ring-0 focus:ring-0"
                >
                  Save current value
                </button>
              </div>
            </Menu.Item>
          ) : null}
          {status === 'loading' ? (
            <div className="mx-auto w-6 mt-5 justify-center">
              <Spinner size={8} color="#0F70B7" />
            </div>
          ) : data ? (
            <>
              <p className="text-sm text-indigo-600 px-4 py-3 border-t">Saved search values:</p>

              {data[0].value.map((saved) => (
                <Menu.Item key={saved}>
                  <div className="flex w-full px-2 pr-4 hover:bg-gray-200 items-center justify-between">
                    <button
                      title="Paste this"
                      onClick={() => handlePasteValue(saved)}
                      className="block p-2 text-left text-sm text-gray-700 w-full"
                    >
                      {saved}
                    </button>
                    <TrashIcon
                      onClick={() => handleSaveOrRemoveItem(saved, 'remove')}
                      className="h-5 w-5 cursor-pointer stroke-current text-gray-400"
                      aria-hidden="true"
                      id="trashIcon"
                    />
                  </div>
                </Menu.Item>
              ))}
            </>
          ) : null}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
