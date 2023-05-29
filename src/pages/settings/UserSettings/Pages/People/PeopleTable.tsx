import React from 'react';
import PeopleTableCol from './PeopleTableCol';
import PeopleTableHead from './PeopleTableHead';

export default function PeopleTable() {
  return (
    <div>
      <table className="text-center w-full divide-y divide-gray-500 border-collapse">
        <PeopleTableHead />
        <PeopleTableCol />
      </table>
    </div>
  );
}
