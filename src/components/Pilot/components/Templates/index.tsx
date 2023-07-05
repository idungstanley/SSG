import React from 'react';
import Header from './Components/Header';
import CreateNewColumn from './Components/CreateNewColumn';

function Templates() {
  return (
    <div className="h-full w-full overflow-scroll">
      <Header />
      <CreateNewColumn />
    </div>
  );
}

export default Templates;
