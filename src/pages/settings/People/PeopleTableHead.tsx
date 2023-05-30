import React from 'react';

export default function PeopleTableHead() {
  return (
    <thead className="bg-gray-400 h-8">
      <tr>
        <th>Team member</th>
        <th>Team email</th>
        <th>Role</th>
        <th>Status</th>
        <th>Invited at</th>
        <th></th>
      </tr>
    </thead>
  );
}
