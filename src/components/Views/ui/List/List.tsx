import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';
import { setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { columnsHead, listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { useParams } from 'react-router-dom';
import { cl } from '../../../../utils';
import { useDroppable } from '@dnd-kit/core';
import { IField } from '../../../../features/list/list.interfaces';
import { Hub, List as ListType } from '../../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { findCurrentHub } from '../../../../managers/Hub';
import { findCurrentList } from '../../../../managers/List';
import LightenColor from './lightenColor/LightenColor';

interface ListProps {
  tasks: Task[];
  customProperty?: IField[];
}

export interface IListColor {
  outerColour: string;
}

const unique = (arr: listColumnProps[]) => [...new Set(arr)];

export function List({ tasks }: ListProps) {
  const dispatch = useAppDispatch();
  const { listId } = useParams();

  const { sortType, hideTask } = useAppSelector((state) => state.task);
  const { parentHubExt, hub } = useAppSelector((state) => state.hub);

  const [collapseTable, setCollapseTable] = useState(false);
  const [showNewTaskField, setShowNewTaskField] = useState(false);
  const [parentHub, setParentHub] = useState<Hub>();
  const [currentList, setCurrentList] = useState<ListType>();

  useEffect(() => {
    if (parentHubExt.id) {
      setParentHub(findCurrentHub(parentHubExt.id, hub));
    }
  }, [parentHubExt]);

  useEffect(() => {
    if (listId) {
      setCurrentList(findCurrentList(listId, hub));
    }
  }, [listId]);

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

  const { filteredBySearch } = filterBySearchValue(tasks);
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
        listName={tasks[0].list?.name || currentList?.name}
        hubName={parentHub?.name}
        tasks={tasks}
        ListColor={ListColor}
        showTable={collapseTable}
        onClickChevron={() => setCollapseTable((prev) => !prev)}
      />
      {!collapseTable ? (
        <div className="relative">
          {showNewTaskField ? (
            <div className="pl-2">
              <AddTask parentId={tasks[0].list?.id as string} isListParent onClose={() => handleClose()} />
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
            <Table
              listName={tasks[0].list?.name}
              label={key}
              ListColor={ListColor}
              key={key}
              heads={hideTask.length ? hideTask : generateColumns}
              data={sortedTasks[key]}
              customFields={tasks[0].custom_field_columns as IField[]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
