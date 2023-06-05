import { Chevron } from '../Chevron';

interface LabelProps {
  listName?: string;
  onClickChevron: () => void;
  showTable: boolean;
}

export function Label({ listName, onClickChevron, showTable }: LabelProps) {
  return (
    <div className="flex">
      <div className="flex justify-between space-x-10 items-center bg-purple-500 rounded-br-md -mt-1 py-2 px-2">
        <div className="flex space-x-2 items-center text-sm text-white  w-fit">
          <Chevron onToggle={onClickChevron} active={showTable} />

          <h1 className="">{listName ?? 'Loading...'}</h1>
        </div>

        <button className="p-1 rounded-md bg-gray-200">click</button>
      </div>
    </div>
  );
}
