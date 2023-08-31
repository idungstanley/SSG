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
import { useAppSelector } from '../../../app/hooks';

interface BoardProps {
  id: string;
  title: string;
  status: StatusProps[];
  setStatusTypesState: React.Dispatch<React.SetStateAction<BoardSectionsType>>;
  setAddStatus: React.Dispatch<React.SetStateAction<boolean>>;
  setNewStatusValue: React.Dispatch<React.SetStateAction<string>>;
  addStatus: boolean;
  newStatusValue: string;
  handleSaveNewStatus: () => void;
}

export default function BoardSection({
  id,
  title,
  status,
  setAddStatus,
  addStatus,
  setStatusTypesState,
  handleSaveNewStatus,
  newStatusValue,
  setNewStatusValue
}: BoardProps) {
  const { setNodeRef } = useDroppable({
    id
  });

  const { draggableActiveStatusId } = useAppSelector((state) => state.workspace);

  const [collapsedStatusGroups, setCollapsedStatusGroups] = useState<{ [key: string]: boolean }>({});

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
  console.log(draggableActiveStatusId);

  return (
    <>
      {title && (
        <span className="flex gap-2">
          <Chevron
            onToggle={() => handleToggleGroup(id)}
            active={collapsedStatusGroups[id]}
            iconColor="text-gray-400"
          />
          <p className="flex uppercase justify-items-start">{title} STATUSES</p>
        </span>
      )}
      <SortableContext items={StatusIndex} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className="flex flex-col space-y-1 p-1 flex-1">
          {id &&
            !collapsedStatusGroups[id] &&
            status.map((item) => (
              <div key={item.name}>
                <StatusBodyTemplate item={item} setStatusTypesState={setStatusTypesState} />
              </div>
            ))}
        </div>
      </SortableContext>
      {id && id === 'open' && !addStatus && (
        <span className="flex justify-items-start" onClick={() => setAddStatus(true)}>
          <Button
            height="h-7"
            icon={<PlusCircle active={false} color="white" />}
            label="Add Status"
            buttonStyle="base"
          />
        </span>
      )}
      {id && id === 'open' && addStatus && (
        <span className="flex justify-items-start">
          <Input
            trailingIcon={<PlusIcon active />}
            placeholder="Type Status name"
            name="Status"
            onChange={handleOnChange}
            value={newStatusValue}
            trailingClick={handleSaveNewStatus}
          />
        </span>
      )}
    </>
  );
}
