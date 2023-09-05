import { DragOverEvent } from '@dnd-kit/core';
import { EntityType } from '../EntityTypes/EntityType';
import { BoardSectionsType, ModelType, Status, StatusType } from './Types';

export const getTasksByStatus = (statuses: StatusType[], status: Status) => {
  return statuses.filter((item) => item.type === status);
};

export const getStatusById = (statuses: StatusType[], id: string) => {
  return statuses.find((status) => status.name === id);
};

export function extractValuesFromArray(groupedObject: BoardSectionsType) {
  return Object.values(groupedObject).flat();
}

export function addIsDefaultToValues(
  groupedObject: BoardSectionsType,
  defaultItemName: string | null = null
): BoardSectionsType {
  const result: BoardSectionsType = {};
  // Iterate through each group in the groupedObject
  for (const [name, statusTypes] of Object.entries(groupedObject)) {
    // Map over the statusTypes in the group
    result[name] = statusTypes.map((statusType) => ({
      ...statusType,
      is_default: statusType.name === defaultItemName ? 1 : 0
    }));
  }

  return result;
}

export const createModelIdAndTypeHandler = (
  id: string | null,
  type: string | null,
  setPreviousData: React.Dispatch<React.SetStateAction<ModelType>>,
  previousData: ModelType
) => {
  let model: ModelType | undefined;

  if (!id || !type) {
    // I am Providing a default value or handle the case where id or type is missing
    return {
      model: {
        modelId: null,
        modelType: null
      }
    };
  }

  if (type === EntityType.hub || type === EntityType.subHub) {
    model = { modelId: id, modelType: EntityType.hub };
    setPreviousData({ modelId: id, modelType: EntityType.hub });
  } else if (type === EntityType.wallet || type === EntityType.subWallet) {
    setPreviousData({ modelId: id, modelType: EntityType.wallet });
    model = { modelId: id, modelType: EntityType.wallet };
  } else if (type === EntityType.list) {
    setPreviousData({ modelId: id, modelType: EntityType.list });
    model = { modelId: id, modelType: EntityType.list };
  } else {
    // Handle unexpected or unsupported types, example task types
    model = { ...previousData };
  }

  return model;
};

export function getDragDirection({ active, over }: DragOverEvent) {
  const activeBottom = active?.rect?.current?.initial?.bottom;
  const overTop = over?.rect?.top;
  if (!activeBottom || !overTop) return;
  if (activeBottom < overTop) return 'fromAbove';
  if (activeBottom > overTop) return 'fromBelow';
}
