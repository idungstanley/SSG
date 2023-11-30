import { useEffect, useRef, useState } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import {
  setCurrTaskListId,
  setCurrTeamMemId,
  setEscapeKey,
  setNewTaskStatus,
  setStatusId,
  setSubtaskDefaultStatusId
} from '../../../../features/task/taskSlice';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { generateGrid } from '../../lib';
import { ScrollableHorizontalListsContainer } from '../../../ScrollableContainer/ScrollableHorizontalListsContainer';
import { Head } from './Head/Head';
import { OverlayRow } from './OverlayRow';
import { Row } from './Row';
import { ITask_statuses } from '../../../../features/list/list.interfaces';
import { IListColor } from '../List/List';
import NewTaskTemplate from './newTaskTemplate/NewTaskTemplate';
import LightenColor from '../List/lightenColor/LightenColor';
import { generatePriority } from '../../../../app/helpers';
import { sortTypesConsts } from '../../../TasksHeader/lib/sortUtils';

interface TableProps {
  heads: listColumnProps[];
  data: Task[];
  label: string;
  listName?: string;
  listColor?: IListColor;
  isBlockedShowChildren?: boolean;
  selectionArr?: ITaskFullList[];
}

export function Table({ heads, data, label, listName, listColor, isBlockedShowChildren, selectionArr }: TableProps) {
  const dispatch = useAppDispatch();

  const { draggableItemId } = useAppSelector((state) => state.list);
  const {
    statusId,
    defaultSubtaskListId,
    splitSubTaskState: splitSubTaskMode,
    escapeKey,
    sortType,
    keyBoardSelectedIndex
  } = useAppSelector((state) => state.task);
  const { activeItemId } = useAppSelector((state) => state.workspace);

  const [listId, setListId] = useState<string>('');
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);

  const tableElement = useRef<HTMLTableElement>(null);
  const tableHeadElement = useRef<HTMLTableElement>(null);
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

  // reset showNewTaskField with eskLey
  useEffect(() => {
    if (escapeKey) {
      setShowNewTaskField(false);
    }
    dispatch(setEscapeKey(false));
  }, [escapeKey, showNewTaskField]);

  // get exact statusID
  useEffect(() => {
    setListId(data[0].list_id);
    dispatch(setCurrTaskListId(data[0].list_id));
    const statusObj: ITask_statuses | undefined = (data?.[0].task_statuses as ITask_statuses[]).find(
      (statusObj: ITask_statuses) => statusObj?.name === dataSpread?.[0].status?.name
    );

    if (statusObj) {
      const newStatusId: string = statusObj.id;
      dispatch(setStatusId(newStatusId));
    }

    // get default list_status_id
    const minPosition = Math.min(
      ...((data?.[0].task_statuses as ITask_statuses[]).map((status) => status?.position) || [])
    );

    const defaultStatusObj: ITask_statuses | undefined = (data[0].task_statuses as ITask_statuses[]).find(
      (statusObj: ITask_statuses) =>
        statusObj?.is_default === 1 ? statusObj?.is_default : statusObj?.position === minPosition
    );

    if (listId === defaultSubtaskListId) dispatch(setSubtaskDefaultStatusId(defaultStatusObj?.id as string));
  }, [listId, showNewTaskField, defaultSubtaskListId]);

  // init height
  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    if (tableElement && selectionArr) {
      const selectedTaskRow = tableElement.current?.querySelector(`tbody tr[data-select="${activeItemId}"]`);

      if (selectedTaskRow) {
        selectedTaskRow.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [keyBoardSelectedIndex, activeItemId]);

  const checkSelectedRow = (id: string) => {
    if (selectionArr && keyBoardSelectedIndex) {
      if (selectionArr[keyBoardSelectedIndex]) {
        return keyBoardSelectedIndex >= 0 ? id === selectionArr[keyBoardSelectedIndex].id : false;
      }
    }
  };

  const handleClose = () => {
    setShowNewTaskField(false);
    dispatch(setCurrTeamMemId(null));
  };

  const handleToggleNewTask = () => {
    setShowNewTaskField(true);
    dispatch(setNewTaskStatus(null));
  };

  const draggableItem = draggableItemId ? data.find((i) => i.id === draggableItemId) : null;

  const handleScrollLeft = (value: number) => {
    if (tableHeadElement.current && value >= 0) {
      tableHeadElement.current.scrollTo({ left: value });
    }
  };

  const generateHeaderColor = () => {
    if (sortType === sortTypesConsts.STATUS) {
      return data[0].status.color;
      // data?.[0].status?.color as string;
    } else if (sortType === sortTypesConsts.PRIORITY) {
      return generatePriority(label);
    } else {
      return '#919191';
    }
  };

  return (
    <>
      <div
        className="sticky top-0 z-10 pt-2 pl-2 mr-2 overflow-hidden table-container"
        style={{
          backgroundColor: LightenColor(!listColor?.outerColour ? 'black' : (listColor?.outerColour as string), 0.95)
        }}
        ref={tableHeadElement}
      >
        <table
          style={
            !collapseTasks
              ? {
                  display: 'grid',
                  gridTemplateColumns: generateGrid(columns.length)
                }
              : undefined
          }
          className="w-full"
        >
          <Head
            collapseTasks={collapseTasks}
            taskLength={taskLength}
            onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
            label={label}
            headerStatusColor={generateHeaderColor() ?? ''}
            columns={columns}
            listName={listName}
            tableHeight={tableHeight}
            listId={data[0].list_id}
            groupedTask={data}
            listColor={listColor}
          />
        </table>
      </div>
      <ScrollableHorizontalListsContainer ListColor={listColor} returnScrollLeft={handleScrollLeft}>
        {/* draggable item */}
        <DragOverlay dropAnimation={null}>
          {draggableItem ? <OverlayRow columns={columns} task={draggableItem} /> : null}
        </DragOverlay>
        <div className="table-container" id={label}>
          <table
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
            id="tasksTable"
            tabIndex={0}
          >
            {/* rows */}
            {!collapseTasks ? (
              <tbody className="contents">
                {dataSpread.length ? (
                  dataSpread.map((task, index) =>
                    'tags' in task ? (
                      <Row
                        key={task.id}
                        columns={columns}
                        selectedRow={checkSelectedRow(task.id) as boolean}
                        task={task as ITaskFullList}
                        listId={task.list_id as string}
                        taskIndex={index}
                        isListParent={true}
                        parentId={listId}
                        taskStatusId={statusId}
                        handleClose={handleClose}
                        level={0}
                        isBlockedShowChildren={isBlockedShowChildren}
                        selectionArr={selectionArr}
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
                <tr
                  onClick={() => handleToggleNewTask()}
                  className="absolute left-0 p-1.5 pl-16 text-left w-fit text-xs"
                >
                  <td className="font-semibold cursor-pointer alsoit-gray-300">+ New Task</td>
                </tr>
              </tbody>
            ) : null}
          </table>
        </div>
      </ScrollableHorizontalListsContainer>
    </>
  );
}
