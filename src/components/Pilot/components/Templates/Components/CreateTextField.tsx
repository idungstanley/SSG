import React from 'react';
import SaveCols from './SaveCols';
import { useAppSelector } from '../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../features/list/listService';

function CreateTextField() {
  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField(entityForCustom.type, entityForCustom.id);
  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;
      const customType = newCustomPropertyDetails.type === 'short text' ? 'text' : newCustomPropertyDetails.type;

      onCreate({
        name,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType
      });
    }
  };
  return (
    <div>
      <SaveCols
        handleSubmit={handleSubmit}
        header="Text"
        body="This custom property which allows for texts like names, locations."
      />
    </div>
  );
}

export default CreateTextField;
