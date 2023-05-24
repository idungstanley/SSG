import { Column } from '../../List/List';

interface HeadProps {
  columns: Column[];
  tableHeight: string | number;
  activeIndex: number | null;
  mouseDown: (i: number) => void;
}

export function Head({ columns, tableHeight, activeIndex, mouseDown }: HeadProps) {
  return (
    <thead className="contents">
      <tr className="contents">
        <th
          style={{ zIndex: 2 }}
          className="sticky flex -left-1 font-extrabold"
          ref={columns[0].ref}
          key={columns[0].id}
        >
          <div className="bg-purple-50 flex items-center">
            <span className="p-1 group-hover:opacity-100 opacity-0">=</span>
          </div>
          <span className="flex border-gray-200 bg-white opacity-90 w-full h-full mx-auto justify-center truncate p-4">
            {columns[0].value}
          </span>

          <div
            style={{ height: tableHeight }}
            onMouseDown={() => mouseDown(0)}
            className={`block hover:border-red-500 absolute cursor-move w-2 -right-1 top-0 ${
              activeIndex === 0 ? 'border-blue-500' : 'idle'
            }`}
          >
            <div className="w-0.5 mx-auto h-full bg-gray-100" />
          </div>
        </th>

        {columns.slice(1).map(({ ref, value, id }, i) => (
          <th className="relative font-extrabold p-4 bg-white opacity-90" ref={ref} key={id}>
            <span className="flex justify-center truncate">{value}</span>
            <div
              style={{ height: tableHeight }}
              onMouseDown={() => mouseDown(i + 1)}
              className={`block hover:border-red-500 absolute cursor-move w-2 -right-1 top-0 ${
                activeIndex === i + 1 ? 'border-blue-500' : 'idle'
              }`}
            >
              <div className="w-0.5 mx-auto h-full bg-gray-100" />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
