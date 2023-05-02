import { FiPlusCircle } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';
import { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { FaSort } from 'react-icons/fa';
import { setTimeArr, setTimeSortArr } from '../../../../features/task/taskSlice';
import { AiFillCaretUp, AiOutlineClose } from 'react-icons/ai';

export type Header = {
  title: string;
  id: string;
  hidden: boolean;
};

export interface User {
  id: string;
  initials: string;
  name: string;
}

export default function ClockLog() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { timeArr, timeSortArr } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const { data: getTaskEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType
  });
  const [headers, setHeaders] = useState<Header[]>([
    { title: 'user', id: '1', hidden: false },
    { title: 'duration', id: '2', hidden: false },
    { title: 'start date', id: '3', hidden: false },
    { title: 'end date', id: '4', hidden: false },
    { title: 'description', id: '5', hidden: true }
  ]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [headerId, setHeaderId] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const teamMember: User[] = [];

  console.log(teamMember);

  const handleColumnHide = (col: string) => {
    setHeaders((prev) => prev.map((header) => (header.id === col ? { ...header, hidden: !header.hidden } : header)));
  };

  const handleShowAllColumns = () => {
    setHeaders((prev) => prev.map((header) => ({ ...header, hidden: header.hidden ? !header.hidden : header.hidden })));
  };

  const handleSort = (header: string, id: string) => {
    const headerTxt = header === 'Assignees' ? 'assignee' : header === 'Task' ? 'task' : header.toLowerCase();
    setHeaderId(id);
    const newArray = teamMember.filter((obj, index, arr) => {
      return arr.findIndex((item) => item.id === obj.id) === index;
    });
    if (timeArr.includes(headerTxt)) return setShowSortModal(!showSortModal);
    dispatch(setTimeArr([...timeArr, header]));
    dispatch(setTimeSortArr(newArray));
  };

  const handleRemoveFilter = (title: string): void => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'task' : title.toLowerCase();
    dispatch(setTimeArr(timeArr.filter((el) => el !== title)));
    dispatch(setTimeSortArr(timeSortArr.filter((el) => el.name !== headerTxt)));
  };

  const checkedField = headers.some((el) => el.hidden);

  const renderItemEntries = () => {
    if (getTaskEntries?.data.time_entries)
      if (getTaskEntries?.data.time_entries.length == 0) {
        return <NoEntriesFound />;
      } else {
        return (
          <table className="w-full relative">
            <thead className="flex items-center text-xs font-extralight border-b pb-2 border-gray-400 space-x-1 relative">
              <tr className="w-9/12 flex space-x-4 items-center">
                {headers.map((col) => {
                  return (
                    !col.hidden && (
                      <th
                        key={col.id}
                        className="w-12 flex font-bold justify-center gap-1 group cursor-default capitalize reloative"
                        style={{ fontSize: '9px' }}
                      >
                        {col.title}
                        {col.title === 'user' && (
                          <>
                            <FaSort
                              className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 "
                              onClick={() => handleSort(col.title, col.id)}
                            />
                            {timeArr.includes(col.title) && (
                              <div className="sortClose-group rounded-md">
                                <div className="flex items-center justify-center space-x-1 uppercase text-xs text-white font-medium bg-red-400 group relative cursor-pointer h-4 w-4 rounded-full">
                                  <div className="font-bold hover:text-clip cursor-pointer" style={{ fontSize: '8px' }}>
                                    <>
                                      {timeArr.length === 1 ? (
                                        <AiFillCaretUp />
                                      ) : (
                                        <span className="flex gap-1">
                                          {timeArr.indexOf(col.title) + 1}
                                          <AiFillCaretUp />
                                        </span>
                                      )}
                                    </>
                                  </div>
                                </div>
                                <AiOutlineClose
                                  onClick={() => handleRemoveFilter(col.title)}
                                  className="sortClose text-white font-bold h-3 w-3 m-1"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && col.id === headerId && <UserSortDropDown arr={teamMember} />}
                      </th>
                    )
                  );
                })}
              </tr>
              <FiPlusCircle
                className="AddColumnDropdownButton cursor-pointer font-black h-4 w-4 absolute right-4"
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <div
                  className="w-44 absolute top-10 right-10 shadow-md bg-white"
                  tabIndex={0}
                  onBlur={() => setShowModal(!showModal)}
                >
                  <ul className="flex flex-col space-y-2 px-4 py-6">
                    <li
                      className="cursor-pointer border-b py-1 capitalize flex gap-1"
                      onClick={() => handleShowAllColumns()}
                    >
                      <input type="checkbox" checked={checkedField ? false : true} />
                      show all
                    </li>
                    {headers.map((header) => {
                      return (
                        <li
                          className="cursor-pointer border-b py-1 capitalize flex justify-between"
                          key={header.id}
                          onClick={() => handleColumnHide(header.id)}
                        >
                          {header.title}
                          {!header.hidden && <GiCheckMark />}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </thead>
            <tbody>
              {getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => {
                const { id, initials, name } = entries.team_member.user;
                teamMember.push({ id, initials, name });
                return <EntryList entries={entries} key={entries.id} switchHeader={headers} />;
              })}
            </tbody>
          </table>
        );
      }
  };

  return <div className="p-2">{renderItemEntries()}</div>;
}

type UserSortParams = {
  arr: User[];
};

function UserSortDropDown({ arr }: UserSortParams) {
  return (
    <>
      <div className="absolute top-5 left-2 z-50 w-64 max-h-64 bg-white shadow-lg rounded-md">
        <ul className="space-y-2">
          {arr.map((el) => {
            return (
              <li key={el.id} className="flex items-center py-2 alt-task px-4">
                {el.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
