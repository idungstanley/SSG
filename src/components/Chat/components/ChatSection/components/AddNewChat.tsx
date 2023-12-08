import React, { useMemo, useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import Input from '../../../../input/Input';
import { cl } from '../../../../../utils';
import AlsoitMenuDropdown from '../../../../DropDowns';
import ArrowDown from '../../../../../assets/icons/ArrowDown';
import { InlineBorderLabel } from '../../../../Dropdown/MenuDropdown';
import ChatSearch from '../../../../../assets/icons/ChatSearch';
import { VerticalScroll } from '../../../../ScrollableContainer/VerticalScroll';
import { Capitalize } from '../../../../../utils/NoCapWords/Capitalize';
import { useCreateChat } from '../../../../../features/chat/chatService';
import CardLabel from '../../../../CardLabel/CardLabel';
import AddNewChatContent from './AddNewChatContent';

const chatItems = [
  {
    id: 'chat',
    name: 'Chat'
  }
];

interface IActiveItem {
  id: string;
  name: string;
}

interface IAddNewChatProps {
  onClose: () => void;
}

export default function AddNewChat({ onClose }: IAddNewChatProps) {
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  const { activeItemType, activeItemId } = useAppSelector((state) => state.workspace);

  const [openCard, setOpenCard] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<null | HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState(chatItems);
  const [activeItem, setActiveItem] = useState<IActiveItem | null>(null);
  const [name, setName] = useState<string>('');

  const { mutate: onCreate } = useCreateChat(activeItemId);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.length) {
      setFilteredItems(chatItems.filter((item) => item.name.toLowerCase().startsWith(value.toLowerCase())));
    } else {
      setFilteredItems(chatItems);
    }
  };

  const onClickOpenDropdown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsOpen(e.currentTarget);
  };

  const handleCreateChat = () => {
    onCreate({ id: activeItemId as string, type: activeItemType as string, name });
    onClose();
  };

  const handleCancel = () => {
    setActiveItem(null);
    setName('');
  };

  const renderAddtionalContent = useMemo(() => {
    switch (activeItem?.id) {
      case 'chat':
        return <AddNewChatContent chatName={name} onSave={handleCreateChat} onCancel={handleCancel} />;
    }
  }, [activeItem, name]);

  return (
    <div className="w-full bg-gray-100 rounded-md">
      <CardLabel title="New chat" isOpen={openCard} setOpen={(e) => setOpenCard(e)} />
      {openCard && (
        <div className="p-2 pb-4 pl-4">
          <div className="flex items-center justify-between w-full gap-2 my-2 mb-3">
            <div className="w-1/4">
              <p className="mb-1 ml-1 text-alsoit-text-xi text-alsoit-gray-100">TYPE</p>
              <div className="relative w-full">
                <div className="w-full">
                  <button
                    onClick={onClickOpenDropdown}
                    className="flex items-center justify-between w-full h-8 gap-2 px-1 text-left truncate bg-white cursor-pointer"
                    style={{ borderRadius: '6px' }}
                  >
                    <div>
                      <p className="w-full font-semibold truncate text-alsoit-gray-100">
                        {activeItem ? Capitalize(activeItem.name) : 'Select'}
                      </p>
                    </div>
                    <span className={`flex items-center w-4 h-4 ${isOpen ? 'origin-center rotate-180' : ''}`}>
                      <ArrowDown className="w-3 h-3" color={isOpen ? '#BF01FE' : '#919191'} />
                    </span>
                  </button>
                </div>
                <AlsoitMenuDropdown handleClose={() => setIsOpen(null)} anchorEl={isOpen}>
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
                        value={searchValue}
                        placeholder="Search"
                        onChange={(e) => handleSearch(e)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start w-48 py-1 pl-2 mt-1 text-left rounded-md shadow-lg outline-none h-fit focus:outline-none">
                    <VerticalScroll>
                      <div className="w-full mt-1 overflow-visible" style={{ maxHeight: '300px', maxWidth: '174px' }}>
                        {filteredItems.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center px-2 py-1 hover:bg-alsoit-gray-50 text-[13px] text-gray-600 text-left w-full rounded-md cursor-pointer"
                            onClick={() => {
                              setActiveItem(item);
                              setIsOpen(null);
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
            </div>
            <div className="w-3/4">
              <div className="flex items-center w-full rounded-md" style={{ borderRadius: '6px' }}>
                <div className="relative flex grow">
                  <Input
                    labelClasses="text-alsoit-text-xi text-alsoit-gray-100 ml-1"
                    placeholder={`Name ${activeItem ? activeItem.name : ''}`}
                    height="h-8"
                    label="TITLE"
                    name="name"
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    classes={cl(
                      'block border-0 py-1 ring-0  placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi text-alsoit-gray-300 sm:text-sm sm:leading-6 w-10/12',
                      newCustomPropertyDetails.style?.is_bold === '1' ? 'font-extrabold' : 'font-semibold',
                      newCustomPropertyDetails.style?.is_italic === '1' && 'italic',
                      newCustomPropertyDetails.style?.is_underlined === '1' && 'underline underline-offset-2'
                    )}
                    styles={{
                      color: newCustomPropertyDetails.color ? newCustomPropertyDetails.color : '#242424',
                      fontSize: '11px',
                      fontWeight: '600',
                      lineHeight: '13.2px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          {renderAddtionalContent}
        </div>
      )}
    </div>
  );
}
