import ArrowDown from '../../../../assets/icons/ArrowDown';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import { HeaderIcons } from './TimeHeaderIcons';
import { TotalTime } from './TotalTime';

interface Props {
  totalDuration: number | undefined;
}

export function InventoryHeader({ totalDuration }: Props) {
  return (
    <div className="absolute -top-1.5 -left-1 flex justify-between items-center w-full">
      <div className="flex space-x-1.5 items-center">
        <label
          htmlFor="inventoryHeader"
          className="flex items-center justify-evenly bg-alsoit-gray-100 w-32 py-1.5 rounded-top"
        >
          <div className="flex items-center">
            <div className="cursor-pointer bg-alsoit-gray-100 rounded-xl">
              <CollapseIcon
                active
                onToggle={() => console.log('change this')}
                iconColor="rgb(244 244 244)"
                color="#424242"
              />
            </div>
          </div>
          <span className="uppercase text-alsoit-gray-50 text-alsoit-text-md">time log</span>
          <div className="flex space-x-1 items-center bg-alsoit-gray-50 rounded-md p-1">
            <span className="capitalize text-alsoit-text-md text-alsoit-gray-100">add</span>
            <ArrowDown className="w-2 h-2 cursor-pointer" />
          </div>
        </label>
        <div className="flex items-center relative border bg-white rounded px-1.5 border-alsoit-gray-200 w-20 h-6">
          <TotalTime totalDuration={totalDuration} />
          <span className="absolute -top-1.5 bg-white px-0.5 text-alsoit-text-sm">Total Time</span>
        </div>
      </div>
      <HeaderIcons meMode />
    </div>
  );
}
