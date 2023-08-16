import { Dispatch, SetStateAction } from 'react';
import ArrowDown from '../../assets/icons/ArrowDown';

interface Props {
  toggle: boolean;
  toggleFn: Dispatch<SetStateAction<boolean>>;
  valueArr: number[] | string[];
  valueFn: Dispatch<SetStateAction<number | string>>;
  data: number | string;
}

export default function Interval({ toggle, toggleFn, valueArr, valueFn, data }: Props) {
  return (
    <div className="flex space-x-2 items-center">
      <div
        onClick={() => toggleFn(!toggle)}
        className="flex items-center space-x-2 w-min bg-alsoit-gray-75 text-center p-1 rounded-md text-white capitalize cursor-pointer relative"
      >
        <span className="">{data}</span>
        <ArrowDown active={false} />
        {toggle && (
          <ul className="w-20 p-1 rounded-md flex flex-col space-y-2 absolute bg-alsoit-gray-75 shadow-2xl top-8 -left-2">
            {valueArr.map((data, index) => {
              return (
                <li
                  key={index}
                  onClick={() => valueFn(data)}
                  className="hover:bg-alsoit-gray-50 hover:text-alsoit-gray-300"
                >
                  {data}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
