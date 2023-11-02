import { ReactNode, TdHTMLAttributes, useRef, useState } from 'react';
import { useAppDispatch } from '../../../app/hooks';
import RoundedCheckbox from '../../Checkbox/RoundedCheckbox';
import { cl } from '../../../utils';
import { Capitalize } from '../../../utils/NoCapWords/Capitalize';
import { IChatFromList } from '../../../features/chat/chat.interfaces';
import { setActiveChat } from '../../../features/chat/chatSlice';
import { DEFAULT_COL_BG } from '../../Views/config';
import { getInitials } from '../../../app/helpers';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  chat: IChatFromList;
  children?: ReactNode;
  hoverOn?: boolean;
  setHoverOn: (i: boolean) => void;
}

export function ChatStickyCol({ hoverOn, setHoverOn, children, chat }: ColProps) {
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(false);

  const badgeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
  };

  return (
    <td className="sticky left-0 z-10 flex items-center justify-start text-sm font-medium text-gray-900 cursor-pointer text-start">
      <div className={`flex items-center h-full mr-1 space-x-1 ${hoverOn ? 'opacity-1' : 'opacity-0'}`}>
        <RoundedCheckbox
          onChange={onChange}
          isChecked={isChecked}
          styles="w-4 h-4 rounded-full opacity-100 cursor-pointer focus:outline-1 focus:ring-transparent  focus:border-2 focus:opacity-100 group-hover:opacity-100 text-alsoit-purple-300"
        />
      </div>
      <div
        ref={contentRef}
        onClick={() => dispatch(setActiveChat(chat.id))}
        className={cl(DEFAULT_COL_BG, 'relative w-full flex border-t items-center h-full')}
      >
        <div ref={divRef} className="flex flex-col items-start justify-start flex-grow max-w-full pl-2 space-y-1">
          <div className="flex items-center w-full text-left">
            <div className="flex items-center font-semibold alsoit-gray-300 text-alsoit-text-lg max-w-full">
              {/* avatar */}
              <span className="flex items-center justify-center w-6 h-6 p-1 pb-1 mr-1 text-md font-medium text-white uppercase bg-indigo-600 rounded-full cursor-pointer">
                {getInitials(chat.name)}
              </span>
              <div>{Capitalize(chat.name)}</div>
            </div>
            <div
              ref={badgeRef}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between flex-grow pl-2"
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </td>
  );
}
