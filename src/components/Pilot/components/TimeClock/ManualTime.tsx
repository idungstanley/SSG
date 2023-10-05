import { useEffect, useState } from 'react';
import { ManualTags } from './ManualTags';
import DatePicker from '../../../DatePicker/DatePicker';
import { useAppSelector } from '../../../../app/hooks';
import { formatTimeString, parseAndUpdateTime } from '../../../../utils/TimerDuration';
import dayjs from 'dayjs';
import { createManualTimeEntry } from '../../../../features/task/taskService';
import toast from 'react-hot-toast';
import SaveFilterToast from '../../../TasksHeader/ui/Filter/ui/Toast';

export function ManualTime() {
  const { HistoryFilterMemory, selectedDate } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [data, setData] = useState<{ [key: string]: string }>({
    memo: 'E.g 3 hours 40 mins',
    startDate: '',
    endDate: '',
    description: '',
    tag: '',
    label: ''
  });
  const [isBillable, setIsBillable] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { mutateAsync } = createManualTimeEntry();

  const handleChange = ({ value, target }: { value: string; target: string }) => {
    setData((prev) => ({ ...prev, [target]: value }));
  };
  const handleDateClose = () => setAnchorEl(null);
  const handleSubmit = () => {
    if (data.endDate.length > 0) {
      // alert(data.endDate);
      mutateAsync({
        description: data.description,
        end_date: data.endDate,
        id: activeItemId,
        isBillable,
        start_date: data.startDate,
        type: activeItemType
      });
    } else {
      toast.custom(
        (t) => (
          <SaveFilterToast
            body={`Please enter a duration in the format ${data.memo.slice(3)}`}
            title="Entry Not Saved!"
            toastId={t.id}
          />
        ),
        {
          position: 'bottom-right',
          duration: Infinity
        }
      );
    }
  };

  useEffect(() => {
    if (selectedDate?.from && HistoryFilterMemory?.time?.from) {
      setData((prev) => ({
        ...prev,
        ['startDate']: parseAndUpdateTime(HistoryFilterMemory?.time?.from, selectedDate?.from?.toDate())
      }));
    }
  }, [HistoryFilterMemory?.time?.from]);

  useEffect(() => {
    const [hour, minute] = formatTimeString(data.memo).split(':');
    const generatedDate = dayjs(data.startDate).add(Number(hour), 'hours').add(Number(minute), 'minutes');

    if (generatedDate.isValid()) {
      setData((prev) => ({ ...prev, ['endDate']: generatedDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]') }));
    }
  }, [data.memo]);

  return (
    <div className="flex flex-col space-y-2.5 w-full py-4">
      <div className="flex items-center px-2 space-x-2">
        <label htmlFor="timeDetails" className="flex flex-col space-y-1.5 w-1/3">
          <span className="uppercase text-alsoit-gray-100 text-alsoit-text-xi">Enter Time</span>
          <input
            type="text"
            className="w-full py-0.5 px-1.5 text-alsoit-gray-75 text-alsoit-text-md rounded-sm ring-0 hover:ring-0 focus:ring-0 border-none"
            placeholder={data.memo}
            onChange={(e) => handleChange({ value: e.target.value, target: 'memo' })}
          />
        </label>
        <label htmlFor="detailsDate" className="flex flex-col space-y-1.5">
          <span className="uppercase text-alsoit-gray-100 text-alsoit-text-xi">Date</span>
          {/* change this value */}
          <span
            className="w-32 h-7 p-1.5 text-alsoit-gray-100 text-alsoit-text-md rounded-sm bg-white relative"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            {selectedDate?.from?.format('ddd DD, MMM | ') ?? 'Now'}
            {HistoryFilterMemory?.time?.from ?? ''}
            {anchorEl && <DatePicker anchorEl={anchorEl} handleClose={handleDateClose} styles="flex" />}
          </span>
        </label>
        <label htmlFor="manualTags" className="flex flex-col space-y-1.5 w-1/3">
          <ManualTags IconsInteractions={data} billable={isBillable} />
        </label>
      </div>
      <div className="flex justify-end px-2.5">
        <button
          className="bg-alsoit-success py-1.5 px-8 capitalize text-alsoit-text-xi font-semibold text-white rounded-lg tracking-wide"
          onClick={handleSubmit}
        >
          save
        </button>
      </div>
    </div>
  );
}
