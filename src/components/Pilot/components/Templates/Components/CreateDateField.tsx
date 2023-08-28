import React from 'react';
import SaveCols from './SaveCols';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../features/list/listService';
import { setIsTasksUpdated } from '../../../../../features/task/taskSlice';

function CreateDateField() {
  const dispatch = useAppDispatch();

  const { newCustomPropertyDetails, entityForCustom } = useAppSelector((state) => state.task);

  const { mutate: onCreate } = useCreateDropdownField(entityForCustom.type, entityForCustom.id);
  const handleSubmit = () => {
    if (newCustomPropertyDetails.name && entityForCustom) {
      const name = newCustomPropertyDetails.name;
      const color = newCustomPropertyDetails.color;
      const is_bold = newCustomPropertyDetails.style?.is_bold;
      const is_italic = newCustomPropertyDetails.style?.is_italic;
      const is_underlined = newCustomPropertyDetails.style?.is_underlined;
      const style = {
        is_bold: is_bold as string,
        is_italic: is_italic as string,
        is_underlined: is_underlined as string
      };
      dispatch(setIsTasksUpdated(false));
      onCreate({
        name,
        style,
        color,
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
