import React, { Fragment, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../../../app/hooks';
import { Dialog, Transition } from '@headlessui/react';
import { RxDoubleArrowRight } from 'react-icons/rx';
import { setShowFilterByAssigneeSlideOver } from '../../../../../../features/general/slideOver/slideOverSlice';
import AvatarWithInitials from '../../../../../../components/avatar/AvatarWithInitials';
import { AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai';
import { ITaskFullList, TaskDataGroupingsAssigneeProps } from '../../../../../../features/task/interface.tasks';
import { setFilterTaskByAssigneeIds } from '../../../../../../features/task/taskSlice';

export default function FilterByAssigneesSliderOver({ data }: { data: ITaskFullList[] }) {
  const dispatch = useAppDispatch();
  const { showFilterByAssigneeSlideOver } = useAppSelector((state) => state.slideOver);
  const onClose = () => dispatch(setShowFilterByAssigneeSlideOver(false));
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);

  const [TaskDataGroupingsAssignees, setTaskDataGroupingsAssignees] = useState<
    TaskDataGroupingsAssigneeProps | undefined
  >(undefined);
  useEffect(() => {
    const taskDataGroupedByAssignee = data?.reduce(
      (
        GroupedTaskByAssignee: {
          [key: string]: {
            assigneeName: string;
            assigneeId?: string | null | undefined;
            tasks: ITaskFullList[];
          };
        },
        currentTask
      ) => {
        const assignees = currentTask.assignees;

        if (assignees !== null && assignees !== undefined && assignees.length > 0) {
          assignees?.forEach((assignee) => {
            const assigneeId = assignee.id;
            if (!GroupedTaskByAssignee[assigneeId]) {
              GroupedTaskByAssignee[assigneeId] = {
                assigneeName: assignee.name,
                assigneeId: assignee.id,
                tasks: [] // create an empty tasks array for each assignee
              };
            }

            GroupedTaskByAssignee[assigneeId].tasks.push(currentTask);
          });
        } else {
          // handle tasks with no assignee
          if (!GroupedTaskByAssignee['unassigned']) {
            GroupedTaskByAssignee['unassigned'] = {
              assigneeName: 'Unassigned',
              assigneeId: 'unassigned',
              tasks: [] // create an empty tasks array for unassigned tasks
            };
          }

          GroupedTaskByAssignee['unassigned'].tasks.push(currentTask);
        }

        return GroupedTaskByAssignee;
      },
      {}
    );

    setTaskDataGroupingsAssignees(taskDataGroupedByAssignee as TaskDataGroupingsAssigneeProps);

    return () => {
      // cleanup function
    };
  }, [data, setTaskDataGroupingsAssignees]);

  return (
    <Transition.Root show={!!showFilterByAssigneeSlideOver} as={Fragment}>
      <Dialog as="div" className="relative z-10 border-2 border-gray-500" onClose={onClose}>
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
                      {/* {console.log(TaskDataGroupingsAssignees[value].assigneeName)} */}
                      <input type="text" placeholder="Search" className="w-full" />
                      <section>
                        <div id="header" className="flex justify-between items-center mt-5">
                          <p>Assignees</p>
                          <p>Select all</p>
                        </div>
                        {TaskDataGroupingsAssignees
                          ? Object.keys(TaskDataGroupingsAssignees).map((value) => (
                              <section key={TaskDataGroupingsAssignees[value].assigneeId}>
                                <div
                                  className="flex justify-between cursor-pointer hover:bg-gray-200"
                                  onClick={() => {
                                    if (filterTaskByAssigneeIds == TaskDataGroupingsAssignees[value]?.assigneeId) {
                                      dispatch(setFilterTaskByAssigneeIds(null));
                                    } else {
                                      dispatch(
                                        setFilterTaskByAssigneeIds(TaskDataGroupingsAssignees[value]?.assigneeId)
                                      );
                                    }
                                  }}
                                >
                                  <div className="flex space-x-3">
                                    <AvatarWithInitials
                                      initials={'ND'}
                                      textColor={'white'}
                                      height="h-8"
                                      width="w-8"
                                      backgroundColour={'blue'}
                                      textSize={'8px'}
                                    />
                                    <div className="flex flex-col text-left">
                                      <p className="capitalize" style={{ fontSize: '13px' }}>
                                        {TaskDataGroupingsAssignees[value]?.assigneeName}
                                      </p>
                                      <p style={{ fontSize: '10px' }}>
                                        {TaskDataGroupingsAssignees[value].tasks.length} tasks
                                      </p>
                                    </div>
                                  </div>

                                  <button>
                                    {filterTaskByAssigneeIds == TaskDataGroupingsAssignees[value]?.assigneeId ? (
                                      <AiFillCheckCircle />
                                    ) : (
                                      <AiOutlineCheckCircle />
                                    )}
                                  </button>
                                </div>
                              </section>
                            ))
                          : null}
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
