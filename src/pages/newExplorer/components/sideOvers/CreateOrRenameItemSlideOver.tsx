import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemActionForSideOver } from '../../../../features/general/slideOver/slideOverSlice';
import { Input } from '../../../../components';
import { useAppSelector } from '../../../../app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  useCreateFolder,
  useRenameItem,
} from '../../../../features/explorer/explorerActionsService';

export default function CreateOrRenameItemSlideOver() {
  const dispatch = useDispatch();
  const { folderId } = useParams();

  const { itemActionForSideOver } = useAppSelector((state) => state.slideOver);
  const { selectedItemId, selectedItemType } = useAppSelector(
    (state) => state.explorer
  );

  const isCreateAction = itemActionForSideOver === 'create';

  const [itemName, setItemName] = useState('');

  const { mutate: onRename } = useRenameItem();
  const { mutate: onCreate } = useCreateFolder();

  const handleSubmit = () => {
    if (isCreateAction) {
      onCreate({
        folderName: itemName,
        parentId: folderId,
      });
    } else {
      onRename({
        type: selectedItemType,
        id: selectedItemId,
        name: itemName,
      });
    }
    onClose();
  };

  const onClose = () => dispatch(setItemActionForSideOver(null));

  return (
    <Transition.Root show={!!itemActionForSideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0  overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 top-20 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {isCreateAction
                            ? 'Create new folder'
                            : `Rename ${selectedItemType}`}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <form
                        onSubmit={handleSubmit}
                        className="py-6 w-full space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200 space-y-1 h-full flex flex-col justify-between sm:space-y-0"
                      >
                        <Input
                          label={`${
                            isCreateAction ? 'folder' : selectedItemType
                          } name`}
                          placeholder={`${
                            isCreateAction ? 'folder' : selectedItemType
                          } name`}
                          name="name"
                          value={itemName}
                          type="text"
                          onChange={(e) => setItemName(e.target.value)}
                        />
                        <button
                          type="submit"
                          className="p-2 text-base text-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none ring-0 focus:ring-0"
                        >
                          {isCreateAction ? 'Create' : 'Rename'}
                        </button>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
