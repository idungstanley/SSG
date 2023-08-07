import { CgClose } from 'react-icons/cg';
import ToolTip from '../Tooltip/Tooltip';

interface closeBtnProps {
  clearFn: () => void;
  size?: string;
}

export function CloseBtn({ clearFn, size }: closeBtnProps) {
  return (
    <div
      className={`absolute -right-3 top-0 flex items-center bg-red-500 rounded-full p-1 cursor-pointer ${size}`}
      onClick={clearFn}
    >
      <ToolTip title="clear filters">
        <CgClose className="w-2 h-2 font-semibold text-white" />
      </ToolTip>
    </div>
  );
}
