import { useMemo, useState } from 'react';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import SectionArea from '../SectionArea';
import MiniDatePicker from '../../../DatePicker/MiniCalendar';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import Agenda from './Agenda';

export default function Calendar() {
  const [iconToggle, setIconToggle] = useState(false);
  const { listId } = useParams();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { selectedDate } = useAppSelector((state) => state.workspace);

  const { data } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  const entityTaskData = useMemo(() => data?.pages.flatMap((page) => page.data.tasks), [data]);

  const checkSchedule = () =>
    entityTaskData?.find((task) => selectedDate?.date.format('YYYY-MM-DD') === task.start_date);
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
      {entityTaskData?.length && <Agenda entityTaskData={entityTaskData} />}
    </div>
  );
}
