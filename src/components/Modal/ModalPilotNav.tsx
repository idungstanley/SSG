import * as React from 'react';
import Close from '../../assets/icons/Close';
import BlurEffect from '../BlurEffect';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { useChatScroll } from '../../hooks';
import SearchIcon from '../../assets/icons/SearchIcon';
import { useState } from 'react';
import ModalNavCheckEntity from '../Pilot/components/ToolbarNav/Components/ModalNavCheckEntity';

interface ToolbarNavInterface {
  id: string | null;
  name: string;
  url: string | null;
  parent: string | null;
  nesting: number;
  color: string | undefined;
  entity: string;
  children?: ToolbarNavInterface[];
}

interface ModalPilotNavProps {
  modalItemClick: (url: string | null) => void;
  modalNavTree: ToolbarNavInterface[];
  activeNavItem: string;
}

export default function ModalPilotNav({ modalItemClick, modalNavTree, activeNavItem }: ModalPilotNavProps) {
  const ref = useChatScroll(modalNavTree);
  const [searchQuery, setSearchQuery] = useState('');
  const [openedNavItems, setOpenedNavItems] = useState<string[]>([]);

  const buildNestedStructure = (data: ToolbarNavInterface[]): ToolbarNavInterface[] => {
    const map: { [key: string]: ToolbarNavInterface } = {};
    const tree: ToolbarNavInterface[] = [];

    data.forEach((item) => {
      if (!map[item.id as string]) {
        map[item.id as string] = { ...item, children: [] };
      }
    });

    data.forEach((item) => {
      if (item.parent !== null && map[item.parent as string]) {
        if (!map[item.parent as string].children) {
          map[item.parent as string].children = [];
        }
        map[item.parent as string].children!.push(map[item.id as string]);
      } else {
        tree.push(map[item.id as string]);
      }
    });

    return tree;
  };

  const nestedData = buildNestedStructure(modalNavTree);

  const filteredNavTree = modalNavTree.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.url && item.url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const ToggleOpenedNavItems = (itemId: string) => {
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
      <div className="text-center font-semibold relative" style={{ marginTop: '10px', marginBottom: '7px' }}>
        <div className="flex w-full justify-center relative px-5 mb-1">
          <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
            ENTITY LOCATION
          </p>
        </div>
        <div className="flex w-full justify-center relative">
          <span className="absolute w-full z-0" style={{ top: '6px' }}>
            <hr />
          </span>
          <p
            className="px-2 z-10 uppercase text-alsoit-gray-75 hover:text-alsoit-gray-100 transition duration-500 cursor-default"
            style={{ fontSize: '8px', background: '#fff' }}
          >
            CHOOSE ENTITY
          </p>
        </div>
        <div className="relative modal-search px-2.5" style={{ marginTop: '5px' }}>
          <SearchIcon
            active={false}
            color="#919191"
            width="13.34"
            height="13.36"
            className="absolute"
            style={{ top: '7px', left: '17px' }}
          />
          <input
            className={`w-full font-normal pl-5 hover:text-alsoit-gray-300 transition duration-500 ${
              searchQuery ? 'text-alsoit-gray-300' : 'text-alsoit-gray-100'
            }`}
            style={{
              border: '.5px solid rgba(178, 178, 178, .5)',
              height: '28px',
              fontSize: '11px',
              paddingTop: '2px',
              paddingBottom: '5px',
              paddingLeft: '22px',
              letterSpacing: '-.3px',
              borderRadius: '5px'
            }}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
          {searchQuery && (
            <span className="absolute top-1/3 right-4" onClick={() => setSearchQuery('')}>
              <Close active={false} width="10" height="10" />
            </span>
          )}
        </div>
      </div>
      <div className="overflow-hidden pl-3" style={{ maxHeight: '260px' }}>
        <VerticalScroll>
          <div ref={ref} style={{ maxHeight: '260px' }}>
            {!searchQuery ? (
              <>
                {nestedData.map((item) => (
                  <>
                    <div
                      key={item.id}
                      className={`text-alsoit-gray-300  transition duration-300 overflow-hidden relative rounded py-1 pl-2 flex items-center group 
                    ${activeNavItem == item.id ? 'font-semibold' : 'font-medium'}  ${
                        openedNavItems.filter((i) => i == item.id).length > 0 &&
                        item.children &&
                        item.children.length > 0
                          ? 'bg-alsoit-purple-50'
                          : 'hover:bg-alsoit-gray-125'
                      } 

                    `}
                      style={{
                        maxWidth: '177px',
                        marginBottom: '4px'
                      }}
                    >
                      <ModalNavCheckEntity
                        item={item}
                        ToggleOpenedNavItems={ToggleOpenedNavItems}
                        openedNavItems={openedNavItems}
                      />
                      <span
                        className="modal-item cursor-pointer whitespace-nowrap w-full"
                        style={{ fontSize: '13px', paddingLeft: '5px' }}
                        onClick={() => modalItemClick(item.url)}
                      >
                        {item.name}
                      </span>
                      {item.name.length > 15 && (
                        <BlurEffect
                          top="0"
                          right="0"
                          bottom="0"
                          left="auto"
                          width="25px"
                          height="27.5px"
                          backgroundImage={
                            openedNavItems.filter((i) => i == item.id).length > 0 &&
                            item.children &&
                            item.children.length > 0
                              ? 'linear-gradient(to right, transparent , #F9E6FF)'
                              : 'linear-gradient(to right, transparent , #fff)'
                          }
                        />
                      )}
                    </div>
                    {item.children && openedNavItems.filter((i) => i == item.id).length > 0 && (
                      <>
                        {item.children.map((child) => (
                          <>
                            <div
                              key={child.id}
                              className={`text-alsoit-gray-300  transition duration-300 overflow-hidden relative rounded py-1 pl-2 flex items-center group mb-1.5 ml-5
                    ${activeNavItem == child.id ? 'font-semibold' : 'font-medium'}  ${
                                openedNavItems.filter((i) => i == child.id).length > 0 &&
                                child.children &&
                                child.children.length > 0
                                  ? 'bg-alsoit-purple-50'
                                  : 'hover:bg-alsoit-gray-125'
                              }`}
                              style={{
                                maxWidth: '157px',
                                width: '100%'
                              }}
                            >
                              <ModalNavCheckEntity
                                item={child}
                                ToggleOpenedNavItems={ToggleOpenedNavItems}
                                openedNavItems={openedNavItems}
                              />
                              <span
                                className="modal-item cursor-pointer whitespace-nowrap w-full"
                                style={{ fontSize: '13px', paddingLeft: '5px' }}
                                onClick={() => modalItemClick(child.url)}
                              >
                                {child.name}
                              </span>
                              {child.name.length > 20 && (
                                <BlurEffect
                                  top="0"
                                  right="0"
                                  bottom="0"
                                  left="auto"
                                  width="25px"
                                  height="27.5px"
                                  backgroundImage={
                                    openedNavItems.filter((i) => i == child.id).length > 0 &&
                                    child.children &&
                                    child.children.length > 0
                                      ? 'linear-gradient(to right, transparent , #F9E6FF)'
                                      : 'linear-gradient(to right, transparent , #fff)'
                                  }
                                />
                              )}
                            </div>

                            {child.children && openedNavItems.filter((i) => i == child.id).length > 0 && (
                              <>
                                {child.children.map((lastChild) => (
                                  <div
                                    key={lastChild.id}
                                    className={`text-alsoit-gray-300  transition duration-300 overflow-hidden relative rounded py-1 pl-2 flex items-center group mb-1.5 ml-10
                    ${activeNavItem == lastChild.id ? 'font-semibold' : 'font-medium'}  ${
                                      openedNavItems.filter((i) => i == lastChild.id).length > 0 &&
                                      lastChild.children &&
                                      lastChild.children.length > 0
                                        ? 'bg-alsoit-purple-50'
                                        : 'hover:bg-alsoit-gray-125'
                                    }`}
                                    style={{
                                      maxWidth: '137px'
                                    }}
                                  >
                                    <ModalNavCheckEntity
                                      item={lastChild}
                                      ToggleOpenedNavItems={ToggleOpenedNavItems}
                                      openedNavItems={openedNavItems}
                                    />
                                    <span
                                      className="modal-item cursor-pointer whitespace-nowrap w-full"
                                      style={{ fontSize: '13px', paddingLeft: '5px' }}
                                      onClick={() => modalItemClick(lastChild.url)}
                                    >
                                      {lastChild.name}
                                    </span>
                                    {lastChild.name.length > 15 && (
                                      <BlurEffect
                                        top="0"
                                        right="0"
                                        bottom="0"
                                        left="auto"
                                        width="25px"
                                        height="27.5px"
                                        backgroundImage={
                                          openedNavItems.filter((i) => i == lastChild.id).length > 0 &&
                                          lastChild.children &&
                                          lastChild.children.length > 0
                                            ? 'linear-gradient(to right, transparent , #F9E6FF)'
                                            : 'linear-gradient(to right, transparent , #fff)'
                                        }
                                      />
                                    )}
                                  </div>
                                ))}
                              </>
                            )}
                          </>
                        ))}
                      </>
                    )}
                  </>
                ))}
              </>
            ) : (
              <>
                {filteredNavTree.map((searchItem) => (
                  <>
                    <div
                      key={searchItem.id}
                      className={`text-alsoit-gray-300  transition duration-300 overflow-hidden relative rounded py-1 pl-2 flex items-center group mb-1.5 hover:bg-alsoit-gray-125
                    ${activeNavItem == searchItem.id ? 'font-semibold' : 'font-medium'}`}
                      style={{
                        maxWidth: '180px',
                        width: '100%'
                      }}
                      onClick={() => modalItemClick(searchItem.url)}
                    >
                      <ModalNavCheckEntity
                        item={searchItem}
                        ToggleOpenedNavItems={ToggleOpenedNavItems}
                        openedNavItems={openedNavItems}
                      />
                      <span
                        className="modal-item cursor-pointer whitespace-nowrap w-full"
                        style={{ fontSize: '13px', paddingLeft: '5px' }}
                      >
                        {searchItem.name}
                      </span>
                      {searchItem.name.length > 20 && (
                        <BlurEffect
                          top="0"
                          right="0"
                          bottom="0"
                          left="auto"
                          width="25px"
                          height="27.5px"
                          backgroundImage={
                            openedNavItems.filter((i) => i == searchItem.id).length > 0 &&
                            searchItem.children &&
                            searchItem.children.length > 0
                              ? 'linear-gradient(to right, transparent , #F9E6FF)'
                              : 'linear-gradient(to right, transparent , #fff)'
                          }
                        />
                      )}
                    </div>
                  </>
                ))}
              </>
            )}
          </div>
        </VerticalScroll>
      </div>
    </div>
  );
}
