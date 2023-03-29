import React, { useState } from 'react';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import moment from 'moment';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '../../../../../components';
import { UpdateTimeEntriesService } from '../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../app/hooks';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';

interface UpdateTimeEntryDropdownProps {
  time_entry_id: string | undefined;
}

function UpdateTimeEntryDropdown({ time_entry_id }: UpdateTimeEntryDropdownProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isBillable, setIsBillable] = useState(false);
  const { initial_description, initial_start_date, initial_end_date } = useAppSelector((state) => state.task);
  const updateClockTimer = useMutation(UpdateTimeEntriesService, {
    onSuccess: () => {
      queryClient.invalidateQueries(['timeclock']);
      dispatch(setUpdateEntries({ openUpdateEntryId: null }));
    }
  });

  const defaultUpdateTimeFormState = {
    description: initial_description,
    start_date: initial_start_date,
    end_date: initial_end_date
  };

  const [formState, setFormState] = useState(defaultUpdateTimeFormState);

  const handleUpdateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const { description, start_date, end_date } = formState;

  const onSubmit = async () => {
    await updateClockTimer.mutateAsync({
      description,
      isBillable: isBillable === false ? 0 : 1,
      start_date,
      end_date,
      time_entry_id
    });
  };

  return (
    <div className="z-50 relative">
      <section className="absolute -left-96 -top-56 z-50 -mt-3 w-60 rounded-md shadow-lg bg-gray-100">
        <div className="flex justify-between items-center px-3 py-3 text-xs">
          <p>Edit Session</p>
          <button type="button" onClick={() => dispatch(setUpdateEntries({ openUpdateEntryId: null }))}>
            X
          </button>
        </div>
        <div id="descNote" className="w-5/6 my-2 mx-3">
          <input
            type="text"
            placeholder="Enter a note"
            name="description"
            value={description}
            onChange={handleUpdateTimeChange}
            className="border-0 shadow-sm rounded text-gray-600 w-full mx-auto"
          />
        </div>
        <div id="billable" className="flex items-center justify-start space-x-1 text-sm px-3">
          <CurrencyDollarIcon
            className={`${
              isBillable
                ? 'bg-green-400 rounded-full h-7  text-white cursor-pointer text-xl'
                : 'text-gray-300 cursor-pointer text-xl rounded-full h-7'
            }`}
            aria-hidden="true"
            onClick={() => setIsBillable(!isBillable)}
          />
          <p className="text-gray-400">Billable</p>
        </div>
        <div id="startDate" className="flex items-center justify-start space-x-1 px-4 py-2">
          <CalendarIcon className="text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            name="start_date"
            placeholder="HH:MM"
            onChange={handleUpdateTimeChange}
            value={moment(start_date).format('YYYY-MM-D h:mm:ss')}
            className="border-0 border-b-2 border-dotted bg-transparent w-4/5 "
          />
        </div>
        <div id="endDate" className="flex items-center justify-start space-x-1 px-4 py-2">
          <CalendarIcon className="text-gray-400 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="HH:MM"
            onChange={handleUpdateTimeChange}
            name="end_date"
            value={moment(end_date).format('YYYY-MM-D h:mm:ss')}
            className="border-0 border-b-2 border-dotted bg-transparent w-4/5 "
          />
        </div>
        <div className="space-y-1 px-4 mb-8 sm:space-y-0 sm:px-6 sm:py-5">
          <Button
            buttonStyle="primary"
            onClick={onSubmit}
            label="Update"
            padding="py-2 px-4"
            height="h-10"
            width="w-full"
          />
        </div>
      </section>
    </div>
  );
}

export default UpdateTimeEntryDropdown;
