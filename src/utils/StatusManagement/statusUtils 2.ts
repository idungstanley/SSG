import { BoardSectionsType, Status, StatusType } from './Types';

export const getTasksByStatus = (tasks: StatusType[], status: Status) => {
  return tasks.filter((task) => task.type === status);
};

export const getTaskById = (tasks: StatusType[], id: number) => {
  return tasks.find((task) => task.position === id);
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
