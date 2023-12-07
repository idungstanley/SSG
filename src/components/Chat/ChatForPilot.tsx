import React, { useState } from 'react';
import ChatSection from './components/ChatSection';
import CollectionWrapper, { ICollection } from './components/CollectionWrapper/CollectionWrapper';
import ChatFilter from '../../assets/icons/ChatFilter';
import ChatSearch from '../../assets/icons/ChatSearch';
import { useAppSelector } from '../../app/hooks';
import AddCircleWhite from '../../assets/icons/propertyIcons/AddCircleWhite';
import PlusCircle from '../../assets/icons/AddCircle';
import AddNewChat from './components/ChatSection/components/AddNewChat';

const mockChatsData = [
  {
    name: 'MARKET TEAM 1',
    active: true
  },
  {
    name: 'UI/UX TEAM Z',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'ENGINEERING',
    active: true
  },
  {
    name: 'AUDIT UNIT AB',
    active: false
  },
  {
    name: 'MARKETING',
    active: false
  },
  {
    name: 'UX RESEARCH 2',
    active: false
  },
  {
    name: 'UX RESEARCH 2',
    active: false
  }
];

export default function ChatForPilot() {
  const { activeChat } = useAppSelector((state) => state.chat);

  const [addChat, setAddChat] = useState<boolean>(false);
  const [btnHover, setBtnHover] = useState<boolean>(false);
  const [isArchived, setArchived] = useState<boolean>(false);
  const [filteredCollections, setFilteredCollections] = useState<ICollection[]>(mockChatsData);
  const [searchChatValue, setSearchChatValue] = useState<string>('');

  const handleSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchChatValue(value);
    if (value.length) {
      setFilteredCollections(
        mockChatsData.filter((collection) => collection.name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(mockChatsData);
    }
  };

  return (
    <>
      <div className="w-full h-full border-b border-r">
        {/* main section */}
        <div className="w-full h-full">
          {!activeChat ? (
            <div className="p-2 px-4 space-y-2">
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center w-[67px] h-8 gap-1 p-2 text-white rounded-md cursor-pointer bg-alsoit-gray-75 hover:bg-alsoit-gray-100"
                  onClick={() => setAddChat((prev) => !prev)}
                  onMouseEnter={() => setBtnHover(true)}
                  onMouseLeave={() => setBtnHover(false)}
                >
                  {btnHover ? <AddCircleWhite /> : <PlusCircle color="white" />}
                  <span>ADD</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-alsoit-gray-125">
                    <ChatFilter />
                  </div>
                  <div
                    className="flex justify-between items-center px-1 py-0.5 bg-alsoit-gray-125 items-center rounded-md"
                    style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                  >
                    Archived
                    <span className="flex items-center pl-3">
                      <label className="switch small" onClick={(event) => event.stopPropagation()}>
                        <input
                          className="inputShow"
                          type="checkbox"
                          checked={isArchived}
                          onChange={() => setArchived(!isArchived)}
                        />
                        <div className={`slider ${isArchived ? 'checked' : ''}`} />
                      </label>
                    </span>
                  </div>
                  <div className="flex items-center justify-center bg-white rounded-md chatSearch">
                    <span className="chatSearch_icon">
                      <ChatSearch color="#919191" />
                    </span>
                    <input
                      className="ring-0 focus:ring-0 focus:outline-0"
                      type="text"
                      value={searchChatValue}
                      placeholder="Search chats"
                      onChange={(e) => handleSearchChat(e)}
                    />
                  </div>
                </div>
              </div>
              {addChat && <AddNewChat onClose={() => setAddChat(false)} />}
            </div>
          ) : null}
          {'designers'.startsWith(searchChatValue) || !searchChatValue.length ? <ChatSection /> : null}
          {!activeChat ? (
            <div className="px-4">
              {filteredCollections.map((collection, index) => (
                <CollectionWrapper key={collection.name + index} collection={collection} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
