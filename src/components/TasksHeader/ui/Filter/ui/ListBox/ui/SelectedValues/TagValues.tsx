import { SELECT_VALUE } from './SelectedValue';

const BG_OPACITY = 25;

export interface TagValue {
  id: string;
  value: string;
  color: string;
}

interface TagValuesProps {
  values: TagValue[];
}

export function TagValues({ values }: TagValuesProps) {
  return (
    <div className="flex items-center h-5 gap-1">
      {values.length === 0 ? (
        <span className="block">{SELECT_VALUE}</span>
      ) : (
        values.map((i) => (
          <span
            style={{ backgroundColor: i.color + BG_OPACITY, color: i.color }}
            key={i.id}
            className="block truncate rounded-lg"
          >
            {i.value}
          </span>
        ))
      )}
    </div>
  );
}
