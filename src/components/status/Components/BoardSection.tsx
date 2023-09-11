import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import StatusBodyTemplate from '../StatusBodyTemplate';
import PlusCircle from '../../../assets/icons/AddCircle';
import PlusIcon from '../../../assets/icons/PlusIcon';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import { Chevron } from '../../Views/ui/Chevron';
import Button from '../../Button';
import Input from '../../input/Input';
import { useDroppable } from '@dnd-kit/core';
import { BoardSectionsType } from '../../../utils/StatusManagement/Types';

interface BoardProps {
  id: string;
  title: string;
  status: StatusProps[];
  setStatusTypesState: React.Dispatch<React.SetStateAction<BoardSectionsType>>;
  statusData: StatusProps[];
  setValidationMessage: React.Dispatch<React.SetStateAction<string>>;
}

export default function BoardSection({
  id,
  title,
  status,
  setStatusTypesState,
  statusData,
  setValidationMessage
}: BoardProps) {
  const { setNodeRef } = useDroppable({
    id
  });

  const [collapsedStatusGroups, setCollapsedStatusGroups] = useState<{ [key: string]: boolean }>({});
  const [activeStatusType, setActiveStatusType] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>('');
  const [addStatus, setAddStatus] = useState<boolean>(false);

  const handleSaveNewStatus = () => {
    const nameWithoutWhiteSpace = newStatusValue?.trim();
    const isNameExist = statusData.some(
      (status) => status.name?.toLowerCase() === nameWithoutWhiteSpace?.toLowerCase()
    );
    if (nameWithoutWhiteSpace !== '' && !isNameExist) {
      const newStatusItem: StatusProps = {
        name: newStatusValue,
        color: 'green',
        type: id,
        position: statusData.length,
        id: null,
        is_default: 0
      };
      // setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
      setStatusTypesState((prevBoardSections) => ({
        ...prevBoardSections,
        [id]: Array.isArray(prevBoardSections[id]) ? [...prevBoardSections[id], newStatusItem] : [newStatusItem] // Assuming 'open' is the section name
      }));
      setNewStatusValue('');
      setValidationMessage('');
    } else {
      setNewStatusValue('');
      setValidationMessage(`Whoops, status with name '${newStatusValue}' already exist`);
    }
    setAddStatus(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewStatusValue(e.target.value);
  };
  const handleToggleGroup = (group: string) => {
    setCollapsedStatusGroups((prevCollapsedStatusGroups) => ({
      ...prevCollapsedStatusGroups,
      [group]: !prevCollapsedStatusGroups[group]
    }));
  };
  const StatusIndex = status.map((item) => item.name);

  const handleAddStatus = () => {
    setActiveStatusType(title);
    setAddStatus(true);
  };

  return (
    <>
      {title && (
        <span className="flex gap-2">
          <Chevron
            onToggle={() => handleToggleGroup(id)}
            active={collapsedStatusGroups[id]}
            iconColor="text-gray-400"
          />
          <p className="flex uppercase justify-items-start">{title} STATUS</p>
        </span>
      )}
      <SortableContext items={StatusIndex} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col flex-1 p-1 space-y-1">
          {id &&
            !collapsedStatusGroups[id] &&
            status.map((item) => (
              <div key={item.name}>
                <StatusBodyTemplate item={item} setStatusTypesState={setStatusTypesState} />
              </div>
            ))}
        </div>
      </SortableContext>

      {addStatus && title === activeStatusType && (
        <span className="flex justify-items-start">
          <Input
            trailingIcon={<PlusIcon active />}
            placeholder="Type Status name"
            name={title}
            onChange={handleOnChange}
            value={newStatusValue}
            trailingClick={() => handleSaveNewStatus()}
          />
        </span>
      )}
      <span className="flex justify-items-start" onClick={() => handleAddStatus()}>
        <Button
          height="h-5"
          icon={<PlusCircle active={true} color="base" dimensions={{ height: 18, width: 18 }} />}
          label="Add Status"
          labelSize="text-xs"
          padding="p-1"
          buttonStyle="white"
        />
      </span>
    </>
  );
}
