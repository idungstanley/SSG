import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import {
  TIME_INVENTORY_CUSTOM_PROPERTIES,
  TIME_INVENTORY_HEADER
} from '../../../../utils/Constants/TimeClockConstants';
import { useGetTimeEntriesMutation } from '../../../../features/task/taskService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import PlusCircle from '../../../../assets/icons/AddCircle';
import DropdownWithHeader from './components/DropdownWithHeader';

export function LogHeaders() {
  const { timeSortArr } = useAppSelector((state) => state.task);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);

  const { mutateAsync } = useGetTimeEntriesMutation();

  const headers = () => (
    <tr className="w-full flex space-x-0.5">
      {TIME_INVENTORY_HEADER.map((header, index) => {
        return (
          <th
            key={index}
            className={
              index === 0
                ? 'sticky left-0 w-[15rem] px-2 bg-alsoit-gray-50 z-20 border-b'
                : 'w-20 border-b flex justify-between items-center'
            }
            style={{ whiteSpace: 'nowrap' }}
          >
            {!header.isHidden && (
              <span
                className={`uppercase text-alsoit-text-md ${
                  index === 0 ? 'float-left clear-both' : 'text-center'
                } font-semibold`}
              >
                {header.name}
              </span>
            )}
            {index === 1 && (
              <div onClick={(e) => setAnchor(e.currentTarget)}>
                <PlusCircle className="cursor-pointer" />
              </div>
            )}
          </th>
        );
      })}
    </tr>
  );

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
      <DropdownWithHeader anchor={anchor} setAnchor={setAnchor} header="custom property" subHeader="select property">
        {TIME_INVENTORY_CUSTOM_PROPERTIES.map((entity) => (
          <div
            className="flex w-full p-1.5 space-y-2 text-orange-500 capitalize cursor-pointer hover:bg-alsoit-gray-50"
            key={entity.value}
          >
            {entity.name}
          </div>
        ))}
      </DropdownWithHeader>
    </div>
  );
}
