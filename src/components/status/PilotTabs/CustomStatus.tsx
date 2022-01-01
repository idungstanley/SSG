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
  useDroppable,
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
import { GroupStyles } from '../../../utils/StatusManagement/Types';
import BoardSection from '../Components/BoardSection';
import { BoardSectionsType } from '../../../utils/StatusManagement/Types';
import { useMutation } from '@tanstack/react-query';
import { statusTypesService } from '../../../features/hubs/hubService';
import { displayPrompt, setVisibility } from '../../../features/general/prompt/promptSlice';
import { addIsDefaultToValues, extractValuesFromArray } from '../../../utils/StatusManagement/statusUtils';
import { setStatusesToMatch } from '../../../features/hubs/hubSlice';

// const groupStatusByModelType = (statusTypes: StatusProps[]) => {
//   return [...new Set(statusTypes.map(({ type }) => type))];
// };

interface ErrorResponse {
  data: {
    data: {
      match?: StatusProps[];
    };
    // Other properties if needed
  };
  // Other error properties if needed
}

export default function CustomStatus() {
  const dispatch = useAppDispatch();

  const { spaceStatuses } = useAppSelector((state) => state.hub);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { statusTaskListDetails } = useAppSelector((state) => state.list);

  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>('');
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);

  const initialBoardSections = initializeBoard(statusTypesState);
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

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
      const activeIndex = activeItems.findIndex((item) => item.name === active.id);
      const overIndex = overItems.findIndex((item) => item.name !== over?.id);

      return {
        ...boardSection,
        [activeContainer]: [...boardSection[activeContainer].filter((item) => item.name !== active.id)],
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

    const activeIndex = boardSections[activeContainer].findIndex((task) => task.name === active.id);
    const overIndex = boardSections[overContainer].findIndex((task) => task.name === over?.id);

    if (activeIndex !== overIndex) {
      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  };

  useEffect(() => {
    setStatusTypesState(
      spaceStatuses.map((status, index) => {
        return {
          name: status.name,
          color: status.color,
          id: status.id,
          type: status.type,
          position: index,
          is_default: index === 0 ? 1 : 0
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
        id: null,
        is_default: 0
      };
      setStatusTypesState((prevStatusTypes) => [...prevStatusTypes, newStatusItem]);
      setBoardSections((prevBoardSections) => ({
        ...prevBoardSections,
        open: [...prevBoardSections.open, newStatusItem] // Assuming 'open' is the section name
      }));
      setNewStatusValue('');
      setValidationMessage('');
    } else {
      setNewStatusValue('');
      setValidationMessage(`Whoops, status with name '${newStatusValue}' already exist`);
    }
    setAddStatus(false);
  };

  const groupStylesMapping: Record<string, GroupStyles> = {
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

  //Add default status
  const defaultItem = statusTypesState.find((item) => item.position === 0);
  const AddDefault = addIsDefaultToValues(boardSections, defaultItem?.name);
  const statusData = extractValuesFromArray(AddDefault);
  console.log(statusData);

  const onSubmit = async () => {
    try {
      await createStatusTypes.mutateAsync({
        model_id: statusTaskListDetails.listId || (activeItemId as string),
        model: 'list' || (activeItemType as string),
        from_model: activeItemType,
        from_model_id: activeItemId,
        statuses: statusData
      });
    } catch (err) {
      const errorResponse = err as ErrorResponse; // Cast err to the ErrorResponse type
      const matchData = errorResponse.data.data.match;
      if (matchData) {
        dispatch(setStatusesToMatch(statusData));
        dispatch(
          displayPrompt(
            'Different Statuses',
            'You changed statuses in your List. 4 tasks will be affected. How should we handle these statuses?',
            [
              {
                label: 'Save Changes',
                style: 'danger',
                callback: async () => ({})
              },
              {
                label: 'Cancel',
                style: 'plain',
                callback: () => {
                  dispatch(setVisibility(false));
                }
              }
            ],
            matchData
          )
        );
      }
    }
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
                backgroundColor:
                  groupStylesMapping[uniqueModelType as keyof typeof groupStylesMapping]?.backgroundColor,
                boxShadow: groupStylesMapping[uniqueModelType as keyof typeof groupStylesMapping]?.boxShadow
              }}
            >
              <BoardSection
                id={uniqueModelType}
                title={uniqueModelType}
                status={boardSections[uniqueModelType]}
                handleSaveNewStatus={handleSaveNewStatus}
                setStatusTypesState={setBoardSections}
              />
            </div>
          ))}
        </DndContext>
      </div>
      <p className="mt-auto text-red-600 text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" onClick={onSubmit} />
      </div>
    </section>
  );
}
