import { useAppSelector } from '../../../../app/hooks';
import { ImyTaskData } from '../../../../features/task/taskSlice';

interface AgendaProps {
  entityTaskData: ImyTaskData[];
}

export default function Agenda({ entityTaskData }: AgendaProps) {
  const { selectedDate } = useAppSelector((state) => state.workspace);

  const checkSchedule = () =>
    entityTaskData?.find((task) => selectedDate?.date.format('YYYY-MM-DD') === task.start_date);

  return (
    <div className="flex flex-col space-y-2">
      <p className="text-center font-semibold text-alsoit-text-lg border-b-2">Schedule for Today</p>
      {checkSchedule() ? (
        entityTaskData.map(
          (task) =>
            selectedDate?.date.format('YYYY-MM-DD') === task.start_date && (
              <div key={task.id} className="flex space-x-2 border-b py-2 hover:bg-alsoit-gray-75 cursor-pointer">
                <span className="w-1/5 px-2 text-alsoit-text-lg font-semibold capitalize">{task.name}</span>
                <span className="w-2/5 px-2 text-alsoit-text-lg font-semibold capitalize">{task.description}</span>
                <span className="w-1/5 px-2 text-alsoit-text-lg font-semibold capitalize">
                  {task.priority as string}
                </span>
                <span className="w-1/5 px-2 text-alsoit-text-lg font-semibold capitalize">{task.status.name}</span>
              </div>
            )
        )
      ) : (
        <span className="text-center text-alsoit-text-lg font-semibold py-4">No Agenda for the selected Date</span>
      )}
    </div>
  );
}
