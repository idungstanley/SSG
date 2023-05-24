import React, { useMemo, useState, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import ListNav from '../../../lists/components/renderlist/ListNav';
import ListFilter from '../../../lists/components/renderlist/listDetails/ListFilter';
import Page from '../../../../../components/Page';
import { UseGetFullTaskList } from '../../../../../features/task/taskService';
import TaskTemplateData from '../../../tasks/component/views/hubLevel/TaskTemplateData';
import hubIcon from '../../../../../assets/branding/hub.png';
import NoTaskFound from '../../../tasks/component/taskData/NoTaskFound';
import TaskTableTemplateData from '../../../tasks/component/views/hubLevel/TaskTableTemplateData';
import { ImyTaskData, ImyTaskData2 } from '../../../../../features/task/taskSlice';
import { ITaskFullList, TaskDataGroupingsProps } from '../../../../../features/task/interface.tasks';
import PilotSection, { pilotConfig } from '../PilotSection';
import TaskBoardTemplate from '../../../tasks/component/views/hubLevel/TaskBoardTemplate';
import GroupByStatusTemplate from '../../../lists/components/renderlist/listDetails/Groupings/components/GroupByStatus';
import { Spinner } from '../../../../../common';
import TaskCalenderTemplate from '../../../tasks/component/views/hubLevel/TaskCalenderTemplate';
import FilterByAssigneesSliderOver from '../../../lists/components/renderlist/filters/FilterByAssigneesSliderOver';
import { useParams } from 'react-router-dom';
import { setActiveEntityName, setActiveItem } from '../../../../../features/workspace/workspaceSlice';
import { UseGetHubDetails } from '../../../../../features/hubs/hubService';
import TaskMapTemplate from '../../../tasks/component/views/hubLevel/TaskMapTemplate';
import ActiveHub from '../../../../../layout/components/MainLayout/extendedNavigation/ActiveParents/ActiveHub';
import AdditionalHeader from '../../../../../layout/components/MainLayout/Header/AdditionHeader';
import { columnsHead, listColumnProps } from '../../../tasks/component/views/ListColumns';
import { useList } from '../../../../../features/list/listService';

function RenderHubs() {
  const [TaskDataGroupings, setTaskDataGroupings] = useState<TaskDataGroupingsProps | unknown>({});
  const { activeEntityName, activeEntity } = useAppSelector((state) => state.workspace);
  const { groupByStatus, filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const { listView, tableView, boardView, calenderView, mapView } = useAppSelector((state) => state.task);
  const { hubId } = useParams();
  const hubType = 'hub';
  const { data } = UseGetHubDetails({ activeItemId: hubId, activeItemType: hubType });
  const hubName = data?.data.hub.name;
  useEffect(() => {
    if (hubId) {
      dispatch(
        setActiveItem({ activeItemId: hubId, activeItemType: activeEntity.type || 'hub', activeItemName: hubName })
      );
      dispatch(setActiveEntityName(hubName));
    }
  }, [hubId, data]);

  const {
    data: TaskFullList,
    status,
    isFetching,
    hasNextPage,
    fetchNextPage
  } = UseGetFullTaskList({
    itemId: hubId,
    itemType: hubType,
    assigneeUserId: filterTaskByAssigneeIds
  });
  const unFilteredTaskData = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  const unFilteredTaskData2 = useMemo(() => TaskFullList?.pages.flatMap((page) => page.data.tasks), [TaskFullList]);

  if (isFetching) {
    <Spinner size={8} color="blue" />;
  }
  if (status == 'loading') {
    <Spinner size={8} color="blue" />;
  }
  useEffect(() => {
    if (status !== 'success') {
      return setTaskDataGroupings({});
    }

    const taskDataGroupedByListID = unFilteredTaskData?.reduce(
      (
        GroupedTaskByListID: { [key: string]: { groupListName?: string; key?: string; tasks: ITaskFullList[] } },
        currentTask
      ) => {
        if (!GroupedTaskByListID[currentTask.list_id]) {
          GroupedTaskByListID[currentTask.list_id] = {
            groupListName: currentTask.list?.name,
            key: currentTask.list_id,
            tasks: []
          };
        }
        GroupedTaskByListID[currentTask.list_id].tasks.push(currentTask);
        return GroupedTaskByListID;
      },
      {}
    );
    setTaskDataGroupings(taskDataGroupedByListID as TaskDataGroupingsProps | unknown);

    return () => {
      true;
    };
  }, [unFilteredTaskData, status, filterTaskByAssigneeIds]);

  useEffect(() => {
    const container = containerRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [containerRef, fetchNextPage, hasNextPage]);

  function handleScroll(event: UIEvent | Event) {
    const container = event.target as HTMLElement;
    const scrollDifference = container?.scrollHeight - container.scrollTop - container.clientHeight;
    const range = 1;

    if (scrollDifference <= range && scrollDifference >= -range && hasNextPage) {
      fetchNextPage();
    }
  }

  const extendedObj = {
    name: 'TASKS',
    children: <ActiveHub />,
    source: hubIcon
  };

  return (
    <>
      <PilotSection />
      <Page
        pilotConfig={pilotConfig}
        additionalHeader={<AdditionalHeader />}
        header={
          <section id="nav" className="capitalize" style={{ height: '50px' }}>
            <ListNav
              navName={activeEntityName}
              viewsList="List"
              viewsList1="Table"
              viewsList2="Board"
              viewsList3="Calender"
              viewsList4="Map"
              changeViews="View"
            />
          </section>
        }
        extendedBar={extendedObj}
        additional={<FilterByAssigneesSliderOver data={unFilteredTaskData as ITaskFullList[]} />}
      >
        {unFilteredTaskData ? <List listId={unFilteredTaskData[0].list_id} /> : null}
        {/* <section>
          <div className="w-full ">
            <ListFilter />
          </div>
          {listView && groupByStatus == 'none' && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full mb-10" style={{ minHeight: '0', maxHeight: '90vh' }} ref={containerRef}>
                {Object.keys(
                  TaskDataGroupings as {
                    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData2[] };
                  }
                ).length === 0 ? (
                  <NoTaskFound />
                ) : (
                  <TaskTemplateData
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {listView && groupByStatus == 'status' && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div
                className="w-full mb-12 overflow-auto"
                style={{ minHeight: '0', maxHeight: '90vh' }}
                ref={containerRef}
              >
                {Object.keys(
                  TaskDataGroupings as {
                    [key: string]: { groupListName: string; key: string; tasks: ImyTaskData2[] };
                  }
                ).length === 0 ? (
                  <NoTaskFound />
                ) : (
                  <GroupByStatusTemplate
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {tableView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                {tableView && (
                  <TaskTableTemplateData
                    filteredTaskData={
                      TaskDataGroupings as {
                        [key: string]: {
                          [key: string]: string | ImyTaskData[];
                          tasks: ImyTaskData[];
                          key: string;
                          groupListName: string;
                        };
                      }
                    }
                  />
                )}
              </div>
            </div>
          )}
          {boardView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full overflow-auto" style={{ minHeight: '0', maxHeight: '90vh' }}>
                {boardView && <TaskBoardTemplate unFilteredTaskData={unFilteredTaskData2 as ITaskFullList[]} />}
              </div>
            </div>
          )}

          {calenderView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
                <TaskCalenderTemplate />
              </div>
            </div>
          )}

          {mapView && (
            <div className="pr-1 pt-0.5 w-full h-full">
              <div className="w-full" style={{ minHeight: '0', maxHeight: '90vh' }}>
                <TaskMapTemplate />
              </div>
            </div>
          )}
        </section> */}
      </Page>
    </>
  );
}

const tasks = [
  {
    id: 1,
    name: 11
  },
  {
    id: 2,
    name: 22
  },
  {
    id: 3,
    name: 33
  },
  {
    id: 4,
    name: 44
  },
  {
    id: 5,
    name: 55
  },
  {
    id: 6,
    name: 66
  },
  {
    id: 7,
    name: 77
  }
];

interface ListProps {
  listId: string;
}

function List({ listId }: ListProps) {
  const { data } = useList(listId);

  const columns = () => {
    if (!data) {
      return [];
    }
    const unique = (arr: listColumnProps[]) => [...new Set(arr)];
    const customFieldNames = data.custom_fields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));
    const newColumns = unique([...columnsHead, ...customFieldNames]);

    return newColumns;
  };

  return (
    <div className="rounded-lg bg-purple-50 border-l-4 border-purple-500">
      <div>
        <h1 className="rounded-br-md p-2 px-4 text-white text-sm bg-purple-500 w-fit">List 1</h1>
      </div>
      {data ? <Table headers={columns()} tableContent={tasks} minCellWidth={100} /> : null}
    </div>
  );
}

interface Column {
  text: string;
  ref: React.RefObject<HTMLTableCellElement>;
}

const createHeaders = (headers: listColumnProps[]): Column[] => {
  return headers.map((item) => ({
    text: item.value,
    ref: useRef<HTMLTableCellElement>(null)
  }));
};

const MAX = 400;

function Table({
  headers,
  minCellWidth,
  tableContent
}: {
  headers: listColumnProps[];
  minCellWidth: number;
  tableContent: {
    id: number;
    name: number;
  }[];
}) {
  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const tableElement = useRef<HTMLTableElement>(null);
  const columns = createHeaders(headers);

  const mouseMove = useCallback(
    (e: MouseEvent) => {
      const gridColumns = columns.map((col, i) => {
        if (i === activeIndex) {
          if (col.ref.current) {
            const mouseX = e.clientX;
            const widthFromLeftToCurrentBlock = Math.round(col.ref.current.getBoundingClientRect().right);
            const currentBlockWidth = col.ref.current.offsetWidth;

            const width =
              widthFromLeftToCurrentBlock -
              (widthFromLeftToCurrentBlock - currentBlockWidth) -
              (widthFromLeftToCurrentBlock - mouseX);

            if (width >= minCellWidth && width <= MAX) {
              return `${width}px`;
            }
          }
        }

        // Otherwise return the previous width (no changes)
        return col.ref.current ? `${col.ref.current.offsetWidth}px` : null;
      });

      // Assign the px values to the table
      if (tableElement.current) tableElement.current.style.gridTemplateColumns = `${gridColumns.join(' ')}`;
    },
    [activeIndex, columns, minCellWidth]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    document.body.style.userSelect = '';
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  const mouseDown = (index: number) => {
    document.body.style.userSelect = 'none';
    setActiveIndex(index);
  };

  return (
    <div className="relative overflow-hidden pl-6">
      <table
        style={{
          display: 'grid',
          gridTemplateColumns: `minmax(400px, 1fr) ${columns
            .slice(1)
            .map(() => 'minmax(150px, 1fr)')
            .join(' ')}`
        }}
        className="w-full overflow-x-scroll overflow-y-hidden"
        ref={tableElement}
      >
        <Head columns={columns} mouseDown={mouseDown} activeIndex={activeIndex} tableHeight={tableHeight} />

        <tbody className="contents">
          {tableContent.map((i) => (
            <Row task={i} key={i.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Row({
  task
}: {
  task: {
    id: number;
    name: number;
  };
}) {
  return (
    <>
      <tr className="contents group">
        <td className="sticky flex -left-1 z-1 text-center justify-center text-sm font-medium text-gray-900">
          <div className="bg-purple-50 flex items-center">
            <span className="p-1 group-hover:opacity-100 opacity-0">=</span>
          </div>
          <div className="bg-white border-t border-gray-200 opacity-90 w-full h-full py-4 p-4">{task.name}</div>
        </td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
        <td className="flex border-t justify-center text-sm font-medium text-gray-900 p-4">{task.name}</td>
      </tr>
    </>
  );
}

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  activeIndex: number | null;
  mouseDown: (i: number) => void;
}

function Head({ columns, tableHeight, activeIndex, mouseDown }: HeadProps) {
  return (
    <thead className="contents">
      <tr className="contents">
        <th className="sticky flex -left-1 z-10 font-extrabold" ref={columns[0].ref} key={columns[0].text}>
          <div className="bg-purple-50 flex items-center">
            <span className="p-1 group-hover:opacity-100 opacity-0">=</span>
          </div>
          <span className="flex border-t border-gray-200 bg-white opacity-90 w-full h-full mx-auto justify-center truncate p-4">
            {columns[0].text}
          </span>

          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className={`block hover:border-red-500 absolute cursor-move w-2 -right-1 top-0 z-1 ${
              activeIndex === 0 ? 'border-blue-500' : 'idle'
            }`}
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
        </th>

        {columns.slice(1).map(({ ref, text }, i) => (
          <th className="relative font-extrabold p-4 bg-white/90" ref={ref} key={text}>
            <span className="flex justify-center truncate">{text}</span>
            <div
              style={{ height: tableHeight }}
              onMouseDown={() => mouseDown(i + 1)}
              className={`block hover:border-red-500 absolute cursor-move w-2 -right-1 top-0 z-1 ${
                activeIndex === i + 1 ? 'border-blue-500' : 'idle'
              }`}
            >
              <div className="w-0.5 mx-auto h-full bg-gray-100" />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default RenderHubs;
