import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { LabelIcon } from '../../../../assets/icons/LabelIcon';
import { MemoIcon } from '../../../../assets/icons/MemoIcon';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';
import { setTimerDetails } from '../../../../features/task/taskSlice';
import ToolTip from '../../../Tooltip/Tooltip';
import { TimeMemo } from './TimeMemo';
import { TimeLabel } from './TimeLabel';
// import { TabsDropDown } from './TabsDropDown';
import DropdownWithHeader from './components/DropdownWithHeader';

export function ManualTags() {
  const dispatch = useAppDispatch();

  const { timerDetails } = useAppSelector((state) => state.task);

  const [dropDown, setDropDown] = useState<{ memo: boolean; label: boolean }>({ memo: false, label: false });

  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  return (
    <div className="flex space-x-1.5 items-center justify-center px-1 pt-1 pb-1.5 w-28 rounded-sm bg-white">
      <ToolTip title="Bill rate">
        <div className="relative">
          <PoundsIcon
            className="w-5 h-5 cursor-pointer"
            active={timerDetails.isBillable}
            onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
          />
        </div>
      </ToolTip>
      <ToolTip title="Add Memo">
        <div
          className="relative"
          onClick={() => setDropDown((prev) => ({ ...prev, memo: !prev.memo }))}
          onBlur={() => setDropDown((prev) => ({ ...prev, memo: !prev.memo }))}
        >
          <MemoIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.description} />
          {dropDown.memo && (
            <TimeMemo
              timerDetails={timerDetails}
              closeModal={() => setDropDown((prev) => ({ ...prev, memo: !prev.memo }))}
            />
          )}
        </div>
      </ToolTip>
      <ToolTip title="Add Label">
        <div className="relative" onClick={(e) => setAnchor(e.currentTarget)}>
          <LabelIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.label} />
        </div>
      </ToolTip>

      <DropdownWithHeader header="timeclock label" subHeader="select labels" anchor={anchor} setAnchor={setAnchor}>
        <TimeLabel />
      </DropdownWithHeader>

      <ToolTip title="Add Tags">
        <div className="relative">
          <TagIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.tags} />
        </div>
      </ToolTip>
    </div>
  );
}
