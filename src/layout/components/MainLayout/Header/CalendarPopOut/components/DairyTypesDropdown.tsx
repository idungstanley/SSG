import React, { useState } from 'react';
import AlsoitMenuDropdown from '../../../../../../components/DropDowns';
import { InlineBorderLabel } from '../../../../../../components/Dropdown/MenuDropdown';
import DairyTypes from './DairyTypes';
import { VerticalScroll } from '../../../../../../components/ScrollableContainer/VerticalScroll';
import SubtractWrapper from '../../../../../../components/Dropdown/SubtractWrapper';

interface dropdownProps {
  anchor: HTMLElement | null;
  setAnchor: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
}

function DairyTypesDropdown({ anchor, setAnchor }: dropdownProps) {
  const { dairyTypes } = DairyTypes();
  const [activeItem, setActiveItem] = useState<string | undefined>(undefined);

  const handleClick = (value: string) => {
    setActiveItem((prev) => (prev === value ? '' : value));
    setAnchor(null);
  };

  return (
    <AlsoitMenuDropdown anchorEl={anchor} handleClose={() => setAnchor(null)}>
      <div style={{ width: '200px' }}>
        <InlineBorderLabel
          label="SELECT OPTION"
          topElement={<p className="flex justify-center w-full pt-3 font-bold text-alsoit-text-sm">DAIRY TYPE</p>}
        />
        <VerticalScroll>
          <div className="w-full my-1 overflow-visible" style={{ maxHeight: '300px', maxWidth: '200px' }}>
            {dairyTypes.map((item) => {
              return item.active ? (
                <>
                  <SubtractWrapper
                    icon={item.icon}
                    key={item.title}
                    isActive={activeItem === item.title}
                    handleClick={() => {
                      !item.children
                        ? handleClick(item.title)
                        : setActiveItem((prev) => (prev === item.title ? '' : item.title));
                    }}
                    label={item.title}
                    hasChildren={item.children ? true : false}
                  />
                  {activeItem === item.title && (
                    <>
                      {item.children &&
                        item.children.map((child) => (
                          <div
                            key={child.id}
                            className="flex items-center justify-between w-full h-8 my-1 rounded cursor-pointer hover:bg-alsoit-gray-50"
                          >
                            <div className="w-full px-2 pl-5">
                              <button
                                className="flex items-center justify-between w-full h-full"
                                onClick={() => handleClick(child.name)}
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
  );
}

export default DairyTypesDropdown;
