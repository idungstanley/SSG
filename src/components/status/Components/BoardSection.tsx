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

interface BoardProps {
  id: string;
  title: string;
  status: StatusProps[];
  setStatusTypesState?: React.Dispatch<React.SetStateAction<StatusProps[]>>;
  handleSaveNewStatus: () => void;
}

export default function BoardSection({ id, title, status, setStatusTypesState, handleSaveNewStatus }: BoardProps) {
  const { setNodeRef } = useDroppable({
    id
  });

  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [newStatusValue, setNewStatusValue] = useState<string>();
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
  const TaskIndex = status.map((item) => item.position);
  console.log(TaskIndex);

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
      <SortableContext items={TaskIndex} strategy={verticalListSortingStrategy} id={id}>
        <div ref={setNodeRef}>
          {id &&
            !collapsedStatusGroups[id] &&
            status.map((item) => (
              <>
                <StatusBodyTemplate index={item.name} item={item} setStatusTypesState={setStatusTypesState} />
              </>
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
