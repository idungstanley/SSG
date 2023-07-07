import React from 'react';
import Picker from '../../../../../assets/icons/Picker';
import Pin from '../../../../../assets/icons/Pin';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import CreateDropdownField from './CreateDropdownField';

function NewColumn() {
  return (
    <div>
      <div className="flex justify-between items-center my-4">
        <div style={{ width: '12%' }}>
          <p className="text-alsoit-text-sm">FIELD REF</p>
          <div className="h-6 border-0 text-alsoit-text-md flex justify-center bg-white items-center">1</div>
        </div>
        <div className="w-2/5">
          <p className="text-alsoit-text-sm">FIELD NAME</p>
          <div className="w-full h-6 border-0 text-alsoit-text-md flex bg-white items-center">
            <input
              style={{ width: '90%' }}
              type="text"
              className="text-alsoit-text-sm border-0 focus:border-0 active:border-0 h-6"
            />
            <div className="flex gap-0.5 justify-center">
              <Picker />
              <hr />
              <Pin />
            </div>
          </div>
        </div>
        <div className="w-2/5">
          <p className="text-alsoit-text-sm">FIELD TYPE</p>
          <ColumnTypeDropdown />
        </div>
      </div>
      <CreateDropdownField />
      <div className="flex justify-between w-full my-4">
        <button className="bg-white text-red-600 p-0.5 border-2 border-red-600 rounded hover:text-white hover:bg-red-500">
          Cancel
        </button>
        <div className="flex gap-1">
          <button className="bg-white text-fuchsia-600 p-0.5 border-2 border-fuchsia-600 rounded hover:bg-fuchsia-600 hover:text-white">
            Add Field
          </button>
          <button className="bg-white text-fuchsia-600 p-0.5 border-2 border-fuchsia-600 rounded hover:bg-fuchsia-600 hover:text-white">
            Save to
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewColumn;
