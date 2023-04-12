import { FiPlusCircle } from 'react-icons/fi';
import { useAppSelector } from '../../../../app/hooks';
import { GetTimeEntriesService } from '../../../../features/task/taskService';
import EntryList, { entriesProps } from '../../../../pages/workspace/tasks/timeclock/entryLists/EntryList';
import NoEntriesFound from './NoEntries';
import { useState } from 'react';
import { GiCheckMark } from 'react-icons/gi';

export type Header = {
  title: string;
  id: number;
  hidden: boolean;
};

export default function ClockLog() {
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { data: getTaskEntries } = GetTimeEntriesService({
    itemId: activeItemId,
    trigger: activeItemType
  });
  const [headers, setHeaders] = useState<Header[]>([
    { title: 'assignee', id: 1, hidden: false },
    { title: 'duration', id: 2, hidden: false },
    { title: 'start date', id: 3, hidden: false },
    { title: 'end date', id: 4, hidden: false },
    { title: 'description', id: 5, hidden: true }
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleColumnHide = (col: number) => {
    setHeaders((prev) => prev.map((header) => (header.id === col ? { ...header, hidden: !header.hidden } : header)));
  };

  const renderItemEntries = () => {
    if (getTaskEntries?.data.time_entries)
      if (getTaskEntries?.data.time_entries.length == 0) {
        return <NoEntriesFound />;
      } else {
        return (
          <table className="w-full">
            <thead className="flex items-center text-xs font-extralight border-b pb-2 border-gray-400 space-x-1 relative">
              <tr className="w-9/12 flex space-x-5 items-center">
                {headers.map((col) => {
                  return (
                    !col.hidden && (
                      <th key={col.id} className="w-12 cursor-default capitalize">
                        {col.title}
                      </th>
                    )
                  );
                })}
              </tr>
              <FiPlusCircle
                className="AddColumnDropdownButton cursor-pointer font-black h-4 w-4"
                onClick={() => setShowModal(!showModal)}
              />
              {showModal && (
                <div
                  className="w-44 absolute top-10 right-10 shadow-md bg-white"
                  tabIndex={0}
                  onBlur={() => setShowModal(!showModal)}
                >
                  <ul className="flex flex-col space-y-2 px-4 py-6">
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
              {getTaskEntries?.data?.time_entries?.map((entries: entriesProps) => (
                <EntryList entries={entries} key={entries.id} switchHeader={headers} />
              ))}
            </tbody>
          </table>
        );
      }
    else {
      return <NoEntriesFound />;
    }
  };

  return <div className="p-2">{renderItemEntries()}</div>;
}
