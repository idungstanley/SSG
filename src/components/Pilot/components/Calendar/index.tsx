import { useMemo, useState } from 'react';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import SectionArea from '../SectionArea';
import MiniDatePicker from '../../../DatePicker/MiniCalendar';
import { useParams } from 'react-router-dom';
import { getTaskListService } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
// import Agenda from './Agenda';
import { UseGetWalletDetails } from '../../../../features/wallet/walletService';
import { UseGetHubDetails } from '../../../../features/hubs/hubService';

export default function Calendar() {
  const [iconToggle, setIconToggle] = useState(false);
  const { listId, walletId, hubId } = useParams();
  const { filterTaskByAssigneeIds } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { data: list } = getTaskListService({ listId, assigneeUserId: filterTaskByAssigneeIds });

  const { data: wallet } = UseGetWalletDetails({ activeItemId, activeItemType });

  const { data: hub } = UseGetHubDetails({
    activeItemId: hubId,
    activeItemType: 'hub'
  });

  const entityTaskData = useMemo(() => {
    if (listId) {
      return list?.pages.flatMap((page) => page.data.tasks);
    }
    if (walletId) {
      return [wallet?.data.wallet];
    }
    if (hubId) {
      return [hub?.data.hub];
    }
    return [];
  }, [listId, list]);

  console.log(entityTaskData);
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
      {/* {entityTaskData?.length && <Agenda entityTaskData={entityTaskData} />} */}
    </div>
  );
}
