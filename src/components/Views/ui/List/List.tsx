import { useState, useEffect, useMemo, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';
import {
  getTaskColumns,
  setCurrTeamMemId,
  setEscapeKey,
  setKeyBoardSelectedTaskData
} from '../../../../features/task/taskSlice';
import { ExtendedListColumnProps, columnsHead } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { cl } from '../../../../utils';
import { IField, IListDetailRes } from '../../../../features/list/list.interfaces';
import { Hub } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentHub } from '../../../../managers/Hub';
import LightenColor from './lightenColor/LightenColor';
import { useParams } from 'react-router-dom';
import { SubtasksTable } from '../Table/SubtasksTable';

interface ListProps {
  tasks: Task[];
  subtasksCustomeFields?: IField[];
  customProperty?: IField[];
  listDetails?: IListDetailRes;
  combinedTasksArr?: ITaskFullList[];
}

export interface IListColor {
  outerColour: string | null;
}

const unique = (arr: ExtendedListColumnProps[]) => [...new Set(arr)];

export function List({ tasks, combinedTasksArr }: ListProps) {
  const dispatch = useAppDispatch();

  const {
    sortType,
    hideTask,
    splitSubTaskState: splitSubTaskMode,
    subtasks,
    tasks: storeTasks,
    escapeKey,
    separateSubtasksMode,
    keyBoardSelectedIndex
  } = useAppSelector((state) => state.task);
  const { parentHubExt, hub } = useAppSelector((state) => state.hub);

  const [collapseTable, setCollapseTable] = useState(false);

  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [parentHub, setParentHub] = useState<Hub>();
  const [fullTasksLists, setFullTasksLists] = useState<ITaskFullList[]>([]);

  const { listId } = useParams();

  // reset showNewTaskField with eskLey
  useEffect(() => {
    if (escapeKey) {
      setShowNewTaskField(false);
    }
    dispatch(setEscapeKey(false));
  }, [escapeKey, showNewTaskField]);

  useEffect(() => {
    if (combinedTasksArr) dispatch(setKeyBoardSelectedTaskData(combinedTasksArr[keyBoardSelectedIndex]));
  }, [keyBoardSelectedIndex]);

  useEffect(() => {
    if (parentHubExt.id) {
      setParentHub(findCurrentHub(parentHubExt.id, hub));
    }
  }, [parentHubExt]);

  const ListColor: IListColor = tasks[0]?.list?.color
    ? JSON.parse(tasks[0].list?.color as string)
    : {
        outerColour: '#A854F7'
      };

  const generateColumns = useMemo(() => {
    const customFieldNames =
      tasks[0]?.custom_field_columns.map((i) => ({
        ...i,
        value: i.name,
        hidden: false,
        field: i.type
      })) ?? [];
    const uniqueColumns = unique([...columnsHead, ...customFieldNames] as ExtendedListColumnProps[]);
    dispatch(getTaskColumns(uniqueColumns));
    return uniqueColumns;
  }, [tasks]);

  const createFullTasksList = () => {
    const newFullTasksList: ITaskFullList[] = [];
    const allTasks = [
      ...Object.keys(storeTasks).map((key) => {
        return storeTasks[key];
      })
    ];
    allTasks.forEach((items) => {
      items.forEach((item) => {
        if (item.list_id === tasks[0].list_id) {
          newFullTasksList.push(item);
        }
      });
    });
    const allSubtasks = [
      ...Object.keys(subtasks).map((key) => {
        return subtasks[key];
      })
    ];
    allSubtasks.forEach((items) => {
      if (items[0].list_id === tasks[0].list_id) {
        newFullTasksList.push(...items);
      }
    });
    return newFullTasksList;
  };

  useEffect(() => {
    setFullTasksLists(separateSubtasksMode ? createFullTasksList() : (tasks as ITaskFullList[]));
  }, [storeTasks, subtasks, separateSubtasksMode]);

  const { filteredBySearch } = filterBySearchValue(fullTasksLists);
  const { filteredByAssignee } = filterByAssignee(filteredBySearch);
  const { sortedTasks } = sortTasks(sortType, filteredByAssignee);
  const handleClose = () => {
    setShowNewTaskField(false);
    dispatch(setCurrTeamMemId(null));
  };

  return (
    <div
      className={`pt-1 ${!collapseTable && 'rounded-lg pb-3'}`}
      style={{
        borderLeftWidth: '3px',
        borderTopWidth: '3px',
        borderTopLeftRadius: '4px',
        borderColor: !ListColor?.outerColour ? 'black' : (ListColor?.outerColour as string),
        backgroundColor: LightenColor(!ListColor?.outerColour ? 'black' : (ListColor?.outerColour as string), 0.95)
      }}
    >
      <Label
        listName={tasks[0]?.list?.name}
        hubName={splitSubTaskMode ? `${parentHub?.name as string} > ${tasks[0].list?.name}` : parentHub?.name}
        tasks={tasks}
        ListColor={ListColor}
        showTable={collapseTable}
        onClickChevron={() => setCollapseTable((prev) => !prev)}
      />
      {!collapseTable ? (
        <div className="relative" style={{ paddingRight: '30px' }}>
          {showNewTaskField ? (
            <div className="pl-2">
              <AddTask
                parentId={tasks[0]?.list_id || (listId as string)}
                isListParent={true}
                task={tasks?.[0]}
                onClose={() => handleClose()}
              />
            </div>
          ) : null}
          {!showNewTaskField ? (
            <div className="h-5 font-semibold mt-2 text-alsoit-gray-200 z-50">
              <button onClick={() => setShowNewTaskField(true)} className={cl('p-1.5 pl-14 text-left w-fit text-xs')}>
                + NEW TASK
              </button>
            </div>
          ) : null}
          {Object.keys(sortedTasks).map((key) => (
            <Fragment key={key}>
              {!splitSubTaskMode ? (
                <Table
                  listName={tasks[0]?.list?.name}
                  label={key}
                  listColor={ListColor}
                  heads={hideTask.length ? hideTask : generateColumns}
                  data={sortedTasks[key]}
                  selectionArr={combinedTasksArr}
                />
              ) : (
                <>
                  {sortedTasks[key].map((task) => (
                    <Fragment key={task.id}>
                      <Table
                        listName={task.list?.name}
                        label={key}
                        listColor={ListColor}
                        heads={hideTask.length ? hideTask : generateColumns}
                        data={[task]}
                        isBlockedShowChildren={true}
                      />
                      <SubtasksTable
                        task={task}
                        subtasksData={subtasks[task.id]}
                        listId={task.list_id}
                        heads={hideTask.length ? hideTask : generateColumns}
                        level={1}
                        breadcrumbs={`${parentHub?.name as string} > ${task.list?.name}`}
                      />
                    </Fragment>
                  ))}
                </>
              )}
            </Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}
