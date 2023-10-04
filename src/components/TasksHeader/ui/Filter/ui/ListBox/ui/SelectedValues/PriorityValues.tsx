import { AiFillFlag } from 'react-icons/ai';
import { SELECT_VALUE } from './SelectedValue';

interface PriorityValuesProps {
  values: string[];
}

interface PriorityConfig {
  low: JSX.Element;
  normal: JSX.Element;
  high: JSX.Element;
  urgent: JSX.Element;
}

const priorityConfig: PriorityConfig = {
  low: <AiFillFlag className="h-5 w-7  text-gray-400" />,
  normal: <AiFillFlag className="h-5 w-7" style={{ color: '#6fddff' }} />,
  high: <AiFillFlag className="h-5 w-7  text-yellow-400" />,
  urgent: <AiFillFlag className="h-5 w-7  text-red-400 " />
};

export function PriorityValues({ values }: PriorityValuesProps) {
  return (
    <div className="flex items-center h-5 gap-1">
      {values.length === 0 ? (
        <span className="block">{SELECT_VALUE}</span>
      ) : (
        values.map((i) => (
          <span key={i} className="block truncate">
            {priorityConfig[i as keyof PriorityConfig]}
          </span>
        ))
      )}
    </div>
  );
}
