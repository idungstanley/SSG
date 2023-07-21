import { useMemo, useState } from 'react';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import SectionArea from '../SectionArea';
import MiniDatePicker from '../../../DatePicker/MiniCalendar';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';

export default function Calendar() {
  const [iconToggle, setIconToggle] = useState(false);
  const { listId } = useParams();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);

  console.log(selectedDate?.date.format('YYYY-MM-DD'));

  const { data } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  const entityTaskData = useMemo(() => data?.pages.flatMap((page) => page.data.tasks), [data]);

  const checkSchedule = () =>
    entityTaskData?.find((task) => selectedDate?.date.format('YYYY-MM-DD') === task.start_date);
  // console.log(entityTaskData);
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center w-full border-b-alsoit-border-base">
        <div onMouseEnter={() => setIconToggle(true)} onMouseLeave={() => setIconToggle(false)}>
          <SectionArea
            label="Calendar"
            icon={<CalendarIcon active={iconToggle} dimensions={{ width: 20, height: 20 }} />}
          />
        </div>
      </div>
      <div className="flex justify-center w-full px-2 pt-6">
        <MiniDatePicker />
      </div>
      {entityTaskData?.length && (
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
      )}
    </div>
  );
}
