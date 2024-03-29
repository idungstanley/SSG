import React, { useEffect, useState } from 'react';
import { GetAddLineUpTask, RemoveLineUpTask } from '../../../../features/task/taskService';
import { Task } from '../../../../features/task/interface.tasks';
import LineUpModal from './lineUp/lineUpModal';
import LineUpTasks from './lineUp/LineUpTasks';
import AddLineUpTask from './lineUp/AddLineUpTask';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from '../../../../common';

export default function LineUp() {
  const [lineUp, setLineUp] = useState<Task[]>([]);
  const queryClient = useQueryClient();
  const { data: lineUpTaskRes, isLoading } = GetAddLineUpTask();

  useEffect(() => {
    setLineUp((lineUpTaskRes?.data.tasks as Task[]) ?? []);
  }, [lineUpTaskRes]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const useDeleteLineUpTask = useMutation(RemoveLineUpTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(['lineup_tasks']);
    }
  });

  const handleLineUpTasks = (task: Task) => {
    let updateLineUpTask = [...lineUp];
    if (!lineUp.length) setAnchorEl(null);
    const taskIncluded = lineUp.find((lineUpTask) => lineUpTask.id === task.id);
    if (!taskIncluded) {
      updateLineUpTask = [...lineUp, task];
    }

    setLineUp(updateLineUpTask);
  };

  const handleRemoveLineUpTask = (task: Task) => {
    useDeleteLineUpTask.mutateAsync({
      taskId: task.id
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center group">
        <h1 className="p-2 text-lg font-bold text-black">LineUp ({lineUp.length})</h1>
        {lineUp.length > 0 && (
          <div
            className="p-1 rounded-md opacity-0 cursor-pointer group-hover:opacity-100 hover:bg-alsoit-gray-50"
            onClick={(event) => setAnchorEl(event.currentTarget)}
          >
            <p>+ Add to lineUp</p>
          </div>
        )}
      </div>
      {isLoading && (
        <div className="justify-center w-6 mx-auto mt-5">
          <Spinner size={8} color="#0F70B7" />
        </div>
      )}
      {!lineUp.length && !isLoading && <AddLineUpTask setAnchorEl={setAnchorEl} />}

      <div className="flex items-center space-x-2 overflow-x-scroll overflow-y-hidden" style={{ maxWidth: '900px' }}>
        <LineUpTasks handleRemoveLineUpTask={handleRemoveLineUpTask} lineUp={lineUp} />
      </div>

      <LineUpModal anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleLineUpTasks={handleLineUpTasks} />
    </div>
  );
}
