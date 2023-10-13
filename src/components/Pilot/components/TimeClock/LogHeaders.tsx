import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { FilterListIcon } from '../../../../assets/icons/FilterListIcon';
import { InfoIcon } from '../../../../assets/icons/InfoIcon';
import { SortIcon } from '../../../../assets/icons/SortIcon';
import { SortOption, setTimeSortArr } from '../../../../features/task/taskSlice';
import { TIME_INVENTORY_HEADER } from '../../../../utils/Constants/TimeClockConstants';
import { useGetTimeEntriesMutation } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';

export function LogHeaders() {
  const dispatch = useAppDispatch();

  const { timeSortArr } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);

  const { mutateAsync } = useGetTimeEntriesMutation();

  const handleClick = ({ field }: { field: string }) => {
    const newData: SortOption[] = timeSortArr.map((data) => {
      if (data.field === field) {
        return { field, dir: data.dir === 'asc' ? 'desc' : 'asc' };
      }
      return data;
    });

    if (!newData.some((data) => data.field === field)) {
      newData.push({ field, dir: 'asc' });
    }
    TIME_INVENTORY_HEADER.map((header) => {
      if (header.value === field) header.sorted = true;
    });
    dispatch(setTimeSortArr(newData));
  };

  const headers = () =>
    TIME_INVENTORY_HEADER.map((header, index) => {
      return (
        <div
          key={index}
          className={`${
            index <= 1 ? 'header-cell-reduced' : 'header-cell'
          } cursor-grab text-alsoit-text-md flex space-x-1 items-center group`}
        >
          <span>{header.name}</span>
          <div className="flex space-x-0.5 items-center invisible group-hover:visible">
            <div className="rounded-full bg-white">
              <InfoIcon className="w-4 h-4 hover:bg-alsoit-purple-50 hover:cursor-pointer" />
            </div>
            <div className={`${header.sorted ? 'bg-alsoit-purple-50' : 'bg-white'} rounded-full`}>
              <SortIcon
                className="w-4 h-4 hover:bg-alsoit-purple-50 hover:cursor-pointer"
                onClick={() => handleClick({ field: header.value })}
              />
            </div>
            <div className="rounded-full bg-white">
              <FilterListIcon className="w-4 h-4 hover:bg-alsoit-purple-50 hover:cursor-pointer" />
            </div>
          </div>
        </div>
      );
    });

  useEffect(() => {
    mutateAsync({
      itemId: activeItemId,
      trigger:
        activeItemType === EntityType.hub || activeItemType === EntityType.subHub ? EntityType.hub : activeItemType,
      sorting: timeSortArr
    });
  }, [timeSortArr]);

  return (
    <div className="overflow-x-visible w-full">
      <div className="flex space-x-2">{headers()}</div>
    </div>
  );
}
