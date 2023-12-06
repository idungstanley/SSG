import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';
import Button from '../../../Button';
import ChatSearch from '../../../../assets/icons/ChatSearch';
import ChatFilter from '../../../../assets/icons/ChatFilter';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AddProperty from './Properties/component/AddProperty';
import CardWrapper from '../CardWrapper';
import CustomPropertyList from './Components/CustomPropertyList';
import NamedIconPair from './Components/NamedIconPair';
import { IField } from '../../../../features/list/list.interfaces';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';

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
  const { customFiledsColumns } = useAppSelector((state) => state.task);

  const [isArchived, setArchived] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { columnTypes } = CustomPropertyList('white');
  const [filteredCollections, setFilteredCollections] = useState<IField[]>(customFiledsColumns);
  const [addProperties, setAddProperties] = useState<boolean>(false);

  const handleSearchChat = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredCollections(
        customFiledsColumns.filter((collection) => collection.name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(customFiledsColumns);
    }
  };

  return (
    <div className="flex-col w-full h-full gap-3 p-2 pl-3 space-y-2 overflow-scroll">
      <span className="flex items-center gap-12">
        <Button
          height="h-8 text-white w-32"
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
                  <div className={`slider sliderGray ${isArchived ? 'checked' : ''}`} />
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
        {filteredCollections.map((collection, index) => {
          const matchingObject = columnTypes.find((item) => item.title.toLowerCase() === collection.type.toLowerCase());
          if (matchingObject) {
            return (
              <CardWrapper
                type="properties"
                titleElement={
                  <NamedIconPair
                    type="card"
                    isLeadingIcon={true}
                    fadeOutColour={matchingObject.active}
                    parentName={matchingObject?.title}
                    parentIcon={matchingObject?.icon}
                    childIcon={matchingObject.children[0]?.icon as JSX.Element}
                    childName={matchingObject.children[0].name}
                  />
                }
                key={matchingObject.title + index}
                collection={matchingObject}
                cardName={Capitalize(collection.name)}
                bodyElement={
                  <div className="p-2 pl-4">
                    {/* <NewColumn /> */}
                    <EditDropdown editCustomProperty={collection} mactchingData={matchingObject} />
                  </div>
                }
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default Templates;
