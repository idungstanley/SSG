import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useGetChats } from '../../../features/chat/chatService';
import FullScreenMessage from '../../CenterMessage/FullScreenMessage';
import { Spinner } from '../../../common';
import { setShowCreateChatSideOver } from '../../../features/chat/chatSlice';
import { ExtendedListColumnProps } from '../../../pages/workspace/tasks/component/views/ListColumns';
import { ScrollableHorizontalListsContainer } from '../../ScrollableContainer/ScrollableHorizontalListsContainer';
import { ChatRow } from './ChatRow';
import { ChatHead } from './ChatHead';
import { generateChatGrid } from '../../Views/lib/generateGrid';
import ShowIcon from '../../../assets/icons/ShowIcon';
import ChatFilter from '../../../assets/icons/ChatFilter';
import ChatMe from '../../../assets/icons/ChatMe';
import ChatAssign from '../../../assets/icons/ChatAssign';
import ArrowDrop from '../../../assets/icons/ArrowDrop';
import ChatSearch from '../../../assets/icons/ChatSearch';
import ChatAddModal from './ChatAddModal';
import CollapseIcon from '../../Views/ui/collapseIcon/CollapseIcon';
import DropdownArrowIcon from '../../../assets/icons/chatIcons/DropdownArrowIcon';
import CollectionsIcon from '../../../assets/icons/chatIcons/CollectionsIcon';
import SharePilotIcon from '../../../assets/icons/SharePilotIcon';
import PermissionIcon from '../../../assets/icons/chatIcons/PermissionIcon';
import InformationIcon from '../../../assets/icons/chatIcons/InformationIcon';
import TrashIcon from '../../../assets/icons/chatIcons/TrashIcon';
import EditIcon from '../../../assets/icons/chatIcons/EditIcon';
import EmailIcon from '../../../assets/icons/EmailIcon';
import NotificationIcon from '../../../assets/icons/NotificationIcon';

const heads: ExtendedListColumnProps[] = [
  {
    id: 'title',
    field: 'title',
    value: 'Title',
    hidden: false,
    defaulField: true
  },
  {
    id: 'latest_chats',
    field: 'latest_chats',
    value: 'Latest chats',
    hidden: false,
    defaulField: true
  },
  {
    id: 'chats',
    field: 'chats',
    value: 'Chats',
    hidden: false,
    defaulField: true
  },
  {
    id: 'date',
    field: 'date',
    value: 'Date',
    hidden: false,
    defaulField: true
  },
  {
    id: 'single_label',
    field: 'single_label',
    value: 'Single label',
    hidden: false,
    defaulField: true
  }
];

