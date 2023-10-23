import { useAppSelector } from '../../../../app/hooks';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { selectCalendar } from '../../../../features/calendar/slice/calendarSlice';
import HubManagerIcon from '../../../../assets/icons/HubManager';

interface HeaderProps {
  onReset: (i: boolean, hubId: string) => void;
  activeItemName: string | null | undefined;
  hubId: string;
}

export function Header({ onReset, activeItemName, hubId }: HeaderProps) {
  const { blacklistIds } = useAppSelector(selectCalendar);

  return (
    <div className="relative h-10 p-2 flex border-b border-t items-center overflow-hidden">
      <div className="flex space-x-3 items-center">
        <div className="hr-checkbox-wrapper ml-2 flex justify-center items-center">
          <Checkbox
            styles="text-primary-500 focus:ring-primary-500 hr-checkbox"
            checked={blacklistIds.length === 0}
            setChecked={(e) => onReset(e, hubId)}
          />
        </div>
        <HubManagerIcon />
        <p className="capitalize">{activeItemName}</p>
      </div>
    </div>
  );
}
