import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';
import { GiCheckMark } from 'react-icons/gi';
import { FaSort } from 'react-icons/fa';
import { setTimeArr, setTimeSortArr } from '../../../../features/task/taskSlice';
import { UserSortDropDown } from './TimeUserSortDropDown';
import PlusCircle from '../../../../assets/icons/AddCircle';
import ArrowCaretUp from '../../../../assets/icons/ArrowCaretUp';
import CancelIcon from '../../../../assets/icons/Cancel';
import { ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { useEffect, useState } from 'react';
import { useGetUserSettingsData } from '../../../../features/task/taskService';
import { toast } from 'react-hot-toast';
import SaveFilterToast from '../../../TasksHeader/ui/Filter/ui/Toast';

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

interface LogProps {
  getTaskEntries: ITimeEntriesRes | undefined;
}

export default function ClockLog({ getTaskEntries }: LogProps) {
  const { timeArr, timeSortStatus } = useAppSelector((state) => state.task);

  const dispatch = useAppDispatch();
  const fetchSortData = useGetUserSettingsData({ keys: 'time_entry' });

  const [headers, setHeaders] = useState<Header[]>([
    { title: 'user', id: '1', hidden: false },
    { title: 'duration', id: '2', hidden: false },
    { title: 'start date', id: '3', hidden: false },
    { title: 'end date', id: '4', hidden: false },
    { title: 'description', id: '5', hidden: true }
  ]);
  const [icontoggle, setIconToggle] = useState<{ cancelIcon: boolean; plusIcon: boolean }>({
    cancelIcon: false,
    plusIcon: false
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [headerId, setHeaderId] = useState<string>('');
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [teamMember, setTeamMember] = useState<User[]>([]);
  const [teamMemberId, setTeamMemberId] = useState<string[]>([]);

  useEffect(() => {
    const handleTeamMember = () => {
      const newTeamMembers = getTaskEntries?.data.filters.team_members.map((member) => member.user);
      const newTeamMemberIds = getTaskEntries?.data.filters.team_members.map((member) => member.id);

      newTeamMembers && setTeamMember((prevTeamMembers) => [...prevTeamMembers, ...newTeamMembers]);
      newTeamMemberIds && setTeamMemberId((prevIds) => [...prevIds, ...newTeamMemberIds]);
    };

    handleTeamMember();
  }, [getTaskEntries?.data.filters.team_members]);

  useEffect(() => {
    if (timeSortStatus) {
      toast.custom(
        (t) => (
          <SaveFilterToast
            body="Sort Data Saved successfully"
            title="Sorting Saved"
            toastId={t.id}
            extended="timeSort"
          />
        ),
        {
          position: 'bottom-right',
          duration: Infinity
        }
      );
    }
  }, [timeSortStatus]);

  useEffect(() => {
    fetchSortData;
  }, []);

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
    if (getTaskEntries?.data.time_entries && getTaskEntries?.data.time_entries.length === 0) {
      return <NoEntriesFound />;
    } else {
      return (
        <div className="p-2">
          <table className="relative w-full">
            <thead className="relative flex items-center justify-between pb-2 text-xs border-b border-gray-400 font-extralight">
              <tr className="flex items-center space-x-5">
                {headers.map((col) => {
                  return (
                    !col.hidden && (
                      <th
                        key={col.id}
                        className="relative flex gap-1 font-semibold capitalize cursor-default group text-alsoit-text-sm"
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
                                className="w-3 h-3 transition duration-200 rounded-full opacity-0 cursor-pointer text-alsoit-text-lg text-alsoit-gray-50 bg-alsoit-gray-200 group-hover:opacity-100"
                                onClick={() => handleSort(col.title, col.id)}
                              />
                            )}
                            {timeArr.includes(col.title) && (
                              <div className="rounded-full sortClose-group">
                                <div className="relative flex items-center justify-center w-4 h-4 space-x-1 font-medium text-white uppercase rounded-full cursor-pointer text-alsoit-text-lg bg-alsoit-danger group">
                                  <div className="font-bold cursor-pointer hover:text-clip" style={{ fontSize: '8px' }}>
                                    <>
                                      {timeArr.length === 1 ? (
                                        <ArrowCaretUp active={false} />
                                      ) : (
                                        <span className="flex gap-1">
                                          {timeArr.indexOf(col.title) + 1}
                                          <ArrowCaretUp active={false} />
                                        </span>
                                      )}
                                    </>
                                  </div>
                                </div>
                                <div
                                  className="w-4 h-4"
                                  onClick={() => handleRemoveFilter(col.title)}
                                  onMouseEnter={() =>
                                    setIconToggle((prev) => ({
                                      ...prev,
                                      cancelIcon: true
                                    }))
                                  }
                                  onMouseLeave={() =>
                                    setIconToggle((prev) => ({
                                      ...prev,
                                      cancelIcon: false
                                    }))
                                  }
                                >
                                  <CancelIcon active={icontoggle.cancelIcon} dimensions={{ width: 12, height: 12 }} />
                                </div>
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
                          <li
                            className="flex justify-between py-1 capitalize border-b cursor-pointer"
                            key={header.id}
                            onClick={() => handleColumnHide(header.id)}
                          >
                            {header.title}
                            {!header.hidden && <GiCheckMark />}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody>
              {getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => {
                return <EntryList entries={entries} key={entries.id} switchHeader={headers} />;
              })}
            </tbody>
          </table>
        </div>
      );
    }
  };

  return renderItemEntries();
}
