import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../Button';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  defaultDropAnimation,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { findBoardSectionContainer, initializeBoard } from '../../../utils/StatusManagement/board';
import { GroupStyles, ModelType } from '../../../utils/StatusManagement/Types';
import BoardSection from '../Components/BoardSection';
import { BoardSectionsType } from '../../../utils/StatusManagement/Types';
import { useMutation } from '@tanstack/react-query';
import { statusTypesService } from '../../../features/hubs/hubService';
import {
  addIsDefaultToValues,
  createModelIdAndTypeHandler,
  extractValuesFromArray
} from '../../../utils/StatusManagement/statusUtils';
import { setMatchedStatus, setStatusesToMatch } from '../../../features/hubs/hubSlice';
import MatchStatusPopUp from '../Components/MatchStatusPopUp';
import { setMatchData } from '../../../features/general/prompt/promptSlice';
import StatusBodyTemplate from '../StatusBodyTemplate';
import StatusItem from '../Components/StatusItem';

interface ErrorResponse {
  data: {
    data: {
      match?: StatusProps[];
    };
    // Other properties if needed
  };
  // Other error properties if needed
}

const groupStylesMapping: Record<string, GroupStyles> = {
  open: { backgroundColor: '#FBFBFB', boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)' },
  custom: { backgroundColor: '#FCF1FF', boxShadow: '0px 0px 5px rgba(128, 0, 128, 0.2)' },
  closed: { backgroundColor: '#E6FAE9', boxShadow: '0px 0px 5px rgba(0, 128, 0, 0.2)' }
  // Add more model_type values and their styles as needed
};