export default function ChatsList() {
  const dispatch = useAppDispatch();

  const { pilotSideOver } = useAppSelector((state) => state.slideOver);
  const { type, id } = pilotSideOver;

  const [tableHeight, setTableHeight] = useState<string | number>('auto');
  const [isCollapse, setCollapse] = useState<boolean>(false);
  const [isActiveCollection, setActiveCollection] = useState(true);

  const collapseTasks = false;
  const columns = heads.filter((i) => !i.hidden);

  const tableHeadElement = useRef<HTMLTableElement>(null);
  const tableElement = useRef<HTMLTableElement>(null);

  // const { mutate: onDelete } = useDeleteChat();
  const { data, isLoading } = useGetChats({ id, type });

  useEffect(() => {
    if (tableElement.current) {
      setTableHeight(tableElement.current.offsetHeight);
    }
  }, []);

  // const handleDelete = (id: string) => {
  //   onDelete(id);
  // };

  const handleScrollLeft = (value: number) => {
    if (tableHeadElement.current && value >= 0) {
      tableHeadElement.current.scrollTo({ left: value });
    }
  };

  if (isLoading)
    return (
      <div className="justify-center w-6 mx-auto mt-5">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );

  return !data?.length ? (
    <FullScreenMessage
      title="No chats."
      description="Create one."
      showCta={true}
      ctaText="Create chat"
      ctaOnClick={() => dispatch(setShowCreateChatSideOver(true))}
    />
  ) : (
    <>
      <div className="h-full gap-1 p-2 px-4">
        <div
          style={{ background: isActiveCollection ? '#E6FAE9' : '#FEF6E6', overflow: 'hidden' }}
          className={`rounded-md ${isCollapse && 'group'}`}
        >
          {/* header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="group/header flex items-center gap-2">
                <div
                  className={`flex cursor-default gap-1 py-1 relative px-2 rounded-md ${
                    !isCollapse && 'rounded-bl-none'
                  } rounded-tr-none flex items-center space-x-1 text-white dFlex`}
                  style={{
                    minWidth: '145px',
                    minHeight: '32px',
                    backgroundColor: isActiveCollection ? '#00CC25' : '#F7A100'
                  }}
                >
                  <div className="cursor-pointer">
                    <CollapseIcon
                      color="#A854F7"
                      active={isCollapse}
                      onToggle={() => setCollapse(!isCollapse)}
                      hoverBg="white"
                    />
                  </div>
                  DESIGNERS
                  <div className="hidden group-hover/header:flex items-center justify-center h-6 bg-white rounded-[5px] w-12">
                    <ChatAddModal />
                  </div>
                </div>
              </div>
            </div>

            {!isCollapse ? (
              <div className="flex gap-1">
                <div
                  className="flex justify-between items-center px-1 py-0.5 bg-white items-center rounded-md"
                  style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                >
                  Read By Me
                  <span className="flex items-center pl-1 pr-1">
                    <label className="switch small" onClick={(event) => event.stopPropagation()}>
                      <input className="inputShow" type="checkbox" checked={false} />
                      <div className="slider" />
                    </label>
                  </span>
                  <DropdownArrowIcon color="orange" />
                </div>
                <div
                  className="flex justify-between items-center px-1 py-0.5 bg-white items-center rounded-md"
                  style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                >
                  Quick Filter
                  <span className="flex items-center pl-1">
                    <DropdownArrowIcon color="orange" />
                  </span>
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                  <ChatFilter />
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                  <ShowIcon color="orange" width="21" height="21" />
                </div>
                <div className="flex justify-center items-center h-6 rounded-md">
                  <div className="relative flex mr-px bg-white justify-center bg-white items-center h-6 w-6 rounded-tl-md rounded-bl-md">
                    <ChatMe />
                    <div
                      className="absolute top-[2px] -right-[0.5px] rounded-sm bg-alsoit-gray-100"
                      style={{ width: '0.5px', height: 'calc(100% - 4px)' }}
                    />
                  </div>
                  <div className="flex justify-center bg-white items-center h-6 pl-1 rounded-tr-md rounded-br-md">
                    <ChatAssign />
                    <ArrowDrop color="orange" />
                  </div>
                </div>
                <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md mr-2">
                  <ChatSearch />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <div
                  className="flex justify-center items-center p-1 rounded-sm bg-white"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', color: 'orange' }}
                >
                  5
                </div>
                <div
                  className="flex justify-center items-center rounded-sm bg-white"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                >
                  <span className="pr-1">
                    <CollectionsIcon color="orange" />
                  </span>
                  Collection
                </div>
                <div
                  className="flex justify-center items-center rounded-sm bg-white"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                >
                  <span className="pr-1">
                    <SharePilotIcon style={{ width: '8', height: '9' }} color="orange" />
                  </span>
                  Shared
                </div>
                <div
                  className="flex justify-center items-center bg-white rounded-[3px]"
                  style={{ minWidth: '16px', height: '16px' }}
                >
                  <NotificationIcon width="9" height="11" color="orange" />
                </div>
                <div
                  className="flex justify-center items-center bg-white rounded-[3px]"
                  style={{ minWidth: '16px', height: '16px' }}
                >
                  <EmailIcon width="10" height="10" color="orange" />
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
                  <div
                    className="w-4 flex justify-center items-center rounded-sm bg-white"
                    style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                  >
                    <PermissionIcon color="orange" />
                  </div>
                  <div
                    className="w-4 flex justify-center items-center rounded-sm bg-white"
                    style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                  >
                    <EditIcon color="orange" />
                  </div>
                  <div
                    className="w-4 flex justify-center items-center rounded-sm bg-white"
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
            )}
          </div>
          {!isCollapse ? (
            <div className="pr-8">
              <div className="sticky top-0 mr-2 px-2 table-container overflow-hidden z-10" ref={tableHeadElement}>
                <table
                  style={{
                    display: 'grid',
                    gridTemplateColumns: generateChatGrid(columns.length)
                  }}
                  className="w-full"
                >
                  <ChatHead
                    collapseTasks={collapseTasks}
                    headerStatusColor="#B2B2B2"
                    columns={columns}
                    listName="CHAT"
                    tableHeight={tableHeight}
                    background={isActiveCollection ? '#E6FAE9' : '#FEF6E6'}
                  />
                </table>
              </div>
              <ScrollableHorizontalListsContainer
                backgroud={isActiveCollection ? '#E6FAE9' : '#FEF6E6'}
                returnScrollLeft={handleScrollLeft}
              >
                <div className="table-container">
                  <table
                    style={{
                      display: 'grid',
                      gridTemplateColumns: generateChatGrid(columns.length)
                    }}
                    className="w-full"
                    ref={tableElement}
                  >
                    {!collapseTasks ? (
                      <tbody className="contents">
                        {data.map((chat) => (
                          <ChatRow key={chat.id} chat={chat} columns={columns} />
                        ))}
                      </tbody>
                    ) : null}
                  </table>
                </div>
              </ScrollableHorizontalListsContainer>
              <div className="flex items-center gap-1 px-2 pl-7 pb-4">
                <div
                  className="flex justify-center items-center rounded-sm bg-alsoit-gray-50 py-1 px-2"
                  style={{ minWidth: '16px', minHeight: '16px', fontSize: '8px', color: 'orange' }}
                >
                  <span className="pr-1">
                    <PermissionIcon color="orange" />
                  </span>
                  Permissions
                  <span className="pl-1">
                    <InformationIcon color="orange" />
                  </span>
                </div>
                <div
                  className="flex justify-center items-center rounded-sm bg-white"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                >
                  <span className="pr-1">
                    <CollectionsIcon color="orange" />
                  </span>
                  Collection
                </div>
                <div
                  className="flex justify-center items-center rounded-sm bg-white"
                  style={{ minWidth: '16px', height: '16px', fontSize: '8px', padding: '4px 2px', color: 'orange' }}
                >
                  <span className="pr-1">
                    <SharePilotIcon style={{ width: '8', height: '9' }} color="orange" />
                  </span>
                  Shared
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
