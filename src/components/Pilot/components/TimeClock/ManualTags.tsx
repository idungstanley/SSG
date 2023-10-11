import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { LabelIcon } from '../../../../assets/icons/LabelIcon';
import { MemoIcon } from '../../../../assets/icons/MemoIcon';
import { PoundsIcon } from '../../../../assets/icons/PoundsIcon';
import TagIcon from '../../../../assets/icons/TagIcon';
import { setTimerDetails } from '../../../../features/task/taskSlice';
import ToolTip from '../../../Tooltip/Tooltip';
import { TimeMemo } from './TimeMemo';

export function ManualTags() {
  const dispatch = useAppDispatch();

  const { timerDetails } = useAppSelector((state) => state.task);

  const [dropDown, setDropDown] = useState<{ memo: boolean }>({ memo: false });
  return (
    <div className="flex space-x-1.5 items-center justify-center px-1 pt-1 pb-1.5 mt-5 w-28 rounded-sm bg-white">
      <ToolTip title="Bill rate">
        <PoundsIcon
          className="w-5 h-5 cursor-pointer"
          active={timerDetails.isBillable}
          onClick={() => dispatch(setTimerDetails({ ...timerDetails, isBillable: !timerDetails.isBillable }))}
        />
      </ToolTip>
      <ToolTip title="Description">
        <div
          className="relative"
          onClick={() => setDropDown((prev) => ({ ...prev, memo: !prev.memo }))}
          onBlur={() => setDropDown((prev) => ({ ...prev, memo: !prev.memo }))}
        >
          <MemoIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.description} />
          {dropDown.memo && <TimeMemo timerDetails={timerDetails} />}
        </div>
      </ToolTip>
      <LabelIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.label} />
      <TagIcon className="w-5 h-5 cursor-pointer" active={!!timerDetails.tags} />
    </div>
  );
}
