import { getInitials } from '../../../../../app/helpers';
import DropDownArrow from '../../../../../assets/icons/DropDownArrow';
import { FaFolder, FaFolderOpen } from 'react-icons/fa';
import * as React from 'react';

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

interface ModalNavCheckEntityProps {
  item: ToolbarNavInterface;
  ToggleOpenedNavItems: (itemId: string) => void;
  openedNavItems: string[];
}

export default function ModalNavCheckEntity({ item, ToggleOpenedNavItems, openedNavItems }: ModalNavCheckEntityProps) {
  return (
    <div className="flex items-center cursor-pointer" onClick={() => ToggleOpenedNavItems(item.id as string)}>
      {item.entity == 'hub' ? (
        <div className="relative flex items-center relative justify-center">
          <div
            className={`inline-flex items-center justify-center z-5 h-4 w-4 false transition duration-500 ${
              openedNavItems.filter((i) => i == item.id).length > 0
                ? ''
                : 'group-hover:opacity-50 group-hover:grayscale'
            }`}
            style={{
              backgroundColor:
                openedNavItems.filter((i) => i == item.id).length > 0 ? '#c4b9cb' : item.color ? item.color : 'blue',
              width: '15px',
              height: '15px',
              borderRadius: '2px'
            }}
          >
            <span className="inline-flex items-center justify-center z-5 h-full w-full false">
              <span className="font-bold leading-none text-white" style={{ fontSize: '8px' }}>
                {getInitials(item.name)}
              </span>
            </span>
          </div>
          {item.children && item.children.length > 0 && (
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
            className={`inline-flex items-center justify-center z-5 h-4 w-4 false transition duration-500 ${
              openedNavItems.filter((i) => i == item.id).length > 0
                ? ''
                : 'group-hover:opacity-50 group-hover:grayscale'
            }`}
            style={{
              backgroundColor:
                openedNavItems.filter((i) => i == item.id).length > 0 ? '#c4b9cb' : item.color ? item.color : 'orange',
              width: '15px',
              height: '15px',
              borderRadius: '2px'
            }}
          >
            <span className="inline-flex items-center justify-center z-5 h-4 w-4 false">
              <span className="font-bold leading-none text-white" style={{ fontSize: '8px' }}>
                {getInitials(item.name)}
              </span>
            </span>
          </div>
          {item.children && item.children.length > 0 && (
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
                ? ''
                : 'group-hover:opacity-25 group-hover:grayscale'
            }`}
          >
            {openedNavItems.filter((i) => i == item.id).length > 0 ? (
              <FaFolderOpen
                className="w-5 h-6"
                style={{ width: '18px', height: '15px' }}
                color={
                  openedNavItems.filter((i) => i == item.id).length > 0 ? '#c4b9cb' : item.color ? item.color : 'black'
                }
              />
            ) : (
              <FaFolder
                className="w-5 h-6"
                style={{ width: '18px', height: '15px' }}
                color={
                  openedNavItems.filter((i) => i == item.id).length > 0 ? '#c4b9cb' : item.color ? item.color : 'black'
                }
              />
            )}
          </div>
          {item.children && item.children.length > 0 && (
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
        <div className="group-hover:opacity-25 group-hover:grayscale duration-500 transition">
          <span
            className="flex items-center justify-center w-3 h-3 rounded-full"
            style={{ backgroundColor: item.color ? item.color : 'orange' }}
          ></span>
        </div>
      )}
    </div>
  );
}
