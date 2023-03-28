import React, { useState } from 'react';
import { BsStopCircle } from 'react-icons/bs';
import { AiOutlinePauseCircle, AiOutlinePlayCircle } from 'react-icons/ai';
import { CurrencyDollarIcon, TagIcon } from '@heroicons/react/24/outline';
import Timer from 'react-compound-timer';
import {
  EndTimeEntriesService,
  GetTimeEntriesService,
  // GetTimeEntriesService,
  StartTimeEntryService
} from '../../../../../../../../features/task/taskService';
import { useAppSelector } from '../../../../../../../../app/hooks';
import moment from 'moment';
import { AvatarWithInitials } from '../../../../../../../../components';
import { ITimeEntriesRes } from '../../../../../../../../features/task/interface.tasks';

// enum TimerState {
//   Stopped,
//   Running,
//   Paused
// }

type TimePropsRenderProps = {
  getTime: () => number;
  setTime: (time: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  reset: () => void;
};

type ClockInOutState = {
  startTimeClicked: boolean;
  stopTimeClock: boolean;
  isBillable: boolean;
};

export default function ClockInOutIndex() {
  const [isBillable, setIsBillable] = useState(false);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const [state, setState] = useState<ClockInOutState>({
    startTimeClicked: false,
    stopTimeClock: false,
    isBillable: false
  });

  const { data: getEntries } = GetTimeEntriesService({
    taskId: activeItemId,
    trigger: activeItemType
  });

  StartTimeEntryService({
    taskId: activeItemId,
    trigger: state.startTimeClicked,
    type: activeItemType
  });

  EndTimeEntriesService({
    id: activeItemId,
    description: '',
    is_Billable: isBillable,
    trigger: state.stopTimeClock
  });

  const handleTimeTrigger = () => {
    setState((prevState) => ({
      ...prevState,
      startTimeClicked: !prevState.startTimeClicked,
      stopTimeClock: prevState.stopTimeClock
    }));
  };

  const HandleStopTimer = () => {
    setState((prevState) => ({
      ...prevState,
      startTimeClicked: prevState.startTimeClicked,
      stopTimeClock: !prevState.stopTimeClock
    }));
  };

  return (
    <div className="mt-6 p-2 rounded-t-md">
      <div className="bg-gray-100">
        <section id="body" className="bg-indigo-500 text-white rounded-b-md px-3 py-1">
          <div
            id="taskUser"
            className="flex justify-between items-center text-xs font-normal h-10 py-3 px-3 hover:bg-gray-200 cursor-pointer"
          >
            <div className="p-2 flex items-center justify-start space-x-1 cursor-pointer">
              <AvatarWithInitials height="h-7" width="w-7" initials="AU" />
            </div>
            {/* total time here */}
            <p>{moment.utc((getEntries as ITimeEntriesRes)?.data?.total_duration * 1000).format('HH:mm:ss')}</p>
          </div>
          <div id="descNote" className="text-white w-full my-3">
            <input
              type="text"
              name="description"
              // onChange={handleEndTimeChange}
              placeholder="Enter a note"
              className="border-0 shadow-sm rounded text-gray-600 w-full"
            />
          </div>
          <div id="entries" className="px-3 py-1 flex items-center justify-between">
            <div id="left" className="flex items-center space-x-1 cursor-pointer">
              <Timer
                initialTime={55000}
                startImmediately={false}
                onStart={() => handleTimeTrigger()}
                onPause={() => HandleStopTimer()}
                onStop={() => HandleStopTimer()}
              >
                {({ start, pause, stop, getTime }: TimePropsRenderProps) => (
                  <React.Fragment>
                    <div>{moment.utc(getTime()).format('HH:mm:ss')}</div>
                    <br />
                    <div>
                      <button onClick={start}>
                        <AiOutlinePlayCircle className="text-green-500 cursor-pointer text-2xl" aria-hidden="true" />
                      </button>
                      <button onClick={pause}>
                        <AiOutlinePauseCircle className="text-yellow-500 cursor-pointer text-2xl" aria-hidden="true" />
                      </button>
                      <button onClick={stop}>
                        <BsStopCircle className="text-red-400 cursor-pointer text-2xl" aria-hidden="true" />
                      </button>
                    </div>
                  </React.Fragment>
                )}
              </Timer>
            </div>
            <div id="right" className="flex items-center space-x-1">
              <span className="border-dotted border-white border-2 rounded-full p-1 ml-1 flex items-center justify-center">
                <TagIcon className="h-5 w-5 text-whit" aria-hidden="true" />
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
