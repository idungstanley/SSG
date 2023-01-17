import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { useGetTeamMembers } from '../../features/settings/teamMembers/teamMemberService';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SelectMenuTeamMembers from '../selectMenu';
import { ISelectedData } from '../PermissionManagement';
import { Spinner } from '../../common';
import { useShareItem } from '../../features/shared/sharedService';
import { setShowShareSideOver } from '../../features/general/slideOver/slideOverSlice';

export default function ShareItemModal() {
  const dispatch = useAppDispatch();

  const { shareSideOver } = useAppSelector((state) => state.slideOver);
  const { type, id, show } = shareSideOver;

  const { data, status } = useGetTeamMembers({ page: 0, query: '' });
  const teamMembers = data?.data.team_members;

  const { mutate: onShare } = useShareItem();

  const { currentUserId } = useAppSelector((state) => state.auth);

  const membersWithoutActive = teamMembers?.filter(
    (member) => member.user.id !== currentUserId
  );

  const handleShare = (member: ISelectedData | null) => {
    if (member && type && id) {
      onShare({
        type,
        userId: member.id,
        itemId: id,
      });
    }
  };

  const onClose = () => {
    dispatch(setShowShareSideOver({ show: false }));
  };

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-3"
                >
                  Share {type}
                </Dialog.Title>

                <div className="w-full h-full flex flex-row items-center gap-3">
                  {status === 'loading' ? (
                    <div className="mx-auto w-6 mt-5 justify-center">
                      <Spinner size={8} color="#0F70B7" />
                    </div>
                  ) : membersWithoutActive ? (
                    <SelectMenuTeamMembers
                      teamMembers={membersWithoutActive.map((i) => ({
                        id: i.id,
                        name: i.name || i.user.name,
                        email: i.user?.email,
                        accessLevel: i.id,
                        type: 'member',
                      }))}
                      selectedData={null}
                      setSelectedData={handleShare}
                      title="Select member to share"
                      showEmail
                    />
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
