import { useState, useEffect, useMemo, Fragment } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { ITaskFullList, Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';
import { setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { columnsHead, listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { cl } from '../../../../utils';
import { useDroppable } from '@dnd-kit/core';
import { IField, IListDetailRes } from '../../../../features/list/list.interfaces';
import { Hub } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentHub } from '../../../../managers/Hub';
import LightenColor from './lightenColor/LightenColor';
import { SubtasksTable } from '../Table/SubtasksTable';
import { UseGetListDetails } from '../../../../features/list/listService';

interface ListProps {
  tasks: Task[];
  subtasksCustomeFields?: IField[];
  customProperty?: IField[];
  listDetails?: IListDetailRes;
  listId?: string;
}

export interface IListColor {
  outerColour: string;
}

const unique = (arr: listColumnProps[]) => [...new Set(arr)];

export function List({ tasks, subtasksCustomeFields, listDetails, listId }: ListProps) {
  const dispatch = useAppDispatch();

  const {
    sortType,
    hideTask,
    splitSubTaskState: splitSubTaskMode,
    subtasks,
    tasks: storeTasks,
    separateSubtasksMode
  } = useAppSelector((state) => state.task);
  const { parentHubExt, hub } = useAppSelector((state) => state.hub);

  const [collapseTable, setCollapseTable] = useState(false);
  const [listDetailsFromRes, setListDetailsFromRes] = useState<IListDetailRes>();

  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [parentHub, setParentHub] = useState<Hub>();
  const [fullTasksLists, setFullTasksLists] = useState<ITaskFullList[]>([]);

  const { data: listDet } = UseGetListDetails(listId);

  useEffect(() => {
    if (parentHubExt.id) {
      setParentHub(findCurrentHub(parentHubExt.id, hub));
    }
  }, [parentHubExt]);

  useEffect(() => {
    if (listDet) {
      setListDetailsFromRes(listDet);
    }
  }, [listDet]);

  const ListColor: IListColor = tasks[0].list?.color
    ? JSON.parse(tasks[0].list?.color as string)
    : {
        outerColour: '#A854F7'
      };

  const generateColumns = useMemo(() => {
    const customFieldNames = tasks[0].custom_field_columns.map((i) => ({
      value: i.name,
      id: i.id,
      field: i.type,
      hidden: false,
      color: i.color
    }));
    return unique([...columnsHead, ...customFieldNames]);
  }, [tasks]);

  const generateSubtasksColumns = useMemo(() => {
    let customFieldNames: listColumnProps[] = [];
    if (subtasksCustomeFields?.length) {
      customFieldNames = subtasksCustomeFields.map((i) => ({
        value: i.name,
        id: i.id,
        field: i.type,
        hidden: false,
        color: i.color
      }));
    }
    return unique([...columnsHead, ...customFieldNames]);
  }, [subtasksCustomeFields]);

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

  const { setNodeRef } = useDroppable({
    id: tasks[0].list_id,
    data: {
      isOverList: true
    }
  });

  const detailsFromList = listDetails ? listDetails : listDetailsFromRes;

  return (
    <div
      className="pt-1 border-t-4 border-l-4 border-purple-500 rounded-3xl bg-purple-50"
      ref={setNodeRef}
      style={{
        borderColor: ListColor?.outerColour,
        backgroundColor: LightenColor(ListColor?.outerColour, 0.95),
        overflow: collapseTable ? 'hidden' : 'unset'
      }}
    >
      <Label
        listName={tasks[0].list?.name || detailsFromList?.data.list.name}
        hubName={parentHub?.name}
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
                parentId={tasks[0].list_id as string}
                isListParent={true}
                task={tasks[0]}
                onClose={() => handleClose()}
              />
            </div>
          ) : null}
          {!showNewTaskField ? (
            <div className="h-5 font-semibold alsoit-gray-300">
              <button onClick={() => setShowNewTaskField(true)} className={cl('p-1.5 pl-14 text-left w-fit text-xs')}>
                + NEW TASK
              </button>
            </div>
          ) : null}
          {Object.keys(sortedTasks).map((key) => (
            <Fragment key={key}>
              {!splitSubTaskMode ? (
                <Table
                  listName={tasks[0].list?.name}
                  label={key}
                  listColor={ListColor}
                  heads={hideTask.length ? hideTask : generateColumns}
                  data={sortedTasks[key]}
                  customFields={tasks[0].custom_field_columns as IField[]}
                  listDetails={detailsFromList}
                />
              ) : (
                <>
                  {sortedTasks[key].map((task) => (
                    <Fragment key={task.id}>
                      <Table
                        listName={tasks[0].list?.name}
                        label={key}
                        listColor={ListColor}
                        heads={hideTask.length ? hideTask : generateColumns}
                        data={[task]}
                        customFields={tasks[0].custom_field_columns as IField[]}
                        listDetails={detailsFromList}
                        isBlockToOpenSubtasks={true}
                      />
                      <SubtasksTable
                        data={task}
                        listId={task.list_id}
                        heads={hideTask.length ? hideTask : generateSubtasksColumns}
                        customFields={subtasksCustomeFields as IField[]}
                        level={1}
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
