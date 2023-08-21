import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
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
  DragOverEvent,
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
import { findBoardSectionContainer, initializeBoard } from '../../../utils/StatusManagement/board';
import { BoardSectionsType } from '../../../utils/StatusManagement/Types';
import { getTaskById } from '../../../utils/StatusManagement/statusUtils';
import { useMutation } from '@tanstack/react-query';
import { statusTypesService } from '../../../features/hubs/hubService';

const groupStatusByModelType = (statusTypes: StatusProps[]) => {
  return [...new Set(statusTypes.map(({ type }) => type))];
};

export default function CustomStatus() {
  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const {activeItemId, activeItemType} = useAppSelector(state=> state.workspace)
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [collapsedStatusGroups, setCollapsedStatusGroups] = useState<{ [key: string]: boolean }>({});
  const [activeId, setActiveId] = useState<number | null>(null);
  const initialBoardSections = initializeBoard(statusTypesState);
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const sortableItems = statusTypesState.map((status) => ({
    id: status.position
  }));

  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id as number);
  }

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setBoardSections((boardSection) => {
      const activeItems = boardSection[activeContainer];
      const overItems = boardSection[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.findIndex((item) => item.position === active.id);
      const overIndex = overItems.findIndex((item) => item.position !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [...boardSection[activeContainer].filter((item) => item.position !== active.id)],
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          boardSections[activeContainer][activeIndex],
          ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length)
        ]
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer !== overContainer) {
      return;
    }

    const activeIndex = boardSections[activeContainer].findIndex((task) => task.position === active.id);
    const overIndex = boardSections[overContainer].findIndex((task) => task.position === over?.id);

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  };
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

  const groupStylesMapping: Record<string, { backgroundColor: string; boxShadow: string }> = {
    open: { backgroundColor: '#FBFBFB', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' },
    custom: { backgroundColor: '#FCF1FF', boxShadow: '0px 0px 5px rgba(128, 0, 128, 0.2)' },
    closed: { backgroundColor: '#E6FAE9', boxShadow: '0px 0px 5px rgba(0, 128, 0, 0.2)' }
    // Add more model_type values and their styles as needed
  };

  const createStatusTypes = useMutation(statusTypesService, {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  const onSubmit = async () => {
    await createStatusTypes.mutateAsync({
      model_id: statusTaskListDetails.listId,
      model: 'list',
      from_model: activeItemType,
      from_model_id: activeItemId,
      statuses: statusTypesState
    });
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
          {Object.keys(boardSections).map((uniqueModelType) => (
            <div
              className="p-2 space-y-2 rounded"
              key={uniqueModelType}
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
              <SortableContext items={sortableItems} strategy={verticalListSortingStrategy} id={uniqueModelType}>
                {uniqueModelType &&
                  !collapsedStatusGroups[uniqueModelType] &&
                  boardSections[uniqueModelType].map((item, index) => (
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
          ))}
        </DndContext>
      </div>
      <p className="mt-auto text-red-600 text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" />
      </div>
    </section>
  );
}
