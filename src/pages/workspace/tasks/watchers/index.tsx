import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';
import Dropdown from './watcherDropdown/Dropdown';
import { GetTaskWatcherService } from '../../../../features/task/taskService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setWatchersData } from '../../../../features/task/taskSlice';
interface WatcherProps {
  taskId: string | undefined;
}

export default function Watcher({ taskId }: WatcherProps) {
  const [showWatchers, setShowWatcher] = useState(false);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ['getwatcher'] });

  const { data: getWatchers, status } = useQuery({
    queryKey: ['getwatcher', taskId],
    queryFn: GetTaskWatcherService,
  });

  if (status == 'success') {
    dispatch(setWatchersData(getWatchers?.data.watchers.map((id) => id.team_member_id)));
  }

  // console.log(getWatchers?.data.watchers);

  return (
    <div className="relative">
      <EyeOutlined
        className="flex-shrink-0 h-5 w-5 text-indigo-400 text-2xl cursor-pointer"
        aria-hidden="true"
        onClick={() => setShowWatcher(!showWatchers)}
      />
      <p className="absolute bottom-1 left-4 bg-indigo-500 rounded text-xs text-white px-0.5 h-4 w-3 text-center ">
        {getWatchers?.data.watchers.length == null
          ? '0'
          : getWatchers?.data.watchers.length}
      </p>
      {showWatchers && <Dropdown taskId={taskId} />}
    </div>
  );
}
