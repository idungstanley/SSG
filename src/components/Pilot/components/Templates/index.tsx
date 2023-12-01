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
import NamedIconPair from './Components/NamedIconPair';
import NewColumn from './Components/NewColumn';
import PermissionIcon from '../../../../assets/icons/chatIcons/PermissionIcon';
import InformationsolidIcon from '../../../../assets/icons/InformationsolidIcon';
import ToolTip from '../../../Tooltip/Tooltip';
import ClosePalette from '../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../assets/icons/SavePalette';
import CollectionsIcon from '../../../../assets/icons/chatIcons/CollectionsIcon';

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
        {filteredCollections.map((collection, index) => (
          <CardWrapper
            type="properties"
            titleElement={
              <NamedIconPair
                parentName={collection?.title}
                parentIcon={collection?.icon}
                childIcon={collection.children[0]?.icon as JSX.Element}
                childName={collection.children[0].name}
              />
            }
            key={collection.title + index}
            collection={collection}
            cardName={collection?.title}
            bodyElement={
              <div className="p-2 pl-4">
                <NewColumn />
                <div className="my-2 text-xs">CLICK HERE TO HOST IN TEMPLATE</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 p-1 rounded bg-alsoit-gray-50 w-fit">
                      <PermissionIcon />
                      <div className="text-black">Permissions</div>
                      <InformationsolidIcon />
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
                  </div>
                  <div className="flex items-center justify-end gap-2 p-1">
                    <ToolTip title="Cancel">
                      <span onClick={() => ({})} className="cursor-pointer text-[#FF3738] hover:text-white">
                        <ClosePalette fill="white" />
                      </span>
                    </ToolTip>
                    <ToolTip title="Add Property">
                      <span className="cursor-pointer" onClick={() => ({})}>
                        <SavePalette />
                      </span>
                    </ToolTip>
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
      {editCustomProperty && <EditDropdown />}
    </div>
  );
}

export default Templates;
