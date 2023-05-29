import React from 'react';
import PeopleTable from './PeopleTable';
import HeadingPeople from './HeadingPeople';

function PeopleProfile() {
  return (
    <main className="mx-auto" style={{ width: '96%' }}>
      <HeadingPeople />
      <div className="overflow-y-auto border rounded-lg h-min" style={{ maxHeight: '87vh' }}>
        <PeopleTable />
      </div>
    </main>
  );
}

export default PeopleProfile;
