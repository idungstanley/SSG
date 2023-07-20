import { useCallback, useEffect, useRef, useState } from 'react';
import { DragOverlay } from '@dnd-kit/core';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { setCurrTaskListId, setCurrTeamMemId, setStatusId, setUpdateCords } from '../../../../features/task/taskSlice';
import { useScroll } from '../../../../hooks/useScroll';
import { listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { MAX_COL_WIDTH, MIN_COL_WIDTH } from '../../config';
import { generateGrid } from '../../lib';
import { createHeaders } from '../../lib/tableHeadUtils';
import { ScrollableContainer } from '../../../ScrollableContainer/ScrollableContainer';
import { Head } from './Head/Head';
import { OverlayRow } from './OverlayRow';
import { Row } from './Row';
import { UseGetListDetails } from '../../../../features/list/listService';
import { ITask_statuses } from '../../../../features/list/list.interfaces';

interface TableProps {
  heads: listColumnProps[];
  data: Task[];
  label: string;
}

export function Table({ heads, data, label }: TableProps) {
  const dispatch = useAppDispatch();
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const tableElement = useRef<HTMLTableElement>(null);
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [collapseTasks, setCollapseTasks] = useState(false);
  const taskLength = data.length;

  const columns = createHeaders(heads).filter((i) => !i.hidden);

  // const columns = createHeaders(heads).filter((i) => !i.hidden);

  const { draggableItemId } = useAppSelector((state) => state.list);
  const [listId, setListId] = useState<string>('');
  const { statusId } = useAppSelector((state) => state.task);

  const { data: list } = UseGetListDetails({ activeItemId: listId, activeItemType: 'list' });

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex && col.ref.current) {
          const mouseX = e.clientX;
          const widthFromLeftToCurrentBlock = Math.round(col.ref.current.getBoundingClientRect().right);
          const currentBlockWidth = col.ref.current.offsetWidth;

          const width =
            widthFromLeftToCurrentBlock -
            (widthFromLeftToCurrentBlock - currentBlockWidth) -
            (widthFromLeftToCurrentBlock - mouseX);

          if (width >= MIN_COL_WIDTH && width <= MAX_COL_WIDTH) {
            return `${width}px`;
          }
        }

        // Otherwise return the previous width (no changes)
        return col.ref.current ? `${col.ref.current.offsetWidth}px` : null;
      });

      // Assign the px values to the table
      if (tableElement.current) {
        tableElement.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
      }
    },
    [activeIndex, columns]
  );

  // New task template
  const newTaskObj = [
    ...data,
    {
      archived_at: null,
      assignees: [],
      checklists: [],
      created_at: Date.now(),
      custom_fields: [],
      deleted_at: null,
      description: null,
      directory_items: [],
      end_date: null,
      group_assignees: [],
      id: '0',
      list_id: null,
      main_list_id: '',
      name: 'Add Task',
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
    const statusObj: ITask_statuses | undefined = list?.data.list.task_statuses.find(
      (statusObj: ITask_statuses) => statusObj?.name === dataSpread[0].status.name
    );

    if (statusObj) {
      const newStatusId: string = statusObj.id;
      dispatch(setStatusId(newStatusId));
    }
  }, [listId, showNewTaskField]);

  const removeListeners = () => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  };

  // reset
  const onMouseUp = () => {
    document.body.style.userSelect = '';
    setActiveIndex(null);
    removeListeners();
    dispatch(setUpdateCords());
  };

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex]);

  // init height
  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  const onMouseDown = (index: number) => {
    document.body.style.userSelect = 'none';
    setActiveIndex(index);
  };
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
    <ScrollableContainer scrollDirection="x" onScroll={onScroll}>
      {/* draggable item */}
      {draggableItem ? (
        <DragOverlay>
          <OverlayRow columns={columns} task={draggableItem} />
        </DragOverlay>
      ) : null}

      <div className="table-container" id={label}>
        <table
          onScroll={onScroll}
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
            mouseDown={onMouseDown}
            tableHeight={tableHeight}
            listId={data[0].list_id}
          />

          {/* rows */}
          {!collapseTasks ? (
            <tbody className="contents">
              {dataSpread.length ? (
                dataSpread.map((i) =>
                  'tags' in i ? (
                    <Row
                      columns={columns}
                      task={i as ITaskFullList}
                      key={i.id}
                      isListParent={true}
                      parentId={listId}
                      task_status={statusId}
                      handleClose={handleClose}
                    />
                  ) : null
                )
              ) : (
                <h1 className="p-5 text-center">No tasks</h1>
              )}
            </tbody>
          ) : null}

          {/* add subtask button */}
          {!showNewTaskField ? (
            <tbody className="h-5">
              <tr onClick={() => handleToggleNewTask()} className="absolute left-0 p-1.5 pl-16 text-left w-fit text-xs">
                <td>+ New Task</td>
              </tr>
            </tbody>
          ) : null}
        </table>
      </div>
    </ScrollableContainer>
  );
}
