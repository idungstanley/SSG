import { useState } from 'react';
import SaveCols from '../SaveCols';
import { useAppSelector } from '../../../../../../app/hooks';
import { useCreateDropdownField } from '../../../../../../features/list/listService';
import SimpleFormulasField from '../../../../../Views/ui/Table/CustomField/Formula/SimpleFormulasField';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { IField } from '../../../../../../features/list/list.interfaces';

function CreateFormulaField() {
  const { newCustomPropertyDetails, entityForCustom, tasks } = useAppSelector((state) => state.task);

  const [currentFormula, setCurrentFormula] = useState<string>('');

  const { mutate: onCreate } = useCreateDropdownField();

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
        customType,
        properties: {
          formula: currentFormula
        }
      });
    }
  };

  const handleReturnFormula = (formula: string) => {
    setCurrentFormula(formula);
  };

  return (
    <div>
      <SimpleFormulasField
        taskCustomFieldsColumns={tasks[entityForCustom.id as string][0].custom_field_columns as IField[]}
        taskCustomFields={tasks[entityForCustom.id as string][0].custom_fields as ICustomField[]}
        currentFieldColumns={tasks[entityForCustom.id as string][0].custom_field_columns}
        handleReturnFormula={handleReturnFormula}
        isPilotField={true}
      />
      <SaveCols
        handleSubmit={handleSubmit}
        header="Formula"
        body="This custom property which allows for accounting, inventory or tracking"
      />
    </div>
  );
}

export default CreateFormulaField;
