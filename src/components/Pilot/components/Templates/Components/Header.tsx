import React from 'react';
import TemplatesIcon from '../../../../../assets/icons/Templates';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setNewColInstance } from '../../../../../features/task/taskSlice';

function Header() {
  const { newColInstance } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full">
      <div className="border-2 flex items-center text-center py-1 px-2 bg-white">
        <TemplatesIcon />
        <h1 className="text-base-xl mx-2">Templates</h1>
        <button
          className="w-14  border-blue-400 border-solid border-2 rounded-lg text-xs"
          onClick={() => dispatch(setNewColInstance({ id: newColInstance.length + 1, value: '' }))}
        >
          ADD
        </button>
      </div>
    </div>
  );
}

export default Header;
