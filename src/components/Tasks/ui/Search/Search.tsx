import { GrFormSearch } from 'react-icons/gr';
import { RxDividerVertical } from 'react-icons/rx';
import { VscEllipsis } from 'react-icons/vsc';

export function Search() {
  return (
    <div className="flex items-center justify-between p-2">
      <GrFormSearch className="w-5 h-5 " />
      <input
        type="text"
        placeholder="Search tasks..."
        className="border-transparent focus:border-transparent h-5 w-full focus:ring-0 font-bold"
        style={{ fontSize: '11px' }}
      />
      <div className=" p-1 border-gray-400 hover:bg-gray-200  rounded ">
        <VscEllipsis className=" " />
      </div>
      <div className="border-gray-100">
        <RxDividerVertical className=" " />
      </div>
    </div>
  );
}
