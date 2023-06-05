import { parseLabel } from '../../../../TasksHeader/lib';
import { Column } from '../../../types/table';
import { Chevron } from '../../Chevron';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  mouseDown: (i: number) => void;
  label: string;
  collapseTasks: boolean;
  onToggleCollapseTasks: VoidFunction;
}

export function Head({ columns, tableHeight, collapseTasks, onToggleCollapseTasks, mouseDown, label }: HeadProps) {
  const parsedLabel = parseLabel(label);

  return (
    <thead className="contents">
      <tr className="contents">
        {/* first sticky col */}
        <th style={{ zIndex: 2 }} className="sticky flex left-0 font-extrabold -mb-2" ref={columns[0].ref}>
          <div className="bg-purple-50 flex items-center"></div>
          <p className="flex opacity-90 w-full items-center gap-3 truncate py-2">
            <span
              className={`py-0.5 px-2 rounded-tr-md flex items-center space-x-1 text-white ${
                parsedLabel == 'todo'
                  ? 'bg-gray-400'
                  : parsedLabel == 'in progress'
                  ? 'bg-purple-500'
                  : parsedLabel == 'completed'
                  ? 'bg-green-500'
                  : parsedLabel == 'archived'
                  ? 'bg-yellow-500'
                  : 'bg-gray-400'
              }`}
            >
              <Chevron color="text-white" active={collapseTasks} onToggle={onToggleCollapseTasks} />

              <span>{parsedLabel}</span>
            </span>
            {!collapseTasks ? columns[0].value : null}
          </p>

          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className="block absolute cursor-move w-2 -right-1 top-0 idle"
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
        </th>

        {!collapseTasks
          ? columns.slice(1).map(({ ref, value, id }, index) => (
              <th key={id} className="relative font-extrabold p-2 opacity-90 -mb-1" ref={ref}>
                <p className="flex h-full w-full items-center justify-center my-auto truncate">{value}</p>
                <div
                  className="block absolute cursor-move w-2 -right-1 top-0 idle"
                  style={{ height: tableHeight }}
                  onMouseDown={() => mouseDown(index + 1)}
                >
                  <div className="w-0.5 mx-auto h-full bg-gray-100" />
                </div>
              </th>
            ))
          : null}
      </tr>
    </thead>
  );
}
