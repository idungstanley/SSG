import { useEffect, useState } from 'react';
import DatePicker from '../../../DatePicker/DatePicker';
import { useAppSelector } from '../../../../app/hooks';
import { formatTimeString, parseAndUpdateTime } from '../../../../utils/TimerDuration';
import dayjs from 'dayjs';
import { createManualTimeEntry } from '../../../../features/task/taskService';
import toast from 'react-hot-toast';
import SaveFilterToast from '../../../TasksHeader/ui/Filter/ui/Toast';
import ArrowDown from '../../../../assets/icons/ArrowDown';

export function ManualTime() {
  const { HistoryFilterMemory, selectedDate, timerDetails } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const [data, setData] = useState<{ [key: string]: string }>({
    memo: 'E.g 3 hours 40 mins',
    startDate: '',
    endDate: ''
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { mutateAsync } = createManualTimeEntry();

  // const handleChange = ({ value, target }: { value: string; target: string }) => {
  //   setData((prev) => ({ ...prev, [target]: value }));
  // };
  const handleDateClose = () => setAnchorEl(null);
  const handleSubmit = () => {
    if (selectedDate?.to) {
      mutateAsync({
        description: timerDetails.description,
        end_date: selectedDate.to.format('YYYY-MM-DD HH:mm:ss'),
        id: activeItemId,
        isBillable: timerDetails.isBillable,
        start_date: selectedDate?.from?.format('YYYY-MM-DD HH:mm:ss'),
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
    <div className="flex flex-col space-y-4 w-full pt-7 pb-1.5">
      <div className="flex items-center px-2 pt-5 justify-between w-full">
        <label htmlFor="timeDetails" className="flex flex-col space-y-1.5 w-1/2">
          <span
            className="w-11/12 h-9 flex items-center justify-between p-1.5 text-alsoit-gray-100 text-alsoit-text-md rounded-md bg-white relative"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <span>
              {selectedDate?.from?.format('ddd DD, MMM | ') ?? 'Now'}
              {HistoryFilterMemory?.time?.from ?? ''}
            </span>
            <ArrowDown className="w-3 h-3" />
            {anchorEl && <DatePicker anchorEl={anchorEl} handleClose={handleDateClose} styles="flex" range />}
          </span>
        </label>
        <label htmlFor="detailsDate" className="flex flex-col space-y-1.5 w-1/2">
          <span
            className="w-11/12 h-9 flex items-center justify-between p-1.5 text-alsoit-gray-100 text-alsoit-text-md rounded-md bg-white relative"
            onClick={(e) => setAnchorEl(e.currentTarget)}
          >
            <span>
              {selectedDate?.to?.format('ddd DD, MMM | ') ?? 'Now'}
              {HistoryFilterMemory?.time?.to ?? ''}
            </span>
            <ArrowDown className="w-3 h-3" />
            {anchorEl && <DatePicker anchorEl={anchorEl} handleClose={handleDateClose} styles="flex" range />}
          </span>
        </label>
      </div>
      <div className="flex justify-end pr-6">
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
