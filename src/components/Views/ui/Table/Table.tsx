import { useEffect, useRef, useState, Fragment } from 'react';
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
import { IField, IListDetailRes, ITask_statuses } from '../../../../features/list/list.interfaces';
import { IListColor } from '../List/List';
import { SeparateSubtasks } from './SeparateSubtasks';

interface TableProps {
  heads: listColumnProps[];
  data: Task[];
  label: string;
  listName?: string;
  listColor?: IListColor;
  customFields?: IField[];
  listDetails?: IListDetailRes;
  isBlockToOpenSubtasks?: boolean;
}

export function Table({
  heads,
  data,
  label,
  listName,
  customFields,
  listColor,
  listDetails,
  isBlockToOpenSubtasks
}: TableProps) {
  const dispatch = useAppDispatch();

  const { draggableItemId } = useAppSelector((state) => state.list);
  const {
    statusId,
    defaultSubtaskListId,
    splitSubTaskState: splitSubTaskMode,
    separateSubtasksMode
  } = useAppSelector((state) => state.task);

  const [listId, setListId] = useState<string>('');
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);

  const tableElement = useRef<HTMLTableElement>(null);
  const taskLength = data.length;

  const columns = heads.filter((i) => !i.hidden);

  // New task template
  const newTaskObj = [
    ...data,
    {
      archived_at: null,
      assignees: [],
      checklists: [],
      created_at: Date.now(),
      custom_field_columns: listDetails?.data.list.custom_field_columns || [],
      custom_fields: [],
      deleted_at: null,
      description: null,
      directory_items: [],
      end_date: null,
      group_assignees: [],
      id: '0',
      list_id: null,
      main_list_id: '',
      name: 'Enter New Task',
      parent_id: null,
      position: 125,
      priority: 'low',
      short_id: '',
      start_date: null,
      status: { name: label, color: data[0].status.color },
      tags: [],
      time_entries_duration: 0,
      updated_at: '',
      watchers_count: 0
    }
  ];

  const dataSpread = showNewTaskField ? newTaskObj : data;

  // get exact statusID
  useEffect(() => {
    setListId(data[0].list_id);
    dispatch(setCurrTaskListId(data[0].list_id));
    const statusObj: ITask_statuses | undefined = listDetails?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj?.name === dataSpread[0].status.name
    );

    if (statusObj) {
      const newStatusId: string = statusObj.id;
      dispatch(setStatusId(newStatusId));
    }

    // get default list_status_id
    const minPosition = Math.min(...(listDetails?.data.list.task_statuses.map((status) => status.position) || []));

    const defaultStatusObj: ITask_statuses | undefined = listDetails?.data.list.task_statuses.find(
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
                    <Fragment key={task.id}>
                      <Row
                        columns={columns}
                        task={task as ITaskFullList}
                        listId={task.list_id as string}
                        taskIndex={index}
                        isListParent={true}
                        parentId={listId}
                        task_status={statusId}
                        handleClose={handleClose}
                        customFields={customFields}
                        taskStatuses={listDetails?.data.list.task_statuses}
                        isBlockToOpenSubtasks={isBlockToOpenSubtasks}
                        level={0}
                      />
                      {separateSubtasksMode ? (
                        <SeparateSubtasks listId={task.list_id as string} parentId={task.id} parentName={task.name} />
                      ) : null}
                    </Fragment>
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
