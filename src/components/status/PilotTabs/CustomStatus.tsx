import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Button from '../../Button';
import { StatusProps } from '../../../pages/workspace/hubs/components/ActiveTree/activetree.interfaces';
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
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { findBoardSectionContainer, initializeBoard } from '../../../utils/StatusManagement/board';
import { GroupStyles } from '../../../utils/StatusManagement/Types';
import BoardSection from '../Components/BoardSection';
import { BoardSectionsType } from '../../../utils/StatusManagement/Types';
import { useMutation } from '@tanstack/react-query';
import { statusTypesService } from '../../../features/hubs/hubService';
import { addIsDefaultToValues, extractValuesFromArray } from '../../../utils/StatusManagement/statusUtils';
import { setMatchedStatus, setStatusesToMatch } from '../../../features/hubs/hubSlice';
import MatchStatusPopUp from '../Components/MatchStatusPopUp';
import { setMatchData } from '../../../features/general/prompt/promptSlice';

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

  const { spaceStatuses, matchedStatus } = useAppSelector((state) => state.hub);
  const { matchData } = useAppSelector((state) => state.prompt);

  const { activeItemId, activeItemType } = useAppSelector((state) => state.workspace);
  const { statusTaskListDetails } = useAppSelector((state) => state.list);

  const [statusTypesState, setStatusTypesState] = useState<StatusProps[]>(spaceStatuses);
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [newStatusValue, setNewStatusValue] = useState<string>('');
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [activeId, setActiveId] = useState<number | null>(null);
  const [showMatchStatusPop, setShowMatchStatusPopup] = useState<boolean>(false);

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
      // console.log(data);
    }
  });

  //Add default status
  const defaultItem = statusTypesState.find((item) => item.position === 0);
  const AddDefault = addIsDefaultToValues(boardSections, defaultItem?.name);
  const statusData = extractValuesFromArray(AddDefault);
  const model = statusTaskListDetails.listId ? 'list' : (activeItemType as string);
  const model_id = statusTaskListDetails.listId || (activeItemId as string);

  const handleStatusData = async () => {
    await createStatusTypes.mutateAsync({
      model_id: model_id,
      model: model,
      from_model: activeItemType,
      from_model_id: activeItemId,
      statuses: statusData,
      status_matches: matchedStatus
    });
  };

  const matchStatusArray = [
    {
      label: 'Save Changes',
      style: 'danger',
      callback: async () => {
        handleStatusData();
        setShowMatchStatusPopup(false);
      }
    },
    {
      label: 'Cancel',
      style: 'plain',
      callback: () => {
        setShowMatchStatusPopup(false);
        dispatch(setMatchedStatus([]));
      }
    }
  ];

  const onSubmit = async () => {
    try {
      await createStatusTypes.mutateAsync({
        model_id: model_id,
        model: model,
        from_model: activeItemType,
        from_model_id: activeItemId,
        statuses: statusData
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
        </DndContext>
      </div>
      <p className="mt-auto text-red-600 text-start">{validationMessage}</p>
      <div className="flex justify-center">
        <Button label="Save" buttonStyle="base" width="w-40" height="h-8" onClick={onSubmit} />
      </div>
      <MatchStatusPopUp
        options={matchStatusArray}
        title="Match Statuses"
        body={`You changed statuses in your List. ${matchData?.length} status will be affected. How should we handle these statuses?`}
        setShow={setShowMatchStatusPopup}
        show={showMatchStatusPop}
      />
    </section>
  );
}
