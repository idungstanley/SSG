import { useEffect, useRef, useState } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import {
  setCurrTaskListId,
  setCurrTeamMemId,
  setStatusId,
  setSubtaskDefaultStatusId,
  setUpdateCords
} from '../../../../features/task/taskSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { generateGrid } from '../../lib';
import { ScrollableHorizontalListsContainer } from '../../../ScrollableContainer/ScrollableHorizontalListsContainer';
import { Head } from './Head/Head';
import { OverlayRow } from './OverlayRow';
import { Row } from './Row';
import { ITask_statuses } from '../../../../features/list/list.interfaces';
import { IListColor } from '../List/List';
import NewTaskTemplate from './newTaskTemplate/NewTaskTemplate';

interface TableProps {
  heads: listColumnProps[];
  data: Task[];
  label: string;
  listName?: string;
  listColor?: IListColor;
}

export function Table({ heads, data, label, listName, listColor }: TableProps) {
  const dispatch = useAppDispatch();

  const { draggableItemId } = useAppSelector((state) => state.list);
  const { statusId, defaultSubtaskListId, splitSubTaskState: splitSubTaskMode } = useAppSelector((state) => state.task);

  const [listId, setListId] = useState<string>('');
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);

  const tableElement = useRef<HTMLTableElement>(null);
  const taskLength = data.length;

  const columns = heads.filter((i) => !i.hidden);

  // New task template
  const newTaskObj = NewTaskTemplate({
    data,
    label,
    custom_field_columns: data[0].custom_field_columns || [],
    task_statuses: data[0].task_statuses || []
  });

  const dataSpread = showNewTaskField ? newTaskObj : data;

  // get exact statusID
  useEffect(() => {
    setListId(data[0].list_id);
    dispatch(setCurrTaskListId(data[0].list_id));
    const statusObj: ITask_statuses | undefined = (data[0].task_statuses as ITask_statuses[]).find(
      (statusObj: ITask_statuses) => statusObj?.name === dataSpread[0].status.name
    );

    if (statusObj) {
      const newStatusId: string = statusObj.id;
      dispatch(setStatusId(newStatusId));
    }

    // get default list_status_id
    const minPosition = Math.min(
      ...((data[0].task_statuses as ITask_statuses[]).map((status) => status.position) || [])
    );

    const defaultStatusObj: ITask_statuses | undefined = (data[0].task_statuses as ITask_statuses[]).find(
      (statusObj: ITask_statuses) =>
        statusObj?.is_default === 1 ? statusObj?.is_default : statusObj.position === minPosition
    );

    if (listId === defaultSubtaskListId) dispatch(setSubtaskDefaultStatusId(defaultStatusObj?.id as string));
  }, [listId, showNewTaskField, defaultSubtaskListId]);

  // init height
  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  const handleClose = () => {
    setShowNewTaskField(false);
    dispatch(setCurrTeamMemId(null));
  };

  const handleToggleNewTask = () => {
    setShowNewTaskField(true);
  };

  const onScroll = useScroll(() => dispatch(setUpdateCords()));

  const draggableItem = draggableItemId ? data.find((i) => i.id === draggableItemId) : null;

  return (
    <ScrollableHorizontalListsContainer onScroll={onScroll} ListColor={listColor}>
      {/* draggable item */}{' '}
      {draggableItem ? (
        <DragOverlay>
          <OverlayRow columns={columns} task={draggableItem} />
        </DragOverlay>
      ) : null}
      <div className="py-2 table-container" id={label}>
        <table
          onScroll={splitSubTaskMode ? () => null : onScroll}
          style={
            !collapseTasks
              ? {
                  display: 'grid',
                  gridTemplateColumns: generateGrid(columns.length)
                }
              : undefined
          }
          className="w-full"
          ref={tableElement}
        >
          <Head
            collapseTasks={collapseTasks}
            taskLength={taskLength}
            onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
            label={label}
            headerStatusColor={data[0].status.color as string}
            columns={columns}
            listName={listName}
            tableHeight={tableHeight}
            listId={data[0].list_id}
            groupedTask={data}
          />
          {/* rows */}
          {!collapseTasks ? (
            <tbody className="contents">
              {dataSpread.length ? (
                dataSpread.map((task, index) =>
                  'tags' in task ? (
                    <Row
                      key={task.id}
                      columns={columns}
                      task={task as ITaskFullList}
                      listId={task.list_id as string}
                      taskIndex={index}
                      isListParent={true}
                      parentId={listId}
                      taskStatusId={statusId}
                      handleClose={handleClose}
                      level={0}
                    />
                  ) : null
                )
              ) : (
                <h1 className="p-5 text-center">No tasks</h1>
              )}
            </tbody>
          ) : null}

          {/* add subtask button */}
          {!showNewTaskField && !splitSubTaskMode ? (
            <tbody className="h-5">
              <tr onClick={() => handleToggleNewTask()} className="absolute left-0 p-1.5 pl-16 text-left w-fit text-xs">
                <td className="font-semibold cursor-pointer alsoit-gray-300">+ New Task</td>
              </tr>
            </tbody>
          ) : null}
        </table>
      </div>
    </ScrollableHorizontalListsContainer>
  );
}
