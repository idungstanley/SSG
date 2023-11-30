import React, { useState } from 'react';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';
import Button from '../../../Button';
import ChatSearch from '../../../../assets/icons/ChatSearch';
import ChatFilter from '../../../../assets/icons/ChatFilter';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AddProperty from './Properties/component/AddProperty';
import CardWrapper from '../CardWrapper';
import { columnTypes, columnTypesProps } from './Components/CustomPropertyList';
import { FaCaretRight } from 'react-icons/fa';
import ToolTip from '../../../Tooltip/Tooltip';

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
  const [filteredCollections, setFilteredCollections] = useState<columnTypesProps[]>(columnTypes);
  const [addProperties, setAddProperties] = useState<boolean>(false);

  const handleSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredCollections(
        columnTypes.filter((collection) => collection.title.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(columnTypes);
    }
  };

  return (
    <div className="flex-col w-full h-full gap-3 p-2 pl-3 space-y-2 overflow-scroll">
      <span className="flex items-center gap-12">
        <Button
          height="h-8 text-white"
          icon={<IoIosAddCircleOutline className="text-base text-white" />}
          label="ADD PROPERTY"
          labelSize="text-xs"
          padding="p-2"
          onClick={() => setAddProperties((prev) => !prev)}
          bgColor="#B2B2B2"
        />
        {mockChatsData.length && (
          <div className="flex items-center gap-2 grow">
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
            <div className="flex items-center justify-start h-8 bg-white rounded-md grow chatSearch">
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
        )}
      </span>
      {addProperties && <AddProperty />}
      <div className="mt-2">
        {filteredCollections.map((collection, index) => (
          <CardWrapper
            type="properties"
            titleElement={
              <div
                className="grid items-center justify-between gap-2 text-left text-white cursor-pointer"
                style={{ width: 'calc(100% - 45px)', gridTemplateColumns: '50% 20px 35%' }}
              >
                <div className="flex items-center w-full gap-1">
                  <div className="flex items-center justify-center w-5 h-5 cursor-pointer">{collection?.icon}</div>
                  <ToolTip title={collection?.title}>
                    <div className="font-semibold truncate">{collection?.title}</div>
                  </ToolTip>
                </div>
                <span className="flex items-center w-4 h-4">
                  <FaCaretRight />
                </span>
                <div className="flex items-center w-full gap-1">
                  <div className="flex items-center justify-center w-5 h-5 cursor-pointer">
                    {collection.children[0]?.icon}
                  </div>
                  <ToolTip title={collection.children[0].name}>
                    <p className="font-semibold truncate">{collection.children[0].name}</p>
                  </ToolTip>
                </div>
              </div>
            }
            key={collection.title + index}
            collection={collection}
          />
        ))}
      </div>
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
      {editCustomProperty && <EditDropdown />}
    </div>
  );
}

export default Templates;
