import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';
import { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';
import { FaSort } from 'react-icons/fa';
import { setTimeArr, setTimeSortArr } from '../../../../features/task/taskSlice';
import { AiFillCaretUp, AiOutlineClose } from 'react-icons/ai';
import { UserSortDropDown } from './TimeUserSortDropDown';
import PlusCircle from '../../../../assets/icons/TimeClock/AddCircle';
import CancelIcon from '../../../../assets/icons/Common/Cancel';
import ArrowCaretUp from '../../../../assets/icons/Common/ArrowCaretUp';

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
  const { timeArr } = useAppSelector((state) => state.task);
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
  const teamMemberId: string[] = [];

  const handleColumnHide = (col: string) => {
    setHeaders((prev) => prev.map((header) => (header.id === col ? { ...header, hidden: !header.hidden } : header)));
  };

  const handleShowAllColumns = () => {
    setHeaders((prev) => prev.map((header) => ({ ...header, hidden: header.hidden ? !header.hidden : header.hidden })));
  };

  const handleSort = (header: string, id: string) => {
    setHeaderId(id);
    if (timeArr.includes(header)) return setShowSortModal(!showSortModal);
    dispatch(setTimeArr([...timeArr, header]));
    setShowSortModal(!showSortModal);
  };

  const handleRemoveFilter = (title: string): void => {
    dispatch(setTimeArr(timeArr.filter((el) => el !== title)));
    dispatch(setTimeSortArr([]));
    setHeaderId('');
  };

  const checkedField = headers.some((el) => el.hidden);

  const renderItemEntries = () => {
    if (getTaskEntries?.data.time_entries)
      if (getTaskEntries?.data.time_entries.length == 0) {
        return <NoEntriesFound />;
      } else {
        return (
          <table className="relative w-full">
            <thead className="relative flex items-center pb-2 space-x-1 text-xs border-b border-gray-400 font-extralight">
              <tr className="flex items-center w-9/12 space-x-4">
                {headers.map((col) => {
                  return (
                    !col.hidden && (
                      <th
                        key={col.id}
                        className="flex justify-center w-12 gap-1 capitalize cursor-default group reloative text-alsoit-text-sm font-semibold"
                        style={{ fontSize: '9px' }}
                      >
                        <span
                          className="cursor-pointer"
                          onClick={() => col.id === headerId && setShowSortModal(!showSortModal)}
                        >
                          {col.title}
                        </span>
                        {col.title === 'user' && (
                          <>
                            {headerId === '' && (
                              <FaSort
                                className="w-3 h-3 text-sm text-gray-100 transition duration-200 bg-alsoit-gray-200 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 "
                                onClick={() => handleSort(col.title, col.id)}
                              />
                            )}
                            {timeArr.includes(col.title) && (
                              <div className="rounded-full sortClose-group">
                                <div className="relative flex items-center justify-center w-4 h-4 space-x-1 text-alsoit-text-lg font-medium text-white uppercase bg-alsoit-danger rounded-full cursor-pointer group">
                                  <div className="font-bold cursor-pointer hover:text-clip" style={{ fontSize: '8px' }}>
                                    <>
                                      {timeArr.length === 1 ? (
                                        <ArrowCaretUp />
                                      ) : (
                                        <span className="flex gap-1">
                                          {timeArr.indexOf(col.title) + 1}
                                          <ArrowCaretUp />
                                        </span>
                                      )}
                                    </>
                                  </div>
                                </div>
                                <CancelIcon
                                  onClick={() => handleRemoveFilter(col.title)}
                                  className="w-3 h-3 m-1 font-semibold text-white cursor-pointer sortClose"
                                />
                              </div>
                            )}
                          </>
                        )}
                        {showSortModal && col.id === headerId && (
                          <UserSortDropDown
                            arr={teamMember}
                            toggleModalFn={setShowSortModal}
                            memberIds={teamMemberId}
                          />
                        )}
                      </th>
                    )
                  );
                })}
              </tr>
              <PlusCircle
                className="absolute w-4 h-4 font-black cursor-pointer AddColumnDropdownButton right-4"
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <div
                  className="absolute bg-white shadow-md w-44 top-10 right-10"
                  tabIndex={0}
                  onBlur={() => setShowModal(!showModal)}
                >
                  <ul className="flex flex-col px-4 py-6 space-y-2">
                    <li
                      className="flex gap-1 py-1 capitalize border-b cursor-pointer"
                      onClick={() => handleShowAllColumns()}
                    >
                      <input type="checkbox" checked={checkedField ? false : true} />
                      show all
                    </li>
                    {headers.map((header) => {
                      return (
                        <li
                          className="flex justify-between py-1 capitalize border-b cursor-pointer"
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
              <div className="overflow-auto" style={{ maxHeight: '45rem' }}>
                {getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => {
                  const { id, initials, name } = entries.team_member.user;
                  const { id: teamId } = entries.team_member;
                  teamMember.push({ id, initials, name });
                  teamMemberId.push(teamId);
                  return <EntryList entries={entries} key={entries.id} switchHeader={headers} />;
                })}
              </div>
            </tbody>
          </table>
        );
      }
  };

  return <div className="p-2">{renderItemEntries()} </div>;
}
