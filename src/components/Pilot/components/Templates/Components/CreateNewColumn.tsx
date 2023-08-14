import React, { useState } from 'react';
import { cl } from '../../../../../utils';
import NewColumn from './NewColumn';
import ShowHide from './ShowHide';

function CreateNewColumn() {
  const [activeBtn, setActiveBtn] = useState('1');
  return (
    <div className="w-full">
      <section
        style={{ backgroundColor: '#F2F6FC' }}
        className="w-full flex my-2 rounded-2xl border-l-4 border-t-4 border-alsoit-blue-100"
      >
        <div className="p-2 w-full">
          <div className="flex justify-center my-4">
            <div className="bg-gray-200  flex rounded-2xl">
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                  activeBtn === '1' && 'bg-alsoit-purple-400 text-white'
                )}
                onClick={() => setActiveBtn('1')}
              >
                New Column
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl',
                  activeBtn === '2' && 'bg-alsoit-purple-400 text-white'
                )}
                onClick={() => setActiveBtn('2')}
              >
                Show/Hide
              </button>
              <button
                className={cl(
                  'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                  activeBtn === '3' && 'bg-alsoit-purple-400 text-white'
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
