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

  const [collapseTasks, setCollapseTasks] = useState(false);
  const [tableHeight, setTableHeight] = useState<string | number>('auto');

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

  const listColor = { outerColour: '#B2B2B2' };

  if (isLoading)
    return (
      <div className="justify-center w-6 mx-auto mt-5">
        <Spinner size={8} color="#0F70B7" />
      </div>
    );

  console.log(data);

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
      <div className="sticky top-0 mr-2 pl-2 pt-2 table-container overflow-hidden z-10" ref={tableHeadElement}>
        <table
          style={
            !collapseTasks
              ? {
                  display: 'grid',
                  gridTemplateColumns: generateChatGrid(columns.length)
                }
              : undefined
          }
          className="w-full"
        >
          <ChatHead
            collapseTasks={collapseTasks}
            onToggleCollapseTasks={() => setCollapseTasks((prev) => !prev)}
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
            style={
              !collapseTasks
                ? {
                    display: 'grid',
                    gridTemplateColumns: generateChatGrid(columns.length)
                  }
                : undefined
            }
            className="w-full"
            ref={tableElement}
          >
            {/* rows */}
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
    </>
  );
}
