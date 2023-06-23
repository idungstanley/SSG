import { CgClose } from 'react-icons/cg';
import ToolTip from '../Tooltip';

interface closeBtnProps {
  clearFn: () => void;
}

export function CloseBtn({ clearFn }: closeBtnProps) {
  return (
    <ToolTip tooltip="clear filters">
      <div className="absolute right-0 -top-3 bg-red-500 rounded-full p-1 h-4 w-4 cursor-pointer" onClick={clearFn}>
        <CgClose className="text-white h-2 w-2 font-semibold" />
      </div>
    </ToolTip>
  );
}
