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
        <th style={{ zIndex: 2 }} className="sticky flex left-0 font-extrabold" ref={columns[0].ref}>
          <div className="bg-purple-50 flex items-center w-10"></div>
          <p className="flex border-gray-200 bg-white opacity-90 w-full items-center mx-auto gap-3 truncate p-2">
            <span className="bg-primary-200 py-1 px-2 rounded-xl flex items-center space-x-1">
              <Chevron color="text-gray-500" active={collapseTasks} onToggle={onToggleCollapseTasks} />

              <p>{parsedLabel}</p>
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
              <th key={id} className="relative font-extrabold p-2 bg-white opacity-90" ref={ref}>
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
