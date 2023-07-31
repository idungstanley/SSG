import { CgClose } from 'react-icons/cg';
import ToolTip from '../Tooltip/Tooltip';

interface closeBtnProps {
  clearFn: () => void;
  size?: string;
}

export function CloseBtn({ clearFn, size }: closeBtnProps) {
  return (
    <div
      className={`absolute left-20 top-0 flex items-center bg-red-500 rounded-full p-1 cursor-pointer ${size}`}
      onClick={clearFn}
    >
      <ToolTip tooltip="clear filters">
        <CgClose className="text-white font-semibold" />
      </ToolTip>
    </div>
  );
}
