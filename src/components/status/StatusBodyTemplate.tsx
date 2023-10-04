import React, { useEffect, useRef, useState } from 'react';
import ThreeDotIcon from '../../assets/icons/ThreeDotIcon';
import { IoMdCheckmark } from 'react-icons/io';
import AlsoitMenuDropdown from '../DropDowns';
import { PencilIcon } from '@heroicons/react/24/outline';
import { AiOutlineDelete } from 'react-icons/ai';
import ColorPalette from '../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../tasks/ListItem';
import { MdInvertColors } from 'react-icons/md';
import { StatusProps } from '../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import Picker from '../../assets/icons/Picker';
import StatusIconComp from '../../assets/icons/StatusIconComp';
import Drag from '../../assets/icons/Drag';
import { useSortable } from '@dnd-kit/sortable';
import { BoardSectionsType } from '../../utils/StatusManagement/Types';
import { CSS } from '@dnd-kit/utilities';
import { useAppSelector } from '../../app/hooks';
import { groupStylesMapping } from './StatusManagement';

interface StatusBodyProps {
  item: StatusProps;
  setStatusTypesState?: React.Dispatch<React.SetStateAction<BoardSectionsType>>;
}

export default function StatusBodyTemplate({ item, setStatusTypesState }: StatusBodyProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { draggableActiveStatusId } = useAppSelector((state) => state.workspace);

  const [editableContent, setEditableContent] = useState<boolean>(false);
  const [showStatusEditDropdown, setShowStatusEditDropdown] = useState<null | HTMLSpanElement | HTMLDivElement>(null);
  const [showStatusColorDropdown, setShowStatusColorDropdown] = useState<null | HTMLSpanElement>(null);

  const handleOpenStatusEditDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    setShowStatusEditDropdown(event.currentTarget);
  };

  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition } = useSortable({
    id: item.name,
    data: { item }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
    opacity: item.name === draggableActiveStatusId ? 0.3 : 1,
    marginBottom: item.name === draggableActiveStatusId ? '16px' : '',
    backgroundColor:
      item.name === draggableActiveStatusId
        ? (groupStylesMapping[item.type as keyof typeof groupStylesMapping]?.backgroundColor as string)
        : undefined
  };

  const handleOpenStatusColorDropdown = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    event.stopPropagation();
    if (item.type !== 'closed') setShowStatusColorDropdown(event.currentTarget);
  };

  const handleStatusColor = (color: string | ListColourProps | null) => {
    if (setStatusTypesState) {
      setStatusTypesState((prevState) => {
        return Object.entries(prevState).reduce((acc, [name, statuses]) => {
          acc[name] = statuses.map((status) => {
            if (status.name === item.name) {
              return { ...status, color } as StatusProps;
            }
            return status;
          });
          return acc;
        }, {} as BoardSectionsType);
      });
    }
  };

  useEffect(() => {
    const { current } = inputRef;
    current?.focus();
  }, [editableContent]);

  const handleCloseStatusEditDropdown = () => {
    setShowStatusEditDropdown(null);
  };

  const handleCloseStatusColorDropdown = () => {
    setShowStatusColorDropdown(null);
  };

  const handleToggleEditableContent = () => {
    setEditableContent(true);
  };

  const handleSaveEditableContent = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent> | React.KeyboardEvent<HTMLSpanElement>
  ) => {
    e.stopPropagation();
    setEditableContent(false);
    if (setStatusTypesState) {
      setStatusTypesState((prevState) => {
        return Object.entries(prevState).reduce((acc, [name, statuses]) => {
          acc[name] = statuses.map((status) => {
            if (status.name === item.name) {
              return {
                ...status,
                name: inputRef.current?.innerText.trim() || status.name
              } as StatusProps;
            }
            return status;
          });
          return acc;
        }, {} as BoardSectionsType);
      });
    }
  };

  const showStatusEditDropdownOptions = [
    {
      visibility: true,
      label: 'Rename',
      icon: <PencilIcon className="w-4 h-4" aria-hidden="true" />,
      handleClick: () => {
        setShowStatusEditDropdown(null);
        setEditableContent(true);
      }
    },
    {
      visibility: item.type != 'closed',
      label: 'Change Color',
      icon: <MdInvertColors />,
      handleClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setShowStatusColorDropdown(event.currentTarget);
        setShowStatusEditDropdown(null);
      }
    },
    {
      visibility: item.type != 'closed' && item.position !== 0,
      label: 'Delete status',
      icon: <AiOutlineDelete />,
      handleClick: () => {
        if (setStatusTypesState) {
          setStatusTypesState((prevState) => {
            return Object.entries(prevState).reduce((acc, [name, statuses]) => {
              acc[name] = statuses.filter((status) => status.name !== item.name);
              return acc;
            }, {} as BoardSectionsType);
          });
          setShowStatusEditDropdown(null);
        }
      }
    }
  ];

  return (
    <span ref={setNodeRef}>
      <span
        className="flex items-center px-1 bg-white border rounded cursor-pointer justify-items-start h-7 border-alsoit-gray-75"
        style={style}
      >
        {item.type !== 'closed' && item.position !== 0 && (
          <span className="cursor-move" ref={setActivatorNodeRef} {...attributes} {...listeners}>
            <Drag />
          </span>
        )}
        <span className="w-3 h-3 ml-4 rounded" onClick={(e) => handleOpenStatusColorDropdown(e)}>
          <StatusIconComp color={item.color as string} />
        </span>
        <span
          contentEditable={editableContent}
          style={{ color: item.color as string }}
          className="flex-grow uppercase truncate"
          onClick={() => handleToggleEditableContent()}
          onKeyDown={(e) => (e.key === 'Enter' ? handleSaveEditableContent(e) : null)}
          ref={inputRef}
        >
          {item.name}
        </span>
        {!editableContent && (
          <span className="flex items-center gap-2 ml-2">
            <span>
              <Picker />
            </span>
            <span onClick={(e) => handleOpenStatusEditDropdown(e)}>
              <ThreeDotIcon />
            </span>
          </span>
        )}
        {editableContent && (
          <span className="ml-auto text-green-400" onClick={(e) => handleSaveEditableContent(e)}>
            <IoMdCheckmark />
          </span>
        )}
      </span>
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
