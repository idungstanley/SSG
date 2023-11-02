import { useState } from 'react';
import { ChatStickyCol } from './ChatStickyCol';
import ToolTip from '../../Tooltip/Tooltip';
import Copy from '../../../assets/icons/Copy';
import { listColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { IChatFromList } from '../../../features/chat/chat.interfaces';
import Enhance from '../../badges/Enhance';
import Effect from '../../../assets/icons/Effect';
import { ChatCol } from './ChatCol';

export const MAX_SUBTASKS_LEVEL = 10;

interface IChatRowProps {
  chat: IChatFromList;
  columns: listColumnProps[];
}

export function ChatRow({ chat, columns }: IChatRowProps) {
  const [isCopied, setIsCopied] = useState<number>(0);
  const [hoverOn, setHoverOn] = useState(false);

  const otherColumns = columns.slice(1);

  const handleCopyTexts = async () => {
    await navigator.clipboard.writeText(chat.name);
    setIsCopied(1);
    setTimeout(() => {
      setIsCopied(0);
    }, 1000);
  };

  return (
    <tr
      className="relative contents group dNFlex"
      onMouseEnter={() => setHoverOn(true)}
      onMouseLeave={() => setHoverOn(false)}
    >
      <ChatStickyCol chat={chat} hoverOn={hoverOn} setHoverOn={setHoverOn}>
        {/* actions */}
        <div className="flex items-center justify-center mr-1 space-x-1">
          {/* Copy */}
          <ToolTip title={isCopied === 0 ? 'Copy Chat Name' : 'Copied'}>
            <button
              className={`p-1 bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
              onClick={handleCopyTexts}
            >
              <Copy />
            </button>
          </ToolTip>
          {/* effects */}
          <ToolTip title="Apply Effects">
            <button
              className={`p-1 bg-white border rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundColor: 'orange' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Effect className="w-3 h-3" />
            </button>
          </ToolTip>

          {/* show create subtask field */}
          <ToolTip title="Enhance View">
            <button
              className={`p-1 pl-4 bg-white rounded-md ${hoverOn ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Enhance className="w-3 h-3" style={{ color: 'orange' }} />
            </button>
          </ToolTip>
        </div>
      </ChatStickyCol>

      {otherColumns.map((col) => (
        <ChatCol key={col.id} field={col.field} chat={chat} value={col.value} />
      ))}
    </tr>
  );
}
