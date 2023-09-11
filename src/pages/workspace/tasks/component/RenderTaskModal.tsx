import React, { useState } from 'react';
import {
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CloudArrowUpIcon,
  EllipsisHorizontalIcon,
  FlagIcon,
  PlayIcon,
  StopIcon,
  UserPlusIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { createTimeEntriesService, getOneTaskServices } from '../../../../features/task/taskService';
import ClockInOut from '../../../../components/Pilot/components/TimeClock/ClockInOut';

function RenderTaskModal() {
  const { taskId } = useParams();
  const [startTimeClicked, setStartTimeClicked] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [showTimeEntries, setShowTimeEntries] = useState(false);
  const { data: taskData } = getOneTaskServices({ task_id: taskId });

  useQuery({
    queryKey: ['startTimeClock', taskId],
    queryFn: createTimeEntriesService,
    enabled: startTimeClicked
  });

  const navigate = useNavigate();
  const closeTaskModal = () => {
    navigate('/');
  };

  const handleTimeTracker = () => {
    setStartTimeClicked(!startTimeClicked);
    if (startTimeClicked) {
      setStopTimer(!stopTimer);
    }
  };

  return (
    <div className="w-full h-full z-50 fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full h-full flex flex-col p-3 pb-12">
        <div className="bg-white h-full rounded-2xl">
          <section id="breadcrum" className="flex p-3 items-center justify-between h-11 bg-gray-200 rounded-t-2xl">
            <div className="flex items-center justify-center h-5 w-auto p-3 bg-white rounded">
              <p className="text-gray-400">Breadcrum</p>
            </div>
            <div
              id="wrapper"
              className="flex items-center justify-center h-7 w-7 rounded bg-white"
              onClick={() => closeTaskModal()}
            >
              <div className="text-gray-400 text-xl">X</div>
            </div>
          </section>
          {/* body */}
          <section id="body" className="flex">
            <section id="topnav" className="py-3 h-20 border-b-2 border-gray-100 w-1/2 border-r-2 space-x-3">
              <div className="flex items-center justify-around">
                {/* right */}
                <div id="right" className="flex items-center justify-between space-x-3">
                  <div className="flex items-center justify-center space-x-1 h-2 border-2 p-5 border-gray-200">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <p className="text-sm text-gray-400">MARK COMPLETE</p>
                  </div>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <UserPlusIcon className="h-5 w-7 text-gray-400" aria-hidden="true" />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <FlagIcon className="h-5 w-7 text-gray-400" aria-hidden="true" />
                  </span>
                </div>

                {/* left */}
                <div id="left" className="flex items-center justify-between space-x-3">
                  <div className="flex items-center justify-center space-x-1 h-5 w-auto p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm text-gray-400">SSG-124</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 h-5 w-auto p-3 bg-white rounded border border-gray-200">
                    <CheckIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <p className="text-sm text-gray-400">Share</p>
                  </div>
                  <div>
                    <EllipsisHorizontalIcon
                      className="flex-shrink-0 h-7 w-7 text-gray-400 text-4xl mb-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section id="bodyright" className="p-3 h-20 border-b-2 border-gray-100 w-1/2">
              <div className="flex items-center justify-between">
                <div className="flex justify-between items-center space-x-3">
                  <div id="created" className="flex flex-col">
                    <p className="text-xs text-gray-400">CREATED</p>
                    <p className="text-xs">{moment(taskData?.data?.task?.created_at).format('MMM DD, hh:mm')}</p>
                  </div>

                  <div id="timetracked" className="flex flex-col">
                    <p className="text-xs text-gray-400">TIME TRACKED</p>
                    <div className="flex items-center justify-center">
                      <div id="clicktimer" onClick={() => handleTimeTracker()}>
                        {startTimeClicked ? (
                          <StopIcon className="h-5 w-7 text-red-400 cursor-pointer" aria-hidden="true" />
                        ) : (
                          <PlayIcon className="h-5 w-7 text-green-400 cursor-pointer" aria-hidden="true" />
                        )}
                      </div>
                      <div className="text-xs cursor-pointer">
                        <ClockInOut />
                      </div>

                      <div className="relative">
                        <ChevronDownIcon
                          className="h-5 w-7 text-gray-300"
                          aria-hidden="true"
                          onClick={() => setShowTimeEntries(!showTimeEntries)}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <CalendarIcon className="h-5 w-7 text-gray-400" aria-hidden="true" />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <VideoCameraIcon className="h-5 w-7 text-gray-400" aria-hidden="true" />
                  </span>
                </div>
              </div>
            </section>
          </section>
          {/* body */}
          <section id="mainbody" className="flex">
            <section
              id="leftmainbody"
              className="py-3 border-b-2 border-gray-100 w-1/2 border-r-2 space-x-3 mt-2 overflow-auto"
            >
              <div id="taskname" className="mx-3 my-2 p-2 hover:border-gray-300 border-2 rounded">
                <p>{taskData?.data?.task?.name.toUpperCase()}</p>
              </div>
              <section id="description">
                <textarea name="taskdesc" id="" className="h-56" />
              </section>
              <div className="h-64 invisible">
                <p>testing</p>
              </div>
            </section>
            <section id="rightmainbody" className="py-3 h-full border-b-2 border-gray-100 w-1/2 border-r-2 space-x-3">
              <p className="h-full">time activity</p>
            </section>
          </section>
          {/* footer */}
          <footer id="footer" className="flex p-3 items-center justify-between h-16 bg-gray-100 rounded-b-2xl">
            <section
              id="leftfooter"
              className="w-1/2 border-gray-100  border-r-2 flex  justify-center items-center space-x-1"
            >
              <CloudArrowUpIcon className="flex-shrink-0 w-7 text-gray-400" aria-hidden="true" />
              <p className="h-full">
                Drop files here to attach or <span className="text-blue-400">browse</span>{' '}
              </p>
            </section>
            <section id="rightfooter" className="w-1/2 border-r-2 border-gray-100 flex justify-start items-center">
              <p className="h-full ml-6">search</p>
            </section>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RenderTaskModal;
