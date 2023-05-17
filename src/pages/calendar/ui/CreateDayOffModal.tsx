import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../app/hooks';
import { ListBox } from '../../../components/ListBox';
import { useAddDayOff } from '../../../features/calendar/api/daysOffApi';
import { useLeaveTypes } from '../../../features/calendar/api/leaveTypesApi';
import { selectCalendar, setNewDayOff } from '../../../features/calendar/slice/calendarSlice';
import { LeaveType } from '../../../features/calendar/types/leaveTypes';
import { useGetTeamMembers } from '../../../features/settings/teamMembers/teamMemberService';
import { checkIsOwner } from '../lib/userUtils';
import { MOCKED_HUB_ID } from './DisapprovedDaysOffList';

export default function CreateDayOffModal() {
  const dispatch = useAppDispatch();
  const reasonRef = useRef<HTMLInputElement>(null);
  const { newDayOff } = useSelector(selectCalendar);
  const { data: types } = useLeaveTypes();
  const { mutate: onAdd } = useAddDayOff(MOCKED_HUB_ID);
  const { data: teamMembers } = useGetTeamMembers({ page: 1, query: '' });

  const showModal = !!newDayOff;
  const leaveTypes = types ?? [];
  const members = teamMembers?.data.team_members ?? [];

  const [type, setType] = useState<LeaveType | null>(null);
  const [member, setMember] = useState<{ id: string; name: string } | null>(null);

  const isOwner = checkIsOwner(teamMembers?.data.team_members ?? []);

  const onClose = () => dispatch(setNewDayOff(null));

  useEffect(() => {
    const findMember = members.find((i) => i.id === newDayOff?.userId);

    if (findMember) {
      setMember({ id: findMember.id, name: findMember.user.name });
    }
  }, [members, newDayOff]);

  useEffect(() => {
    if (leaveTypes) {
      setType(leaveTypes[0]);
    }
  }, [leaveTypes]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newDayOff) {
      return;
    }

    if (reasonRef.current && member && type) {
      const reason = reasonRef.current.value;
      // const isApproved = isOwner;

      const { start_date, end_date, userId } = newDayOff;

      onAdd({
        hub_id: MOCKED_HUB_ID,
        reason,
        start_date,
        end_date,
        team_member_id: userId,
        leave_type_id: type.id
      });

      // reset
      onClose();
      setType(leaveTypes[0]);
    }
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
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
              <Dialog.Panel
                as="form"
                onSubmit={handleSubmit}
                className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start w-full">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                      Book time off
                    </Dialog.Title>

                    {/* main */}
                    <div className="mt-2 p-2 w-full space-y-5">
                      {newDayOff ? (
                        <div className="flex w-full justify-between items-center">
                          <p>
                            Starting
                            <span className="border rounded-md p-2 ml-2">{newDayOff.start_date}</span>
                          </p>
                          <p>
                            Ending <span className="border rounded-md p-2 ml-2">{newDayOff.end_date}</span>
                          </p>
                        </div>
                      ) : null}

                      {member ? (
                        <ListBox
                          setSelected={setMember}
                          value={member}
                          values={members.map((i) => ({ id: i.id, name: i.user.name }))}
                          title="Who for"
                        />
                      ) : null}

                      {type ? <ListBox setSelected={setType} value={type} values={leaveTypes} title="Type" /> : null}

                      <div>
                        <label htmlFor="reason" className="block text-sm font-medium leading-6 text-gray-900">
                          Reason
                        </label>
                        <div className="mt-1">
                          <input
                            required
                            min={2}
                            ref={reasonRef}
                            type="text"
                            id="reason"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                            placeholder="Reason for time off..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {newDayOff ? (
                  <p className="py-2 text-center">
                    Takes {dayjs(newDayOff.end_date).diff(dayjs(newDayOff.start_date), 'day') + 1 || 1} days from
                    allowance
                  </p>
                ) : null}

                {/* bottom actions */}
                <div className="mt-2 px-2 flex gap-4 justify-between items-center">
                  <button
                    onClick={onClose}
                    type="button"
                    className="inline-flex left-0 border w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-red-600 bg-red-100 hover:bg-red-200 border-red-300 shadow-sm sm:ml-3 sm:w-auto"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="inline-flex left-0 border w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-primary-600 bg-primary-50 hover:bg-primary-200 border-primary-300 shadow-sm sm:ml-3 sm:w-auto"
                  >
                    {isOwner ? 'Create' : 'Send request'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
