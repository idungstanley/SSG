import React from 'react';
import SaveCols from '../SaveCols';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';

function CreateEmailField() {
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
      const customType = newCustomPropertyDetails.type.toLowerCase();
      onCreate({
        name,
        style,
        color,
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
        header="Email"
        body="This custom property which allows to track clients, vendors, leads and more by entering emails"
      />
    </div>
  );
}

export default CreateEmailField;