import * as React from 'react';
import Close from '../../assets/icons/Close';
import BlurEffect from '../BlurEffect';
import { VerticalScroll } from '../ScrollableContainer/VerticalScroll';
import { useChatScroll } from '../../hooks';
import SearchIcon from '../../assets/icons/SearchIcon';
import { useState } from 'react';

interface ToolbarNavInterface {
  id: string | null;
  name: string;
  url: string | null;
  parent: string | null;
  nesting: number;
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

  let paddingLeftFirst = 'pl-1';
  let paddingLeftSecond = 'pl-2';
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

  const pilotModal = document.getElementById('pilot_nav_modal');

  document.addEventListener('mousedown', (event) => {
    const clickedElement = event.target as HTMLElement;

    if (
      pilotModal &&
      !pilotModal.contains(clickedElement) &&
      !clickedElement.classList.contains('modal-item') &&
      !clickedElement.classList.contains('pilot-modal-wrapper') &&
      !clickedElement.classList.contains('modal-search')
    ) {
      //modalItemClick(null);
    }
  });

  return (
    <div
      id="pilot_nav_modal"
      className="bg-white fixed pb-3 pilot-modal-wrapper"
      style={{
        width: '204px',
        height: 'auto',
        maxHeight: '272px',
        minHeight: '100px',
        top: '40px',
        zIndex: '51',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px #00000040'
      }}
    >
      <div className="mb-2 mt-2 text-center font-semibold relative">
        <span
          className="absolute right-0 hover:rotate-90 transition duration-500"
          style={{ top: '0', right: '5px', zIndex: '51' }}
          onClick={() => modalItemClick(null)}
        >
          <Close active={false} width="15" height="15" />
        </span>
        <div className="flex w-full justify-center relative px-5">
          <p className="uppercase" style={{ color: '#424242', fontSize: '8px' }}>
            Breadcrumbs
          </p>
        </div>
        <div className="flex w-full justify-center relative">
          <span className="absolute w-full z-0" style={{ top: '8px' }}>
            <hr />
          </span>
          <p className="px-2 z-10 uppercase" style={{ fontSize: '8px', background: '#fff', color: '#B2B2B2' }}>
            Select page
          </p>
        </div>
        <div className="relative modal-search px-5">
          <SearchIcon active={false} color="#919191" width="11.34" height="11.36" className="absolute top-1/3 left-7" />
          <input
            className="rounded w-full font-normal pl-6"
            style={{ border: '1px solid #B2B2B2', height: '30px', color: '#919191', fontSize: '12px' }}
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
      <div className="overflow-hidden pl-5" style={{ maxHeight: '150px' }}>
        <VerticalScroll>
          <div ref={ref} style={{ maxHeight: '150px' }}>
            {filteredNavTree.map(
              (item) =>
                item.nesting >= currentNestedLevel[0].nesting && (
                  <p
                    key={item.id}
                    className={`text-alsoit-gray-300 hover:bg-alsoit-gray-125 transition duration-300 overflow-hidden relative rounded py-1 pl-2 ${
                      activeNavItem == item.id ? 'font-semibold' : 'font-medium'
                    } `}
                    onClick={() => modalItemClick(item.url)}
                    style={{
                      maxWidth: '164px'
                    }}
                  >
                    <span
                      className={`modal-item ${item.nesting == 1 ? paddingLeftFirst : ''} ${
                        item.nesting == 2 ? paddingLeftSecond : ''
                      } ${item.nesting == 3 ? paddingLeftThird : ''}`}
                    >
                      {item.name}
                    </span>
                    {item.name.length > 25 && (
                      <BlurEffect
                        top="0"
                        right="-5px"
                        bottom="0"
                        left="auto"
                        width="25px"
                        height="24px"
                        backgroundImage="linear-gradient(to right, transparent , white)"
                      />
                    )}
                  </p>
                )
            )}
          </div>
        </VerticalScroll>
      </div>
    </div>
  );
}
