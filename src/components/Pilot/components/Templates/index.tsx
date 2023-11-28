import React, { useState } from 'react';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';
import Button from '../../../Button';
import PlusCircle from '../../../../assets/icons/AddCircle';
import ChatSearch from '../../../../assets/icons/ChatSearch';
import ChatFilter from '../../../../assets/icons/ChatFilter';
import CollectionWrapper, { ICollection } from '../../../Chat/components/CollectionWrapper/CollectionWrapper';

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

function Templates() {
  const { entityForCustom, editCustomProperty } = useAppSelector((state) => state.task);

  const [isArchived, setArchived] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredCollections, setFilteredCollections] = useState<ICollection[]>(mockChatsData);

  const handleSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredCollections(
        mockChatsData.filter((collection) => collection.name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(mockChatsData);
    }
  };

  return (
    <div className="flex-col w-full h-full gap-3 p-2 overflow-scroll">
      <span className="flex items-center justify-between">
        <Button
          height="h-9 text-white"
          icon={<PlusCircle active={false} color="white" dimensions={{ height: 22, width: 22 }} />}
          label="ADD PROPERTY"
          labelSize="text-sm"
          padding="p-2"
          bgColor="#B2B2B2"
        />
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
          <div className="flex items-center justify-center bg-white rounded-md grow chatSearch">
            <span className="chatSearch_icon">
              <ChatSearch color="#919191" />
            </span>
            <input
              className="ring-0 focus:ring-0 focus:outline-0"
              type="text"
              value={searchValue}
              placeholder="Search Property"
              onChange={(e) => handleSearchChat(e)}
            />
          </div>
        </div>
        {/* {'designers'.startsWith(searchValue) || !searchValue.length ? <CreateNewColumn /> : null} */}
      </span>
      <div className="mt-2">
        {filteredCollections.map((collection, index) => (
          <CollectionWrapper key={collection.name + index} collection={collection} />
        ))}
      </div>
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
      {editCustomProperty && <EditDropdown />}
    </div>
  );
}

export default Templates;
