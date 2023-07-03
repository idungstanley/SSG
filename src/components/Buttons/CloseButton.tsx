import { CgClose } from 'react-icons/cg';
import ToolTip from '../Tooltip/Tooltip';

interface closeBtnProps {
  clearFn: () => void;
}

export function CloseBtn({ clearFn }: closeBtnProps) {
  return (
    <div
      className="absolute left-20 top-0 flex items-center bg-red-500 rounded-full p-1 h-4 w-4 cursor-pointer"
      onClick={clearFn}
    >
      <ToolTip tooltip="clear filters">
        <CgClose className="text-white h-2 w-2 font-semibold" />
      </ToolTip>
    </div>
  );
}
