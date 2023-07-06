import React, { useState } from 'react';
import { cl } from '../../../../../utils';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import Picker from '../../../../../assets/icons/Picker';
import Pin from '../../../../../assets/icons/Pin';
import CreateDropdownField from './CreateDropdownField';

function CreateNewColumn() {
  const [activeBtn, setActiveBtn] = useState('1');
  return (
    <div className="w-full">
      <section className="w-full flex justify-center my-2">
        <span className="font-semibold ">
          Create a <button className="text-fuchsia-600 hover:text-blue-600">New directory template</button> or choose
          from <button className="text-fuchsia-600 text-sm hover:text-blue-600"> the templates library</button>
        </span>
      </section>
      <section className="w-full bg-sky-50 flex">
        <span style={{ width: '5px' }} className="bg-blue-600 rounded-tl-md rounded-bl-md"></span>
        <div className="p-1 w-full">
          <div className="flex justify-center my-4">
            <div className="bg-gray-200  flex rounded-2xl">
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl text-alsoit-gray-300-lg',
                  activeBtn === '1' && 'bg-blue-600 text-white'
                )}
                onClick={() => setActiveBtn('1')}
              >
                New Column
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl',
                  activeBtn === '2' && 'bg-blue-600 text-white text-alsoit-gray-300-lg'
                )}
                onClick={() => setActiveBtn('2')}
              >
                Show/Hide
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl text-alsoit-gray-300-lg',
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
              <p className="text-alsoit-gray-300-sm">FIELD REF</p>
              <div className="w-10 h-6 border-0 text-alsoit-gray-300-md flex justify-center bg-white items-center">
                1
              </div>
            </div>
            <div>
              <p className="text-alsoit-gray-300-sm">FIELD NAME</p>
              <div
                style={{ width: '200px' }}
                className="h-6 border-0 text-alsoit-gray-300-md flex bg-white items-center"
              >
                <input type="text" className="border-0 focus:border-0 active:border-0 h-6" style={{ width: '160px' }} />
                <div className="flex gap-0.5 justify-center w-full">
                  <Picker />
                  <hr />
                  <Pin />
                </div>
              </div>
            </div>
            <div>
              <p className="text-alsoit-gray-300-sm">FIELD TYPE</p>
              <ColumnTypeDropdown />
            </div>
          </div>
          <CreateDropdownField />
        </div>
      </section>
    </div>
  );
}

export default CreateNewColumn;
