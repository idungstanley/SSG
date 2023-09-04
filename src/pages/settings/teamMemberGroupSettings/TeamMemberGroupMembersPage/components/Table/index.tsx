import React from 'react';
import Header from './Header';
import Body from './Body';

export default function Table() {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <div className="inline-block min-w-full align-middle">
            <div className="shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <Header />
                <Body />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
