import { TdHTMLAttributes } from 'react';
import { useParams } from 'react-router-dom';
import { IChatFromList } from '../../../features/chat/chat.interfaces';
import { listColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../Views/config';
import { cl } from '../../../utils';
import ChatMessageIcon from '../../../assets/icons/ChatMessageIcon';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  value: string;
  field: Pick<listColumnProps, 'field'>['field'];
  chat: IChatFromList;
}

export function ChatCol({ value, field, chat }: ColProps) {
  const { taskId } = useParams();

  const COL_BG = taskId === chat.id ? ACTIVE_COL_BG : DEFAULT_COL_BG;

  // fields config
  const fields: Record<string, JSX.Element> = {
    latest_chats: <div className="py-2">Nath: This is another task for you based on...</div>,
    chats: (
      <div className="flex items-center">
        <ChatMessageIcon />
        <span className="ml-1 font-medium">3</span>
      </div>
    ),
    date: <div>Yesterday</div>,
    single_label: (
      <div
        className="top-0 flex flex-col items-center justify-center w-full h-full px-1 text-xs font-medium text-center text-white capitalize bg-green-500"
        style={{ backgroundColor: 'blue' }}
      >
        Option 1
      </div>
    )
  };

  return (
    <td className={cl(COL_BG, 'relative flex justify-center items-center border-t text-sm font-medium text-gray-900')}>
      {field in fields ? fields[field] : String(value)}
    </td>
  );
}
