import { useEffect, useState } from 'react';
import { IEntries, ITimeEntriesRes } from '../../../../features/task/interface.tasks';
import { HorizontalScroll } from '../../../ScrollableContainer/HorizontalScroll';
import { InventoryHeader } from './InventoryHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { VerticalScroll } from '../../../ScrollableContainer/VerticalScroll';
import { LogHeaders } from './LogHeaders';
import { TimeLogEntries } from './LogEntries';
import RoundedCheckbox from '../../../Checkbox/RoundedCheckbox';
import MoveItemIcon from '../../../../assets/icons/MoveItemIcon';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import TrashIcon from '../../../../assets/icons/TrashIcon';
import TagIcon from '../../../../assets/icons/DotCircleTagIcon';
import { DuplicateIcon } from '../../../../assets/icons/Duplicateicon';
import { EditSquareIcon } from '../../../../assets/icons/EditSquareIcon';
import { BespokeEntryIcon } from '../../../../assets/icons/BespokeEntryIcon';
import { DependenciesIcon } from '../../../../assets/icons/DepenciesIcon';
import CancelIcon from '../../../../assets/icons/Cancel';
import { PriorityIcon } from '../../../../assets/icons/PriorityIcon';
import { setTimeEntriesIdArr } from '../../../../features/task/taskSlice';

interface Props {
  getTimeEntries?: ITimeEntriesRes;
}

export function TimeInventory({ getTimeEntries }: Props) {
  const dispatch = useAppDispatch();
  const { timeEntriesIdArr } = useAppSelector((state) => state.task);

  const checkSelection = getTimeEntries?.data.time_entries
    .map((entries) => {
      return timeEntriesIdArr.includes(entries.id);
    })
    .filter(Boolean);

  const handleClick = () => {
    if (getTimeEntries) {
      if (timeEntriesIdArr.length < getTimeEntries?.data.time_entries.length) {
        const newIds = getTimeEntries?.data.time_entries
          .filter((entries) => !timeEntriesIdArr.includes(entries.id))
          .map((entries) => entries.id);
        dispatch(setTimeEntriesIdArr([...timeEntriesIdArr, ...newIds]));
      } else {
        dispatch(setTimeEntriesIdArr([]));
      }
    }
  };
  const [timeEntries, setTimeEntries] = useState<IEntries[] | undefined>(getTimeEntries?.data.time_entries);

  const [showLog, setShowLogs] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState(timeEntriesIdArr.length > 0);

  const Entries = () =>
    timeEntries?.map((timeEntry, index) => {
      return <TimeLogEntries key={index} index={index} timeEntry={timeEntry} />;
    });

  useEffect(() => {
    if (getTimeEntries?.data.time_entries) setTimeEntries(getTimeEntries?.data.time_entries);
  }, [getTimeEntries]);

  useEffect(() => {
    setIsVisible(timeEntriesIdArr.length > 0);
  }, [timeEntriesIdArr]);

  return (
    <div className="relative bg-alsoit-gray-50 w-full rounded-md flex flex-col pt-10">
      <InventoryHeader timeData={getTimeEntries} showLog={!showLog} dropView={() => setShowLogs(!showLog)} />
      <div className="w-full max-h-72 relative">
        <div className="w-full max-h-72 relative">
          <div className={`time-entries-bar ${isVisible ? '' : 'time-entries-bar-out'}`}>
            <div
              className="flex justify-between items-center"
              style={{ transition: 'transform 1s ease', height: '35px' }}
            >
              <div className="flex space-x-1.5 items-center px-2">
                <RoundedCheckbox
                  isChecked={checkSelection?.length === getTimeEntries?.data.time_entries.length}
                  onChange={() => handleClick()}
                  styles="w-3 h-3 rounded-lg checked:bg-alsoit-purple-300 focus:bg-alsoit-purple-300 active:bg-alsoit-purple-300 group-hover:visible"
                />
                <span className="flex space-x-1 items-center">
                  <span className="text-alsoit-text-md text-alsoit-gray-50">{checkSelection?.length}</span>
                  <span className="text-alsoit-text-md text-alsoit-gray-50">selected</span>
                </span>
              </div>
              <div className="flex space-x-2.5 w-1/3 h-9 items-center">
                <div>
                  <BespokeEntryIcon className="w-4 h-4" />
                </div>
                <div>
                  <TagIcon fixed active />
                </div>
                <div>
                  <DependenciesIcon className="w-4 h-4" />
                </div>
                <div>
                  <MoveItemIcon active fixed />
                </div>
                <div>
                  <CalendarIcon active fixed />
                </div>
                <div>
                  <PriorityIcon className="w-4 h-4" />
                </div>
                <div>
                  <DuplicateIcon className="w-4 h-4" />
                </div>
                <div>
                  <EditSquareIcon className="w-4 h-4" />
                </div>
                <div>
                  <TrashIcon className="w-4 h-4" />
                </div>
              </div>
              <div className="w-1/3 flex space-x-2 items-center justify-end">
                <input
                  type="text"
                  className="border-alsoit-gray-50 text-alsoit-text-md bg-black text-alsoit-gray-50 w-36 h-6 rounded-md"
                  placeholder="type '/' for commands"
                />
                <div className="flex items-center h-6 mt-1.5">
                  <CancelIcon active fixed dimensions={{ width: 25, height: 25 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <VerticalScroll>
          {showLog && (
            <>
              <div className="max-h-72 w-full">
                <HorizontalScroll>
                  <table className="w-full h-full border-separate">
                    <thead className="w-full">
                      <LogHeaders />
                    </thead>
                    <tbody className="w-full">{Entries()}</tbody>
                  </table>
                </HorizontalScroll>
              </div>
            </>
          )}
        </VerticalScroll>
      </div>
    </div>
  );
}
