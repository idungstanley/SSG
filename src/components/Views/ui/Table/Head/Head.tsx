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
        <th style={{ zIndex: 2 }} className="sticky left-0 flex -mb-2 font-extrabold" ref={columns[0].ref}>
          <div className="flex items-center w-10 bg-purple-50"></div>
          <p className="flex items-center w-full gap-3 p-2 -ml-2 truncate opacity-90">
            <span className="bg-primary-200 py-0.5 px-2 rounded-tr-md flex items-center space-x-1">
              <Chevron color="text-gray-500" active={collapseTasks} onToggle={onToggleCollapseTasks} />
              <span>{parsedLabel}</span>
            </span>
            <p>{!collapseTasks ? columns[0].value : null}</p>
          </p>
          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className="absolute top-0 block w-2 cursor-move -right-1 idle"
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
        </th>
        {!collapseTasks
          ? columns.slice(1).map(({ ref, value, id }, index) => (
              <th key={id} className="relative p-2 -mb-1 font-extrabold opacity-90" ref={ref}>
                <p className="flex items-center justify-center w-full h-full my-auto truncate">{value}</p>
                <div
                  className="absolute top-0 block w-2 cursor-move -right-1 idle"
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
