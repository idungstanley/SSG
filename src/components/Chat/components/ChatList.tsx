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

  const listColor = { outerColour: '#F4F4F4' };

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
      <div className="h-full gap-1 p-2 bg-white">
        <div style={{ background: '#F4F4F4' }}>
          {/* header */}
          <div className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-2">
              <div
                className="py-1 relative px-2 rounded-tl-md rounded-br-md flex items-center space-x-1 text-white dFlex"
                style={{
                  backgroundColor: 'rgb(165, 165, 165)',
                  gap: '5px'
                }}
              >
                CHAT
                <div className="flex items-center justify-center h-6 bg-white rounded-[5px] w-12">
                  <ChatAddModal />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                <ShowIcon color="orange" width="21" height="21" />
              </div>
              <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                <ChatFilter />
              </div>
              <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md">
                <ChatMe />
              </div>
              <div className="flex justify-center bg-white items-center h-6 w-12 rounded-md">
                <ChatAssign />
                <ArrowDrop color="orange" />
              </div>
              <div className="flex justify-center bg-white items-center h-6 w-6 rounded-md mr-2">
                <ChatSearch />
              </div>
            </div>
          </div>
          <div>
            <div className="sticky top-0 mr-2 px-2 pt-2 table-container overflow-hidden z-10" ref={tableHeadElement}>
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
                  listColor={listColor}
                />
              </table>
            </div>
            <ScrollableHorizontalListsContainer ListColor={listColor} returnScrollLeft={handleScrollLeft}>
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
          </div>
        </div>
      </div>
    </>
  );
}
