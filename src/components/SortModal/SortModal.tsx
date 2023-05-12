import React, { useEffect, useRef, useState } from 'react';
import { CiFilter } from 'react-icons/ci';
// import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiFillCaretRight, AiFillCaretDown } from 'react-icons/ai';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { setSortArray } from '../../features/task/taskSlice';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import Input from '../input/Input';
import { BiSearch } from 'react-icons/bi';
import { BsSortAlphaDown } from 'react-icons/bs';

type SortModalProps = {
  headers: string[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSortFn: (header: string, id: string) => void;
};

type filterSwitch = {
  title: string;
  toggle: boolean;
};

export default function SortModal({ headers, toggleModal }: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { sortAbleArr } = useAppSelector((state) => state.task);
  const dispatch = useDispatch();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [sortDropDown, setSortDropDown] = useState<boolean>(false);
  const [filterDropDown, setFilterDropDown] = useState<filterSwitch[]>([
    { title: 'color', toggle: false },
    { title: 'condition', toggle: false },
    { title: 'value', toggle: false }
  ]);
  console.log(filterDropDown);

  const handleClick = (title: string) => {
    const headerTxt = title === 'Assignees' ? 'assignee' : title === 'Task' ? 'task' : title.toLowerCase();
    dispatch(
      setSortArray(
        sortAbleArr.map((sortOption) => {
          if (sortOption.field === headerTxt) {
            const newDir = sortOption.dir === 'asc' ? 'desc' : 'asc';
            return { ...sortOption, dir: newDir };
          }
          return sortOption;
        })
      )
    );
  };

  const switchBtns = (event: React.MouseEvent, field: string) => {
    event.stopPropagation();
    if (field === 'sortBtn') {
      setSortDropDown((prev) => !prev);
    } else {
      setFilterDropDown((prev) => {
        return prev.map((obj) => (obj.title === field ? { ...obj, toggle: !obj.toggle } : obj));
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        toggleModal(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <div className="fixed bg-white shadow-lg" style={{ zIndex: '9999' }} ref={modalRef}>
      <div className="absolute flex flex-col p-3 bg-white rounded-md shadow-2xl w-80 top-2 h-fit">
        <div className="px-3">
          <Input
            name="SearchInput"
            placeholder="Search 'field name' Column"
            onChange={() => ({})}
            trailingIcon={<BiSearch />}
          />
        </div>
        {/* <span className="mt-4 text-sm text-center">Sorted columns</span> */}
        <div className="flex flex-col justify-start pb-4 mx-4 space-y-1 capitalize">
          {headers.map((title: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 pl-1 my-1 space-y-2 text-sm font-semibold capitalize rounded-md cursor-pointer group alt-task"
              style={{ color: '#78828d' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {title}
              <div className="flex items-center space-x-1">
                {index === hoveredIndex && (
                  <CiFilter className="w-3 h-3 text-sm text-gray-100 transition duration-200 bg-gray-400 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 " />
                )}
                <div className="flex flex-col items-center justify-center w-6 h-6 -space-y-3">
                  <FaSortUp className="text-gray-400" />
                  <FaSortDown className="text-gray-400" onClick={() => handleClick(title)} />
                </div>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between py-2 space-y-2 text-sm font-semibold capitalize rounded-md cursor-pointer group alt-task">
            <div className="flex items-center gap-1 ">
              <BsSortAlphaDown />
              <p className="text-xs">Sort A - Z</p>
            </div>
            {/* {title} */}
            <div className="flex items-center space-x-1">
              <CiFilter className="w-3 h-3 text-sm text-gray-100 transition duration-200 bg-gray-400 rounded-full opacity-0 cursor-pointer group-hover:opacity-100 " />
              <div className="flex flex-col items-center justify-center w-6 h-6 -space-y-3">
                <FaSortUp className="text-gray-400" />
                <FaSortDown className="text-gray-400" />
              </div>
            </div>
          </div>
          {/* sort implementation */}
          <div className="flex justify-between text-sm">
            <span>sort by color</span>
            {!sortDropDown ? (
              <AiFillCaretRight className="w-3 h-3 font-bold text-gray-400" onClick={(e) => switchBtns(e, 'sortBtn')} />
            ) : (
              <AiFillCaretDown className="w-3 h-3 font-bold text-gray-400" onClick={(e) => switchBtns(e, 'sortBtn')} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
