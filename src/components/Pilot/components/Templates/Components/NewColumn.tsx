import React from 'react';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import CreateDropdownField from './CreateDropdownField';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../features/task/taskSlice';
import CreateDateField from './CreateDateField';

function NewColumn() {
  const dispatch = useAppDispatch();
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center justify-between my-4 w-full">
        <div className="w-2/4">
          <p className="text-alsoit-text-11 text-alsoit-gray-100">PROPERTY TYPE</p>
          <ColumnTypeDropdown />
        </div>
        <div className="w-2/4">
          <p className="text-alsoit-text-11 text-alsoit-gray-100">PROPERTY NAME</p>
          <input
            onChange={(e) =>
              dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, name: e.target.value }))
            }
            type="text"
            className="block w-full rounded-md border-0 py-1 shadow-sm ring-1 ring-inset placeholder-gray-300 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300 text-alsoit-text-11 sm:text-sm sm:leading-6"
            style={{ height: '30px', borderRadius: '6px' }}
            value={newCustomPropertyDetails.name}
          />
        </div>
      </div>
      {newCustomPropertyDetails.type.toLowerCase() === 'single label' && <CreateDropdownField />}
      {newCustomPropertyDetails.type.toLowerCase() === 'multi label' && <CreateDropdownField />}

      {newCustomPropertyDetails.type.toLowerCase() === 'date' && <CreateDateField />}
    </div>
  );
}

export default NewColumn;
