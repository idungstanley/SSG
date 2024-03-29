import { SELECT_VALUE } from './SelectedValue';

export interface AssigneeValue {
  id: string;
  value: string;
  color: string;
  initials: string;
}

interface AssigneeValuesProps {
  values: AssigneeValue[];
}

export function AssigneeValues({ values }: AssigneeValuesProps) {
  return (
    <div className="flex items-center">
      {values.length === 0 ? (
        <span className="block">{SELECT_VALUE}</span>
      ) : (
        values.map((i) => (
          <span
            title={i.value}
            key={i.id}
            style={{ backgroundColor: i.color }}
            className="flex -ml-2 h-5 w-5 items-center justify-center rounded-full text-xs uppercase text-white"
          >
            {i.initials}
          </span>
        ))
      )}
    </div>
  );
}
