import { useEffect, useRef, useState } from 'react';
import { FiPlusCircle } from 'react-icons/fi';
import { useAppSelector } from '../../../../../../app/hooks';
import AddColumnDropdown from '../../../dropdown/AddColumnDropdown';
import { useDispatch } from 'react-redux';
import { getTaskColumns, setCloseTaskListView } from '../../../../../../features/task/taskSlice';
import '../../views/view.css';
import '../../taskData/task.css';
import { IoIosArrowDropdown, IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { columnsHead, listColumnProps } from '../ListColumns';
import { MdDragIndicator } from 'react-icons/md';
import { FaSort } from 'react-icons/fa';
import { useList } from '../../../../../../features/list/listService';
import CreateDropdownFieldModal from '../../../dropdown/CreateDropdownFieldModal';
import { CiFilter } from 'react-icons/ci';
import { GiCancel } from 'react-icons/gi';

const unique = (arr: listColumnProps[]) => [...new Set(arr)];

export default function TaskListViews({
  taskLength,
  status,
  listId
}: {
  taskLength?: number;
  status?: string;
  listId?: string;
}) {
  const dispatch = useDispatch();
  const [dropDown, setdropDown] = useState(false);
  const { closeTaskListView } = useAppSelector((state) => state.task);
  const { taskColumns, hideTask } = useAppSelector((state) => state.task);
  const [showDropdownFieldModal, setShowDropdownFieldModal] = useState(false);
  const [showSortModal, setShowSortModal] = useState<boolean>(false);
  const [headerId, setheaderId] = useState<string>('');
  const [columns, setColumns] = useState([...columnsHead]);
  // const [isActive, setIsActive] = useState<{ id: string; active: boolean }>({ id: '', active: false });

  const { data } = useList(listId);
  const [sortArr, setSortArr] = useState<string[]>([]);

  const handleSort = (header: string, id: string) => {
    setheaderId(id);
    // setIsActive({ id, active: true });
    if (sortArr.includes(header)) return setShowSortModal(!showSortModal);
    setSortArr((prev) => [...prev, header]);
    setShowSortModal(!showSortModal);
  };

  const handleRemoveFilter = (title: string): void => setSortArr((prev) => prev.filter((el) => el !== title));

  useEffect(() => {
    if (!data) {
      return;
    }

    const customFieldNames = data.custom_fields.map((i) => ({ value: i.name, id: i.id, field: i.type, hidden: false }));

    setColumns(() => {
      const newColumns = unique([...columnsHead, ...customFieldNames]);

      dispatch(getTaskColumns(newColumns));

      return newColumns;
    });
  }, [data]);

  const handleDropDown = () => {
    setdropDown((prev) => !prev);
  };

  return (
    <div className="oveflow-x-auto">
      <div
        className="flex overflow-x-auto items-center justify-between pt-5 bg-gray-100 z-20 w-12/12 "
        style={{ backgroundColor: '#e1e4e5' }}
      >
        <div className="flex">
          <div className=" flex items-center ">
            <span className="bg-gray-200 hover:bg-gray-400 rounded-full p-px ">
              <IoIosArrowDropdown
                className={` text-gray-400 text-sm hover:text-gray-200  ${
                  closeTaskListView === false ? 'rotateimg90' : null
                }`}
                aria-hidden="true"
                onClick={() => dispatch(setCloseTaskListView(!closeTaskListView))}
              />
            </span>
            <div className="flex items-center justify-center cursor-pointer relative">
              <div className="group flex items-center">
                <span className="text-xs rounded-t-md text-black p-1 bg-gray-300 pr-2 capitalize object-contain whitespace-nowrap">
                  {status ? status : 'To Do'}
                </span>
              </div>
              <span className="text-xs text-gray-400 ml-3 mr-px font-bold ">{taskLength}</span>
            </div>
          </div>
          <div className="relative w-6/12 flex     items-center ">
            {hideTask.length
              ? hideTask.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="flex items-center uppercase  text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group relative cursor-pointer"
                        style={{ color: '#78828d', fontSize: '10px' }}
                        onClick={() => handleSort(col.value, col.id)}
                      >
                        <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                          {col.value}
                        </span>
                        {sortArr.includes(col.value) && (
                          <div className="flex items-center justify-center space-x-1 uppercase  text-xs text-white font-medium bg-red-600 group relative cursor-pointer px-1 rounded-md group">
                            <span
                              className="font-bold hover:text-clip cursor-pointer"
                              style={{ fontSize: '8px', marginTop: '.5px' }}
                            >
                              {sortArr.indexOf(col.value) + 1}
                            </span>
                            <GiCancel
                              onClick={() => handleRemoveFilter(col.value)}
                              className="opacity-0 group-hover:opacity-100 text-white font-bold h-3 w-3"
                            />
                          </div>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal headers={sortArr} toggleModal={setShowSortModal} />
                        )}
                      </div>
                    )
                )
              : columns.map(
                  (col) =>
                    col.value == 'Task' &&
                    !col.hidden && (
                      <div
                        key={col.id}
                        className="flex items-center space-x-1 uppercase  text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group relative cursor-pointer"
                        style={{ color: '#78828d', fontSize: '10px' }}
                        onClick={() => handleSort(col.value, col.id)}
                      >
                        <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                          {col.value}
                        </span>
                        {sortArr.includes(col.value) && (
                          <div className="flex items-center justify-center space-x-1 uppercase  text-xs text-white font-medium bg-red-600 group relative cursor-pointer px-1 rounded-md group">
                            <span
                              className="font-bold hover:text-clip cursor-pointer"
                              style={{ fontSize: '8px', marginTop: '.5px' }}
                            >
                              {sortArr.indexOf(col.value) + 1}
                            </span>
                            <GiCancel
                              onClick={() => handleRemoveFilter(col.value)}
                              className="opacity-0 group-hover:opacity-100 text-white font-bold h-3 w-3"
                            />
                          </div>
                        )}
                        {showSortModal && headerId === col.id && (
                          <SortModal headers={sortArr} toggleModal={setShowSortModal} />
                        )}
                      </div>
                    )
                )}
          </div>
        </div>

        <div className="grid dynamic  justify-between mr-10">
          {hideTask.length
            ? hideTask.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.id}
                      className="flex items-center space-x-1 uppercase  text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group relative cursor-pointer"
                      style={{ color: '#78828d', fontSize: '10px' }}
                      onClick={() => handleSort(col.value, col.id)}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-600 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                        {col.value}
                      </span>
                      {sortArr.includes(col.value) && (
                        <div className="flex items-center justify-center space-x-1 uppercase  text-xs text-white font-medium bg-red-600 group relative cursor-pointer px-1 rounded-md group">
                          <span
                            className="font-bold hover:text-clip cursor-pointer"
                            style={{ fontSize: '8px', marginTop: '.5px' }}
                          >
                            {sortArr.indexOf(col.value) + 1}
                          </span>
                          <GiCancel
                            onClick={() => handleRemoveFilter(col.value)}
                            className="opacity-0 group-hover:opacity-100 text-white font-bold h-3 w-3"
                          />
                        </div>
                      )}
                      <span>
                        <FaSort className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                      </span>
                      {showSortModal && headerId === col.id && (
                        <SortModal headers={sortArr} toggleModal={setShowSortModal} />
                      )}
                    </div>
                  )
              )
            : columns.map(
                (col) =>
                  col.value !== 'Task' &&
                  col.value !== 'Tags' &&
                  !col.hidden && (
                    <div
                      key={col.id}
                      className="flex items-center space-x-1 uppercase  text-xs  font-medium hover:bg-gray-400 hover:text-gray-50 group relative cursor-pointer"
                      style={{ color: '#78828d', fontSize: '10px' }}
                      onClick={() => handleSort(col.value, col.id)}
                    >
                      <span className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-400 cursor-move   text-sm">
                        <MdDragIndicator />
                      </span>
                      <span className="truncate  font-bold hover:text-clip cursor-pointer  hover:w-10">
                        {col.value}
                      </span>
                      {sortArr.includes(col.value) && (
                        <div className="flex items-center justify-center space-x-1 uppercase  text-xs text-white font-medium bg-red-600 group relative cursor-pointer px-1 rounded-md group">
                          <span
                            className="font-bold hover:text-clip cursor-pointer"
                            style={{ fontSize: '8px', marginTop: '.5px' }}
                          >
                            {sortArr.indexOf(col.value) + 1}
                          </span>
                          <GiCancel
                            onClick={() => handleRemoveFilter(col.value)}
                            className="opacity-0 group-hover:opacity-100 text-white font-bold h-3 w-3"
                          />
                        </div>
                      )}
                      <span>
                        <FaSort className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                      </span>
                      {showSortModal && headerId === col.id && (
                        <SortModal headers={sortArr} toggleModal={setShowSortModal} />
                      )}
                    </div>
                  )
              )}
        </div>
        <span
          className=" flex absolute  right-5 mt-1  items-center h-5  text-xs  rounded-full p-1 font-semibold group"
          style={{ color: '#78828d' }}
        >
          <FiPlusCircle className="AddColumnDropdownButton font-black h-4 w-4" onClick={() => handleDropDown()} />
          <span className="text-sm z-50">
            {dropDown && (
              <AddColumnDropdown
                setShowDropdownFieldModal={setShowDropdownFieldModal}
                setdropDown={setdropDown}
                title=""
                listItems={hideTask.length ? hideTask : taskColumns}
              />
            )}

            {listId ? (
              <CreateDropdownFieldModal
                listId={listId}
                show={showDropdownFieldModal}
                setShow={setShowDropdownFieldModal}
              />
            ) : null}
          </span>
        </span>
      </div>
    </div>
  );
}

type SortModalProps = {
  headers: string[];
  toggleModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function SortModal({ headers, toggleModal }: SortModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
    <div className="fixed z-50 bg-white mt-20 shadow-lg" ref={modalRef}>
      <div className="flex flex-col space-y-2 w-44 px-1">
        <div className="flex flex-col space-y-1 border-b-2 justify-start px-2">
          {headers.map((title: string, index: number) => (
            <div
              key={index}
              className="flex justify-between items-center font-semibold text-xs capitalize py-2 group cursor-pointer"
              style={{ color: '#78828d' }}
            >
              {title}
              <div className="flex items-center space-x-1">
                <CiFilter className="opacity-0 transition duration-200 group-hover:opacity-100 text-gray-100 bg-gray-400 rounded-full cursor-pointer text-sm h-3 w-3 " />
                <div className=" flex flex-col justify-center items-center w-6 h-6">
                  <IoMdArrowDropup className="text-gray-400" />
                  <IoMdArrowDropdown className="text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
