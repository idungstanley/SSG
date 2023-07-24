import { ImyTaskData, setGetSubTaskId, setTaskIdForPilot } from '../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import './task.css';
import DataRenderFunc from './DataRenderFunc';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { columnsHead } from '../views/ListColumns';
import { useList } from '../../../../../features/list/listService';
import { useNavigate, useParams } from 'react-router-dom';
import { cl } from '../../../../../utils';
import { Task, TaskKey } from '../../../../../features/task/interface.tasks';

export interface TaskDataProps {
  listId?: string;
  task: ImyTaskData;
  tasks?: Task[];
}

export default function TaskData({ task, listId }: TaskDataProps) {
  const { hideTask, getSubTaskId } = useAppSelector((state) => state.task);
  const { currentWorkspaceId } = useAppSelector((state) => state.auth);

  const { hubId, walletId, taskId } = useParams();

  const isActive = taskId === task?.id;
  const taskBg = isActive ? 'bg-primary-200' : 'bg-white';

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleGetSubTask = (id: string | undefined) => {
    if (id == getSubTaskId) {
      dispatch(setGetSubTaskId(null));
    } else {
      dispatch(setGetSubTaskId(id));
    }
  };

  const handleTaskPilot = (id: string, name: string) => {
    hubId
      ? navigate(`/${currentWorkspaceId}/tasks/newh/${hubId}/t/${id}`, { replace: true })
      : walletId
      ? navigate(`/${currentWorkspaceId}/tasks/neww/${walletId}/t/${id}`, { replace: true })
      : navigate(`/${currentWorkspaceId}/tasks/newl/${listId}/t/${id}`, { replace: true });
    dispatch(
      setShowPilotSideOver({
        id: id,
        type: 'task',
        show: true,
        title: name
      })
    );
    dispatch(setTaskIdForPilot(id));
    dispatch(
      setActiveItem({
        activeItemId: id,
        activeItemType: 'task',
        activeItemName: name
      })
    );
  };

  const { data } = useList(listId);
  const customFields =
    data?.custom_fields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false })) ?? [];

  return (
    <div className={cl('w-full flex border-t border-b', taskBg)}>
      {/* sticky task name */}
      {/* <div
        className="absolute group pointer-events-none left-6 right-0 z-50"
        style={{ zIndex: '60', overflow: 'visible !important' }}
      >
        {[...columnsHead, ...customFields]
          .filter((i) => i.value === 'Task')
          .map((col) => (
            <div key={col.id} className="text-xs font-medium capitalize cursor-pointer">
              <DataRenderFunc
                taskColField={task?.[col.field]}
                col={{ field: col.field, id: col.id }}
                task={task}
                getSubTaskId={getSubTaskId}
                handleGetSubTask={() => handleGetSubTask(task?.id)}
              />
            </div>
          ))}
      </div> */}

      <div className="relative flex-grow">
        {/* task name (hidden, because we show sticky name) */}
        <div className="relative text-sm" onClick={() => handleTaskPilot(task?.id as string, task?.name as string)}>
          {hideTask.length
            ? hideTask.map((col) => col.value == 'Task' && !col.hidden && <></>)
            : task &&
              [...columnsHead, ...customFields]
                .filter((i) => i.value === 'Task')
                .map((col) => (
                  <div
                    key={col.id}
                    // style={{ minWidth: 240 }}
                    className="text-xs font-medium capitalize sticky left-0 cursor-pointer group"
                  >
                    <DataRenderFunc
                      taskColField={task[col.field as Exclude<TaskKey, 'tags'>]}
                      col={{ field: col.field, id: col.id }}
                      task={task}
                      getSubTaskId={getSubTaskId}
                      handleGetSubTask={() => handleGetSubTask(task?.id)}
                    />
                  </div>
                ))}
        </div>
        <div id="tags" className="relative">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value == 'Tags' &&
                  !col.hidden && (
                    <div key={col.id} className="flex items-center w-32 text-xs font-medium capitalize group">
                      <DataRenderFunc
                        taskColField={task[col.field as Exclude<TaskKey, 'tags'>]}
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task?.id)}
                      />
                    </div>
                  )
              )
            : task &&
              [...columnsHead, ...customFields].map(
                (col) =>
                  col.value == 'Tags' &&
                  !col.hidden && (
                    <div key={col.id} className="flex items-center w-32 text-xs font-medium capitalize group">
                      <DataRenderFunc
                        taskColField={task[col.field as Exclude<TaskKey, 'tags'>]}
                        col={{ field: col.field, id: col.id }}
                        task={task}
                        getSubTaskId={getSubTaskId}
                        handleGetSubTask={() => handleGetSubTask(task?.id)}
                      />
                    </div>
                  )
              )}
        </div>
      </div>

      <div className={cl('relative dynamic place-items-stretch items-center place-content-stretch', taskBg)}>
        {hideTask.length
          ? hideTask.map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && (
                  <div
                    key={col.id}
                    className={cl('items-center flex py-px h-10 font-medium text-gray-400 uppercase group', taskBg)}
                  >
                    <DataRenderFunc
                      taskColField={task[col.field as Exclude<TaskKey, 'tags'>]}
                      col={{ field: col.field, id: col.id }}
                      task={task}
                      getSubTaskId={getSubTaskId}
                      handleGetSubTask={() => handleGetSubTask(task?.id)}
                    />
                  </div>
                )
            )
          : task &&
            [...columnsHead, ...customFields].map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && (
                  <div
                    key={col.id}
                    className={cl(
                      'flex justify-center items-stretch h-10 py-px font-medium text-gray-400 uppercase group',
                      taskBg
                    )}
                  >
                    <DataRenderFunc
                      taskColField={task[col.field as Exclude<TaskKey, 'tags'>]}
                      col={{ field: col.field, id: col.id }}
                      task={task}
                      getSubTaskId={getSubTaskId}
                      handleGetSubTask={() => handleGetSubTask(task?.id)}
                    />
                  </div>
                )
            )}
      </div>
    </div>
  );
}
