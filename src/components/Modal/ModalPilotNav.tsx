import * as React from 'react';
import Close from '../../assets/icons/Close';
import BlurEffect from '../BlurEffect';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { useChatScroll } from '../../hooks';
import SearchIcon from '../../assets/icons/SearchIcon';
import { useState } from 'react';
import { getInitials } from '../../app/helpers';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import DropDownArrow from '../../assets/icons/DropDownArrow';

interface ToolbarNavInterface {
  id: string | null;
  name: string;
  url: string | null;
  parent: string | null;
  nesting: number;
  color: string | undefined;
  entity: string;
}

interface ModalPilotNavProps {
  modalItemClick: (url: string | null) => void;
  modalNavTree: ToolbarNavInterface[];
  activeNavItem: string;
  activeArrowItem: string | null;
}

export default function ModalPilotNav({
  modalItemClick,
  modalNavTree,
  activeNavItem,
  activeArrowItem
}: ModalPilotNavProps) {
  const ref = useChatScroll(modalNavTree);
  const [searchQuery, setSearchQuery] = useState('');
  const [openedNavItems, setOpenedNavItems] = useState<string[]>([]);

  const removeElementsAfterKey = (arr: ToolbarNavInterface[], key: string | null): ToolbarNavInterface[] => {
    const index = key ? arr.findIndex((item) => item.id === key) : -1;
    if (index !== -1) {
      return arr.slice(0, index + 1);
    }
    return arr;
  };

  modalNavTree.forEach((item) => {
    let nesting = 0;

    if (item.parent) {
      const currentElementId = item.id;
      const filteredToolbarNavTree = removeElementsAfterKey(modalNavTree, currentElementId);
      let prevParent: string | null = null;
      filteredToolbarNavTree.reverse().forEach((item) => {
        if (item.id === prevParent) {
          prevParent = item.parent;
          nesting++;
        }
        if (!prevParent) {
          prevParent = item.parent;
        }
        if (!item.parent) {
          prevParent = null;
          return false;
        }
      });
      item.nesting = nesting;
    }
  });

  const filteredNavTree = modalNavTree.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const currentNestedLevel = modalNavTree.filter((item) => item.id == activeArrowItem);

  let paddingLeftFirst = 'pl-4 ml-0.5';
  let paddingLeftSecond = 'pl-9 ml-1';
  let paddingLeftThird = 'pl-3';

  if (currentNestedLevel[0].nesting == 1) {
    paddingLeftFirst = 'pl-0';
    paddingLeftSecond = 'pl-1';
    paddingLeftThird = 'pl-2';
  } else if (currentNestedLevel[0].nesting == 2) {
    paddingLeftSecond = 'pl-0';
    paddingLeftThird = 'pl-1';
  } else if (currentNestedLevel[0].nesting == 3) {
    paddingLeftThird = 'pl-0';
  }

  const hasChildren = (itemId: string | null) => {
    return filteredNavTree.filter((item) => item.parent == itemId).length > 0;
  };

  const ToggleOpenedNavItems = (itemId: string, parentId: string) => {
    console.log(parentId);
    if (openedNavItems.filter((item) => item == itemId).length > 0) {
      setOpenedNavItems(openedNavItems.filter((item) => item !== itemId));
    } else {
      setOpenedNavItems([...openedNavItems, itemId]);
    }
  };

  return (
    <div
      className="mb-1.5"
      style={{
        width: '200px',
        height: '100%',
        maxHeight: '372px',
        minHeight: '100px'
      }}
    >
      <div className="mb-1.5 mt-2 text-center font-semibold relative">
        <div className="flex w-full justify-center relative px-5 mb-1">
          <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
            ENTITY LOCATION
          </p>
        </div>
        <div className="flex w-full justify-center relative">
          <span className="absolute w-full z-0" style={{ top: '6px' }}>
            <hr />
          </span>
          <p className="px-2 z-10 uppercase" style={{ fontSize: '8px', background: '#fff', color: '#B2B2B2' }}>
            CHOOSE ENTITY
          </p>
        </div>
        <div className="relative modal-search px-2.5 mt-2">
          <SearchIcon
            active={false}
            color="#919191"
            width="13.34"
            height="13.36"
            className="absolute"
            style={{ top: '7px', left: '17px' }}
          />
          <input
            className="rounded w-full font-normal pl-5"
            style={{
              border: '.5px solid rgba(178, 178, 178, .5)',
              height: '28px',
              color: '#919191',
              fontSize: '11px',
              paddingTop: '2px',
              paddingBottom: '5px',
              paddingLeft: '22px',
              letterSpacing: '-.3px'
            }}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchQuery && (
            <span className="absolute top-1/3 right-6" onClick={() => setSearchQuery('')}>
              <Close active={false} width="10" height="10" />
            </span>
          )}
        </div>
      </div>
      <div className="overflow-hidden pl-3" style={{ maxHeight: '250px' }}>
        <VerticalScroll>
          <div ref={ref} style={{ maxHeight: '250px' }}>
            {filteredNavTree.map(
              (item) =>
                item.nesting >= currentNestedLevel[0].nesting &&
                (openedNavItems.filter((i) => i == item.parent).length > 0 || !item.parent) && (
                  <div
                    key={item.id}
                    className={`text-alsoit-gray-300  transition duration-300 overflow-hidden relative rounded py-1 pl-2 flex items-center group mb-1.5 
                    ${activeNavItem == item.id ? 'font-semibold' : 'font-medium'}  ${
                      openedNavItems.filter((i) => i == item.id).length > 0
                        ? 'bg-alsoit-purple-50'
                        : 'hover:bg-alsoit-gray-125'
                    } 

                    `}
                    style={{
                      maxWidth: '180px'
                    }}
                  >
                    <div
                      className={`flex items-center cursor-pointer ${item.nesting == 1 ? paddingLeftFirst : ''} ${
                        item.nesting == 2 ? paddingLeftSecond : ''
                      } ${item.nesting == 3 ? paddingLeftThird : ''}
                      `}
                      onClick={() => ToggleOpenedNavItems(item.id as string, item.parent as string)}
                    >
                      {item.entity == 'hub' ? (
                        <div className="relative flex items-center relative justify-center">
                          <div
                            className={`inline-flex items-center justify-center z-5 h-4 w-4 false rounded transition duration-500 ${
                              openedNavItems.filter((i) => i == item.id).length > 0
                                ? 'grayscale opacity-50'
                                : 'group-hover:opacity-50 group-hover:grayscale'
                            }`}
                            style={{ backgroundColor: item.color ? item.color : 'blue', width: '15px', height: '15px' }}
                          >
                            <span className="inline-flex items-center justify-center z-5 h-full w-full false rounded">
                              <span className="font-bold leading-none text-white" style={{ fontSize: '8px' }}>
                                {getInitials(item.name)}
                              </span>
                            </span>
                          </div>
                          {hasChildren(item.id) && (
                            <>
                              <span
                                className={`absolute transition duration-500 ${
                                  openedNavItems.filter((i) => i == item.id).length > 0
                                    ? 'rotate-90 opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                <DropDownArrow />
                              </span>
                            </>
                          )}
                        </div>
                      ) : item.entity == 'subhub' ? (
                        <div className="relative flex items-center relative justify-center">
                          <div
                            className={`inline-flex items-center justify-center z-5 h-4 w-4 false rounded transition duration-500 ${
                              openedNavItems.filter((i) => i == item.id).length > 0
                                ? 'grayscale opacity-50'
                                : 'group-hover:opacity-50 group-hover:grayscale'
                            }`}
                            style={{ backgroundColor: item.color ? item.color : 'orange' }}
                          >
                            <span className="inline-flex items-center justify-center z-5 h-4 w-4 false rounded">
                              <span className="font-bold leading-none text-white" style={{ fontSize: '8px' }}>
                                {getInitials(item.name)}
                              </span>
                            </span>
                          </div>
                          {hasChildren(item.id) && (
                            <>
                              <span
                                className={`absolute transition duration-500 ${
                                  openedNavItems.filter((i) => i == item.id).length > 0
                                    ? 'rotate-90 opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                <DropDownArrow />
                              </span>
                            </>
                          )}
                        </div>
                      ) : item.entity == 'wallet' ? (
                        <div className="relative flex items-center relative justify-center">
                          <div
                            className={`inline-flex items-center justify-center z-5 h-4 w-4 false rounded transition duration-500 ${
                              openedNavItems.filter((i) => i == item.id).length > 0
                                ? 'grayscale opacity-25'
                                : 'group-hover:opacity-25 group-hover:grayscale'
                            }`}
                          >
                            {openedNavItems.filter((i) => i == item.id).length > 0 ? (
                              <FaFolderOpen
                                className="w-5 h-6"
                                style={{ width: '18px', height: '15px' }}
                                color={item.color ? item.color : 'black'}
                              />
                            ) : (
                              <FaFolder
                                className="w-5 h-6"
                                style={{ width: '18px', height: '15px' }}
                                color={item.color ? item.color : 'black'}
                              />
                            )}
                          </div>
                          {hasChildren(item.id) && (
                            <>
                              <span
                                className={`absolute transition duration-500 ${
                                  openedNavItems.filter((i) => i == item.id).length > 0
                                    ? 'rotate-90 opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                                }`}
                              >
                                <DropDownArrow />
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div>
                          <span
                            className="flex items-center justify-center w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color ? item.color : 'orange' }}
                          ></span>
                          {hasChildren(item.id) && <DropDownArrow />}
                        </div>
                      )}
                    </div>
                    <span
                      className="modal-item cursor-pointer whitespace-nowrap w-full"
                      style={{ fontSize: '13px', paddingLeft: '5px' }}
                      onClick={() => modalItemClick(item.url)}
                    >
                      {item.name}
                    </span>
                    {((item.nesting == 0 && item.name.length > 20) ||
                      (item.nesting == 2 && item.name.length > 15) ||
                      (item.nesting == 3 && item.name.length > 10) ||
                      (item.nesting == 3 && item.name.length > 5)) && (
                      <BlurEffect
                        top="0"
                        right="0"
                        bottom="0"
                        left="auto"
                        width="25px"
                        height="27.5px"
                        backgroundImage={
                          openedNavItems.filter((i) => i == item.id).length > 0
                            ? 'linear-gradient(to right, transparent , #F9E6FF)'
                            : 'linear-gradient(to right, transparent , #fff)'
                        }
                      />
                    )}
                  </div>
                )
            )}
          </div>
        </VerticalScroll>
      </div>
    </div>
  );
}
