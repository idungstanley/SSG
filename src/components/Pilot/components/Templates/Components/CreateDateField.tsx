import React from 'react';
import SaveCols from './SaveCols';
import { useAppSelector } from '../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../features/list/listService';

function CreateDateField() {
  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField(entityForCustom.type, entityForCustom.id);
  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;

      onCreate({
        name,
        id: entityForCustom.id,
        type: entityForCustom.type,
        options: undefined,
        customType: 'date'
      });
    }
  };

  return (
    <div>
      <SaveCols
        handleSubmit={handleSubmit}
        header="Date"
        body="This custom property allows setting dates and time against tasks."
      />
    </div>
  );
}

export default CreateDateField;
