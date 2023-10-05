import AssigneeIcon from '../../../../assets/icons/Assignee';
import { FilterListIcon } from '../../../../assets/icons/FilterListIcon';
import Me from '../../../../assets/icons/Me';
import SearchIcon from '../../../../assets/icons/SearchIcon';
import ShowIcon from '../../../../assets/icons/ShowIcon';

export function HeaderIcons() {
  return (
    <div className="flex justify-end space-x-0.5 px-1.5">
      <div className="p-1 rounded-md flex items-center bg-white cursor-pointer">
        <ShowIcon color="gray" className="w-3 h-3" />
      </div>
      <div className="p-1 rounded-md flex items-center bg-white cursor-pointer">
        <FilterListIcon active={false} className="w-3 h-3" />
      </div>
      <div className={'p-1 rounded-md flex items-center bg-white cursor-pointer '}>
        <Me active={false} className="w-3 h-3" />
      </div>
      <div className={'relative p-1 rounded-md flex items-center bg-white cursor-pointer '}>
        <AssigneeIcon className="w-3 h-3" active={false} />
      </div>
      <div className="p-1 rounded-md flex items-center bg-white cursor-pointer">
        <SearchIcon className="w-3 h-3" />
      </div>
    </div>
  );
}
