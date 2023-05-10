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
    <div className="relative w-full flex bg-white pl-2 border-t border-b">
      {/* sticky task name */}
      <div className="absolute left-2 -right-96 z-50" style={{ zIndex: '99', overflow: 'visible !important' }}>
        {/* <div className="sticky left-0 w-"> */}
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
        {/* </div> */}
      </div>

      <div className="flex-grow">
        {/* task name */}
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
                    className="text-xs font-medium capitalize cursor-pointer group"
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
        <div id="tags" className="">
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

      <div className="dynamic place-items-stretch items-center place-content-stretch bg-white">
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
    // <div className="h-10">
    //   {/* sticky task name */}
    //   <div className="absolute pl-2 left-6 right-0 z-50" style={{ zIndex: '99', overflow: 'visible !important' }}>
    //     {[...columnsHead, ...customFields].map(
    //       (col) =>
    //         col.value == 'Task' &&
    //         !col.hidden && (
    //           <div
    //             key={col.id}
    //             className="flex w-full whitespace-normal items-center text-xs font-medium capitalize cursor-pointer group mr-20"
    //           >
    //             <DataRenderFunc
    //               taskColField={task?.[col.field]}
    //               col={{ field: col.field, id: col.id }}
    //               task={task}
    //               getSubTaskId={getSubTaskId}
    //               handleGetSubTask={() => handleGetSubTask(task?.id)}
    //             />
    //           </div>
    //         )
    //     )}
    //   </div>

    //   <div
    //     onClick={() => handleTaskPilot(task?.id as string, task?.name as string)}
    //     className={`${
    //       comfortableView && taskId == task?.id
    //         ? 'flex justify-between group hover:bg-black-100 items-center border-1.5 bg-primary-200'
    //         : comfortableView
    //         ? 'flex justify-between group  hover:bg-gray-100 items-center border-1.5 bg-white'
    //         : comfortableViewWrap && taskId == task?.id
    //         ? 'flex justify-between group   items-center border-1.5 bg-primary-200'
    //         : comfortableViewWrap
    //         ? 'flex justify-between group  hover:bg-gray-100 items-center border-1.5 bg-white'
    //         : CompactView && activeItemId == task?.id
    //         ? ' compactView flex justify-between group items-center border-1.5 h-10 bg-primary-200'
    //         : CompactView
    //         ? 'compactView flex h-10 justify-between group hover:bg-gray-100 items-center border-1.5 bg-white'
    //         : CompactViewWrap && activeItemId == task?.id
    //         ? 'compactViewWrap flex justify-between group  items-center border-1.5 bg-primary-200'
    //         : CompactViewWrap
    //         ? 'compactViewWrap flex justify-between group  hover:bg-gray-100 items-center border-1.5 bg-white'
    //         : null
    //     } relative h-10 grid grid-cols-3 grid-rows-1`}
    //   >
    //     <div className="flex bg-white items-center justify-between pr-24 w-full">
    //       <div
    //         className={`${
    //           comfortableView
    //             ? 'text-sm whitespace-nowrap'
    //             : comfortableViewWrap
    //             ? 'text-sm'
    //             : CompactView
    //             ? 'text-xs whitespace-nowrap'
    //             : CompactViewWrap
    //             ? 'text-xs text-justify'
    //             : null
    //         }`}
    //       >
    //         {hideTask.length
    //           ? hideTask.map((col) => col.value == 'Task' && !col.hidden && <></>)
    //           : task &&
    //             [...columnsHead, ...customFields].map(
    //               (col) =>
    //                 col.value == 'Task' &&
    //                 !col.hidden && (
    //                   <div
    //                     key={col.id}
    //                     // style={{ minWidth: 240 }}
    //                     className="flex col-span-2 w-full opacity-0 pl-2 whitespace-normal items-center text-xs font-medium capitalize cursor-pointer group"
    //                   >
    //                     <DataRenderFunc
    //                       taskColField={task?.[col.field]}
    //                       col={{ field: col.field, id: col.id }}
    //                       task={task}
    //                       getSubTaskId={getSubTaskId}
    //                       handleGetSubTask={() => handleGetSubTask(task?.id)}
    //                     />
    //                   </div>
    //                 )
    //             )}
    //       </div>
    //       <div id="tags" className="">
    //         {hideTask.length
    //           ? hideTask.map(
    //               (col) =>
    //                 col.value == 'Tags' &&
    //                 !col.hidden && (
    //                   <div key={col.id} className="flex w-32 items-center text-xs font-medium capitalize group">
    //                     <DataRenderFunc
    //                       taskColField={task?.[col.field]}
    //                       col={{ field: col.field, id: col.id }}
    //                       task={task}
    //                       getSubTaskId={getSubTaskId}
    //                       handleGetSubTask={() => handleGetSubTask(task?.id)}
    //                     />
    //                   </div>
    //                 )
    //             )
    //           : task &&
    //             [...columnsHead, ...customFields].map(
    //               (col) =>
    //                 col.value == 'Tags' &&
    //                 !col.hidden && (
    //                   <div key={col.id} className="flex w-32 items-center text-xs font-medium capitalize group">
    //                     <DataRenderFunc
    //                       taskColField={task?.[col.field]}
    //                       col={{ field: col.field, id: col.id }}
    //                       task={task}
    //                       getSubTaskId={getSubTaskId}
    //                       handleGetSubTask={() => handleGetSubTask(task?.id)}
    //                     />
    //                   </div>
    //                 )
    //             )}
    //       </div>
    //     </div>

    //     <div
    //       // style={{ marginLeft: 312 }}
    //       className="justify-items-center items-center dynamic bg-white"
    //     >
    //       {hideTask.length
    //         ? hideTask.map(
    //             (col) =>
    //               col.value !== 'Task' &&
    //               col.value !== 'Tags' &&
    //               !col.hidden && (
    //                 <div
    //                   key={col.id}
    //                   className="items-center w-32 py-px h-10 bg-white font-medium text-gray-400 uppercase group"
    //                   // style={{ width: '50px' }}
    //                 >
    //                   <DataRenderFunc
    //                     taskColField={task?.[col.field]}
    //                     col={{ field: col.field, id: col.id }}
    //                     task={task}
    //                     getSubTaskId={getSubTaskId}
    //                     handleGetSubTask={() => handleGetSubTask(task?.id)}
    //                   />
    //                 </div>
    //               )
    //           )
    //         : task &&
    //           [...columnsHead, ...customFields].map(
    //             (col) =>
    //               col.value !== 'Task' &&
    //               col.value !== 'Tags' &&
    //               !col.hidden && (
    //                 <div
    //                   key={col.id}
    //                   className="items-center w-32 h-10 py-px bg-white font-medium text-gray-400 uppercase group"
    //                   // style={{ width: '50px' }}
    //                 >
    //                   <DataRenderFunc
    //                     taskColField={task?.[col.field]}
    //                     col={{ field: col.field, id: col.id }}
    //                     task={task}
    //                     getSubTaskId={getSubTaskId}
    //                     handleGetSubTask={() => handleGetSubTask(task?.id)}
    //                   />
    //                 </div>
    //               )
    //           )}
    //     </div>
    //   </div>
    // </div>
  );
}
