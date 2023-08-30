import { useAppSelector } from '../../../../../../../../app/hooks';
import ClockInOut from '../../../../../../../../components/Pilot/components/TimeClock/ClockInOut';

export default function TimeClockTabs() {
  const { showPilot } = useAppSelector((state) => state.workspace);
  return <section className="flex flex-col h-full">{showPilot && <ClockInOut />}</section>;
}
