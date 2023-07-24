import React, { useState } from 'react';
import { CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
// import moment from 'moment';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '../../../../../components';
import { UpdateTimeEntriesService } from '../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../app/hooks';
import { setUpdateEntries } from '../../../../../features/task/taskSlice';
import { useDispatch } from 'react-redux';

interface UpdateTimeEntryDropdownProps {
  time_entry_id: string | undefined;
  billable: number;
}

function UpdateTimeEntryDropdown({ time_entry_id, billable }: UpdateTimeEntryDropdownProps) {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [isBillable, setIsBillable] = useState(billable === 1 ? true : false);
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
      isBillable: isBillable ? 1 : 0,
      start_date,
      end_date,
      time_entry_id
    });
  };

  return (
    <div className="absolute -left-64 top-8 z-50 -mt-3 w-60 rounded-md shadow-lg bg-alsoit-gay-50">
      <section className="">
        <div className="flex justify-between items-center px-3 py-3 text-alsoit-text-lg">
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
            className="border-0 shadow-sm rounded text-alsoit-gray-300 w-full mx-auto"
          />
        </div>
        <div id="billable" className="flex items-center justify-start space-x-1 text-alsoit-text-lg px-3">
          <CurrencyDollarIcon
            className={`${
              isBillable
                ? 'bg-alsoit-success rounded-full h-7  text-white cursor-pointer text-alsoit-text-lg'
                : 'text-alsoit-gray-200 cursor-pointer text-alsoit-text-lg rounded-full h-7'
            }`}
            aria-hidden="true"
            onClick={() => setIsBillable(!isBillable)}
          />
          <p className="text-alsoit-gray-200">Billable</p>
        </div>
        <div id="startDate" className="flex items-center justify-start space-x-1 px-4 py-2">
          <CalendarIcon className="text-alsoit-gray-200 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            name="start_date"
            placeholder="HH:MM:SS"
            onChange={handleUpdateTimeChange}
            value={start_date?.slice(10) as string}
            className="border-0 border-b-2 border-dotted bg-transparent w-4/5 "
          />
        </div>
        <div id="endDate" className="flex items-center justify-start space-x-1 px-4 py-2">
          <CalendarIcon className="text-alsoit-gray-200 w-4 h-4" aria-hidden="true" />
          <input
            type="text"
            placeholder="HH:MM:SS"
            onChange={handleUpdateTimeChange}
            name="end_date"
            value={end_date?.slice(10) as string}
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
