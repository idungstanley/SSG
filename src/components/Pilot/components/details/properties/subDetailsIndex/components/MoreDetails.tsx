import React, { useState } from 'react';
import DatePicker from '../../../../../../DatePicker/DatePicker';

type TableData = {
  start_date: string;
  updated_at: string;
  end_date: string;
  test_date: null | string;
};

export default function MoreDetails(): JSX.Element {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showDataPicker, setShowDatePicker] = useState<boolean>(false);
  const tableData: TableData = {
    start_date: 'show start date',
    updated_at: 'show update date',
    end_date: 'show end date',
    test_date: null
  };

  const handleShowAll = (): void => {
    setShowAll(!showAll);
  };

  return (
    <div className="border border-gray-200 rounded-b">
      {showDataPicker ? (
        <div>
          <DatePicker toggleFn={setShowDatePicker} />
        </div>
      ) : null}

      <table className="w-full">
        <tbody>
          {Object.entries(tableData).map(([key, value]) => {
            if (!showAll && value === null) {
              return null;
            }
            return (
              <tr key={key} className="border-b border-gray-200">
                <td className="py-2 px-4 text-gray-700 font-medium border-r border-gray-200">{key}</td>
                <td className="py-2 px-4 text-gray-500" onClick={() => setShowDatePicker(!showDataPicker)}>
                  {value ? value : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button
        className=" cursor-pointer w-full px-2 py-1 bg-gray-300 text-gray-700 rounded hover:text-blue-400 border border-gray-200"
        onClick={handleShowAll}
      >
        {showAll ? 'Hide empty fields' : 'Show empty fields'}
      </button>
    </div>
  );
}
