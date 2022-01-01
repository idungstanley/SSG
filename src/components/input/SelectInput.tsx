import React, { useState } from 'react';
import AlsoitMenuDropdown from '../DropDowns';
import ArrowCaretUp from '../../assets/icons/ArrowCaretUp';
import { StatusProps } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import { matchedStatusProps } from '../../common/Prompt';
import { useAppSelector } from '../../app/hooks';

interface SelectDropdownProps {
  options: StatusProps[];
  index?: number;
  setMatchedStatus: React.Dispatch<React.SetStateAction<matchedStatusProps[]>>;
}

export default function SelectDropdown({ options, setMatchedStatus, index }: SelectDropdownProps) {
  const { statusesToMatch } = useAppSelector((state) => state.hub);

  const [selectItem, setSelectItem] = useState<string>('');
  const [showSelectDropdown, setShowSelectDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);

  const handleShowSelectOption = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setShowSelectDropdown(event.currentTarget);
  };
  const handleCloseSelectOption = () => {
    setShowSelectDropdown(null);
  };

  const handleSelectOption = (value: string) => {
    setSelectItem(value);
    setMatchedStatus((prev) => {
      const matchItem = options.map((option, optionIndex) => {
        if (optionIndex === index) {
          return { id: options[index].id, name: value };
        }
        return option;
      });
      console.log(matchItem, 'matchItem');
      console.log(prev);
      if (prev.length === 0) {
        return prev.push(matchItem);
      } else {
        return prev.map((prevItem) => {
          return { ...prevItem, matchItem };
        });
      }
    });
  };

  return (
    <div className="w-40 px-4 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300">
      <div className="flex items-center justify-between gap-2" onClick={handleShowSelectOption}>
        <p className="truncate">{selectItem ? selectItem : 'Select Option'}</p>
        <ArrowCaretUp active={!!showSelectDropdown} />
      </div>
      <AlsoitMenuDropdown anchorEl={showSelectDropdown} handleClose={handleCloseSelectOption}>
        <div className="flex flex-col w-48 p-2 space-y-2">
          {statusesToMatch.map((option) => (
            <span
              key={option.name}
              onClick={() => handleSelectOption(option.name)}
              className="flex items-center gap-2 p-1 px-3 rounded cursor-pointer hover:bg-alsoit-gray-75"
            >
              <span className="flex items-center justify-between gap-2 px-2">
                <StatusIconComp color={option.color as string} />
                {option.name}
              </span>
            </span>
          ))}
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}
