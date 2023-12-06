import React, { useState } from 'react';
import CollapseIcon from '../../Views/ui/collapseIcon/CollapseIcon';
import CollectionsIcon from '../../../assets/icons/chatIcons/CollectionsIcon';
import SharePilotIcon from '../../../assets/icons/SharePilotIcon';
import NotificationIcon from '../../../assets/icons/NotificationIcon';
import EmailIcon from '../../../assets/icons/EmailIcon';
import EditIcon from '../../../assets/icons/chatIcons/EditIcon';
import TrashIcon from '../../../assets/icons/chatIcons/TrashIcon';
import PermissionIcon from '../../../assets/icons/chatIcons/PermissionIcon';
// import { columnTypesProps } from './Templates/Components/CustomPropertyList';
import ChatAddModal from '../../Chat/components/ChatAddModal';
import ToolTip from '../../Tooltip/Tooltip';

export interface ICollection {
  name: string;
  active: boolean;
}

interface ICollectionWrapperProps {
  titleElement?: JSX.Element;
  type?: string;
  bodyElement?: JSX.Element;
  isActiveColumn: boolean;
  cardName?: string;
  setActiveColumn: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardWrapper({
  titleElement,
  cardName,
  bodyElement,
  isActiveColumn,
  type = 'chat',
  setActiveColumn
}: ICollectionWrapperProps) {
  const [openCard, setOpenCard] = useState<boolean>(false);

  return (
    <div className="flex flex-col mb-2 rounded-md" style={{ background: isActiveColumn ? '#E6FAE9' : '#FEF6E6' }}>
      {/* header */}
      <div
        className="grid items-center justify-between w-full h-8 gap-2 group"
        style={{ gridTemplateColumns: '45% 50%' }}
      >
        <div className="grid items-center gap-1 group/header" style={{ gridTemplateColumns: '80% 50px' }}>
          <div
            className={`relative flex items-center w-full gap-2 px-2 py-1 space-x-1 text-white  cursor-default grow dFlex ${
              openCard ? 'rounded-tl-lg rounded-br-lg' : 'rounded-md rounded-tr-none'
            }`}
            style={{
              minHeight: '32px',
              backgroundColor: isActiveColumn ? '#00CC25' : '#F7A100'
            }}
          >
            <div
              className={`flex items-center justify-center w-5 h-5 cursor-pointer ${
                openCard ? 'origin-center rotate-90' : ''
              }`}
              onClick={() => setOpenCard((prev) => !prev)}
            >
              <CollapseIcon color="#A854F7" active={true} onToggle={() => null} hoverBg="white" />
            </div>
            {titleElement}
            {type === 'chat' && (
              <div className="hidden group-hover/header:flex items-center justify-center h-6 bg-white rounded-[5px] w-12">
                <ChatAddModal />
              </div>
            )}
          </div>
          {cardName && !openCard && (
            <ToolTip title={cardName}>
              <div
                className={`relative flex items-center w-10 overflow-hidden fade-out ${
                  isActiveColumn ? 'light-green' : 'light-orange'
                }`}
              >
                <p className="overflow-hidden text-justify whitespace-nowrap">{cardName}</p>
              </div>
            </ToolTip>
          )}
        </div>
        <div className="flex items-center gap-1">
          {!openCard && (
            <>
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
              <div
                className="flex items-center justify-center bg-white"
                style={{ minWidth: '16px', height: '16px', fontSize: '8px', borderRadius: '3px' }}
              >
                <NotificationIcon width="9" height="11" color="orange" />
              </div>
              <div
                className="flex items-center justify-center bg-white"
                style={{ minWidth: '16px', height: '16px', fontSize: '8px', borderRadius: '3px' }}
              >
                <EmailIcon width="10" height="10" color="orange" />
              </div>
            </>
          )}
          <div className="flex items-center justify-end grow">
            <div
              className={`flex items-center gap-1  group-hover:opacity-100 ${openCard ? 'opacity-100' : 'opacity-0'}`}
            >
              {!openCard && (
                <div
                  className="flex items-center justify-center w-4 bg-white rounded-sm"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                >
                  <PermissionIcon color="orange" />
                </div>
              )}
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
                    checked={isActiveColumn}
                    onChange={() => setActiveColumn(!isActiveColumn)}
                  />
                  <div className={`slider ${isActiveColumn ? 'checked' : ''}`}></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openCard && <div>{bodyElement}</div>}
    </div>
  );
}
