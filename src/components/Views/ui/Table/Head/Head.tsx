import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import RoundedArrowUpDown from '../../../../../pages/workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import SortDirectionCheck from '../../../../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { parseLabel } from '../../../../TasksHeader/lib';
import { Column } from '../../../types/table';
import { Chevron } from '../../Chevron';
import { setActiveTaskColumn, setSortArr, setSortArray } from '../../../../../features/task/taskSlice';
import SortModal from '../../../../SortModal/SortModal';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  mouseDown: (i: number) => void;
  label: string;
  collapseTasks: boolean;
  taskLength: number;
  onToggleCollapseTasks: VoidFunction;
}

export type SortOption = {
  dir: 'asc' | 'desc';
  field: string;
};

export function Head({
  columns,
  tableHeight,
  taskLength,
  collapseTasks,
  onToggleCollapseTasks,
  mouseDown,
  label
}: HeadProps) {
  const parsedLabel = parseLabel(label);
  const dispatch = useAppDispatch();
  const sortAbles: string[] = ['Task', 'Start Date', 'End Date', 'Priority', 'Assignees'];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [headerId, setheaderId] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const { sortArr, sortAbleArr } = useAppSelector((state) => state.task);
  const { baseColor } = useAppSelector((state) => state.account);
  const headerTxt = (title: string) =>
    title === 'Assignees' ? 'assignee' : title === 'Task' ? 'name' : title?.toLowerCase();

  const handleSort = (header: string, id: string | undefined, order: 'asc' | 'desc') => {
    setheaderId(id as string);
    if (sortArr.includes(headerTxt(header))) return setShowSortModal(!showSortModal);
    dispatch(setSortArr([...sortArr, header as string]));
    dispatch(setSortArray([...sortAbleArr, { dir: order, field: headerTxt(header) }]));
  };

  const handleRemoveFilter = (title?: string): void => {
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== headerTxt(title as string))));
  };

  const setOptions = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, id: string, header: string) => {
    dispatch(setActiveTaskColumn({ id: id, header: header }));
    setheaderId(id);
    setShowSortModal(!showSortModal);
    setAnchorEl(event.currentTarget);
  };

  const dirCheck = (col: string): SortOption | undefined => {
    return sortAbleArr.find((el) => el.field === headerTxt(col));
  };

  return (
    <thead className="contents">
      <tr className="contents">
        {/* first sticky col */}
        <th style={{ zIndex: 2 }} className="sticky left-0 flex -mb-2 font-extrabold" ref={columns[0].ref}>
          <div className="flex items-center bg-purple-50 " style={{ width: '22px' }}></div>
          <div className="flex dBlock items-center w-full gap-3 py-2 truncate group opacity-90">
            <span
              className={`py-0.5 px-2 rounded-tr-md flex items-center space-x-1 text-white ${
                parsedLabel == 'todo'
                  ? 'bg-gray-400'
                  : parsedLabel == 'in progress'
                  ? 'bg-purple-500'
                  : parsedLabel == 'completed'
                  ? 'bg-green-500'
                  : parsedLabel == 'archived'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400'
              }`}
            >
              <Chevron color="text-white" active={collapseTasks} onToggle={onToggleCollapseTasks} />

              <span>{parsedLabel}</span>
            </span>
            <span onClick={(e) => setOptions(e, columns[0].id, columns[0].value)} className="cursor-pointer">
              <span className="mr-0.5">{taskLength}</span>
              {!collapseTasks ? columns[0].value : null}
            </span>

            {sortAbles.includes(columns[0].value) && (
              <>
                {sortArr.length >= 1 && sortArr.includes(columns[0].value) ? (
                  ''
                ) : (
                  <RoundedArrowUpDown value={columns[0].value} id={columns[0].id} handleSort={handleSort} />
                )}
                {sortArr.includes(columns[0].value) && sortAbles.includes(columns[0].value) && (
                  <SortDirectionCheck
                    bgColor={baseColor}
                    sortItemLength={sortArr.length}
                    sortIndex={sortArr.indexOf(columns[0].value)}
                    sortValue={columns[0].value}
                    sortDesc={dirCheck(columns[0].value)?.dir === 'desc'}
                    handleRemoveSortFn={handleRemoveFilter}
                  />
                )}
              </>
            )}
          </div>
          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className="absolute top-0 block w-2 cursor-move -right-1 idle"
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
          {showSortModal && headerId === columns[0].id && (
            <SortModal
              handleClose={handleClose}
              anchorEl={anchorEl}
              toggleModal={setShowSortModal}
              handleSortFn={handleSort}
              setAnchorEl={setAnchorEl}
            />
          )}
        </th>
        {!collapseTasks
          ? columns.slice(1).map(({ ref, value, id }, index) => (
              <th key={id} className="relative p-2 -mb-1 font-extrabold opacity-90" ref={ref}>
                <div
                  className="flex dBlock items-center justify-center w-full h-full my-auto truncate cursor-pointer group"
                  onClick={(e) => setOptions(e, id, value)}
                >
                  {value}
                  {sortAbles.includes(value) && (
                    <span className="ml-0.5">
                      {sortArr.length >= 1 && sortArr.includes(value) ? (
                        ''
                      ) : (
                        <RoundedArrowUpDown value={value} id={id} handleSort={handleSort} />
                      )}
                      {sortArr.includes(value) && sortAbles.includes(value) && (
                        <SortDirectionCheck
                          bgColor={baseColor}
                          sortItemLength={sortArr.length}
                          sortIndex={sortArr.indexOf(value)}
                          sortValue={value}
                          sortDesc={dirCheck(value)?.dir === 'desc'}
                          handleRemoveSortFn={handleRemoveFilter}
                        />
                      )}
                    </span>
                  )}
                </div>

                <div
                  className="absolute top-0 block w-2 cursor-move -right-1 idle"
                  style={{ height: tableHeight }}
                  onMouseDown={() => mouseDown(index + 1)}
                >
                  <div className="w-0.5 mx-auto h-full bg-gray-100" />
                </div>
                {showSortModal && headerId === id && sortAbles.includes(value) && (
                  <SortModal
                    handleClose={handleClose}
                    anchorEl={anchorEl}
                    toggleModal={setShowSortModal}
                    handleSortFn={handleSort}
                    setAnchorEl={setAnchorEl}
                  />
                )}
              </th>
            ))
          : null}
      </tr>
    </thead>
  );
}
