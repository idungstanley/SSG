import React, { useState } from 'react';
import { cl } from '../../../../../utils';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import Picker from '../../../../../assets/icons/Picker';
import Pin from '../../../../../assets/icons/Pin';
import CreateDropdownField from './CreateDropdownField';
import { useAppSelector } from '../../../../../app/hooks';

function CreateNewColumn() {
  const [activeBtn, setActiveBtn] = useState('1');
  const { newColInstance } = useAppSelector((state) => state.task);
  return (
    <div className="w-full">
      <section className="w-full flex justify-center my-2">
        <span className="font-semibold ">
          Create a <button className="text-fuchsia-600 hover:text-blue-600">New directory template</button> or choose
          from <button className="text-fuchsia-600 text-sm hover:text-blue-600"> the templates library</button>
        </span>
      </section>
      {newColInstance.map((newCol) => {
        return (
          <section key={newCol.id} className="w-full bg-sky-50 flex my-2">
            <span style={{ width: '5px' }} className="bg-blue-600 rounded-tl-md rounded-bl-md"></span>
            <div className="p-2 w-full">
              <div className="flex justify-center my-4">
                <div className="bg-gray-200  flex rounded-2xl">
                  <button
                    className={cl(
                      'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                      activeBtn === '1' && 'bg-blue-600 text-white'
                    )}
                    onClick={() => setActiveBtn('1')}
                  >
                    New Column
                  </button>
                  <button
                    className={cl(
                      'text-xs font-extrabold p-1 rounded-2xl',
                      activeBtn === '2' && 'bg-blue-600 text-white text-alsoit-text-lg'
                    )}
                    onClick={() => setActiveBtn('2')}
                  >
                    Show/Hide
                  </button>
                  <button
                    className={cl(
                      'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                      activeBtn === '3' && 'bg-blue-600 text-white'
                    )}
                    onClick={() => setActiveBtn('3')}
                  >
                    Use Library
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center my-4">
                <div>
                  <p className="text-alsoit-text-sm">FIELD REF</p>
                  <div className="w-10 h-6 border-0 text-alsoit-text-md flex justify-center bg-white items-center">
                    1
                  </div>
                </div>
                <div>
                  <p className="text-alsoit-text-sm">FIELD NAME</p>
                  <div
                    style={{ width: '200px' }}
                    className="h-6 border-0 text-alsoit-text-md flex bg-white items-center"
                  >
                    <input
                      type="text"
                      className="border-0 focus:border-0 active:border-0 h-6"
                      style={{ width: '160px' }}
                    />
                    <div className="flex gap-0.5 justify-center w-full">
                      <Picker />
                      <hr />
                      <Pin />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-alsoit-text-sm">FIELD TYPE</p>
                  <ColumnTypeDropdown />
                </div>
              </div>
              <CreateDropdownField />
              <div className="flex justify-between w-full my-4">
                <button className="bg-white text-red-600 p-0.5 border-2 border-red-600 rounded">Cancel</button>
                <div className="flex gap-1">
                  <button className="bg-white text-fuchsia-600 p-0.5 border-2 border-fuchsia-600 rounded">
                    Add Field
                  </button>
                  <button className="bg-white text-fuchsia-600 p-0.5 border-2 border-fuchsia-600 rounded">
                    Save to
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default CreateNewColumn;
