import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';
import ChatSearch from '../../../../assets/icons/ChatSearch';
import ChatFilter from '../../../../assets/icons/ChatFilter';
import AddProperty from './Properties/component/AddProperty';
import CardWrapper from '../CardWrapper';
import CustomPropertyList from './Components/CustomPropertyList';
import NamedIconPair from './Components/NamedIconPair';
import { IField } from '../../../../features/list/list.interfaces';
import { Capitalize } from '../../../../utils/NoCapWords/Capitalize';
import ArrowDown from '../../../../assets/icons/ArrowDown';
import PlusCircle from '../../../../assets/icons/AddCircle';
import AddCircleWhite from '../../../../assets/icons/propertyIcons/AddCircleWhite';
import StackIcon from '../../../../assets/icons/propertyIcons/StackIcon';
import SearchCancel from '../../../../assets/icons/propertyIcons/SearchCancel';
import PermissionExtended from './Properties/component/PermissionExtended';

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
  const [isNestedLineage, setNestedLineage] = useState<boolean>(false);
  const [isSearch, setSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const { columnTypes } = CustomPropertyList('white');
  const { columnTypes: columnTypeBlack } = CustomPropertyList();
  const [filteredCollections, setFilteredCollections] = useState<IField[]>(customFiledsColumns);
  const [addProperties, setAddProperties] = useState<boolean>(false);
  const [btnHover, setBtnHover] = useState<boolean>(false);
  const [hoverSearchBtn, setHoverSearchBtn] = useState<boolean>(false);
  const [hoverSearchCloseBtn, setHoverSearchCloseBtn] = useState<boolean>(false);

  const handleSearchProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredCollections((prev) =>
        prev.filter((collection) => collection.name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(customFiledsColumns);
    }
  };

  return (
    <div className="flex-col w-full h-full gap-3 p-2 pl-4 space-y-2 overflow-scroll">
      <span
        className={`flex items-center justify-between  ${customFiledsColumns.length === 0 ? 'gap-20' : ''}`}
        style={{ fontSize: '11px', fontWeight: '600', lineHeight: '13.2px' }}
      >
        <div
          className="flex items-center h-8 gap-1 p-2 text-white rounded-md cursor-pointer w-fit bg-alsoit-gray-75 hover:bg-alsoit-gray-100"
          onClick={() => setAddProperties((prev) => !prev)}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
        >
          <span className="flex items-center justify-center w-5 h-5">
            {btnHover ? <AddCircleWhite /> : <PlusCircle color="white" />}
          </span>
          <span>ADD PROPERTY</span>
        </div>
        {customFiledsColumns.length === 0 ? (
          <div className="text-alsoit-gray-200">Click here to add a property against this list</div>
        ) : (
          mockChatsData.length && (
            <div
              className="flex items-center gap-2"
              style={{ fontSize: '10px', fontWeight: '500', lineHeight: '12px' }}
            >
              {!isSearch ? (
                <>
                  <div
                    className="flex justify-between px-1 py-0.5 bg-alsoit-gray-125 items-center rounded-md"
                    style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                  >
                    <StackIcon color="orange" />
                    Subtasks
                    <span className="flex items-center pl-3">
                      <ArrowDown className="w-2 h-2" color="#424242" />
                    </span>
                  </div>
                  <div
                    className="flex justify-between px-1 py-0.5 bg-alsoit-gray-125 items-center rounded-md"
                    style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                  >
                    Nested Lineage
                    <span className="flex items-center pl-2">
                      <label className="switch small" onClick={(event) => event.stopPropagation()}>
                        <input
                          className="inputShow"
                          type="checkbox"
                          checked={isNestedLineage}
                          onChange={() => setNestedLineage((prev) => !prev)}
                        />
                        <div className={`slider sliderGray ${isNestedLineage ? 'checked' : ''}`} />
                      </label>
                    </span>
                  </div>
                  <div
                    className="flex justify-between px-1 py-0.5 bg-alsoit-gray-125 items-center rounded-md"
                    style={{ minHeight: '24px', color: 'orange', fontSize: '10px' }}
                  >
                    Archived
                    <span className="flex items-center pl-2">
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
                  <div className="flex items-center justify-center w-6 h-6 rounded-md bg-alsoit-gray-125">
                    <ChatFilter />
                  </div>
                  <div
                    className="flex items-center justify-center w-6 h-6 rounded-md cursor-pointer bg-alsoit-gray-125 hover:bg-purple-100"
                    onClick={() => setSearch(true)}
                    onMouseEnter={() => setHoverSearchBtn(true)}
                    onMouseLeave={() => setHoverSearchBtn(false)}
                  >
                    <ChatSearch color={hoverSearchBtn ? '#BF01FE' : '#424242'} />
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex items-center justify-start w-64 h-8 bg-white rounded-md chatSearch">
                    <span className="chatSearch_icon">
                      <ChatSearch color="#424242" />
                    </span>
                    <input
                      className="ring-0 focus:ring-0 focus:outline-0 grow"
                      type="text"
                      value={searchValue}
                      placeholder="Search Property"
                      onChange={(e) => handleSearchProperty(e)}
                    />
                    <span
                      className="absolute flex items-center cursor-pointer right-2"
                      onClick={() => setSearch(false)}
                      onMouseEnter={() => setHoverSearchCloseBtn(true)}
                      onMouseLeave={() => setHoverSearchCloseBtn(false)}
                    >
                      <SearchCancel hoverBg={hoverSearchCloseBtn ? '#FFE7E7' : undefined} />
                    </span>
                  </div>
                </>
              )}
            </div>
          )
        )}
      </span>
      {addProperties && <AddProperty />}
      <div className="mt-2">
        {filteredCollections.map((collection, index) => {
          const matchingObject = columnTypes.find((item) => item.title.toLowerCase() === collection.type.toLowerCase());
          const matchingData = columnTypeBlack.find(
            (item) => item.title.toLowerCase() === collection.type.toLowerCase()
          );

          if (matchingObject) {
            const [isActiveCollection, setActiveCollection] = useState(matchingObject.active);
            const [showPermissionExt, setShowPermissionExt] = useState<boolean>(false);
            return (
              <CardWrapper
                isActiveColumn={isActiveCollection}
                setActiveColumn={setActiveCollection}
                type="properties"
                showBottomElement={showPermissionExt}
                bottomElement={<PermissionExtended />}
                titleElement={
                  <NamedIconPair
                    isLeadingIcon={true}
                    backgroundImage={`linear-gradient(to right, transparent , ${
                      isActiveCollection ? '#00CC25' : '#F7A100'
                    })`}
                    parentName={matchingObject?.title}
                    parentIcon={matchingObject?.icon}
                    childIcon={matchingObject.children[0]?.icon as JSX.Element}
                    childName={matchingObject.children[0].name}
                  />
                }
                key={matchingObject.title + index}
                cardName={Capitalize(collection.name)}
                bodyElement={
                  <div className="p-2 pl-4">
                    <EditDropdown
                      setShowPermissionExt={setShowPermissionExt}
                      editCustomProperty={collection}
                      mactchingData={matchingData}
                    />
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
