import * as React from 'react';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';
import { useAbsolute } from '../../../../../hooks/useAbsolute';
import { VerticalScroll } from '../../../../ScrollableContainer/VerticalScroll';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { InlineBorderLabel } from '../../../../Dropdown/MenuDropdown';
import ChatSearch from '../../../../../assets/icons/ChatSearch';
import { setNewCustomPropertyDetails } from '../../../../../features/task/taskSlice';
import CustomPropertyList, { columnTypesProps } from './CustomPropertyList';
// import { FaCaretRight } from 'react-icons/fa';
import NamedIconPair from './NamedIconPair';
import SubtractWrapper from '../../../../Dropdown/SubtractWrapper';

export default function ColumnTypeDropdown({ mactchingData }: { mactchingData?: columnTypesProps }) {
  const dispatch = useAppDispatch();

  const { columnTypes } = CustomPropertyList();

  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  const { updateCords } = useAppSelector((state) => state.task);
  const { relativeRef } = useAbsolute(updateCords, 372);

  const [isOpen, setIsOpen] = React.useState<null | HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [filteredCollections, setFilteredCollections] = React.useState<columnTypesProps[]>(columnTypes);
  const [activeDropdownOption, setActiveDropdownOption] = React.useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredCollections(columnTypes.filter((item) => item.title.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setFilteredCollections(columnTypes);
    }
  };

  const closeModal = () => {
    setIsOpen(null);
    setActiveDropdownOption('');
  };

  const onClickOpenDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(e.currentTarget);
  };

  const handleActiveDropdownOption = (value: string) => {
    setActiveDropdownOption((prev) => (prev === value ? '' : value));
  };

  const handleSelectChildOption = (name: string, id: string) => {
    dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, type: name, id }));
    closeModal();
  };

  const selectedPropertyType = React.useMemo(
    () =>
      columnTypes.find((option) => option.children.find((child) => child.id === newCustomPropertyDetails.id)) || null,
    [newCustomPropertyDetails, columnTypes]
  );

  const selectedChildProperty = React.useMemo(
    () => selectedPropertyType?.children.find((option) => option.id === newCustomPropertyDetails.id),
    [selectedPropertyType, newCustomPropertyDetails.id]
  );

  return (
    <div className="relative w-full">
      <div ref={relativeRef} className="w-full">
        <button
          onClick={onClickOpenDropdown}
          className="flex items-center justify-between w-full h-8 gap-2 px-1 text-left truncate bg-white cursor-pointer"
          style={{ borderRadius: '6px' }}
        >
          {(selectedChildProperty?.name || mactchingData) && (
            <NamedIconPair
              iconColor="text-alsoit-gray-100"
              color="text-alsoit-gray-300"
              isLeadingIcon={true}
              parentName={mactchingData ? mactchingData.title : (selectedPropertyType?.title as string)}
              parentIcon={mactchingData ? mactchingData.icon : (selectedPropertyType?.icon as JSX.Element)}
              childIcon={
                mactchingData
                  ? (mactchingData.children[0].icon as JSX.Element)
                  : (selectedChildProperty?.icon as JSX.Element)
              }
              childName={(mactchingData ? mactchingData.children[0]?.name : selectedChildProperty?.name) as string}
            />
          )}
          {!selectedChildProperty?.name && !mactchingData && (
            <div
              className="flex items-center gap-1"
              style={{ maxWidth: selectedChildProperty?.name ? '40%' : undefined }}
            >
              <div>{selectedChildProperty?.icon}</div>
              <p className="w-full font-semibold truncate text-alsoit-gray-100">
                {Capitalize(newCustomPropertyDetails.type)}
              </p>
            </div>
          )}
          <span className={`flex items-center w-4 h-4 ${isOpen ? 'origin-center rotate-180' : ''}`}>
            <ArrowDown className="w-3 h-3" color={isOpen ? '#BF01FE' : '#919191'} />
          </span>
        </button>
      </div>
      <AlsoitMenuDropdown handleClose={closeModal} anchorEl={isOpen}>
        <InlineBorderLabel
          label="SELECT PROPERTY"
          topElement={<p className="flex justify-center w-full pt-3 font-bold text-alsoit-text-sm">CUSTOM PROPERTY</p>}
        />
        <div className="mx-2 h-7">
          <div className="flex items-center w-full bg-white rounded-md grow chatSearch">
            <span className="mx-1 chatSearch_icon">
              <ChatSearch color="#919191" />
            </span>
            <input
              className="ring-0 focus:ring-0 focus:outline-0"
              type="text"
              value={searchValue}
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-48 py-1 pl-2 mt-1 text-left rounded-md shadow-lg outline-none h-fit focus:outline-none">
          <VerticalScroll>
            <div className="w-full mt-1 overflow-visible" style={{ maxHeight: '300px', maxWidth: '174px' }}>
              {filteredCollections.map((item) => {
                return item.active ? (
                  <>
                    <SubtractWrapper
                      icon={item.icon}
                      key={item.title}
                      isActive={activeDropdownOption === item.title}
                      handleClick={handleActiveDropdownOption}
                      label={item.title}
                      hasChildren={item.children ? true : false}
                    />
                    {activeDropdownOption === item.title && (
                      <>
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center justify-between w-full h-8 my-1 rounded cursor-pointer hover:bg-alsoit-gray-50"
                          >
                            <div className="w-full px-2 pl-3">
                              <button
                                className="flex items-center justify-between w-full h-full"
                                onClick={() => handleSelectChildOption(child.name, child.id)}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="flex items-center w-5 h-5 mx-1 text-lg">{child.icon}</span>
                                  <p className="font-semibold truncate text-alsoit-gray-300-lg text-alsoit-text-lg">
                                    {child.name}
                                  </p>
                                </div>
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                ) : null;
              })}
            </div>
          </VerticalScroll>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
