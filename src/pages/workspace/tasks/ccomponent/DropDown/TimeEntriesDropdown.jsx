import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  EditOutlined,
  PlayCircleFilled,
  StopFilled,
  TagOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { CurrencyDollarIcon, TrashIcon } from '@heroicons/react/outline';
import moment from 'moment';
import Timer from 'react-timer-wrapper';
import Timecode from 'react-timecode';
import { GetTimeEntriesService } from '../../../../../features/task/taskService';
import { AvatarWithInitials } from '../../../../../components';
import UpdateTimeEntryDropdown from './UpdateTimeEntryDropdown';

function TimeEntriesDropdown({
  taskId,
  startTimeClicked,
  showEntries,
  setShowEntries,
  isBillable,
  setIsBillable,
  setFormState,
  formState,
  handleTimeTracker,
}) {
  const [openUpdateEntry, setOpenUpdateEntry] = useState(false);
  const { data: getEntries } = useQuery({
    queryKey: ['getTimeEntries', taskId],
    queryFn: GetTimeEntriesService,
  });

  const handleEndTimeChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateEntry = (id) => {
    setOpenUpdateEntry(!openUpdateEntry);
    if (openUpdateEntry === id) {
      setOpenUpdateEntry(null);
    }
    setOpenUpdateEntry(id);
  };

  const totalDuration = getEntries?.data?.total_duration;
  return (
    <div className="">
      <div className="absolute -left-44 top-10 z-10 -mt-3 w-80 rounded-md shadow-lg bg-gray-100">
        <section className="">
          <div
            id="lastUpdatedTask"
            className="flex justify-between items-center text-xs font-normal h-7 mb-3 py-1 px-3"
          >
            <h4>This task only</h4>
            <p>1m</p>
          </div>
          <div
            id="taskUser"
            className="flex justify-between items-center text-xs font-normal h-10 py-3 px-3 hover:bg-gray-200"
            onClick={() => setShowEntries(!showEntries)}
          >
            <div className="p-2 flex items-center justify-start space-x-1">
              <AvatarWithInitials height="h-7" width="w-7" initials="AU" />
              <p>Me</p>
            </div>
            <p>{moment.utc(totalDuration * 1000).format('HH:mm:ss')}</p>
          </div>
          {/* render time enteries */}
          {showEntries &&
            getEntries?.data?.time_entries?.map(
              ({ id, duration, start_date }) => (
                <section
                  key={id}
                  id="getTimeEntries"
                  className="flex items-center justify-between px-3 h-10"
                >
                  <div
                    id="left"
                    className="flex items-center space-x-3 text-xs"
                  >
                    <p>{moment.utc(duration * 1000).format('HH:mm:ss')}</p>
                    <p>{moment(start_date).format('MMM D')}</p>
                  </div>
                  <div
                    id="right"
                    className="flex items-center space-x-2 relative"
                  >
                    <button type="button" onClick={() => handleUpdateEntry(id)}>
                      <EditOutlined
                        className="flex-shrink-0 h-3 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </button>
                    {openUpdateEntry === id ? (
                      <UpdateTimeEntryDropdown id={id} />
                    ) : null}
                    <TrashIcon
                      className="flex-shrink-0 h-3 w-5 text-red-400"
                      aria-hidden="true"
                    />
                  </div>
                </section>
              )
            )}
        </section>
        <section
          id="body"
          className="bg-indigo-500 text-white rounded-b-md px-3 py-1"
        >
          <div
            id="timeTrackType"
            className="flex justify-center items-center text-sm h-5"
          >
            <PlayCircleFilled
              className="flex-shrink-0 h-3 w-5"
              aria-hidden="true"
            />
            <p>Timer</p>
          </div>
          <div id="descNote" className="text-white w-full my-3">
            <input
              type="text"
              name="description"
              onChange={handleEndTimeChange}
              placeholder="Enter a note"
              className="border-0 shadow-sm rounded text-gray-600 w-full"
            />
          </div>
          <div
            id="entries"
            className="px-3 py-1 flex items-center justify-between"
          >
            <div
              id="left"
              className="flex items-center space-x-1"
              onClick={handleTimeTracker}
            >
              {startTimeClicked ? (
                <StopFilled
                  className="text-red-400 cursor-pointer text-2xl"
                  aria-hidden="true"
                />
              ) : (
                <PlayCircleFilled
                  className="cursor-pointer text-2xl"
                  aria-hidden="true"
                />
              )}
              <Timer active={startTimeClicked} duration={null}>
                <Timecode />
              </Timer>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="border-dotted border-white border-2 rounded-full p-1 ml-1 flex items-center justify-center">
                <TagOutlined className="text-white" aria-hidden="true" />
              </span>
              <CurrencyDollarIcon
                className={`${
                  isBillable
                    ? 'bg-green-400 rounded-full h-7  text-white cursor-pointer text-xl'
                    : 'text-white cursor-pointer text-xl rounded-full h-7'
                }`}
                aria-hidden="true"
                onClick={() => setIsBillable(!isBillable)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

TimeEntriesDropdown.defaultProps = {
  formState: {},
};

TimeEntriesDropdown.propTypes = {
  taskId: PropTypes.string.isRequired,
  formState: PropTypes.object,
  setFormState: PropTypes.func.isRequired,
  startTimeClicked: PropTypes.bool.isRequired,
  showEntries: PropTypes.bool.isRequired,
  isBillable: PropTypes.bool.isRequired,
  setShowEntries: PropTypes.func.isRequired,
  setIsBillable: PropTypes.func.isRequired,
  handleTimeTracker: PropTypes.func.isRequired,
};

export default TimeEntriesDropdown;
