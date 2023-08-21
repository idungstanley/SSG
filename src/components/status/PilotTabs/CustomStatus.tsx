import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../app/hooks';
import StatusBodyTemplate from '../StatusBodyTemplate';
import Button from '../../Button';
import PlusIcon from '../../../assets/icons/PlusIcon';
import Input from '../../input/Input';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import PlusCircle from '../../../assets/icons/AddCircle';
import { Chevron } from '../../Views/ui/Chevron';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';

const groupStatusByModelType = (statusTypes: StatusProps[]) => {
  return [...new Set(statusTypes.map(({ type }) => type))];
};

export default function CustomStatus() {
  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [collapsedStatusGroups, setCollapsedStatusGroups] = useState<{ [key: string]: boolean }>({});
  const [activeId, setActiveId] = useState<number>(0);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const sortableItems = statusTypesState.map((status) => ({
    id: status.position
  }));

  console.log(statusTypesState);

  function findContainer(id: number) {
    for (const status of statusTypesState) {
      if (status.position === id) {
        return status.type; // Assuming that `type` is the property that identifies the container
      }
    }
    return null; // If the status was not found in any container
  }

  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id as number);
  }

  function handleDragOver(event: DragEndEvent) {
    const { active, over, draggingRect } = event;
    const { id } = active;
    const { id: overId } = over;
    const activeContainer = findContainer(id as number);
    const overContainer = findContainer(overId as number);
    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
    setStatusTypesState((prev) => {
      const activeItems = prev.find((item) => item.position === id);
      const overItems = prev.find((item) => item.position === overId);

      if (!activeItems || !overItems) {
        return prev;
      }

      const activeIndex = prev.indexOf(activeItems);
      const overIndex = prev.indexOf(overItems);
      const isBelowLastItem =
        over && overIndex === prev.length - 1 && draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;
      const modifier = isBelowLastItem ? 1 : 0;
      const newIndex = overIndex >= 0 ? overIndex + modifier : prev.length;
      const newStatusTypesState = [...prev];
      newStatusTypesState.splice(activeIndex, 1);
      newStatusTypesState.splice(newIndex, 0, activeItems);
      return newStatusTypesState;
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const { id } = active;
    const activeContainer = findContainer(id as number);
    const overContainer = over ? findContainer(over.id as number) : null;
    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }
    const activeItems = statusTypesState.find((item) => item.position === id);
    const overItems = over ? statusTypesState.find((item) => item.position === over.id) : null;

    if (!activeItems || (over && !overItems)) {
      return;
    }
    const activeIndex = statusTypesState.indexOf(activeItems);
    const overIndex = overItems ? statusTypesState.indexOf(overItems) : -1;

    if (activeIndex !== overIndex) {
      const newStatusTypesState = arrayMove(statusTypesState, activeIndex, overIndex);
      setStatusTypesState(newStatusTypesState);
    }
    setActiveId(0);
  }
  // ... (remaining code)

  const handleToggleGroup = (group: string) => {
    setCollapsedStatusGroups((prevCollapsedStatusGroups) => ({
      ...prevCollapsedStatusGroups,
      [group]: !prevCollapsedStatusGroups[group]
    }));
  };

  useEffect(() => {
    setStatusTypesState(
      spaceStatuses.map((status, index) => {
        return {
          name: status.name,
          color: status.color,
          id: status.id,
          type: status.type,
          position: index
        };
      })
    );
  }, [spaceStatuses]);

  const handleSaveNewStatus = () => {
    const nameWithoutWhiteSpace = newStatusValue?.trim();
    const isNameExist = statusTypesState.some(
      (status) => status.name?.toLowerCase() === nameWithoutWhiteSpace?.toLowerCase()
    );
    if (nameWithoutWhiteSpace !== '' && !isNameExist) {
      const newStatusItem: StatusProps = {
        name: newStatusValue,
        color: 'green',
        type: 'open',
        position: statusTypesState.length,
        id: null
      };
      setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
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

  const groupedStatus = groupStatusByModelType(spaceStatuses);
  const groupStylesMapping: Record<string, { backgroundColor: string; boxShadow: string }> = {
    open: { backgroundColor: '#FBFBFB', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' },
    custom: { backgroundColor: '#FCF1FF', boxShadow: '0px 0px 5px rgba(128, 0, 128, 0.2)' },
    closed: { backgroundColor: '#E6FAE9', boxShadow: '0px 0px 5px rgba(0, 128, 0, 0.2)' }
    // Add more model_type values and their styles as needed
  };

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="flex flex-col space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {groupedStatus.map((uniqueModelType, modelTypeIndex) => {
            if (uniqueModelType) {
              return (
                <div
                  className="p-2 space-y-2 rounded"
                  key={modelTypeIndex}
                  style={{
                    backgroundColor: groupStylesMapping[uniqueModelType]?.backgroundColor,
                    boxShadow: groupStylesMapping[uniqueModelType]?.boxShadow
                  }}
                >
                  {uniqueModelType && (
                    <span className="flex gap-2">
                      <Chevron
                        onToggle={() => handleToggleGroup(uniqueModelType)}
                        active={collapsedStatusGroups[uniqueModelType]}
                        iconColor="text-gray-400"
                      />
                      <p className="flex uppercase justify-items-start">{uniqueModelType} STATUSES</p>
                    </span>
                  )}
                  <SortableContext items={statusTypesState} strategy={verticalListSortingStrategy} id={uniqueModelType}>
                    {uniqueModelType &&
                      !collapsedStatusGroups[uniqueModelType] &&
                      statusTypesState
                        .filter((ticket) => ticket.type === uniqueModelType)
                        .map((item, index) => (
                          <>
                            <StatusBodyTemplate index={index} item={item} setStatusTypesState={setStatusTypesState} />
                          </>
                        ))}
                  </SortableContext>
                  {uniqueModelType && uniqueModelType === 'open' && !addStatus && (
                    <span className="flex justify-items-start" onClick={() => setAddStatus(true)}>
                      <Button
                        height="h-7"
                        icon={<PlusCircle active={false} color="white" />}
                        label="Add Status"
                        buttonStyle="base"
                      />
                    </span>
                  )}
                  {uniqueModelType && uniqueModelType === 'open' && addStatus && (
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
                </div>
              );
            } else {
              return null;
            }
          })}
        </DndContext>
      </div>
      <p className="mt-auto text-red-600 text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" />
      </div>
    </section>
  );
}
