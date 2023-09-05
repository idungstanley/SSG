import React, { useState } from 'react';
import { cl } from '../../../../../utils';
import NewColumn from './NewColumn';
import ShowHide from './ShowHide';

function CreateNewColumn() {
  const [activeBtn, setActiveBtn] = useState('1');
  return (
    <div className="w-full">
      <section className="w-full flex my-2 rounded-2xl bg-alsoit-gray-50">
        <div className="p-2 w-full">
          <div className="flex justify-center my-4 w-full">
            <div className="flex justify-between w-4/5 m-auto ">
              <button
                className={cl(
                  'text-xs font-extrabold p-1 text-alsoit-text-lg w-2/6 border-b-2',
                  activeBtn === '1' && 'border-alsoit-purple-300 text-alsoit-purple-300'
                )}
                onClick={() => setActiveBtn('1')}
              >
                New Column
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 w-2/6 border-b-2',
                  activeBtn === '2' && 'border-alsoit-purple-300 text-alsoit-purple-300'
                )}
                onClick={() => setActiveBtn('2')}
              >
                Show/Hide
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 text-alsoit-text-lg w-2/6 border-b-2',
                  activeBtn === '3' && 'border-alsoit-purple-300 text-alsoit-purple-300'
                )}
                onClick={() => setActiveBtn('3')}
              >
                Use Library
              </button>
            </div>
          </div>
          {activeBtn === '1' && <NewColumn />}
          {activeBtn === '2' && <ShowHide />}
        </div>
      </section>
    </div>
  );
}

export default CreateNewColumn;
