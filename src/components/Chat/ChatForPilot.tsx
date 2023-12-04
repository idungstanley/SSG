import React, { useState } from 'react';
import CreateChatSideOver from './components/CreateChatSideOver';
import ChatSection from './components/ChatSection';
// import Contacts from './components/Contacts';
import CollectionWrapper, { ICollection } from './components/CollectionWrapper/CollectionWrapper';
import AddCollectionIcon from '../../assets/icons/chatIcons/AddCollectionIcon';
import ChatFilter from '../../assets/icons/ChatFilter';
import ChatSearch from '../../assets/icons/ChatSearch';

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
  // const [activeTabId, setActiveTabId] = useState<string>('chats');
  const [isArchived, setArchived] = useState<boolean>(false);
  const [filteredCollections, setFilteredCollections] = useState<ICollection[]>(mockChatsData);
  const [searchChatValue, setSearchChatValue] = useState<string>('');

  // const sections: SectionsProps[] = [
  //   { id: 'chats', element: <ChatSection /> },
  //   { id: 'contacts', element: <Contacts /> }
  // ];

  // const selectedSection = useMemo(
  //   () => sections.find((section) => section.id === activeTabId) as SectionsProps,
  //   [activeTabId]
  // );

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
      <div className="w-full h-full border-b border-l border-r">
        {/* <Nav activeTabId={activeTabId} setActiveTabId={setActiveTabId} /> */}
        {/* main section */}
        <div className="w-full h-full">
          {/* main section depends of active tab */}
          {/* {selectedSection ? selectedSection.element : null} */}
          <div className="flex items-center justify-between p-2 px-4">
            <div className="flex items-center p-2 rounded-md bg-alsoit-gray-75" style={{ color: 'orange' }}>
              <span className="pr-1">
                <AddCollectionIcon color="orange" />
              </span>
              NEW COLLECTION
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-alsoit-gray-125">
                <ChatFilter />
              </div>
              <div
                className="flex justify-between px-1 py-0.5 bg-alsoit-gray-125 items-center rounded-md"
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
                  placeholder="Search chat card"
                  onChange={(e) => handleSearchChat(e)}
                />
              </div>
            </div>
          </div>
          {'designers'.startsWith(searchChatValue) || !searchChatValue.length ? <ChatSection /> : null}
          <div className="px-4">
            {filteredCollections.map((collection, index) => (
              <CollectionWrapper key={collection.name + index} collection={collection} />
            ))}
          </div>
        </div>
      </div>
      <CreateChatSideOver />
    </>
  );
}
