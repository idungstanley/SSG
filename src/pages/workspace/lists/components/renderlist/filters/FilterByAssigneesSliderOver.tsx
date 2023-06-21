import { Fragment } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { setShowFilterByAssigneeSlideOver } from '../../../../../../features/general/slideOver/slideOverSlice';
import AvatarWithInitials from '../../../../../../components/avatar/AvatarWithInitials';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { setFilters } from '../../../../../../features/task/taskSlice';
import { useGetTeamMembers } from '../../../../../../features/settings/teamMembers/teamMemberService';
import { generateFilter } from '../../../../../../components/TasksHeader/ui/Filter/lib/filterUtils';

export default function FilterByAssigneesSliderOver() {
  const dispatch = useAppDispatch();
  const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowFilterByAssigneeSlideOver(false));

  const { data } = useGetTeamMembers({ page: 1, query: '' });
  const members = data?.data.team_members ?? [];
  const { filters } = useAppSelector((state) => state.task);

  const currentAssignees = filters.length
    ? (filters.find((i) => i.key === 'assignees')?.values as { id: string; value: string }[])
    : [];

  const onClickMember = (memberId: string, memberName: string) => {
    const isAssigneesInFilters = filters.find((i) => i.key === 'assignees');

    const newMemberObj = {
      value: memberName,
      id: memberId
    };

    if (isAssigneesInFilters) {
      const isMemberInAssignees = (isAssigneesInFilters.values as { id: string; value: string }[])
        .map((i) => i.id)
        .includes(memberId);

      // add member or remove if exists
      const newAssignees = isMemberInAssignees
        ? currentAssignees.filter((i) => i.id !== memberId)
        : [...currentAssignees, newMemberObj];

      if (newAssignees.length === 0) {
        // delete assignees filter if no one member
        dispatch(setFilters([...filters.filter((i) => i.key !== 'assignees')]));
      } else {
        dispatch(
          setFilters([
            ...filters.map((filter) => {
              if (filter.key === 'assignees') {
                // return { ...filter, values: [] };
                return { ...filter, values: [...newAssignees] };
              }

              return filter;
            })
          ])
        );
      }
    } else {
      // create assignees filter
      dispatch(setFilters([...filters, generateFilter('assignees', { initialValue: newMemberObj })]));
    }
  };

  return (
    <Transition.Root show={!!showFilterByAssigneeSlideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10 border-2 border-gray-500" onClose={onClose}>
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0  overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-80 mt-10 border-2 border-gray-200 max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg ">
                          <p className="text-gray-900">Assignees</p>
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white cursor-pointer text-gray-400 hover:text-gray-500 focus:outline-none ring-0 focus:ring-0"
                            onClick={onClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <button className="text-purple-300 text-lg">
                              <RxDoubleArrowRight />
                            </button>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                      <input type="text" placeholder="Search" className="w-full" />
                      <section>
                        <div id="header" className="flex justify-between items-center mt-5">
                          <p>Assignees</p>
                          <p>Select all</p>
                        </div>

                        {members.map((member) => (
                          <section
                            onClick={() => onClickMember(member.id, member.user.name)}
                            className="flex justify-between cursor-pointer hover:bg-gray-200"
                            key={member.id}
                          >
                            <div className="flex space-x-3">
                              <AvatarWithInitials
                                initials={member.user.initials}
                                textColor={'white'}
                                height="h-8"
                                width="w-8"
                                backgroundColour={'blue'}
                                textSize={'8px'}
                              />
                              <div className="flex flex-col text-left">
                                <p className="capitalize" style={{ fontSize: '13px' }}>
                                  {member.user.name}
                                </p>
                                <p style={{ fontSize: '10px' }}>{member.user.email}</p>
                              </div>
                            </div>

                            <button>
                              {currentAssignees.map((i) => i.id).includes(member.id) ? (
                                <AiFillCheckCircle />
                              ) : (
                                <AiOutlineCheckCircle />
                              )}
                            </button>
                          </section>
                        ))}
                      </section>
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
