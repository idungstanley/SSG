import { VscTriangleDown, VscTriangleRight } from 'react-icons/vsc';
import SaveSelection from '../../../../assets/icons/SaveSelection';
import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';

interface HrMenuSectionProps {
  handleSavedSelections: (sectionName: string) => void;
  sectionName: string;
  savedSelectionsData: string[];
}

export function HrMenuSection({ handleSavedSelections, sectionName, savedSelectionsData }: HrMenuSectionProps) {
  const renderEmptyArrowBlock = () => {
    return <div className="pl-3.5" />;
  };
  const { hrOpenedEntities } = useAppSelector(selectCalendar);

  return (
    <div
      className="flex items-center flex-1 min-w-0 gap-1 cursor-pointer"
      style={{ zIndex: 1, paddingLeft: '0' }}
      onClick={() => handleSavedSelections(sectionName)}
    >
      {savedSelectionsData.length ? (
        <div>
          {hrOpenedEntities.includes(sectionName) ? (
            <span className="flex flex-col">
              <VscTriangleDown className="flex-shrink-0 h-2" aria-hidden="true" color="#919191" />
            </span>
          ) : (
            <VscTriangleRight className="flex-shrink-0 h-2" aria-hidden="true" color="#919191" />
          )}
        </div>
      ) : (
        renderEmptyArrowBlock()
      )}
      <div style={{ marginLeft: '-3px' }}>
        <SaveSelection active={false} />
      </div>
      <p className="block text-xs tracking-wider capitalize truncate">{sectionName}</p>
    </div>
  );
}
