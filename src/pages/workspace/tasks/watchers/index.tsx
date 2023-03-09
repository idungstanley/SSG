import React from 'react';
// import Dropdown from './watcherDropdown/Dropdown';
// import { UseGetWatcherService } from '../../../../features/task/taskService';
// import { useDispatch } from 'react-redux';
// import { setWatchersData } from '../../../../features/task/taskSlice';
// import { EyeIcon } from '@heroicons/react/24/outline';
interface WatcherProps {
  taskId: string | undefined;
}

export default function Watcher({ taskId }: WatcherProps) {
  // eslint-disable-next-line no-console
  console.log(taskId);
  // const [showWatchers, setShowWatcher] = useState<boolean>(false);
  // const dispatch = useDispatch();

  // const { data: getWatchers, status } = UseGetWatcherService({
  //   query: taskId
  // });

  // if (status == 'success') {
  //   dispatch(setWatchersData(getWatchers?.data.watchers.map((id: { team_member_id: string }) => id.team_member_id)));
  // }

  return (
    <div className="relative">
      {/* <EyeIcon
        className="flex-shrink-0 h-5 w-5 text-indigo-400 text-2xl cursor-pointer"
        aria-hidden="true"
        onClick={() => setShowWatcher(!showWatchers)}
      />

      <p className="absolute bottom-1 left-4 bg-indigo-500 rounded text-xs text-white px-0.5 h-4 w-3 text-center ">
        {getWatchers?.data.watchers.length == null ? '0' : getWatchers?.data.watchers.length}
      </p>
      {showWatchers && <Dropdown taskId={taskId} />} */}
    </div>
  );
}
