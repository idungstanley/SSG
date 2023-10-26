import TimeClockIcon from '../../../assets/icons/TimeClockIcon';

export default function MyOverviewHrPage() {
  return (
    <div className="flex w-full h-full items-center justify-center" style={{ color: 'orange' }}>
      <div className="flex">
        <TimeClockIcon />
        <h2 className="pl-2">IN PROGRESS</h2>
      </div>
    </div>
  );
}