export default function CustomStatus() {
  const dispatch = useAppDispatch();
  const createStatusTypes = useMutation(statusTypesService);

  const { matchData } = useAppSelector((state) => state.prompt);
  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { statusTaskListDetails } = useAppSelector((state) => state.list);
  const { spaceStatuses, matchedStatus } = useAppSelector((state) => state.hub);

  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>('');
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [showMatchStatusPop, setShowMatchStatusPopup] = useState<boolean>(false);
  const [modelData, setModelData] = useState<ModelType>({
    modelId: null,
    modelType: null
  });
  const [matchingStatusValidation, setMatchingStatusValidation] = useState<string | null>(null);

  const initialBoardSections = initializeBoard(spaceStatuses);
  const [boardSections, setBoardSections] = useState<BoardSectionsType>(initialBoardSections);
  const [activeId, setActiveId] = useState<string | null>(null);

  const [is_default_name, setIsDefaultName] = useState<string | null>(boardSections['open'][0]?.name || null); // Initialize with the name of the item at position 0 or null if no item

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  useEffect(() => {
    createModelIdAndTypeHandler(activeItemId, activeItemType, setModelData, modelData);
    setBoardSections(initialBoardSections);
    setStatusTypesState(spaceStatuses);
  }, [spaceStatuses, activeItemId, activeItemType]);

  useEffect(() => {
    setIsDefaultName(boardSections['open'][0]?.name || null);
  }, [boardSections]);

  const handleDragStart = ({ active }: DragEndEvent) => {
    setActiveId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    // Find the containers
    const activeContainer = findBoardSectionContainer(boardSections, active.id as string);
    const overContainer = findBoardSectionContainer(boardSections, over?.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
    if (overContainer === 'closed' && activeContainer !== 'closed') {
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
      const draggedStatus = boardSections[activeContainer][activeIndex];

      // Update the type property to match the new container (group)
      const updatedDraggedStatus = { ...draggedStatus, type: overContainer };

      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: arrayMove(boardSection[overContainer], activeIndex, overIndex),
        [activeContainer]: boardSection[activeContainer].filter((item) => item.name !== active.id)
      }));

      setBoardSections((boardSection) => ({
        ...boardSection,
        [overContainer]: [
          ...boardSection[overContainer].slice(0, overIndex),
          updatedDraggedStatus,
          ...boardSection[overContainer].slice(overIndex, boardSection[overContainer].length)
        ]
      }));
    }
    setActiveId(null);
  };

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

  //Add default status
  const AddDefault = addIsDefaultToValues(boardSections, is_default_name);
  const statusData = extractValuesFromArray(AddDefault);
  const model = statusTaskListDetails.listId ? 'list' : (modelData?.modelType as string);
  const model_id = statusTaskListDetails.listId || (modelData?.modelId as string);

  const handleStatusId = () => {
    const modelTypeIsSameEntity = statusData.some((item) => item.model_type === model);
    const modelIdIsSameEntity = statusData.some((item) => item.model_id === model_id);
    if (activeItemId === model_id && modelTypeIsSameEntity) {
      if (modelIdIsSameEntity) {
        return statusData;
      } else {
        return statusData.map((item, index) => {
          return { ...item, id: null, is_default: index === 0 ? 1 : 0 }; // Set the id to null
        });
      }
    } else {
      return statusData.map((item, index) => {
        return { ...item, id: null, is_default: index === 0 ? 1 : 0 }; // Set the id to null
      });
    }
  };

  const handleStatusData = async () => {
    await createStatusTypes.mutateAsync({
      model_id: model_id,
      model: model,
      from_model: activeItemType,
      from_model_id: activeItemId,
      statuses: handleStatusId(),
      status_matches: matchedStatus
    });
  };

  const matchStatusArray = [
    {
      label: 'Save Changes',
      style: 'danger',
      callback: async () => {
        if (matchedStatus.length !== matchData.length) {
          setMatchingStatusValidation('Whoops! Select a status for every conflicting status');
          setTimeout(() => {
            setMatchingStatusValidation(null);
          }, 3000);
        } else {
          setMatchingStatusValidation(null);
          handleStatusData();
          setShowMatchStatusPopup(false);
        }
      }
    },
    {
      label: 'Cancel',
      style: 'plain',
      callback: () => {
        setShowMatchStatusPopup(false);
        dispatch(setMatchedStatus([]));
        setMatchingStatusValidation(null);
      }
    }
  ];

  const onSubmit = async () => {
    try {
      await createStatusTypes.mutateAsync({
        model_id: model_id,
        model: model,
        from_model: modelData.modelType as string,
        from_model_id: modelData.modelId as string,
        statuses: handleStatusId()
      });
    } catch (err) {
      const errorResponse = err as ErrorResponse; // Cast err to the ErrorResponse type
      const matchData = errorResponse.data.data.match;
      if (matchData) {
        dispatch(setMatchData(matchData));
        dispatch(setStatusesToMatch(statusData));
        setShowMatchStatusPopup(true);
      }
    }
  };

  // const dropAnimation: DropAnimation = {
  //   ...defaultDropAnimation
  // };

  // const draggableItem = activeId ? getStatusById(statusData, activeId) : null;

  return (
    <section className="flex flex-col gap-2 p-4">
      <div className="flex flex-col space-y-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
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
                addStatus={addStatus}
                setNewStatusValue={setNewStatusValue}
                newStatusValue={newStatusValue}
                setAddStatus={setAddStatus}
                title={uniqueModelType}
                status={boardSections[uniqueModelType]}
                handleSaveNewStatus={handleSaveNewStatus}
                setStatusTypesState={setBoardSections}
              />
            </div>
          ))}
          {/* <DragOverlay dropAnimation={dropAnimation}>
            {draggableItem ? <StatusItem item={draggableItem} /> : null}
          </DragOverlay> */}
        </DndContext>
      </div>
      <p className="mt-auto text-red-600 text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" onClick={onSubmit} />
      </div>
      <MatchStatusPopUp
        validationMessage={matchingStatusValidation}
        options={matchStatusArray}
        title="Match Statuses"
        body={`You changed statuses in your List. ${matchData?.length} status will be affected. How should we handle these statuses?`}
        setShow={setShowMatchStatusPopup}
        show={showMatchStatusPop}
      />
    </section>
  );
}
