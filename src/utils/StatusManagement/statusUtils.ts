import { BoardSectionsType, Status, StatusType } from './Types';

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
