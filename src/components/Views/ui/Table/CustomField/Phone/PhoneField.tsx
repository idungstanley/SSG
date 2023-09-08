import React, { useState, useRef } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { cl } from '../../../../../../utils';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import { CopyIcon } from '../../../../../../assets/icons';
import EditIcon from '../../../../../../assets/icons/Edit';
import { RiDeleteBinLine } from 'react-icons/ri';
import SearchIcon from '../../../../../../assets/icons/SearchIcon';
import PhoneExt from '../../../../../../utils/Constants/PhoneExt';

interface PhoneFieldProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function PhoneField({ taskCustomFields, taskId, fieldId }: PhoneFieldProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [showAllCodes, setShowAllcodes] = React.useState<null | HTMLElement>(null);
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; dial_code: string; code: string } | null>(
    PhoneExt[0]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const filteredPhpneExt = PhoneExt.filter((option) => option.name.toLowerCase().includes(searchValue.toLowerCase()));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentValue !== activeValue) {
        const completeNum = selectedCountry?.dial_code + currentValue;
        onUpdate({
          taskId,
          value: [{ value: completeNum }],
          fieldId
        });
        setEditMode(false);
      }
    }
  };

  const handleDeleteEmail = () => {
    setEditMode(false);
    onUpdate({
      taskId,
      value: [{ value: '' }],
      fieldId
    });
    setAnchorEl(null);
    setCurrentValue('-');
  };

  const handleCopyTexts = async () => {
    try {
      await navigator.clipboard.writeText(currentValue);
      setIsCopied(1);
      setTimeout(() => {
        setAnchorEl(null);
        setIsCopied(0);
      }, 500);
    } catch (error) {
      console.warn(`Failed to copy: ${error}`);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditEmail = () => {
    setAnchorEl(null);
    setSelectedCountry(null);
    setTimeout(() => {
      setEditMode(true);
    }, 100);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      {!editMode ? (
        <div className="w-full h-full group/parent">
          <span
            className={cl(
              'h-full flex items-center  cursor-pointer w-full',
              currentValue !== '-' ? 'justify-between' : 'justify-center'
            )}
          >
            {currentValue === '-' ? (
              <h1
                onClick={() => {
                  setSelectedCountry(PhoneExt[0]);
                  setEditMode(true);
                }}
              >
                -
              </h1>
            ) : (
              <>
                <a href={`tel:${currentValue}`} className="hover:text-alsoit-purple-300 w-full break-words text-center">
                  {currentValue}
                </a>
              </>
            )}

            {currentValue !== '-' && (
              <button
                className="flex items-center justify-end opacity-0 group-hover/parent:opacity-100 w-5 h-5 absolute bg-white right-0"
                onClick={(e) => handleClick(e)}
              >
                <ThreeDotIcon />
              </button>
            )}
          </span>
        </div>
      ) : (
        <div className="w-full flex items-center">
          {activeValue === '-' && (
            <span className="text-alsoit-text-lg cursor-pointer" onClick={(e) => setShowAllcodes(e.currentTarget)}>
              {selectedCountry?.dial_code}
            </span>
          )}
          <input
            type="text"
            autoFocus={true}
            ref={inputRef}
            value={currentValue === '-' ? '' : currentValue}
            maxLength={12}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-fit border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0 text-alsoit-text-lg"
            style={{ maxWidth: '120px' }}
          />
        </div>
      )}
      <AlsoitMenuDropdown handleClose={() => setShowAllcodes(null)} anchorEl={showAllCodes}>
        <div className="w-full">
          <div className="flex items-center max-w-full h-6 p-2">
            <SearchIcon />
            <input
              onChange={handleSearchChange}
              value={searchValue}
              type="text"
              placeholder="Search"
              className="h-4 border-0 border-gray-300 ring-0 outline-0 focus:ring-0 focust:outline-0 focus:border-0 w-24"
            />
          </div>
          <div className="block p-2 overflow-scroll" style={{ width: '250px', maxHeight: '340px' }}>
            {filteredPhpneExt.map((code) => {
              return (
                <button
                  key={code.code}
                  className="flex w-full gap-2 items-center p-1 hover:bg-alsoit-purple-50 rounded"
                  onClick={() => {
                    setShowAllcodes(null);
                    setSelectedCountry(code);
                  }}
                >
                  <h1 className="w-10/12 truncate text-left">{code.name}</h1>
                  <span className="text-right w-2/12">{code.dial_code}</span>
                </button>
              );
            })}
          </div>
        </div>
      </AlsoitMenuDropdown>
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <div className="block" style={{ width: '150px' }}>
          <button
            className="flex w-full gap-2 items-center p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleCopyTexts}
          >
            <CopyIcon className="w-5 h-5" />
            <h1> {isCopied === 0 ? 'Copy Phone' : 'Copied'}</h1>
          </button>
          <button
            className="flex w-full  gap-2 items-center  p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleEditEmail}
          >
            <EditIcon active={false} />
            Edit Phone
          </button>
          <button
            className="flex w-full gap-2 items-center text-alsoit-danger p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleDeleteEmail}
          >
            <RiDeleteBinLine className="w-4 h-4" /> Remove Phone
          </button>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default PhoneField;
