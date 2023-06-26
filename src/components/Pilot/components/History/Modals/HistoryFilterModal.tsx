import { useRef, useState } from 'react';
import { componentModals } from '..';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { IActivityLog } from '../../../../../features/general/history/history.interfaces';
import { BsFilter } from 'react-icons/bs';
import { CgClose } from 'react-icons/cg';
import { SlideButton } from '../../../../SlideButton';
import { setHistoryMemory } from '../../../../../features/task/taskSlice';
import dayjs from 'dayjs';
import DatePicker from '../../../../DatePicker/DatePicker';

interface HistoryfiltermodalProps {
  logData: IActivityLog[];
  toggleFn: React.Dispatch<React.SetStateAction<componentModals>>;
}

export function HistoryfilterModal({ logData, toggleFn }: HistoryfiltermodalProps) {
  const dispatch = useAppDispatch();
  const filterKeys = [
    { id: 1, main: 'date', subType: 'date' },
    { id: 3, main: 'user', subType: 'date' },
    { id: 4, main: 'type', subType: 'date' }
  ];
  const { HistoryFilterMemory, selectedDate } = useAppSelector((state) => state.task);
  const [checkedStates, setCheckedStates] = useState<boolean[]>([]);
  const [dateEntries, setEntries] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (index: number, state?: string): void => {
    const newCheckedStates = [...checkedStates];
    newCheckedStates[index] = !newCheckedStates[index];
    dispatch(setHistoryMemory({ ...HistoryFilterMemory, btnCheckedStates: newCheckedStates }));
    setCheckedStates(newCheckedStates);
    if (state !== undefined) {
      setEntries(true);
    }
  };

  return (
    <>
      <div
        className="flex flex-col space-y-2 bg-white absolute top-5 -right-7 shadow-2xl rounded-lg z-30 p-2 overflow-visible"
        style={{ height: '175px', width: '385px' }}
        onClick={(e) => {
          e.stopPropagation(); // Stop event propagation
        }}
        ref={modalRef}
      >
        <div className="flex items-center justify-between border-b-2">
          <div className="flex items-center space-x-2 py-3 capitalize">
            <BsFilter />
            <span>Filter by</span>
          </div>
          <CgClose
            className="w-4 h-4 cursor-pointer"
            onClick={() => toggleFn((prev) => ({ ...prev, filterLogModal: false }))}
          />
        </div>
        <div className="flex flex-col space-y-3 w-full">
          {filterKeys.map((keys, index) => (
            <div key={index} className="flex w-full space-x-2 items-center">
              <p className="flex space-x-2 capitalize w-1/5">
                <span className="w-1/2">{keys.main}</span>
                <SlideButton
                  state={HistoryFilterMemory?.btnCheckedStates}
                  target={'from'}
                  changeFn={handleChange}
                  index={index}
                />
              </p>
              {checkedStates[index] &&
                (keys.main === 'date' ? (
                  <div className="flex space-x-2 items-center w-4/5">
                    <label htmlFor={`${keys.main}1`} className="w-full">
                      {dateEntries && checkedStates[0] && (
                        <DatePicker
                          styles="absolute z-50 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none right-12 top-64"
                          range={true}
                          toggleFn={setEntries}
                        />
                      )}
                      <div className="flex items-center justify-evenly w-full">
                        {selectedDate?.from && (
                          <span
                            className="flex items-center border border-purple-400 rounded-md p-1"
                            style={{ fontSize: '8px' }}
                          >
                            From: {dayjs(selectedDate?.from).format('ddd, MM DD, YYYY')}
                          </span>
                        )}
                        {selectedDate?.to && (
                          <span
                            className="flex items-center border border-purple-400 rounded-md p-1"
                            style={{ fontSize: '8px' }}
                          >
                            Due By: {dayjs(selectedDate?.to).format('ddd, MM DD, YYYY')}
                          </span>
                        )}
                      </div>
                    </label>
                  </div>
                ) : keys.main === 'user' ? (
                  <select
                    name="user"
                    id="loguser"
                    className="w-36 rounded-lg border-gray-400 text-gray-500 text-xs ml-1 px-2 custom-select"
                    onChange={(e) => dispatch(setHistoryMemory({ ...HistoryFilterMemory, user: e.target.value }))}
                  >
                    <option value="">Select user</option>
                    {logData.map((data) => {
                      const { user } = data.created_by;
                      return (
                        <option
                          value={user.name}
                          key={user.avatar_path}
                          selected={HistoryFilterMemory?.user === user.name ?? ''}
                        >
                          {user.name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <span>hello</span>
                ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
