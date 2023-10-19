import React, { useState, useEffect, Fragment, useMemo } from 'react';
import { Menu } from '@mui/material';
import Button from '../../../../../Buttons/Button';
import ArrowDownFilled from '../../../../../../assets/icons/ArrowDownFilled';
import { BsFillDashSquareFill, BsFillSlashSquareFill, BsFillXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { Parser as FormulaParser } from 'hot-formula-parser';
import { IField } from '../../../../../../features/list/list.interfaces';
import Number from '../../../../../../assets/branding/Number';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { IFormulaData, findSelectedItemsInFormula } from './findSelectedItemsInFormula';
import { TbMathFunction } from 'react-icons/tb';
import NewFormulaField from './NewFormulaField';

const actions = [
  { id: 'SUM', icon: <BsPlusSquareFill color="#6bc950" size={25} /> },
  { id: 'MINUS', icon: <BsFillDashSquareFill color="#fd7171" size={25} /> },
  { id: 'MULTIPLY', icon: <BsFillXSquareFill color="#ffc800" size={25} /> },
  { id: 'DIVIDE', icon: <BsFillSlashSquareFill color="#49ccf9" size={25} /> }
];

export interface IAdditionalFormulaFields {
  action: string;
  id: string;
}

interface ISimpleFormulasFieldProps {
  taskCustomFieldsColumns: IField[];
  taskCustomFields: ICustomField[];
  currentFieldColumns: IField[];
  prevFormula?: string;
  isPilotField?: boolean;
  handleSave?: (res: string, formula: string) => void;
  handleReturnFormula?: (formula: string) => void;
  handleClose?: () => void;
  showAdditionalFormulas?: () => void;
}

function SimpleFormulasField({
  taskCustomFieldsColumns,
  taskCustomFields,
  currentFieldColumns,
  prevFormula,
  isPilotField,
  showAdditionalFormulas,
  handleSave,
  handleReturnFormula,
  handleClose
}: ISimpleFormulasFieldProps) {
  // menu positions
  const [anchorOne, setAnchorOne] = useState<null | HTMLElement>(null);
  const [anchorTwo, setAnchorTwo] = useState<null | HTMLElement>(null);
  const [anchorAction, setAnchorAction] = useState<null | HTMLElement>(null);
  // main states
  const [selectedItemOne, setSelectedItemOne] = useState<IFormulaData | null>(null);
  const [selectedItemTwo, setSelectedItemTwo] = useState<IFormulaData | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('SUM');
  const [additionalFields, setAdditionalFields] = useState<IAdditionalFormulaFields[]>([]);
  const [result, setResult] = useState('-');
  const [newFormulaState, setNewFormulaState] = useState<string>('');

  const onSave = () => {
    if (handleSave) {
      if (newFormulaState) {
        handleSave(result, newFormulaState);
      } else {
        handleSave(result, `${selectedAction}("${selectedItemOne?.id}", "${selectedItemTwo?.id}")`);
      }
    }
  };

  const renderIcon = () => {
    switch (selectedAction) {
      case 'SUM':
        return <BsPlusSquareFill color="#6bc950" size={25} />;
      case 'MINUS':
        return <BsFillDashSquareFill color="#fd7171" size={25} />;
      case 'MULTIPLY':
        return <BsFillXSquareFill color="#ffc800" size={25} />;
      case 'DIVIDE':
        return <BsFillSlashSquareFill color="#49ccf9" size={25} />;
    }
  };

  const renderItemIcon = (field: IField) => {
    switch (field.type) {
      case 'number':
        return <Number />;
      case 'formula':
        return <TbMathFunction />;
    }
  };

  const parser = new FormulaParser();

  const resultParser = (value: string, allColumns: IField[], allFields: ICustomField[]) => {
    const selectedItems = findSelectedItemsInFormula(value, allColumns, allFields);
    if (selectedItems) {
      const action = value.split('(')[0];
      if (selectedItems.length === 2) {
        setSelectedAction(action);
        setSelectedItemOne(selectedItems[0]);
        setSelectedItemTwo(selectedItems[1]);
      } else {
        setSelectedItemOne(null);
        setSelectedItemTwo(null);
        showAdditionalFormulas && showAdditionalFormulas();
      }
      let strWithCurrentValues = value;
      let strWithCurrentIds = value;
      selectedItems.forEach((item) => {
        strWithCurrentValues = strWithCurrentValues.replaceAll(`field("${item.name}")`, item.value);
        strWithCurrentIds = strWithCurrentIds.replaceAll(`field("${item.name}")`, item.id);
      });
      return { strWithCurrentValues, strWithCurrentIds };
    }
    return { strWithCurrentValues: '', strWithCurrentNames: '' };
  };

  useEffect(() => {
    // check result after load modal
    if (prevFormula) {
      const { strWithCurrentValues } = resultParser(prevFormula, taskCustomFieldsColumns, taskCustomFields);
      let res = parser.parse(strWithCurrentValues).result as string;
      if (typeof res === 'object') {
        res = new Date(res).toLocaleDateString('en-US');
      } else if (typeof res === 'number') {
        // fixed result
        res = String(Math.round(+res * 1e2) / 1e2);
      } else if (typeof res === 'boolean') {
        res = String(res);
      }
      setResult(res);
    }
  }, [prevFormula]);

  useEffect(() => {
    // update result after change any item
    if (selectedItemOne && selectedItemTwo) {
      const value = `${selectedAction}("${selectedItemOne?.id}", "${selectedItemTwo?.id}")`;
      const selectedItems = findSelectedItemsInFormula(value, taskCustomFieldsColumns, taskCustomFields);
      if (selectedItems) {
        let strWithCurrentValues = value;
        selectedItems.forEach((item) => {
          strWithCurrentValues = strWithCurrentValues.replaceAll(`"${item.id}"`, item.value);
        });
        const res = parser.parse(strWithCurrentValues).result as string;
        setResult(res);
      }
    }
  }, [selectedItemOne, selectedItemTwo, selectedAction]);

  const handleReturnNewData = (data: { action: string; id: string } | null, index: number) => {
    const updatedAdditionalFields = [...additionalFields];
    if (data) {
      updatedAdditionalFields[index] = data;
    } else {
      updatedAdditionalFields.splice(index, 1);
    }
    setAdditionalFields(updatedAdditionalFields);
    let newFormula = `${selectedAction}("${selectedItemOne?.id}", "${selectedItemTwo?.id}")`;
    updatedAdditionalFields.forEach((item) => {
      newFormula = `${item.action}(${newFormula}, "${item.id}")`;
    });
    if (isPilotField && handleReturnFormula) {
      handleReturnFormula(newFormula);
    } else {
      const res = parser.parse(newFormula).result as string;
      setResult(res);
      setNewFormulaState(newFormula);
    }
  };

  const isShowAddNewField = useMemo(() => {
    let isShow = false;
    let isEmptyAdditionalField = false;
    if (additionalFields.length && !additionalFields[additionalFields.length - 1].id) {
      isEmptyAdditionalField = true;
    }
    if (selectedItemOne && selectedItemTwo && (!additionalFields.length || !isEmptyAdditionalField)) {
      isShow = true;
    }
    return isShow;
  }, [selectedItemOne, selectedItemTwo, additionalFields]);

  return (
    <>
      <div className="flex items-center justify-start space-x-1 p-2 pl-4">
        <div className="w-full">
          <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorOne(e.currentTarget)}>
            <Button active={!!selectedItemOne}>
              <span className="whitespace-nowrap w-full pl-1">
                {selectedItemOne ? selectedItemOne.name : 'Select field'}
              </span>
              <ArrowDownFilled active={!!selectedItemOne} />
            </Button>
          </div>
          <Menu anchorEl={anchorOne} open={!!anchorOne} onClose={() => setAnchorOne(null)}>
            {currentFieldColumns.length ? (
              <>
                {currentFieldColumns.map((field) => (
                  <div
                    key={field.id}
                    className="flex px-2 py-1 w-44 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedItemOne({ id: field.id, name: field.name, value: '' });
                      setAnchorOne(null);
                    }}
                  >
                    <span className="flex justify-center align-center mx-1 w-5 h-5">{renderItemIcon(field)}</span>
                    {field.name}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </Menu>
        </div>
        <div>
          <div
            style={{ marginRight: '10px' }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorAction(e.currentTarget)}
          >
            {renderIcon()}
          </div>
          <Menu anchorEl={anchorAction} open={!!anchorAction} onClose={() => setAnchorAction(null)}>
            {actions.map((action) => (
              <div
                key={action.id}
                className="w-30 px-2 py-1 cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelectedAction(action.id);
                  setAnchorAction(null);
                }}
              >
                {action.icon}
              </div>
            ))}
          </Menu>
        </div>
        <div className="w-full">
          <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorTwo(e.currentTarget)}>
            <Button active={!!selectedItemTwo}>
              <span className="whitespace-nowrap w-full pl-1">
                {selectedItemTwo ? selectedItemTwo.name : 'Select field'}
              </span>
              <ArrowDownFilled active={!!selectedItemTwo} />
            </Button>
          </div>
          <Menu anchorEl={anchorTwo} open={!!anchorTwo} onClose={() => setAnchorTwo(null)}>
            {currentFieldColumns.length ? (
              <>
                {currentFieldColumns.map((field) => (
                  <div
                    key={field.id}
                    className="flex px-2 py-1 w-44 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      setSelectedItemTwo({ id: field.id, name: field.name, value: '' });
                      setAnchorTwo(null);
                    }}
                  >
                    <span className="flex justify-center align-center mx-1 w-5 h-5">{renderItemIcon(field)}</span>
                    {field.name}
                  </div>
                ))}
              </>
            ) : (
              <></>
            )}
          </Menu>
        </div>
      </div>
      {/* here new fields */}
      {additionalFields.map((field, index) => (
        <Fragment key={`${field}${index}`}>
          <NewFormulaField
            currentFieldColumns={currentFieldColumns}
            field={field}
            index={index}
            returnNewData={handleReturnNewData}
          />
        </Fragment>
      ))}
      <div className="flex gap-1 items-end justify-end px-4">
        {isShowAddNewField ? (
          <button>
            <div className="flex items-center pr-2">
              <span
                className="ml-2 text-xs"
                onClick={() => setAdditionalFields([...additionalFields, { action: 'SUM', id: '' }])}
              >
                + Add new column
              </span>
            </div>
          </button>
        ) : null}
      </div>
      {!isPilotField ? (
        <div className="flex gap-1 items-end justify-end p-4">
          <button>
            <div className="flex items-center pr-2">
              <label className="switch" onClick={(event) => event.stopPropagation()}>
                <input
                  className="inputShow"
                  type="checkbox"
                  checked={false}
                  onChange={showAdditionalFormulas && showAdditionalFormulas}
                />
                <div className="slider" />
              </label>
              <span className="ml-2 text-xs">Advanced Editor</span>
            </div>
          </button>
          <button
            className="p-1 bg-white rounded text-alsoit-danger h-6"
            style={{ width: '79px' }}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            style={{ width: '79px' }}
            className={`${
              !selectedItemOne || !selectedItemTwo ? 'bg-alsoit-danger' : 'bg-alsoit-success'
            } text-white rounded h-6`}
            onClick={onSave}
            disabled={!selectedItemOne || !selectedItemTwo}
          >
            Save
          </button>
        </div>
      ) : null}
    </>
  );
}

export default SimpleFormulasField;
