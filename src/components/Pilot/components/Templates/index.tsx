import React from 'react';
import CreateNewColumn from './Components/CreateNewColumn';
import { useAppSelector } from '../../../../app/hooks';
import EditDropdown from './Edit/EditDropdown';
import Button from '../../../Button';
import PlusCircle from '../../../../assets/icons/AddCircle';

function Templates() {
  const { entityForCustom, editCustomProperty } = useAppSelector((state) => state.task);
  return (
    <div className="w-full h-full p-2 overflow-scroll">
      <span className="flex justify-items-start">
        <Button
          height="h-9 text-white"
          icon={<PlusCircle active={false} color="white" dimensions={{ height: 22, width: 22 }} />}
          label="ADD PROPERTY"
          labelSize="text-sm"
          padding="p-2"
          bgColor="#B2B2B2"
        />
      </span>
      {entityForCustom.id && entityForCustom.type && <CreateNewColumn />}
      {editCustomProperty && <EditDropdown />}
    </div>
  );
}

export default Templates;
