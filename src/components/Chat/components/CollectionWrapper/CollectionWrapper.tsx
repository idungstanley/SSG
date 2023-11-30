import { useState } from 'react';
import EmailIcon from '../../../../assets/icons/EmailIcon';
import NotificationIcon from '../../../../assets/icons/NotificationIcon';
import SharePilotIcon from '../../../../assets/icons/SharePilotIcon';
import CollectionsIcon from '../../../../assets/icons/chatIcons/CollectionsIcon';
import EditIcon from '../../../../assets/icons/chatIcons/EditIcon';
import PermissionIcon from '../../../../assets/icons/chatIcons/PermissionIcon';
import TrashIcon from '../../../../assets/icons/chatIcons/TrashIcon';
import CollapseIcon from '../../../Views/ui/collapseIcon/CollapseIcon';
import ChatAddModal from '../ChatAddModal';
import ToolTip from '../../../Tooltip/Tooltip';
import ChatTooltipWrapper from '../ChatTooltipWrapper/ChatTooltipWrapper';
import UnreadMessagesIcon from '../../../../assets/icons/chatIcons/UnreadMessagesIcon';
import UnreadMessagesCard from '../UnreadMessagesCard/UnreadMessagesCard';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { setOpenTootipContent } from '../../../../features/workspace/workspaceSlice';

export interface ICollection {
  name: string;
  active: boolean;
}

interface ICollectionWrapperProps {
  collection: ICollection;
}

export default function CollectionWrapper({ collection }: ICollectionWrapperProps) {
  const dispatch = useAppDispatch();

  const { isOpenTootipContent } = useAppSelector((state) => state.workspace);

  const [isActiveCollection, setActiveCollection] = useState(collection.active);
  const [openUnreadMessages, setOpenUnreadMessages] = useState(false);
  const [openTaggedMessages, setOpenTaggedMessages] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleHoverIntervalMouseIn = (type: string) => {
    const timeoutId = setTimeout(() => {
      if (type === 'notification' && !isOpenTootipContent) {
        setOpenUnreadMessages(true);
        dispatch(setOpenTootipContent(true));
      }
      if (type === 'tagged' && !isOpenTootipContent) {
        setOpenTaggedMessages(true);
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
    setOpenTaggedMessages(false);
    setOpenUnreadMessages(false);
    dispatch(setOpenTootipContent(false));
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  return (
    <div>
      {/* header */}
      <div
        className="flex items-center justify-between mb-2 border-b rounded-md group"
        style={{ background: isActiveCollection ? '#E6FAE9' : '#FEF6E6' }}
      >
        <div className="flex items-center gap-2 group/header">
          <div
            className="relative flex items-center gap-1 px-2 py-1 space-x-1 text-white rounded-md rounded-tr-none cursor-default dFlex"
            style={{
              minWidth: '145px',
              minHeight: '32px',
              backgroundColor: isActiveCollection ? '#00CC25' : '#F7A100'
            }}
          >
            <div className="cursor-pointer">
              <CollapseIcon color="#A854F7" active={true} onToggle={() => null} hoverBg="white" />
            </div>
            {collection.name}
            <div className="hidden group-hover/header:flex items-center justify-center h-6 bg-white rounded-[5px] w-12">
              <ChatAddModal />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <div
            className="flex items-center justify-center p-1 bg-white rounded-sm"
            style={{ minWidth: '16px', height: '16px', fontSize: '8px', color: 'orange' }}
          >
            5
          </div>
          <div
            className="flex items-center justify-center bg-white rounded-sm"
            style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
          >
            <span className="pr-1">
              <CollectionsIcon color="orange" />
            </span>
            Collection
          </div>
          <div
            className="flex items-center justify-center bg-white rounded-sm"
            style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
          >
            <span className="pr-1">
              <SharePilotIcon style={{ width: '8', height: '9' }} color="orange" />
            </span>
            Shared
          </div>
          <ToolTip
            open={openUnreadMessages}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom"
            title={
              <ChatTooltipWrapper
                onClose={handleClose}
                title="Unread messages"
                icon={<UnreadMessagesIcon color="white" />}
                showNotifications
              >
                <UnreadMessagesCard />
              </ChatTooltipWrapper>
            }
          >
            <button
              onMouseEnter={() => handleHoverIntervalMouseIn('notification')}
              onMouseLeave={handleHoverIntervalMouseOut}
              className="flex justify-center items-center bg-white"
              style={{ minWidth: '16px', height: '16px', fontSize: '8px', borderRadius: '3px' }}
            >
              <NotificationIcon width="9" height="11" color="orange" />
            </button>
          </ToolTip>
          <ToolTip
            open={openTaggedMessages}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            placement="bottom"
            title={
              <ChatTooltipWrapper
                onClose={handleClose}
                title="Tagged messages"
                icon={<EmailIcon width="14" height="14" color="white" />}
                showNotifications
              >
                <UnreadMessagesCard />
              </ChatTooltipWrapper>
            }
          >
            <button
              onMouseEnter={() => handleHoverIntervalMouseIn('tagged')}
              onMouseLeave={handleHoverIntervalMouseOut}
              className="flex justify-center items-center bg-white"
              style={{ minWidth: '16px', height: '16px', fontSize: '8px', borderRadius: '3px' }}
            >
              <EmailIcon width="10" height="10" color="orange" />
            </button>
          </ToolTip>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
            <div
              className="flex items-center justify-center w-4 bg-white rounded-sm"
              style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
            >
              <PermissionIcon color="orange" />
            </div>
            <div
              className="flex items-center justify-center w-4 bg-white rounded-sm"
              style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
            >
              <EditIcon color="orange" />
            </div>
            <div
              className="flex items-center justify-center w-4 bg-white rounded-sm"
              style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
            >
              <TrashIcon color="orange" />
            </div>
          </div>
          <div>
            <div className="flex items-center pr-2" style={{ transform: 'scale(.6)' }}>
              <label className="switch" onClick={(event) => event.stopPropagation()}>
                <input
                  className="inputShow"
                  type="checkbox"
                  checked={isActiveCollection}
                  onChange={() => setActiveCollection(!isActiveCollection)}
                />
                <div className={`slider ${isActiveCollection ? 'checked' : ''}`}></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
