import { useMemo, useState } from 'react';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import SectionArea from '../SectionArea';
import MiniDatePicker from '../../../DatePicker/MiniCalendar';
import { useParams } from 'react-router-dom';
import { UseGetFullTaskList, getTaskListService } from '../../../../features/task/taskService';
import { useAppSelector } from '../../../../app/hooks';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
// import Agenda from './Agenda';

export default function Calendar() {
  const [iconToggle, setIconToggle] = useState(false);
  const { listId, walletId, hubId } = useParams();

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { data: list } = getTaskListService(listId);
  const { data: taskList } = UseGetFullTaskList({ itemId: activeItemId, itemType: activeItemType });

  const entityHubData = () => {
    if (activeItemType === EntityType.hub || activeItemType === EntityType.wallet)
      return taskList?.pages.flatMap((data) => data.data.tasks);
  };

  // type guards
  // const isMyTaskData = (data: ImyTaskData | IWalletDetails | IHubDetails): data is ImyTaskData => {
  //   return (data as ImyTaskData).start_date !== undefined && (data as ImyTaskData).end_date !== undefined;
  // };

  const entityTaskData = useMemo(() => {
    if (listId && list) {
      return list?.pages[0].data.tasks;
    }
    if (walletId || (hubId && taskList)) {
      return entityHubData();
    }
    return [];
  }, [listId, list, entityHubData]);

  const filterFields = entityTaskData && [
    ...entityTaskData
      .flatMap((item) => {
        const custom_fields = item?.custom_fields;
        return custom_fields || [];
      })
      .filter((field) => field !== undefined),
    {
      start_date: '2023-05-01',
      end_date: '2023-05-01'
    }
  ];
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
