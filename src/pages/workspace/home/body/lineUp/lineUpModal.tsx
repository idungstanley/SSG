import React, { useEffect, useState } from 'react';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import SearchIcon from '../../../../../assets/icons/SearchIcon';
import StatusDropdown from '../../../../../components/status/StatusDropdown';
import Assignee from '../../../tasks/assignTask/Assignee';
import { ImyTaskData, setGlobalSearchResult } from '../../../../../features/task/taskSlice';
import { EntityType } from '../../../../../utils/EntityTypes/EntityType';
import { Task } from '../../../../../features/task/interface.tasks';
import ActiveTreeSearch from '../../../../../components/ActiveTree/ActiveTreeSearch';
import { BROWSE_TASKS_FROM_HOME } from '../../../tasks/component/taskMenu/TaskMenu';
import { GetRecentsTask, UseAddLineUpTask, UseGlobalSearch } from '../../../../../features/task/taskService';
import { useGetTeamMembers } from '../../../../../features/settings/teamMembers/teamMemberService';
import { useAppSelector } from '../../../../../app/hooks';
import { useDispatch } from 'react-redux';
import { Spinner } from '../../../../../common';

interface ILineUpModal {
  anchorEl: HTMLElement | null;
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  handleLineUpTasks: (task: Task) => void;
}

export default function LineUpModal({ anchorEl, setAnchorEl, handleLineUpTasks }: ILineUpModal) {
  const { globalSearchResult } = useAppSelector((state) => state.task);

  const [browseTasks, setBrowseTasks] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { currentUserId } = useAppSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { data: teamMember } = useGetTeamMembers({ page: 1, query: '' });
  const { data: recentTasks } = GetRecentsTask();
  const { mutate: onGlobalSearch, isLoading } = UseGlobalSearch();

  const { mutate: onAddLineUp } = UseAddLineUpTask();
  const members = teamMember?.data.team_members ?? [];
  const currentMemberId = members.find((i) => i.user.id === currentUserId)?.id as string;

  const loadTasks =
    globalSearchResult !== null && searchValue.length !== 0 ? globalSearchResult : recentTasks?.data.tasks;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onGlobalSearch({
        searchValue
      });
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  useEffect(() => {
    if (anchorEl == null || searchValue !== '') {
      dispatch(setGlobalSearchResult([]));
    }

    if (anchorEl == null) {
      dispatch(setGlobalSearchResult(null));
      setSearchValue('');
    }
  }, [anchorEl, searchValue]);

  const handleAddLineUpTask = (task: Task) => {
    onAddLineUp({
      taskId: task.id,
      team_member_id: currentMemberId
    });
    handleLineUpTasks(task);
  };
  const handleBrowseTask = () => {
    setBrowseTasks(true);
  };

  return (
    <div>
      <AlsoitMenuDropdown anchorEl={anchorEl} handleClose={() => setAnchorEl(null)}>
        <div className="sticky top-0 z-50 bg-white">
          <div className="flex items-center w-full p-2 border-b border-b-gray-300">
            <SearchIcon width={13} height={13} />

            <input
              type="text"
              placeholder="Search tasks"
              className="input w-full p-2 border-0 "
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>

          <div className="flex justify-between p-3">
            <div>
              {!browseTasks ? (
                <p>Recents</p>
              ) : (
                <p className="cursor-pointer text-alsoit-purple-300" onClick={() => setBrowseTasks(false)}>
                  Recents/Search
                </p>
              )}
            </div>
            {!browseTasks && (
              <span className="cursor-pointer text-alsoit-purple-300" onClick={() => handleBrowseTask()}>
                Browse tasks
              </span>
            )}
          </div>
        </div>

        <div className="max-h-96 w-134">
          {!browseTasks && (
            <div className="p-2 group">
              {!isLoading ? (
                loadTasks?.length == 0 ? (
                  <p className="flex justify-center items-center">Nothing to see here.</p>
                ) : (
                  loadTasks?.map((task) => (
                    <div
                      key={task.id}
                      className="flex justify-between p-2 space-x-2 rounded-md cursor-pointer hover:bg-alsoit-gray-50"
                      onClick={() => handleAddLineUpTask(task)}
                    >
                      <div className="flex items-center space-x-2">
                        <div className="pointer-events-none">
                          <StatusDropdown
                            task={task}
                            taskCurrentStatus={task.status}
                            taskStatuses={task.task_statuses}
                          />
                        </div>
                        <h1 className="mb-1 truncate " style={{ maxWidth: '290PX' }}>
                          {task.name}
                        </h1>
                      </div>
                      <div className="pointer-events-none">
                        <Assignee task={task as ImyTaskData} itemId={task.id} option={`${EntityType.task}`} />
                      </div>
                    </div>
                  ))
                )
              ) : (
                <div className="justify-center w-6 mx-auto mt-5">
                  <Spinner size={8} color="#0F70B7" />
                </div>
              )}
            </div>
          )}
          {browseTasks && <ActiveTreeSearch option={BROWSE_TASKS_FROM_HOME} />}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
