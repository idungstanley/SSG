import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import { cl } from '../../../../../../utils';
import ThreeDotIcon from '../../../../../../assets/icons/ThreeDotIcon';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import { CopyIcon } from '../../../../../../assets/icons';
import EditIcon from '../../../../../../assets/icons/Edit';
import { RiDeleteBinLine } from 'react-icons/ri';
import { Capitalize } from '../../../../../../utils/NoCapWords/Capitalize';

interface EmailFieldProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  fieldType: string;
}

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const websitePattern = /^(?:(https?:\/\/|www\.)[\w.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})|[\w.-]+\.[a-zA-Z]{2,})$/;

function EmailWebsiteField({ taskCustomFields, taskId, fieldId, fieldType }: EmailFieldProps) {
  console.log(taskCustomFields?.values[0]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const activeValue = taskCustomFields?.values[0].value ? taskCustomFields?.values[0].value : '-';
  const [currentValue, setCurrentValue] = useState<string>(activeValue);
  const [editMode, setEditMode] = useState(false);
  const [isCopied, setIsCopied] = useState<number>(0);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);

  const isValidEntry = (entry: string) => {
    const validateParams = fieldType === 'email' ? emailPattern.test(entry) : websitePattern.test(entry);
    return validateParams;
  };

  const handleInputBlur = () => {
    setEditMode(false);
    if (currentValue !== activeValue && isValidEntry(currentValue)) {
      onUpdate({
        taskId,
        value: [{ value: currentValue }],
        fieldId
      });
      setAnchorEl(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentValue !== activeValue && isValidEntry(currentValue)) {
        onUpdate({
          taskId,
          value: [{ value: currentValue }],
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
    await navigator.clipboard.writeText(currentValue);
    setIsCopied(1);
    setTimeout(() => {
      setAnchorEl(null);
      setIsCopied(0);
    }, 500);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditEmail = () => {
    setAnchorEl(null);
    setTimeout(() => {
      setEditMode(true);
    }, 100);
  };

  return (
    <div className="w-full h-full flex justify-center items-center p-4">
      {!editMode ? (
        <div className="w-full h-full group/parent">
          <span
            className={cl(
              'h-full flex items-center  cursor-pointer w-full',
              currentValue !== '-' ? 'justify-between' : 'justify-center'
            )}
          >
            {currentValue === '-' ? (
              <h1 onClick={() => setEditMode(true)}>-</h1>
            ) : (
              <>
                {fieldType === 'website' ? (
                  <a
                    href={currentValue}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-alsoit-purple-300 w-full break-words text-center"
                  >
                    {currentValue}
                  </a>
                ) : (
                  <a
                    href={`mailto:${currentValue}`}
                    className="hover:text-alsoit-purple-300 w-full break-words text-center"
                  >
                    {currentValue}
                  </a>
                )}
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
        <div className="w-full">
          <input
            type="text"
            autoFocus={true}
            value={currentValue === '-' ? '' : currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleInputBlur}
            className="max-w-full h-fit border-0 outline-0 ring-0 focus:border-0 focus:outline-0 focus:ring-0"
          />
        </div>
      )}
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <div className="block" style={{ width: '150px' }}>
          <button
            className="flex w-full gap-2 items-center p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleCopyTexts}
          >
            <CopyIcon className="w-5 h-5" />
            <h1> {isCopied === 0 ? `Copy ${Capitalize(fieldType)}` : 'Copied'}</h1>
          </button>
          <button
            className="flex w-full  gap-2 items-center  p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleEditEmail}
          >
            <EditIcon active={false} />
            {`Edit ${Capitalize(fieldType)}`}
          </button>
          <button
            className="flex w-full gap-2 items-center text-alsoit-danger p-1 hover:bg-alsoit-purple-50 rounded"
            onClick={handleDeleteEmail}
          >
            <RiDeleteBinLine className="w-4 h-4" /> {`Remove ${Capitalize(fieldType)}`}
          </button>
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default EmailWebsiteField;
