import { ChatStickyCol } from './ChatStickyCol';
import { listColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { IChatFromList } from '../../../features/chat/chat.interfaces';
import { ChatCol } from './ChatCol';
import ToolTip from '../../Tooltip/Tooltip';
import ChatAssignSticky from '../../../assets/icons/ChatAssignSticky';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import EmailIcon from '../../../assets/icons/EmailIcon';
import StarStickyIcon from '../../../assets/icons/chatIcons/StarStickyIcon';
import PinStickyIcon from '../../../assets/icons/chatIcons/PinStickyIcon';
import FullScreenStickyIcon from '../../../assets/icons/chatIcons/FullScreenStickyIcon';
import ChatTooltipWrapper from './ChatTooltipWrapper/ChatTooltipWrapper';
import TaggedCard from './TaggedCard/TaggedCard';
import { useState } from 'react';
import BookmarkCard from './BookmarkCard/BookmarkCard';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setOpenTootipContent } from '../../../features/workspace/workspaceSlice';

export const MAX_SUBTASKS_LEVEL = 10;

interface IChatRowProps {
  chat: IChatFromList;
  columns: listColumnProps[];
}

export function ChatRow({ chat, columns }: IChatRowProps) {
  const dispatch = useAppDispatch();

  const { isOpenTootipContent } = useAppSelector((state) => state.workspace);

  const [openTagged, setOpenTagged] = useState(false);
  const [openBookmark, setOpenBookmark] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleHoverIntervalMouseIn = (type: string) => {
    const timeoutId = setTimeout(() => {
      if (type === 'tagged' && !isOpenTootipContent) {
        setOpenTagged(true);
        dispatch(setOpenTootipContent(true));
      }
      if (type === 'bookmark' && !isOpenTootipContent) {
        setOpenBookmark(true);
        dispatch(setOpenTootipContent(true));
      }
    }, 500);
    setHoverTimeout(timeoutId);
  };

  const handleHoverIntervalMouseOut = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleClose = () => {
    setOpenTagged(false);
    setOpenBookmark(false);
    dispatch(setOpenTootipContent(false));
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const otherColumns = columns.slice(1);

  return (
    <tr className="relative contents group dNFlex">
      <ChatStickyCol chat={chat}>
        {/* actions */}
        <div className="mr-1 pt-[2px]">
          <div className="flex justify-end space-x-[2px] mb-[2px] opacity-0 group-hover:opacity-100">
            {/* star icon */}
            <ToolTip title="">
              <button className="flex justify-center items-center w-[14px] h-[14px] p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]">
                <StarStickyIcon color="orange" />
              </button>
            </ToolTip>
            {/* pin icon */}
            <ToolTip
              open={openBookmark}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom"
              title={
                <ChatTooltipWrapper
                  onClose={handleClose}
                  title="Bookmark"
                  icon={
                    <button className="relative">
                      <PinStickyIcon width="13" height="15" color="white" />
                      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] z-[1]">
                        3
                      </span>
                    </button>
                  }
                >
                  <BookmarkCard />
                </ChatTooltipWrapper>
              }
            >
              <button
                onMouseEnter={() => handleHoverIntervalMouseIn('bookmark')}
                onMouseLeave={handleHoverIntervalMouseOut}
                className="relative flex justify-center items-center w-[14px] h-[14px] p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]"
              >
                <PinStickyIcon color="orange" />
                <span className="absolute top-1/2 left-1/2 text-[orange] -translate-x-1/2 -translate-y-1/2 text-[4px] z-[1]">
                  3
                </span>
              </button>
            </ToolTip>
            {/* full screen icon */}
            <ToolTip title="">
              <button className="flex justify-center items-center w-[14px] h-[14px] p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]">
                <FullScreenStickyIcon color="orange" />
              </button>
            </ToolTip>
          </div>
          <div className="flex justify-end space-x-[2px] mb-[2px]">
            {/* notifications */}
            {chat.new_messages_count ? (
              <ToolTip title="">
                <button className="relative flex justify-center items-center w-5 h-[14px] text-[8px] p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]">
                  <NotificationIcon width="9" height="11" color="orange" />
                  <span className="absolute px-[1.5px] flex justify-center items-center top-[1.5px] right-[4px] min-w-[7px] h-[7px] rounded-[4px] bg-[#B30A0B] text-[5px] text-white">
                    {chat.new_messages_count}
                  </span>
                </button>
              </ToolTip>
            ) : (
              <div className="w-5 h-[14px]" />
            )}
            {/* pings */}
            <ToolTip
              open={openTagged}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="bottom"
              title={
                <ChatTooltipWrapper
                  onClose={handleClose}
                  title="Tagged"
                  icon={<EmailIcon width="14" height="14" color="white" />}
                  showNotifications
                >
                  <TaggedCard />
                </ChatTooltipWrapper>
              }
            >
              <button
                onMouseEnter={() => handleHoverIntervalMouseIn('tagged')}
                onMouseLeave={handleHoverIntervalMouseOut}
                className="relative flex justify-center items-center w-5 h-[14px] text-[8px] p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]"
              >
                <EmailIcon width="10" height="10" color="orange" />
                <span className="absolute p-[1.5px] flex justify-center items-center top-[1.5px] right-[4px] min-w-[7px] h-[7px] rounded-[4px] bg-[#B30A0B] text-[5px] text-white">
                  999
                </span>
              </button>
            </ToolTip>
          </div>
          <div className="flex justify-end">
            {/* chat assign */}
            <ToolTip placement="bottom" title="test">
              <button className="flex justify-center items-center p-px bg-alsoit-gray-125 group-hover:bg-white rounded-[3px]">
                <ChatAssignSticky color="orange" />
              </button>
            </ToolTip>
          </div>
        </div>
      </ChatStickyCol>

      {otherColumns.map((col) => (
        <ChatCol key={col.id} field={col.field} chat={chat} value={col.value} />
      ))}
    </tr>
  );
}
