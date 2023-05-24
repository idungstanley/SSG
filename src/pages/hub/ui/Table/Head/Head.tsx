import { Column } from '../../../types/hub';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  mouseDown: (i: number) => void;
}

export function Head({ columns, tableHeight, mouseDown }: HeadProps) {
  return (
    <thead className="contents">
      <tr className="contents">
        {/* first sticky */}
        <th style={{ zIndex: 2 }} className="sticky flex left-0 font-extrabold" ref={columns[0].ref}>
          <div className="bg-purple-50 flex items-center w-10"></div>
          <span className="flex border-gray-200 bg-white opacity-90 w-full h-full mx-auto justify-center truncate p-4">
            {columns[0].value}
          </span>

          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className="block absolute cursor-move w-2 -right-1 top-0 idle"
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
        </th>

        {columns.slice(1).map(({ ref, value, id }, index) => (
          <th key={id} className="relative font-extrabold p-4 bg-white opacity-90" ref={ref}>
            <span className="flex justify-center truncate">{value}</span>
            <div
              className="block absolute cursor-move w-2 -right-1 top-0 idle"
              style={{ height: tableHeight }}
              onMouseDown={() => mouseDown(index + 1)}
            >
              <div className="w-0.5 mx-auto h-full bg-gray-100" />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
