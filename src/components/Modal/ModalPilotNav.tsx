import * as React from 'react';
import Close from '../../assets/icons/Close';
import BlurEffect from '../BlurEffect';

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

  return (
    <div
      className="bg-white fixed px-4 py-3"
      style={{
        width: '204px',
        height: 'auto',
        maxHeight: '272px',
        top: '40px',
        zIndex: '51',
        borderRadius: '10px',
        boxShadow: '0px 0px 5px 0px #00000040'
      }}
    >
      <div className="my-2 space-y-2 text-center font-semibold relative">
        <span
          className="absolute right-0 hover:rotate-90 transition duration-500"
          style={{ top: '-10px' }}
          onClick={() => modalItemClick(null)}
        >
          <Close active={false} width="15" height="15" />
        </span>
        <p style={{ fontSize: '12px', color: 'orange' }}>Tree search</p>
        <hr />
      </div>
      {modalNavTree.map(
        (item) =>
          item.nesting >= currentNestedLevel[0].nesting && (
            <p
              key={item.id}
              className={`text-alsoit-gray-300 hover:bg-alsoit-gray-125 transition duration-300 overflow-hidden relative rounded py-1 pl-2 ${
                activeNavItem == item.id ? 'font-semibold' : 'font-medium'
              } `}
              onClick={() => modalItemClick(item.url)}
            >
              <span
                className={`${item.nesting == 1 ? paddingLeftFirst : ''} ${
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
  );
}
