import React from 'react';
import Header from './Components/Header';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';

function Templates() {
  const { newColInstance } = useAppSelector((state) => state.task);

  return (
    <div className="h-full w-full">
      <Header />
      {newColInstance.map((newCol) => {
        return <CreateNewColumn key={newCol.id} />;
      })}
    </div>
  );
}

export default Templates;
