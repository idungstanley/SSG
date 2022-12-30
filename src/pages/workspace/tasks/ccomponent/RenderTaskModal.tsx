import {
  CalendarOutlined,
  CaretDownFilled,
  CloudUploadOutlined,
  EllipsisOutlined,
  EyeOutlined,
  FlagOutlined,
  UserAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { CheckIcon, PlayIcon, StopIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from 'react-timer-wrapper';
import moment from 'moment';
import Timecode from 'react-timecode';
import {
  getOneTaskService,
  createTimeEntriesService,
  EndTimeEntriesService,
  AddTaskWatcherService,
  GetTaskWatcherService,
} from '../../../../features/task/taskService';
import TimeEntriesDropdown from './dropdown/TimeEntriesDropdown';

function RenderTaskModal() {
  const { taskId } = useParams();
  const [startTimeClicked, setStartTimeClicked] = useState(false);
  const [stopTimer, setStopTimer] = useState(false);
  const [showTimeEntries, setShowTimeEntries] = useState(false);
  const [watcherList, setWatcherList] = useState(false);
  const [getWatchList, setGetWatchList] = useState(false);
  const [watchersCount, setWatchersCount] = useState(0);
  const [showEntries, setShowEntries] = useState(false);
  const [isBillable, setIsBillable] = useState(false);

  const queryClient = useQueryClient();

  const { data: taskData } = useQuery({
    queryKey: ['taskData', taskId],
    queryFn: getOneTaskService,
  });

  const { data: startEntry } = useQuery({
    queryKey: ['startTimeClock', taskId],
    queryFn: createTimeEntriesService,
    enabled: startTimeClicked,
  });

  const { data: stopEntry } = useQuery({
    queryKey: ['endTimeClock', taskId],
    queryFn: EndTimeEntriesService,
    enabled: stopTimer,
  });

  const { data: watcher } = useQuery({
    queryKey: ['watcher', taskId],
    queryFn: AddTaskWatcherService,
    enabled: watcherList,
  });

  const { data: getWatcher } = useQuery({
    queryKey: ['watcher', taskId],
    queryFn: GetTaskWatcherService,
    enabled: getWatchList,
  });

  const defaultEndTimeClockFormState = {
    description: '',
  };

  const [formState, setFormState] = useState(defaultEndTimeClockFormState);

  const { description } = formState;

  const endClockTimer = useMutation(EndTimeEntriesService, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  // const onSubmit = async () => {
  //   await endClockTimer.mutateAsync({
  //     description,
  //     isBillable: isBillable === false ? 0 : 1,
  //   });
  // };

  const navigate = useNavigate();
  const closeTaskModal = () => {
    navigate('/workspace');
  };

  const handleTimeTracker = () => {
    setStartTimeClicked(!startTimeClicked);
    if (startTimeClicked) {
      setStopTimer(!stopTimer);
    }
  };

  const handleWatcher = () => {
    setWatcherList(!watcherList);
    setGetWatchList(!getWatchList);
    if (getWatcher?.data?.is_watching === true) {
      setWatchersCount(watchersCount + 1);
    }
  };

  return (
    <div className="w-full h-full fixed top-0 right-0 bottom-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="w-full h-full flex flex-col p-3 pb-12">
        <div className="bg-white h-full rounded-2xl">
          <section
            id="breadcrum"
            className="flex p-3  items-center justify-between h-11 bg-gray-200 rounded-t-2xl"
          >
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
            <section
              id="topnav"
              className="py-3 h-20 border-b-2 border-gray-100 w-1/2 border-r-2 space-x-3"
            >
              <div className="flex items-center justify-around">
                {/* right */}
                <div
                  id="right"
                  className="flex items-center justify-between space-x-3"
                >
                  <div className="flex items-center justify-center space-x-1 h-2 border-2 p-5 border-gray-200">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-gray-400">MARK COMPLETE</p>
                  </div>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <UserAddOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <FlagOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>

                {/* left */}
                <div
                  id="left"
                  className="flex items-center justify-between space-x-3"
                >
                  <div className="flex items-center justify-center space-x-1 h-5 w-auto p-3 bg-white rounded border border-gray-200">
                    <p className="text-sm text-gray-400">SSG-124</p>
                  </div>
                  <div className="flex items-center justify-center space-x-1 h-5 w-auto p-3 bg-white rounded border border-gray-200">
                    <CheckIcon
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-gray-400">Share</p>
                  </div>
                  <div>
                    <EllipsisOutlined
                      className="flex-shrink-0 h-7 w-7 text-gray-400 text-4xl mb-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section
              id="bodyright"
              className="p-3 h-20 border-b-2 border-gray-100 w-1/2"
            >
              <div className="flex items-center justify-between">
                <div className="flex justify-between items-center space-x-3">
                  <div id="created" className="flex flex-col">
                    <p className="text-xs text-gray-400">CREATED</p>
                    <p className="text-xs">
                      {moment(taskData?.data?.task?.created_at).format(
                        'MMM DD, hh:mm'
                      )}
                    </p>
                  </div>

                  <div id="timetracked" className="flex flex-col">
                    <p className="text-xs text-gray-400">TIME TRACKED</p>
                    <div className="flex items-center justify-center">
                      <div id="clicktimer" onClick={() => handleTimeTracker()}>
                        {startTimeClicked ? (
                          <StopIcon
                            className="h-5 w-7 text-red-400 cursor-pointer"
                            aria-hidden="true"
                          />
                        ) : (
                          <PlayIcon
                            className="h-5 w-7 text-green-400 cursor-pointer"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="text-xs cursor-pointer">
                        <Timer active={startTimeClicked} duration={null}>
                          <Timecode />
                        </Timer>
                      </div>
                      <div className="relative">
                        <CaretDownFilled
                          className="h-5 w-7 text-gray-300"
                          aria-hidden="true"
                          onClick={() => setShowTimeEntries(!showTimeEntries)}
                        />
                        {showTimeEntries && (
                          <TimeEntriesDropdown
                            taskId={taskId}
                            startTimeClicked={startTimeClicked}
                            setShowEntries={setShowEntries}
                            showEntries={showEntries}
                            isBillable={isBillable}
                            setIsBillable={setIsBillable}
                            setFormState={setFormState}
                            formState={formState}
                            // onSubmit={onSubmit}
                            handleTimeTracker={handleTimeTracker}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <CalendarOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="border-dotted border-gray-300 border-2 rounded-full p-1 ml-1">
                    <VideoCameraOutlined
                      className="h-5 w-7 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <div className="relative">
                  <EyeOutlined
                    className="flex-shrink-0 h-5 w-5 text-indigo-400 text-2xl cursor-pointer"
                    aria-hidden="true"
                    onClick={() => handleWatcher()}
                  />
                  <p className="absolute bottom-1 left-4 bg-indigo-500 rounded text-xs text-white px-0.5 h-4 w-3 text-center ">
                    {watchersCount}
                  </p>
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
              <div
                id="taskname"
                className="mx-3 my-2 p-2 hover:border-gray-300 border-2 rounded"
              >
                <p>{taskData?.data?.task?.name.toUpperCase()}</p>
              </div>
              <section id="description">
                <textarea name="taskdesc" id="" className="h-56" />
              </section>
              <div className="h-64 invisible">
                <p>testing</p>
              </div>
            </section>
            <section
              id="rightmainbody"
              className="py-3 h-full border-b-2 border-gray-100 w-1/2 border-r-2 space-x-3"
            >
              <p className="h-full">time activity</p>
            </section>
          </section>
          {/* footer */}
          <footer
            id="footer"
            className="flex p-3 items-center justify-between h-16 bg-gray-100 rounded-b-2xl"
          >
            <section
              id="leftfooter"
              className="w-1/2 border-gray-100  border-r-2 flex  justify-center items-center space-x-1"
            >
              <CloudUploadOutlined
                className="flex-shrink-0 w-7 text-gray-400"
                aria-hidden="true"
              />
              <p className="h-full">
                Drop files here to attach or{' '}
                <span className="text-blue-400">browse</span>{' '}
              </p>
            </section>
            <section
              id="rightfooter"
              className="w-1/2 border-r-2 border-gray-100 flex justify-start items-center"
            >
              <p className="h-full ml-6">search</p>
            </section>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default RenderTaskModal;
