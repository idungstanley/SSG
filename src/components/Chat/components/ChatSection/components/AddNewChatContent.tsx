import { useState } from 'react';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import ClosePalette from '../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../assets/icons/SavePalette';
import CollectionsIcon from '../../../../../assets/icons/chatIcons/CollectionsIcon';
import InformationIcon from '../../../../../assets/icons/chatIcons/InformationIcon';
import PermissionIcon from '../../../../../assets/icons/chatIcons/PermissionIcon';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';
import ToolTip from '../../../../Tooltip/Tooltip';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { InlineBorderLabel } from '../../../../Dropdown/MenuDropdown';
import ChatSearch from '../../../../../assets/icons/ChatSearch';
import { VerticalScroll } from '../../../../ScrollableContainer/VerticalScroll';

const collectionMoskItems = [
  {
    id: 'designers',
    name: 'DESIGNERS'
  }
];

interface IActiveItem {
  id: string;
  name: string;
}

interface IAddNewChatContentProps {
  chatName: string;
  onSave: () => void;
  onCancel: () => void;
}

export default function AddNewChatContent({ chatName, onSave, onCancel }: IAddNewChatContentProps) {
  const [isCollectionsOpen, setIsCollectionsOpen] = useState<null | HTMLButtonElement>(null);
  const [activeCollectionItem, setActiveCollectionItem] = useState<IActiveItem | null>(null);
  const [searchCollectionsValue, setSearchCollectionsValue] = useState<string>('');
  const [filteredCollections, setFilteredCollections] = useState(collectionMoskItems);

  const handleCollectionsSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchCollectionsValue(value);
    if (value.length) {
      setFilteredCollections(
        collectionMoskItems.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase()))
      );
    } else {
      setFilteredCollections(collectionMoskItems);
    }
  };

  return (
    <div>
      <div className="w-1/4">
        <p className="mb-1 ml-1 text-alsoit-text-xi text-alsoit-gray-100">COLLECTION</p>
        <div className="relative w-full">
          <div className="w-full">
            <button
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsCollectionsOpen(e.currentTarget)}
              className="flex items-center justify-between w-full h-8 gap-2 px-1 text-left truncate bg-white cursor-pointer"
              style={{ borderRadius: '6px' }}
            >
              <div>
                <p className="w-full font-semibold truncate text-alsoit-gray-100">
                  {activeCollectionItem ? Capitalize(activeCollectionItem.name) : 'Choose chat collection'}
                </p>
              </div>
              <span className={`flex items-center w-4 h-4 ${isCollectionsOpen ? 'origin-center rotate-180' : ''}`}>
                <ArrowDown className="w-3 h-3" color={isCollectionsOpen ? '#BF01FE' : '#919191'} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="my-2 mt-2 text-xs">CLICK HERE TO HOST IN TEMPLATE</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div
            className="flex justify-center items-center rounded-sm bg-alsoit-gray-50 py-1 px-2 text-[10px]"
            style={{ minWidth: '16px', minHeight: '16px', color: 'orange' }}
          >
            <span className="pr-1">
              <PermissionIcon color="orange" />
            </span>
            Permissions
            <span className="pl-1">
              <InformationIcon color="orange" />
            </span>
          </div>
          <div
            className="flex justify-center items-center rounded-sm bg-white"
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
            <span
              onClick={() => {
                setActiveCollectionItem(null);
                onCancel();
              }}
              className="cursor-pointer text-[#FF3738] hover:text-white"
            >
              <ClosePalette fill="white" />
            </span>
          </ToolTip>
          <ToolTip title="Add Property">
            <span className="cursor-pointer" onClick={onSave}>
              <SavePalette color={!activeCollectionItem || !chatName ? '#E9E9E9' : ''} />
            </span>
          </ToolTip>
        </div>
      </div>
      <AlsoitMenuDropdown handleClose={() => setIsCollectionsOpen(null)} anchorEl={isCollectionsOpen}>
        <InlineBorderLabel
          label="SELECT ENTITY"
          topElement={<p className="flex justify-center w-full pt-3 font-bold text-alsoit-text-sm">CHAT</p>}
        />
        <div className="mx-2 h-7">
          <div className="flex items-center w-full bg-white rounded-md grow chatSearch">
            <span className="mx-1 chatSearch_icon">
              <ChatSearch color="#919191" />
            </span>
            <input
              className="ring-0 focus:ring-0 focus:outline-0"
              type="text"
              value={searchCollectionsValue}
              placeholder="Search"
              onChange={(e) => handleCollectionsSearch(e)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start w-48 py-1 pl-2 mt-1 text-left rounded-md shadow-lg outline-none h-fit focus:outline-none">
          <VerticalScroll>
            <div className="w-full mt-1 overflow-visible" style={{ maxHeight: '300px', maxWidth: '174px' }}>
              {filteredCollections.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center px-2 py-1 hover:bg-alsoit-gray-50 text-[13px] text-gray-600 text-left w-full rounded-md cursor-pointer"
                  onClick={() => {
                    setActiveCollectionItem(item);
                    setIsCollectionsOpen(null);
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </VerticalScroll>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
