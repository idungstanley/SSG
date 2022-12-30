import React, { useState } from 'react';
import { CurrencyDollarIcon } from '@heroicons/react/outline';
import { CalendarOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { Button } from '../../../../../components';
import { UpdateTimeEntriesService } from '../../../../../features/task/taskService';

interface UpdateTimeEntryDropdownProps {
  id: string;
}

function UpdateTimeEntryDropdown({ id }: UpdateTimeEntryDropdownProps) {
  const [isBillable, setIsBillable] = useState(false);
  const queryClient = useQueryClient();

  const updateClockTimer = useMutation(UpdateTimeEntriesService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  const defaultUpdateTimeFormState = {
    description: '',
    start_date: '',
    end_date: '',
  };

  const [formState, setFormState] = useState(defaultUpdateTimeFormState);

  const handleUpdateTimeChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const { description, start_date, end_date } = formState;

  const onSubmit = async () => {
    await updateClockTimer.mutateAsync({
      description,
      isBillable: isBillable === false ? 0 : 1,
      start_date,
      end_date,
      id,
    });
  };

  return (
    <div className="">
      <section className="absolute -left-0 top-10 z-10 -mt-3 w-60 rounded-md shadow-lg bg-gray-100">
        <div className="flex justify-between items-center px-3 py-3 text-xs">
          <p>Edit Session</p>
          <button type="button">X</button>
        </div>
        <div id="descNote" className="text-white w-full my-2 mx-3">
          <input
            type="text"
            name="description"
            onChange={handleUpdateTimeChange}
            placeholder="Enter a note"
            className="border-0 shadow-sm rounded text-gray-600"
          />
        </div>
        <div
          id="billable"
          className="flex items-center justify-start space-x-1 text-sm px-3"
        >
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
        <div
          id="startDate"
          className="flex items-center justify-start space-x-1 px-4 py-2"
        >
          <CalendarOutlined className="text-gray-400" aria-hidden="true" />
          <input
            type="text"
            name="start_date"
            placeholder="HH:MM"
            className="border-0 border-b-2 border-dotted bg-transparent w-4/5 "
          />
        </div>
        <div
          id="endDate"
          className="flex items-center justify-start space-x-1 px-4 py-2"
        >
          <CalendarOutlined className="text-gray-400" aria-hidden="true" />
          <input
            type="text"
            placeholder="HH:MM"
            name="end_date"
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

UpdateTimeEntryDropdown.propTypes = {
  id: PropTypes.string.isRequired,
};

export default UpdateTimeEntryDropdown;
