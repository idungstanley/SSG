import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';

export interface IFormulaData {
  id: string;
  name: string;
  value: string;
}

export const findSelectedItemsInFormula = (str: string, columns: IField[], fields: ICustomField[]) => {
  const splitedString = str.split('"');
  const currentFields: { id: string; name: string }[] = [];
  const currentFieldsWithValue: IFormulaData[] = [];

  splitedString.forEach((strPath) => {
    columns.forEach((v) => {
      if (strPath === v.name || strPath === v.id) {
        currentFields.push({ id: v.id, name: v.name });
      }
    });
  });
  fields.forEach((value) => {
    currentFields.forEach((id) => {
      if (id.id === value.id) {
        currentFieldsWithValue.push({ ...id, value: value.values[0].value });
      }
    });
  });
  return currentFieldsWithValue;
};
