import React, { useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { MdOutlineDragIndicator } from 'react-icons/md';
import { ExtendedListColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { generateSortField } from '../../../utils/TaskHeader/GenerateSortField';
import RoundedArrowUpDown from '../../../pages/workspace/tasks/component/views/listLevel/component/RoundedArrowUpDown';
import SortDirectionCheck from '../../../pages/workspace/tasks/component/views/listLevel/component/SortDirectionCheck';
import { SortOption, setActiveTaskColumn, setSortArr, setSortArray } from '../../../features/task/taskSlice';
import SortModal from '../../SortModal/SortModal';

interface HeadProps {
  columns: ExtendedListColumnProps[];
  tableHeight: string | number;
  collapseTasks: boolean;
  headerStatusColor?: string;
  listName?: string;
  background?: string;
}

export function ChatHead({ columns, tableHeight, collapseTasks, background }: HeadProps) {
  const dispatch = useAppDispatch();

  const { sortArr, sortAbleArr } = useAppSelector((state) => state.task);
  const { baseColor } = useAppSelector((state) => state.account);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [headerId, setHeaderId] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (header: string, id: string | undefined, order: 'asc' | 'desc', isDefault?: boolean) => {
    setHeaderId(id as string);
    const existingSortItem = sortAbleArr.findIndex((el) => el.field === generateSortField(isDefault as boolean, id));
    if (existingSortItem !== -1) {
      const updatedSortArray = sortAbleArr.map((el) =>
        el.field === generateSortField(isDefault as boolean, id) ? { ...el, dir: order } : el
      );
      dispatch(setSortArray(updatedSortArray));
    } else {
      dispatch(setSortArr([...sortArr, header as string]));
      dispatch(setSortArray([...sortAbleArr, { dir: order, field: generateSortField(isDefault as boolean, id) }]));
    }
  };

  const handleRemoveFilter = (title?: string, criteria?: string, isDefault?: boolean, id?: string): void => {
    dispatch(setSortArr(sortArr.filter((el) => el !== title)));
    dispatch(setSortArray(sortAbleArr.filter((el) => el.field !== generateSortField(isDefault as boolean, id))));
  };

  const handleOrder = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, propertyHeaderTxt?: string) => {
    e.stopPropagation();
    const existingSortItem = sortAbleArr?.findIndex((el) => el.field === propertyHeaderTxt);
    const existingSortDir = sortAbleArr?.find((el) => el.field === propertyHeaderTxt);
    if (existingSortItem !== -1 && existingSortDir?.dir === 'asc') {
      const updatedSortArray = sortAbleArr?.map((el) => (el.field === propertyHeaderTxt ? { ...el, dir: 'desc' } : el));
      dispatch(setSortArray(updatedSortArray as SortOption[]));
    } else {
      const updatedSortArray = sortAbleArr?.map((el) => (el.field === propertyHeaderTxt ? { ...el, dir: 'asc' } : el));
      dispatch(setSortArray(updatedSortArray as SortOption[]));
    }
  };

  const setOptions = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>, item: ExtendedListColumnProps) => {
    dispatch(setActiveTaskColumn(item));
    setHeaderId(item.id);
    setShowSortModal(!showSortModal);
    setAnchorEl(event.currentTarget);
  };

  const dirCheck = (col: string, isDefault: boolean, id?: string): SortOption | undefined => {
    return sortAbleArr.find((el) => el.field === generateSortField(isDefault, id));
  };

  return columns.length > 0 ? (
    <>
      <thead className="contents">
        <tr className="relative contents group">
          {/* first sticky col */}
          <th
            style={{ zIndex: 2, background: background ? background : '' }}
            className="sticky left-0 flex items-center -mb-2 font-extrabold"
          >
            <div className="flex justify-center items-center w-full py-2 truncate dBlock group opacity-90 ml-0.5">
              <div
                className="w-full flex justify-center items-center p-0.5 hover:bg-gray-200 ml-4 rounded-xs space-x-1 border-t-2 border-l-2 border-transparent hover:border-r-gray-600 text-alsoit-gray-200 font-semibold"
                style={{ fontSize: '11px', WebkitTextStroke: '0.5px' }}
              >
                <span onClick={(e) => setOptions(e, columns[0])} className="cursor-pointer">
                  {!collapseTasks ? columns[0].value.toUpperCase() : null}
                </span>
                <>
                  {!sortArr.length && !sortArr.includes(columns[0].value) ? (
                    <RoundedArrowUpDown
                      value={columns[0].value}
                      id={columns[0].id}
                      isDefault={columns[0].defaulField}
                      handleSort={handleSort}
                    />
                  ) : null}
                  {sortArr.includes(columns[0].value) && (
                    <SortDirectionCheck
                      bgColor={baseColor}
                      sortItemLength={sortArr.length}
                      sortIndex={sortArr.indexOf(columns[0].value)}
                      sortValue={columns[0].value}
                      sortDesc={dirCheck(columns[0].value, columns[0].defaulField, columns[0].id)?.dir === 'desc'}
                      handleRemoveSortFn={handleRemoveFilter}
                      propertyHeaderTxt={generateSortField(columns[0].defaulField, columns[0].id)}
                      isDefault={columns[0].defaulField}
                      handleOrder={handleOrder}
                      id={columns[0].id}
                    />
                  )}
                </>
              </div>
            </div>
            <FiPlusCircle color="orange" className="w-4 h-4 mr-2 font-black AddColumnDropdownButton" />
            {headerId === columns[0].id && (
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
            ? columns.slice(1).map((item) => (
                <th key={item.id} className="relative w-full py-2 -mb-1.5 font-extrabold opacity-90">
                  <div
                    className="text-alsoit-gray-200 font-semibold flex dBlock items-center justify-center w-full h-full my-auto cursor-pointer group hover:bg-gray-200 p-0.5 rounded-xs space-x-1 border-l-2 border-r-2 border-t-2 border-transparent hover:border-r-gray-500 "
                    style={{ fontSize: '11px', WebkitTextStroke: '0.5px', lineHeight: '13.2px' }}
                  >
                    <span className="dNone">
                      <MdOutlineDragIndicator className="h4 w4" />
                    </span>
                    <span style={{ color: item.color ? item.color : '' }} onClick={(e) => setOptions(e, item)}>
                      {item.value.toUpperCase()}
                    </span>
                    {/* {sortAbles.includes(item.value) && ( */}
                    <span className="ml-0.5">
                      {sortArr.length >= 1 && sortArr.includes(item.value) ? (
                        ''
                      ) : (
                        <RoundedArrowUpDown
                          value={item.value}
                          id={item.id}
                          handleSort={handleSort}
                          isDefault={item.defaulField}
                        />
                      )}
                      {sortArr.includes(item.value) && (
                        <SortDirectionCheck
                          bgColor={baseColor}
                          isDefault={item.defaulField}
                          sortItemLength={sortArr.length}
                          sortIndex={sortArr.indexOf(item.value)}
                          sortValue={item.value}
                          sortDesc={dirCheck(item.value, item.defaulField, item.id)?.dir === 'desc'}
                          handleRemoveSortFn={handleRemoveFilter}
                          propertyHeaderTxt={generateSortField(item.defaulField, item.id)}
                          id={item.id}
                          handleOrder={handleOrder}
                        />
                      )}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 block pl-1 idle" style={{ height: tableHeight }}>
                    <div className="w-0.5 mx-auto bg-gray-100" style={{ height: '75px' }} />
                  </div>
                  {headerId === item.id && (
                    <SortModal
                      handleClose={handleClose}
                      anchorEl={anchorEl}
                      toggleModal={setShowSortModal}
                      handleSortFn={handleSort}
                      setAnchorEl={setAnchorEl}
                      handleRemoveColumn={() => null}
                    />
                  )}
                </th>
              ))
            : null}
        </tr>
      </thead>
    </>
  ) : null;
}
