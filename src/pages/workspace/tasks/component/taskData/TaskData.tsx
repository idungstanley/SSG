import { ImyTaskData, setGetSubTaskId, setTaskIdForPilot } from '../../../../../features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import './task.css';
import DataRenderFunc from './DataRenderFunc';
import { setShowPilotSideOver } from '../../../../../features/general/slideOver/slideOverSlice';
import { setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { columnsHead } from '../views/ListColumns';
import { useList } from '../../../../../features/list/listService';
import { useNavigate, useParams } from 'react-router-dom';

export interface TaskDataProps {
  listId?: string;
  task?: ImyTaskData | undefined;
  tasks?: (ImyTaskData | undefined)[] | undefined;
}

export default function TaskData({ task, listId }: TaskDataProps) {
  const { hideTask, getSubTaskId, CompactView, CompactViewWrap, comfortableView, comfortableViewWrap } = useAppSelector(
    (state) => state.task
  );
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const { hubId, walletId, taskId } = useParams();

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
      ? navigate(`/h/${hubId}/t/${id}`, { replace: true })
      : walletId
      ? navigate(`/w/${walletId}/t/${id}`, { replace: true })
      : navigate(`/l/${listId}/t/${id}`, { replace: true });
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
    <div className="w-full flex bg-white border-t border-b">
      {/* sticky task name */}
      <div
        className="absolute pointer-events-none left-0 -right-96 xl:right-0 z-50"
        style={{ zIndex: '99', overflow: 'visible !important' }}
      >
        {[...columnsHead, ...customFields]
          .filter((i) => i.value === 'Task')
          .map((col) => (
            <div key={col.id} className="text-xs font-medium capitalize cursor-pointer group">
              <DataRenderFunc
                taskColField={task?.[col.field]}
                col={{ field: col.field, id: col.id }}
                task={task}
                getSubTaskId={getSubTaskId}
                handleGetSubTask={() => handleGetSubTask(task?.id)}
              />
            </div>
          ))}
      </div>

      <div className="flex-grow relative">
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
                    className="text-xs opacity-0 font-medium capitalize cursor-pointer group"
                  >
                    <DataRenderFunc
                      taskColField={task?.[col.field]}
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
                    <div key={col.id} className="flex w-32 items-center text-xs font-medium capitalize group">
                      <DataRenderFunc
                        taskColField={task?.[col.field]}
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
                    <div key={col.id} className="flex w-32 items-center text-xs font-medium capitalize group">
                      <DataRenderFunc
                        taskColField={task?.[col.field]}
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

      <div className="relative dynamic place-items-stretch items-center place-content-stretch bg-white">
        {hideTask.length
          ? hideTask.map(
              (col) =>
                col.value !== 'Task' &&
                col.value !== 'Tags' &&
                !col.hidden && (
                  <div
                    key={col.id}
                    className="items-center flex py-px h-10 bg-white font-medium text-gray-400 uppercase group"
                  >
                    <DataRenderFunc
                      taskColField={task?.[col.field]}
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
                    className="flex justify-center items-stretch h-10 py-px bg-white font-medium text-gray-400 uppercase group"
                  >
                    <DataRenderFunc
                      taskColField={task?.[col.field]}
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
