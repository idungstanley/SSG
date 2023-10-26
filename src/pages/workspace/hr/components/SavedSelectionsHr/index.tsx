import { Checkbox } from '../../../../../components/Checkbox/Checkbox';
import {
  selectCalendar,
  setHrOpenedEntities,
  setSavedSelections
} from '../../../../../features/calendar/slice/calendarSlice';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import React from 'react';
import { HrSavedSelectionsList } from '../../../../hr/ui/list/HrSavedSelectionsList';
import { HrMenuSection } from '../HrMenuSection';

function SavedSelectionsHr() {
  const dispatch = useAppDispatch();
  const { savedSelections, hrOpenedEntities } = useAppSelector(selectCalendar);
  const savedSelectionsData = ['Managers', 'Designers', 'Developers']; //Demo data
  const sectionName = 'Saved Selections';

  const handleSavedSelections = (entityName: string) => {
    if (hrOpenedEntities.includes(entityName)) {
      dispatch(setHrOpenedEntities([...hrOpenedEntities.filter((item) => item !== entityName)]));
    } else {
      dispatch(setHrOpenedEntities([...hrOpenedEntities, entityName]));
    }
  };

  const onCheckbox = (e: boolean, sectionName: string) => {
    const preparedArr = [];
    let savedSectionsArr = [];
    if (e) {
      preparedArr.push(sectionName);
      savedSectionsArr = preparedArr.concat(savedSelectionsData);
      dispatch(setSavedSelections([...savedSectionsArr.map((item) => item)]));
    } else {
      dispatch(setSavedSelections([]));
    }
  };

  return (
    <div className="hub-item">
      <div
        className="relative flex items-center justify-start hover:bg-alsoit-gray-50"
        style={{ height: '30px', paddingLeft: '25px' }}
      >
        <div className="hr-checkbox-wrapper flex justify-center items-center">
          <Checkbox
            styles="text-primary-500 focus:ring-primary-500 hr-checkbox hr-checkbox-parent"
            checked={savedSelections.includes(sectionName)}
            setChecked={(e) => onCheckbox(e, sectionName)}
          />
        </div>
        <HrMenuSection
          handleSavedSelections={handleSavedSelections}
          sectionName={sectionName}
          savedSelectionsData={savedSelectionsData}
        />
      </div>
      {hrOpenedEntities.includes(sectionName) && savedSelectionsData.length && (
        <HrSavedSelectionsList savedSelectionsData={savedSelectionsData} />
      )}
    </div>
  );
}

export default SavedSelectionsHr;
