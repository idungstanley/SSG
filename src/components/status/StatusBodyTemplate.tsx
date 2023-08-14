import React, { useState } from 'react';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { IoMdCheckmark } from 'react-icons/io';
import AlsoitMenuDropdown from '../DropDowns';
import { PencilIcon } from '@heroicons/react/24/outline';
import { AiOutlineDelete } from 'react-icons/ai';
import ColorPalette from '../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../tasks/ListItem';
import { MdInvertColors } from 'react-icons/md';

interface ItemProps {
  name?: string;
  color: string;
  model_type: string;
}

interface StatusBodyProps {
  item: ItemProps;
  index: number;
  setStatusTypesState: React.Dispatch<React.SetStateAction<ItemProps[]>>;
}

export default function StatusBodyTemplate({ item, index, setStatusTypesState }: StatusBodyProps) {
  const [editableContent, setEditableContent] = useState<boolean>(false);
  const [showStatusEditDropdown, setShowStatusEditDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);
  const [showStatusColorDropdown, setShowStatusColorDropdown] = useState<null | HTMLSpanElement>(null);
  const handleOpenStatusEditDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setShowStatusEditDropdown(event.currentTarget);
  };

  const handleOpenStatusColorDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    if (item.model_type !== 'closed') setShowStatusColorDropdown(event.currentTarget);
  };

  const handleStatusColor = (color: string | ListColourProps) => {
    setStatusTypesState((prevState) => {
      return prevState.map((status) => {
        if (status.name === item.name) {
          return { ...status, color } as ItemProps;
        }
        return status;
      });
    });
  };

  const handleCloseStatusEditDropdown = () => {
    setShowStatusEditDropdown(null);
  };

  const handleCloseStatusColorDropdown = () => {
    setShowStatusColorDropdown(null);
  };

  const handleToggleEditableContent = () => {
    setEditableContent(true);
  };

  const handleSaveEditableContent = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation();
    setEditableContent(false);
  };

  const showStatusEditDropdownOptions = [
    {
      visibility: true,
      label: 'Edit Status',
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      handleClick: () => {
        setShowStatusEditDropdown(null);
        setEditableContent(true);
      }
    },
    {
      visibility: item.model_type != 'closed',
      label: 'Change Color',
      icon: <MdInvertColors />,
      handleClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setShowStatusColorDropdown(event.currentTarget);
        setShowStatusEditDropdown(null);
      }
    },
    {
      visibility: item.model_type === 'custom',
      label: 'Delete status',
      icon: <AiOutlineDelete />,
      handleClick: () => {
        setStatusTypesState((prevState) => {
          return prevState.filter((status) => status.label !== item.label);
        });
        setShowStatusEditDropdown(null);
      }
    }
  ];

  return (
    <span
      key={index}
      className="flex items-center gap-2 p-1 border rounded cursor-pointer justify-items-start border-alsoit-gray-75"
      onClick={() => handleToggleEditableContent()}
    >
      <span
        className="w-3 h-3 ml-4 rounded"
        style={{ backgroundColor: item.color }}
        onClick={(e) => handleOpenStatusColorDropdown(e)}
      ></span>
      <span contentEditable={editableContent} style={{ color: item.color }} className="uppercase">
        {item.name}
      </span>
      {!editableContent && (
        <span className="ml-auto" onClick={(e) => handleOpenStatusEditDropdown(e)}>
          <ThreeDotIcon />
        </span>
      )}
      {editableContent && (
        <span className="ml-auto text-green-400" onClick={(e) => handleSaveEditableContent(e)}>
          <IoMdCheckmark />
        </span>
      )}
      <AlsoitMenuDropdown
        handleClose={handleCloseStatusEditDropdown}
        anchorEl={showStatusEditDropdown as HTMLDivElement | null}
      >
        <div className="flex flex-col w-48 p-2 space-y-2">
          {showStatusEditDropdownOptions.map(
            (item, index) =>
              item.visibility && (
                <div
                  className="flex items-center gap-2 p-1 rounded cursor-pointer hover:bg-alsoit-gray-50"
                  key={index}
                  onClick={item.handleClick}
                >
                  <p>{item.icon}</p>
                  <p>{item.label}</p>
                </div>
              )
          )}
        </div>
      </AlsoitMenuDropdown>
      <AlsoitMenuDropdown handleClose={handleCloseStatusColorDropdown} anchorEl={showStatusColorDropdown}>
        <ColorPalette handleClick={handleStatusColor} />
      </AlsoitMenuDropdown>
    </span>
  );
}
