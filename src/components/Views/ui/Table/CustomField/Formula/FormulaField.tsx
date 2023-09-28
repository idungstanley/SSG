import React, { useState, useEffect } from 'react';
import { Menu } from '@mui/material';
import Button from '../../../../../Buttons/Button';
import ArrowDownFilled from '../../../../../../assets/icons/ArrowDownFilled';
import { BsFillDashSquareFill, BsFillSlashSquareFill, BsFillXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { Parser as FormulaParser } from 'hot-formula-parser';
import { IField } from '../../../../../../features/list/list.interfaces';
import Number from '../../../../../../assets/branding/Number';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateDropdownField, useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';
import AdditionalFormulasField from './AdditionalFormulasField';
import { IFormulaData, findSelectedItemsInFormula } from './findSelectedItemsInFormula';

const actions = [
  { id: 'SUM', icon: <BsPlusSquareFill color="#6bc950" size={25} /> },
  { id: 'MINUS', icon: <BsFillDashSquareFill color="#fd7171" size={25} /> },
  { id: 'MULTIPLY', icon: <BsFillXSquareFill color="#ffc800" size={25} /> },
  { id: 'DIVIDE', icon: <BsFillSlashSquareFill color="#49ccf9" size={25} /> }
];

const BASE_ACTIONS = ['SUM', 'MINUS', 'MULTIPLY', 'DIVIDE'];

interface DropdownFieldWrapperProps {
  currentCustomFieldColumn: IField;
  taskCustomFields: ICustomField[];
  taskCustomFieldsColumns: IField[];
  parentId: string;
  taskId: string;
  fieldId: string;
}

function FormulaField({
  currentCustomFieldColumn,
  taskCustomFields,
  taskCustomFieldsColumns,
  parentId,
  taskId,
  fieldId
}: DropdownFieldWrapperProps) {
  // menu positions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorOne, setAnchorOne] = useState<null | HTMLElement>(null);
  const [anchorTwo, setAnchorTwo] = useState<null | HTMLElement>(null);
  const [anchorAction, setAnchorAction] = useState<null | HTMLElement>(null);
  // open/close state
  const [isOpenSelectOne, setIsOpenSelectOne] = useState(false);
  const [isOpenSelectTwo, setIsOpenSelectTwo] = useState(false);
  const [isOpenSelectAction, setIsOpenSelectAction] = useState(false);
  // main states
  const [selectOne, setSelectOne] = useState<IFormulaData | null>(null);
  const [selectTwo, setSelectTwo] = useState<IFormulaData | null>(null);
  const [selectAction, setSelectAction] = useState<string>('SUM');
  const [currentFields, setCurrentFields] = useState<IField[]>([]);
  const [result, setResult] = useState('-');
  const [isShowAdditionalFormulas, setShowAdditionalFormulas] = useState<boolean>(false);
  const [prevFormula, setPrevFormula] = useState<string>('');

  useEffect(() => {
    const newCurrentFields: IField[] = [];
    taskCustomFieldsColumns?.forEach((field) => {
      if (field.type === 'number') {
        newCurrentFields.push(field);
      }
    });
    setCurrentFields(newCurrentFields);
  }, [taskCustomFieldsColumns]);

  const { mutate: onUpdate } = useUpdateEntityCustomFieldValue(taskId);
  const { mutate: onUpdateColumn } = useUpdateDropdownField(parentId);

  const closeAllDropdowns = () => {
    setAnchorEl(null);
    setAnchorOne(null);
    setAnchorTwo(null);
    setAnchorAction(null);
    setShowAdditionalFormulas(false);
  };

  const handleSave = () => {
    closeAllDropdowns();
    onUpdate({
      taskId,
      value: [{ value: result }],
      fieldId
    });
    onUpdateColumn({
      data: currentCustomFieldColumn,
      newFields: {
        properties: {
          formula: `${selectAction}("${selectOne?.id}", "${selectTwo?.id}")`
        }
      }
    });
  };

  const handleCancel = () => {
    closeAllDropdowns();
  };

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShowAdditionalFormulas(false);
  };

  const renderIcon = () => {
    switch (selectAction) {
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

  const parser = new FormulaParser();

  const resultParser = (value: string, allColumns: IField[], allFields: ICustomField[]) => {
    const selectedItems = findSelectedItemsInFormula(value, allColumns, allFields);
    const action = value.split('(')[0];
    if (selectedItems.length === 2 && BASE_ACTIONS.includes(action)) {
      setShowAdditionalFormulas(false);
      setSelectAction(action);
      setSelectOne(selectedItems[0]);
      setSelectTwo(selectedItems[1]);
    } else {
      setShowAdditionalFormulas(true);
      setSelectOne(null);
      setSelectTwo(null);
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
    if (taskCustomFields?.length && currentCustomFieldColumn.properties?.formula) {
      const value = currentCustomFieldColumn.properties?.formula as string;
      const { strWithCurrentValues, strWithCurrentNames } = resultParser(
        value,
        taskCustomFieldsColumns,
        taskCustomFields
      );
      let res = parser.parse(strWithCurrentValues).result as string;
      if (typeof res === 'object') {
        res = new Date(res).toLocaleDateString('en-US');
      } else if (typeof res === 'number') {
        // fixed result
        res = String(Math.round(+res * 1e2) / 1e2);
      }
      setResult(res);
      setPrevFormula(strWithCurrentNames);
    }
  }, [taskCustomFields, currentCustomFieldColumn, taskCustomFieldsColumns, anchorEl]);

  const handleCalculate = (str: string, result: string) => {
    closeAllDropdowns();
    onUpdate({
      taskId,
      value: [{ value: result }],
      fieldId
    });
    onUpdateColumn({
      data: currentCustomFieldColumn,
      newFields: {
        properties: {
          formula: str
        }
      }
    });
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1 className="text-alsoit-text-lg font-semibold max-w-full break-words cursor-pointer" onClick={handleClick}>
        {result}
      </h1>
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
        <div className="flex items-center justify-start space-x-1 p-2 pl-4">
          <div className="w-full">
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setIsOpenSelectOne(true);
                setAnchorOne(e.currentTarget);
              }}
            >
              <Button active={false}>
                <span className="whitespace-nowrap w-full pl-1">{selectOne ? selectOne.name : 'Select field'}</span>
                <ArrowDownFilled active={false} />
              </Button>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorOne}
              open={isOpenSelectOne}
              onClose={() => setIsOpenSelectOne(false)}
              style={{
                borderRadius: '20px'
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: {
                  borderRadius: '20px'
                }
              }}
            >
              {currentFields.length ? (
                <>
                  {currentFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex px-2 py-1 w-44 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectOne({ id: field.id, name: field.name, value: '' })}
                    >
                      <span className="mx-1 w-5 h-5">
                        <Number />
                      </span>
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
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setIsOpenSelectAction(true);
                setAnchorAction(e.currentTarget);
              }}
            >
              {renderIcon()}
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorAction}
              open={isOpenSelectAction}
              onClose={() => setIsOpenSelectAction(false)}
              style={{
                marginLeft: '-8px',
                borderRadius: '20px'
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: {
                  borderRadius: '20px'
                }
              }}
            >
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="w-30 px-2 py-1 cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setSelectAction(action.id);
                    setIsOpenSelectAction(false);
                  }}
                >
                  {action.icon}
                </div>
              ))}
            </Menu>
          </div>
          <div className="w-full">
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setIsOpenSelectTwo(true);
                setAnchorTwo(e.currentTarget);
              }}
            >
              <Button active={false}>
                <span className="whitespace-nowrap w-full pl-1">{selectTwo ? selectTwo.name : 'Select field'}</span>
                <ArrowDownFilled active={false} />
              </Button>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorTwo}
              open={isOpenSelectTwo}
              onClose={() => setIsOpenSelectTwo(false)}
              style={{
                borderRadius: '20px'
              }}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
                style: {
                  borderRadius: '20px'
                }
              }}
            >
              {currentFields.length ? (
                <>
                  {currentFields.map((field) => (
                    <div
                      key={field.id}
                      className="flex px-2 py-1 w-44 cursor-pointer hover:bg-gray-100"
                      onClick={() => setSelectTwo({ id: field.id, name: field.name, value: '' })}
                    >
                      <span className="mx-1 w-5 h-5">
                        <Number />
                      </span>
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
        <div className="flex gap-1 items-end justify-end p-4">
          <button>
            <div className="flex items-center pr-2">
              <label className="switch" onClick={(event) => event.stopPropagation()}>
                <input
                  className="inputShow"
                  type="checkbox"
                  checked={isShowAdditionalFormulas}
                  onChange={() => setShowAdditionalFormulas(!isShowAdditionalFormulas)}
                />
                <div className={`slider ${isShowAdditionalFormulas ? 'checked' : ''}`} />
              </label>
              <span className="ml-2 text-xs">Advanced Editor</span>
            </div>
          </button>
          <button
            className="p-1 bg-white rounded text-alsoit-danger h-6"
            style={{ width: '79px' }}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button style={{ width: '79px' }} className="bg-alsoit-success text-white rounded h-6" onClick={handleSave}>
            Save
          </button>
        </div>
      </Menu>
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
            variables={currentFields}
            taskCustomFields={taskCustomFields}
            prevFormula={prevFormula}
            handleCalculate={handleCalculate}
            handleClose={() => setShowAdditionalFormulas(false)}
          />
          <></>
        </Menu>
      )}
    </div>
  );
}

export default FormulaField;
