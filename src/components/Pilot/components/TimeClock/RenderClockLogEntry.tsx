import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { Header, User } from './ClockLog';
import { setTimeArr, setTimeSortArr } from '../../../../features/task/taskSlice';
import NoEntriesFound from './NoEntries';
import { ClockLogHeader } from './ClocklogHeader';
import { FaSort } from 'react-icons/fa';
import { HeaderSort } from './HeaderSort';
import { UserSortDropDown } from './TimeUserSortDropDown';
import PlusCircle from '../../../../assets/icons/AddCircle';
import { ColumnFilterList } from './ClockColumnFilterList';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';

interface Props {
  getTaskEntries: ITimeEntriesRes | undefined;
  headers: Header[];
  teamMember: User[];
  teamMemberId: string[];
  logData: IEntries[];
  setViewChanges: React.Dispatch<
    React.SetStateAction<{
      logColumns: boolean;
    }>
  >;
  setHeaders: React.Dispatch<React.SetStateAction<Header[]>>;
  setLogData: React.Dispatch<React.SetStateAction<IEntries[]>>;
}

export function RenderItemEntries({
  getTaskEntries,
  headers,
  teamMember,
  teamMemberId,
  setViewChanges,
  setHeaders,
  logData,
  setLogData
}: Props) {
  const dispatch = useAppDispatch();

  const { timeArr, timeSortArr } = useAppSelector((state) => state.task);

  const [icontoggle, setIconToggle] = useState<{ cancelIcon: boolean; plusIcon: boolean }>({
    cancelIcon: false,
    plusIcon: false
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [headerId, setHeaderId] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [showLogs, setShowLogs] = useState<boolean>(true);
  const [meMode, setMeMode] = useState<boolean>(false);
  const [assigneeId, setAssigneeId] = useState<string | undefined>();

  const handleShowLogs = () => {
    setShowLogs(!showLogs);
  };

  const handleFilters = (filterBy: string, searchStr: string) => {
    const newLogdata = logData?.filter((data) => data.team_member.user.id.includes(searchStr));
    if (filterBy === 'me') {
      newLogdata && !meMode && setLogData(newLogdata);
      meMode && getTaskEntries?.data?.time_entries && setLogData(getTaskEntries?.data?.time_entries);
      setAssigneeId(undefined);
      return !meMode ? setMeMode(true) : setMeMode(false);
    }
    !assigneeId && newLogdata && setLogData(newLogdata);
    assigneeId && getTaskEntries?.data?.time_entries && setLogData(getTaskEntries?.data?.time_entries);
    !assigneeId ? setAssigneeId(searchStr) : setAssigneeId(undefined);
    return setMeMode(false);
  };

  const handleColumnHide = (col: string) => {
    setHeaders((prev) => prev.map((header) => (header.id === col ? { ...header, hidden: !header.hidden } : header)));
    setViewChanges((prev) => ({ ...prev, logColumns: !prev.logColumns }));
  };

  const handleShowAllColumns = () => {
    setHeaders((prev) => prev.map((header) => ({ ...header, hidden: header.hidden ? !header.hidden : header.hidden })));
    setViewChanges((prev) => ({ ...prev, logColumns: !prev.logColumns }));
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

  if (getTaskEntries?.data.time_entries && getTaskEntries?.data.time_entries.length === 0) {
    return <NoEntriesFound />;
  } else {
    return (
      <div className="px-2 py-8 border-t-4 border-l-2 border-alsoit-gray-100 rounded-md relative w-full">
        <ClockLogHeader
          handleFilters={handleFilters}
          handleShowLogs={handleShowLogs}
          meMode={meMode}
          showLogs={showLogs}
          assigneeId={assigneeId}
          teamMembers={teamMember}
        />
        {showLogs && (
          <table className="relative w-full">
            <thead className="relative flex items-center justify-between pb-2 text-xs border-b border-gray-400 font-extralight w-full">
              <tr className="flex items-center justify-between w-10/12">
                {headers.map((col) => {
                  return (
                    !col.hidden && (
                      <th
                        key={col.id}
                        className="relative flex font-semibold capitalize cursor-default group text-alsoit-text-sm text-start"
                      >
                        <span
                          className="cursor-pointer"
                          onClick={() => col.id === headerId && setShowSortModal(!showSortModal)}
                        >
                          {col.title}
                        </span>
                        {col.title === 'user' && (
                          <>
                            {headerId === '' && timeSortArr.length === 0 && (
                              <FaSort
                                className="w-3 h-3 transition duration-200 rounded-full opacity-0 cursor-pointer text-alsoit-text-lg text-alsoit-gray-50 bg-alsoit-gray-200 group-hover:opacity-100"
                                onClick={() => handleSort(col.title, col.id)}
                              />
                            )}
                            {timeArr.includes(col.title) && timeSortArr.length && (
                              <HeaderSort
                                col={col}
                                handleRemoveFilter={handleRemoveFilter}
                                icontoggle={icontoggle}
                                setIconToggle={setIconToggle}
                              />
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
              <tr>
                <th colSpan={headers.filter((header) => !header.hidden).length}>
                  <div
                    className="flex items-center justify-end mb-2"
                    onClick={() => setShowModal(!showModal)}
                    onMouseEnter={() =>
                      setIconToggle((prev) => ({
                        ...prev,
                        plusIcon: true
                      }))
                    }
                    onMouseLeave={() =>
                      setIconToggle((prev) => ({
                        ...prev,
                        plusIcon: false
                      }))
                    }
                  >
                    <PlusCircle active={icontoggle.plusIcon} dimensions={{ width: 20, height: 20 }} />
                  </div>
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
                          <input type="checkbox" checked={!checkedField} />
                          show all
                        </li>
                        {headers.map((header) => (
                          <ColumnFilterList key={header.id} handleColumnHide={handleColumnHide} header={header} />
                        ))}
                      </ul>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {logData?.map((entries: entriesProps) => {
                return <EntryList entries={entries} key={entries.id} switchHeader={headers} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
