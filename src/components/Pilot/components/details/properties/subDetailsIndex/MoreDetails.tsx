import React from 'react';

export default function MoreDetails() {
  const tableData = {
    start_date: 'show start date',
    updated_at: 'show update date',
    end_date: 'show end date'
  };

  return (
    <div className="p-4">
      <table className="w-full border border-gray-200">
        <tbody>
          {Object.entries(tableData).map(([key, value]) => (
            <tr key={key} className="border-b border-gray-200">
              <td className="py-2 px-4 text-gray-700 font-medium border-r border-gray-200">{key}</td>
              <td className="py-2 px-4 text-gray-500">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
