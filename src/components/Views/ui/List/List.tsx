import { useMemo, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useList } from '../../../../features/list/listService';
import { Task } from '../../../../features/task/interface.tasks';
import { filterByAssignee, filterBySearchValue, sortTasks } from '../../../TasksHeader/lib';
import { generateColumns } from '../../lib/tableHeadUtils';
import { Table } from '../Table/Table';
import { Label } from './Label';
import { AddTask } from '../AddTask/AddTask';
import { getTaskColumns, setCurrTeamMemId } from '../../../../features/task/taskSlice';
import { columnsHead, listColumnProps } from '../../../../pages/workspace/tasks/component/views/ListColumns';

interface ListProps {
  tasks: Task[];
}

const unique = (arr: listColumnProps[]) => [...new Set(arr)];
export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

export function List({ tasks }: ListProps) {
  const [columns, setColumns] = useState<listColumnProps[] | undefined>(undefined);
  const { sortType } = useAppSelector((state) => state.task);
  const { data } = useList(tasks[0].list_id);
  const dispatch = useAppDispatch();

  const { taskColumns, hideTask } = useAppSelector((state) => state.task);

  useEffect(() => {
    if (!data) {
      return;
    }

    const customFieldNames = data.custom_fields.map((i) => ({
      value: i.name,
      id: i.id,
      field: i.type,
      hidden: false
    }));

    const newColumns = unique([...columnsHead, ...customFieldNames]);
    dispatch(getTaskColumns(newColumns));
    setColumns(newColumns);
  }, [data]);

  const [collapseTable, setCollapseTable] = useState(false);
  const [showNewTaskField, setShowNewTaskField] = useState(false);

  const listName = data?.name;

  const heads = useMemo(() => (data ? generateColumns(data.custom_fields) : null), [data]);

  const { filteredBySearch } = filterBySearchValue(tasks);

  const { filteredByAssignee } = filterByAssignee(filteredBySearch);

  const { sortedTasks } = sortTasks(sortType, filteredByAssignee);

  const handleClose = () => {
    setShowNewTaskField(false);
    dispatch(setCurrTeamMemId(null));
  };

  return (
    <div className="border-l-4 pt-1 border-t-4 border-purple-500 rounded-xl bg-purple-50">
      <Label listName={listName} showTable={collapseTable} onClickChevron={() => setCollapseTable((prev) => !prev)} />
      {!collapseTable && columns ? (
        <div className="relative ">
          {showNewTaskField ? (
            <div className="pl-2">
              <AddTask parentId={data?.id as string} isListParent onClose={() => handleClose()} />
            </div>
          ) : null}
          {!showNewTaskField ? (
            <div className="h-5">
              <button onClick={() => setShowNewTaskField(true)} className=" p-1.5 pl-6 text-left w-fit text-xs ">
                + New Task
              </button>
            </div>
          ) : null}
          {Object.keys(sortedTasks).map((key) => (
            <Table label={key} key={key} heads={hideTask.length ? hideTask : taskColumns} data={sortedTasks[key]} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
