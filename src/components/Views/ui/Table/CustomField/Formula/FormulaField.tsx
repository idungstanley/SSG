import React, { useState, useEffect } from 'react';
import { Menu } from '@mui/material';
import { Parser as FormulaParser } from 'hot-formula-parser';
import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateDropdownField, useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import AdditionalFormulasField from './AdditionalFormulasField';
import { findSelectedItemsInFormula } from './findSelectedItemsInFormula';
import SimpleFormulasField from './SimpleFormulasField';

const BASE_ACTIONS = ['SUM', 'MINUS', 'MULTIPLY', 'DIVIDE'];
const ALLOWED_TYPES = ['number', 'formula'];

interface DropdownFieldWrapperProps {
  currentCustomFields: ICustomField;
  currentCustomFieldColumn: IField;
  taskCustomFields: ICustomField[];
  taskCustomFieldsColumns: IField[];
  parentId: string;
  taskId: string;
  fieldId: string;
}

function FormulaField({
  currentCustomFields,
  currentCustomFieldColumn,
  taskCustomFields,
  taskCustomFieldsColumns,
  parentId,
  taskId,
  fieldId
}: DropdownFieldWrapperProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentFields, setCurrentFields] = useState<IField[]>([]);
  const [result, setResult] = useState('-');
  const [isShowAdditionalFormulas, setShowAdditionalFormulas] = useState<boolean>(false);
  const [prevFormula, setPrevFormula] = useState<string>('');

  useEffect(() => {
    const newCurrentFields: IField[] = [];
    taskCustomFieldsColumns?.forEach((field) => {
      if (ALLOWED_TYPES.includes(field.type)) {
        newCurrentFields.push(field);
      }
    });
    setCurrentFields(newCurrentFields);
  }, [taskCustomFieldsColumns]);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);
  const { mutate: onUpdateColumn } = useUpdateDropdownField(parentId);

  const handleSaveFormula = (newResult: string, newFormula: string) => {
    setAnchorEl(null);
    onUpdate({
      taskId,
      value: [{ value: newResult }],
      fieldId
    });
    onUpdateColumn({
      data: currentCustomFieldColumn,
      newFields: {
        properties: {
          formula: newFormula
        }
      }
    });
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowAdditionalFormulas(false);
  };

  const parser = new FormulaParser();

  const resultParser = (value: string, allColumns: IField[], allFields: ICustomField[]) => {
    const selectedItems = findSelectedItemsInFormula(value, allColumns, allFields);
    const action = value.split('(')[0];
    if (selectedItems.length <= 2 && BASE_ACTIONS.includes(action)) {
      setShowAdditionalFormulas(false);
    } else {
      setShowAdditionalFormulas(true);
    }
    let strWithCurrentValues = value;
    let strWithCurrentNames = value;
    selectedItems.forEach((item) => {
      strWithCurrentValues = strWithCurrentValues.replaceAll(`"${item.id}"`, item.value);
      strWithCurrentNames = strWithCurrentNames.replaceAll(`"${item.id}"`, `field("${item.name}")`);
    });
    return { strWithCurrentValues, strWithCurrentNames };
  };

  useEffect(() => {
    // check result after load column
    if (taskCustomFields?.length && currentCustomFieldColumn?.properties?.formula) {
      const value = currentCustomFieldColumn.properties?.formula as string;
      const { strWithCurrentValues, strWithCurrentNames } = resultParser(
        value,
        taskCustomFieldsColumns,
        taskCustomFields
      );
      let res = parser.parse(strWithCurrentValues).result as string;
      if (typeof res === 'object' && res !== null) {
        res = new Date(res).toLocaleDateString('en-US');
      } else if (typeof res === 'number') {
        // fixed result
        res = String(Math.round(+res * 1e2) / 1e2);
      } else if (typeof res === 'boolean') {
        res = String(res);
      }
      if (res) {
        setResult(res);
        setPrevFormula(strWithCurrentNames);
      } else {
        setResult('-');
      }
    }
  }, [taskCustomFields, currentCustomFieldColumn, taskCustomFieldsColumns, anchorEl]);

  useEffect(() => {
    // update results on BE if any column change
    if (
      result &&
      result !== '-' &&
      currentCustomFields?.values[0].value &&
      currentCustomFields?.values[0].value !== result
    ) {
      onUpdate({
        taskId,
        value: [{ value: result }],
        fieldId
      });
    }
  }, [result]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-alsoit-text-lg font-semibold max-w-full break-words cursor-pointer" onClick={handleClick}>
        {result}
      </h1>
      {anchorEl && !isShowAdditionalFormulas && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{
            marginLeft: '-160px',
            borderRadius: '20px'
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            style: {
              borderRadius: '20px'
            }
          }}
        >
          <SimpleFormulasField
            taskCustomFieldsColumns={taskCustomFieldsColumns}
            taskCustomFields={taskCustomFields}
            currentFields={currentFields}
            prevFormula={prevFormula}
            showAdditionalFormulas={() => setShowAdditionalFormulas(true)}
            handleSave={handleSaveFormula}
            handleClose={handleClose}
          />
        </Menu>
      )}
      {anchorEl && isShowAdditionalFormulas && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={isShowAdditionalFormulas}
          onClose={handleClose}
          style={{
            marginLeft: '-160px',
            borderRadius: '20px'
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
            style: {
              borderRadius: '20px'
            }
          }}
        >
          <AdditionalFormulasField
            currentFields={currentFields}
            taskCustomFields={taskCustomFields}
            prevFormula={prevFormula}
            handleSave={handleSaveFormula}
            handleClose={() => setShowAdditionalFormulas(false)}
          />
        </Menu>
      )}
    </div>
  );
}

export default FormulaField;
