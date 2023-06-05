import { AiOutlineCaretDown } from 'react-icons/ai';
import { Chevron } from '../Chevron';

interface LabelProps {
  listName?: string;
  onClickChevron: () => void;
  showTable: boolean;
}

export function Label({ listName, onClickChevron, showTable }: LabelProps) {
  return (
    <div className="flex">
      <div className="flex justify-between space-x-10 items-center bg-purple-500 rounded-br-md -mt-1 py-1 px-1">
        <div className="flex space-x-2 items-center text-sm text-white  w-fit">
          <Chevron onToggle={onClickChevron} active={showTable} />

          <h1 className="">{listName ?? 'Loading...'}</h1>
        </div>

        <button className="p-1 rounded-sm bg-gray-200  flex justify-center items-center space-x-1">
          <span>Add</span> <AiOutlineCaretDown className="text-gray-500 w-3 h-3 " />
        </button>
      </div>
    </div>
  );
}
