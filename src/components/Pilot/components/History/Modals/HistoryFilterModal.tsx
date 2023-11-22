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
import { TabsDropDown } from '../../TimeClock/TabsDropDown';
import RoundedCheckbox from '../../../../Checkbox/RoundedCheckbox';

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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [dropDown, setDropDown] = useState<{ user: boolean }>({
    user: false
  });

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setAnchorEl(null);

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
          e.stopPropagation();
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
            <div
              key={index}
              className="flex w-full space-x-4 items-center"
              onClick={(e: React.MouseEvent<HTMLDivElement>) => keys.main === 'date' && setAnchorEl(e.currentTarget)}
            >
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
                          styles="flex"
                          range={true}
                          toggleFn={setEntries}
                          anchorEl={anchorEl}
                          handleClose={handleClose}
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
                  <div className="flex px-6">
                    <div
                      onClick={() => setDropDown((prev) => ({ ...prev, user: !prev.user }))}
                      className="flex items-center space-x-2.5 w-32 text-alsoit-text-md border border-alsoit-purple-300 p-1 rounded-md relative"
                    >
                      {HistoryFilterMemory?.user ?? 'Select User'}
                      {dropDown.user && (
                        <TabsDropDown
                          closeModal={() => setDropDown((prev) => ({ ...prev, user: false }))}
                          header="select user"
                          subHeader="filter logs by user"
                          styles="w-44 left-1/2 top-1/3"
                          subStyles="left-8"
                        >
                          {Array.from(new Set(logData.map((data) => data.created_by.user.name))).map((userName) => (
                            <div
                              key={userName}
                              className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-alsoit-gray-50"
                              onClick={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, user: userName }))}
                            >
                              <RoundedCheckbox
                                isChecked={HistoryFilterMemory?.user === userName}
                                onChange={() => dispatch(setHistoryMemory({ ...HistoryFilterMemory, user: userName }))}
                                styles="w-3 h-3 rounded-full checked:bg-alsoit-purple-300"
                              />
                              <span>{userName ?? 'Select User'}</span>
                            </div>
                          ))}
                        </TabsDropDown>
                      )}
                    </div>
                  </div>
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
