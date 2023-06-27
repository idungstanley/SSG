import { SPECIAL_CHAR } from '../../../../config/filterConfig';
import { FilterKey, FilterValue, Operator, Unit } from '../../../../types/filters';
import { AssigneeValue, AssigneeValues } from './AssigneeValues';
import { Default } from './Default';
import { PriorityValues } from './PriorityValues';
import { TagValue, TagValues } from './TagValues';

interface SelectedValueProps {
  value: FilterValue[] | Operator | string | Unit;
  filterKey?: FilterKey;
}

export const SELECT_KEY = 'Select filter';
export const SELECT_VALUE = 'Select option';

export const stringifyValue = (i: string) => i.split(SPECIAL_CHAR)[0];

export function SelectedValue({ value, filterKey }: SelectedValueProps) {
  if (!filterKey) {
    return <Default value={value} />;
  }

  switch (filterKey) {
    case 'priority': {
      return <PriorityValues values={value as string[]} />;
    }
    case 'tags': {
      return <TagValues values={value as TagValue[]} />;
    }
    case 'assignees': {
      return <AssigneeValues values={value as AssigneeValue[]} />;
    }
    default: {
      return <Default value={value} />;
    }
  }
}
