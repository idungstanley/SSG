import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useList } from '../../../../features/list/listService';
import { Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';
import { getTaskColumns, setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { columnsHead, listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';
import { useParams } from 'react-router-dom';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';
import { cl } from '../../../../utils';
import { useDroppable } from '@dnd-kit/core';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { IField } from '../../../../features/list/list.interfaces';

interface ListProps {
  tasks: Task[];
  customProperty?: IField[];
}

const unique = (arr: listColumnProps[]) => [...new Set(arr)];
export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

export function List({ tasks, customProperty }: ListProps) {
  const dispatch = useAppDispatch();
  const { hubId } = useParams();

  const { sortType } = useAppSelector((state) => state.task);
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  const [columns, setColumns] = useState<listColumnProps[] | undefined>(undefined);

  const { data } = useList(tasks[0].list_id);

  const { data: hub } = UseGetHubDetails({
    activeItemId: hubId,
    activeItemType: EntityType.hub
  });

  const custom_fields = customProperty;

  useEffect(() => {
    if (!custom_fields) {
      return;
    }
    const customFieldNames = custom_fields?.map((i) => ({
      value: i.name,
      id: i.id,
      field: i.type,
      hidden: false
    }));

    const newColumns = unique([...columnsHead, ...customFieldNames]);

    dispatch(getTaskColumns(newColumns));
    setColumns(newColumns);
  }, [custom_fields]);

  const [collapseTable, setCollapseTable] = useState(false);
  const [showNewTaskField, setShowNewTaskField] = useState(false);

  const listName = data?.name;

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
    <div className="pt-1 border-t-4 border-l-4 border-purple-500 rounded-xl bg-purple-50" ref={setNodeRef}>
      <Label
        listName={listName}
        hubName={hub?.data.hub?.name}
        tasks={tasks}
        showTable={collapseTable}
        onClickChevron={() => setCollapseTable((prev) => !prev)}
      />
      {!collapseTable && columns ? (
        <div className="relative">
          {showNewTaskField ? (
            <div className="pl-2">
              <AddTask parentId={data?.id as string} isListParent onClose={() => handleClose()} />
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
              listName={listName}
              label={key}
              key={key}
              heads={hideTask.length ? hideTask : taskColumns}
              data={sortedTasks[key]}
              customFields={custom_fields as IField[]}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
