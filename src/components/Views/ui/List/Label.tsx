import { Chevron } from '../Chevron';

interface LabelProps {
  listName?: string;
  onClickChevron: () => void;
  showTable: boolean;
}

export function Label({ listName, onClickChevron, showTable }: LabelProps) {
  return (
    <div>
      <div className="flex justify-between space-x-10 items-center">
        <div className="flex space-x-2 items-center">
          <Chevron onToggle={onClickChevron} active={showTable} />

          <h1 className="p-2 px-4 text-sm text-white bg-purple-500 rounded-br-md w-fit">{listName ?? 'Loading...'}</h1>
        </div>

        <button className="p-1 rounded-md bg-gray-200">click</button>
      </div>
    </div>
  );
}
