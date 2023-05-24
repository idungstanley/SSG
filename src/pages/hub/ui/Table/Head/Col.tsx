import { HTMLAttributes } from 'react';

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  ref: React.RefObject<HTMLTableCellElement>;
  isSticky?: boolean;
}

export function Col({ value, isSticky, ref, ...props }: ColProps) {
  return isSticky ? (
    <th style={{ zIndex: 2 }} className="sticky flex left-0 font-extrabold" ref={ref}>
      <div className="bg-purple-50 flex items-center w-10"></div>
      <span className="flex border-gray-200 bg-white opacity-90 w-full h-full mx-auto justify-center truncate p-4">
        {value}
      </span>

      <div className="block absolute cursor-move w-2 -right-1 top-0 idle" {...props}>
        <div className="w-0.5 mx-auto h-full bg-gray-100" />
      </div>
    </th>
  ) : (
    <th className="relative font-extrabold p-4 bg-white opacity-90" ref={ref}>
      <span className="flex justify-center truncate">{value}</span>
      <div className="block absolute cursor-move w-2 -right-1 top-0 idle" {...props}>
        <div className="w-0.5 mx-auto h-full bg-gray-100" />
      </div>
    </th>
  );
}
