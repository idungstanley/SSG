import { Button } from '@mui/material';
import { useAppSelector } from '../../app/hooks';
import { useSaveData } from '../../features/task/taskService';
import { pilotTabs } from '../../app/constants/pilotTabs';

interface DatePickerFooterProps {
  time: string;
  closeDateModal: () => void;
  miniMode: boolean;
}

export default function DatePickerFooter({ closeDateModal, time }: DatePickerFooterProps) {
  const { selectedDate, HistoryFilterMemory } = useAppSelector((state) => state.task);

  const { mutateAsync } = useSaveData();
  const handleSubmit = () => {
    mutateAsync({ key: pilotTabs.CALENDAR, value: { selectedDate, HistoryFilterMemory } });
  };

  return (
    <div className="flex items-center justify-end w-full">
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          <span className="text-xs italic font-semibold">{time}</span>
        </div>
        <div className="flex space-x-1">
          <Button
            onClick={closeDateModal}
            variant="outlined"
            className="bg-alsoit-purple-300"
            size={'small'}
            sx={{
              ':hover': { background: 'black', color: 'white' },
              height: '32px',
              fontSize: '10px',
              borderRadius: '8px'
            }}
          >
            Close
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            size={'small'}
            disableElevation={true}
            sx={{
              background: '#008000',
              ':hover': { background: '#c128f5' },
              height: '32px',
              fontSize: '10px',
              borderRadius: '8px'
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
