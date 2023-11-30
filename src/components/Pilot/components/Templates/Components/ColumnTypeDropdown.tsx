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
import { columnTypes, columnTypesProps } from './CustomPropertyList';
import { FaCaretRight } from 'react-icons/fa';

export default function ColumnTypeDropdown() {
  const dispatch = useAppDispatch();

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
          className="flex items-center justify-between w-full h-8 gap-2 px-2 text-left truncate bg-white cursor-pointer"
          style={{ borderRadius: '6px' }}
        >
          {selectedChildProperty?.name && (
            <>
              <div className="flex items-center gap-1" style={{ maxWidth: '30%' }}>
                <div>{selectedPropertyType?.icon}</div>
                <div className="w-full font-semibold truncate text-alsoit-gray-300">{selectedPropertyType?.title}</div>
              </div>

              <span className="flex items-center w-4 h-4">
                <FaCaretRight />
              </span>
            </>
          )}
          <div
            className="flex items-center gap-1"
            style={{ maxWidth: selectedChildProperty?.name ? '40%' : undefined }}
          >
            <div>{selectedChildProperty?.icon}</div>
            <p className="w-full font-semibold truncate text-alsoit-gray-300">
              {Capitalize(newCustomPropertyDetails.type)}
            </p>
          </div>
          <span className="flex items-center w-4 h-4">
            <ArrowDown className="w-3 h-3" color="#919191" />
          </span>
        </button>
      </div>
      <AlsoitMenuDropdown handleClose={closeModal} anchorEl={isOpen}>
        <InlineBorderLabel
          label="SELECT PROPERTY"
          topElement={<p className="flex justify-center w-full pt-3 font-bold text-alsoit-text-sm">CUSTOM PROPERTY</p>}
        />
        <div className="mx-2">
          <div className="flex items-center w-full bg-white rounded-md grow chatSearch">
            <span className="chatSearch_icon">
              <ChatSearch color="#919191" />
            </span>
            <input
              className="ring-0 focus:ring-0 focus:outline-0"
              type="text"
              value={searchValue}
              placeholder="Search Property"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-48 py-1 pl-3 mt-1 text-left rounded-md shadow-lg outline-none h-fit focus:outline-none">
          <VerticalScroll>
            <div className="w-full mt-2 overflow-visible" style={{ maxHeight: '300px', maxWidth: '174px' }}>
              {filteredCollections.map((item) => {
                return (
                  <>
                    <div
                      key={item.id}
                      className="flex items-center justify-between w-full h-8 rounded cursor-pointer hover:bg-alsoit-gray-50"
                    >
                      <div className="w-full px-2 pl-1">
                        <button
                          className="flex items-center justify-between w-full h-full"
                          onClick={() => handleActiveDropdownOption(item.title)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="flex items-center w-5 h-5 mx-1 text-lg">{item.icon}</span>
                            <p className="font-semibold truncate text-alsoit-gray-300-lg text-alsoit-text-lg">
                              {item.title}
                            </p>
                          </div>
                        </button>
                      </div>
                    </div>
                    {activeDropdownOption === item.title && (
                      <>
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center justify-between w-full h-8 my-1 rounded cursor-pointer hover:bg-alsoit-gray-50"
                          >
                            <div className="w-full px-2 pl-5">
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
                );
              })}
            </div>
          </VerticalScroll>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
