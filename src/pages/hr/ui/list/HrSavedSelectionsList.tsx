import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectCalendar, setSavedSelections } from '../../../../features/calendar/slice/calendarSlice';

interface HrSavedSectionsListProps {
  savedSelectionsData: string[];
}

export function HrSavedSelectionsList({ savedSelectionsData }: HrSavedSectionsListProps) {
  const dispatch = useAppDispatch();
  const { savedSelections } = useAppSelector(selectCalendar);

  const onCheckbox = (e: boolean, currentCheckedName: string) => {
    if (e) {
      dispatch(setSavedSelections([...savedSelections, currentCheckedName]));
    } else {
      dispatch(setSavedSelections([...savedSelections.filter((item) => item !== currentCheckedName)]));
    }
  };

  return (
    <div>
      <ul className="px-2">
        {savedSelectionsData.map((savedSelectionItem) => (
          <li
            key={savedSelectionItem}
            className="grid grid-cols-autoFr items-center space-x-3"
            style={{ paddingLeft: '17px', height: '30px' }}
          >
            <div className="hr-checkbox-wrapper flex justify-center items-center">
              <Checkbox
                styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
                checked={savedSelections.includes(savedSelectionItem)}
                setChecked={(e) => onCheckbox(e, savedSelectionItem)}
              />
            </div>
            <div className="flex">
              <div className="group flex gap-2 items-center justify-start ml-4">
                <div
                  title={savedSelectionItem}
                  className="bg-gray-200 relative w-5 h-5 rounded-full p-2 flex items-center justify-center transform transition"
                  style={{
                    backgroundColor: '#B2B2B2'
                  }}
                >
                  <span className="text-black font-medium" style={{ fontSize: '10px' }}>
                    D
                  </span>
                </div>
              </div>
              <div className="ml-2">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 text-left" style={{ fontSize: '13px' }}>
                  {savedSelectionItem}
                </h3>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
