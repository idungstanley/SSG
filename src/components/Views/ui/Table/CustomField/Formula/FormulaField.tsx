import React, { useState, useEffect } from 'react';
import { Menu } from '@mui/material';
import Button from '../../../../../Buttons/Button';
import ArrowDownFilled from '../../../../../../assets/icons/ArrowDownFilled';
import { BsFillDashSquareFill, BsFillSlashSquareFill, BsFillXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { Parser as FormulaParser, SUPPORTED_FORMULAS } from 'hot-formula-parser';
import { IField } from '../../../../../../features/list/list.interfaces';
import Number from '../../../../../../assets/branding/Number';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import { useUpdateDropdownField, useUpdateEntityCustomFieldValue } from '../../../../../../features/list/listService';

const actions = [
  { id: 'SUM', icon: <BsPlusSquareFill color="#6bc950" size={25} /> },
  { id: 'MINUS', icon: <BsFillDashSquareFill color="#fd7171" size={25} /> },
  { id: 'MULTIPLY', icon: <BsFillXSquareFill color="#ffc800" size={25} /> },
  { id: 'DIVIDE', icon: <BsFillSlashSquareFill color="#49ccf9" size={25} /> }
];

interface DropdownFieldWrapperProps {
  currentCustomField: ICustomField;
  currentCustomFieldColumn: IField;
  taskCustomFields: ICustomField[];
  taskCustomFieldsColumns: IField[];
  parentId: string;
  taskId: string;
  fieldId: string;
}

function FormulaField({
  currentCustomField,
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
  const [selectOne, setSelectOne] = useState<IField | null>(null);
  const [selectTwo, setSelectTwo] = useState<IField | null>(null);
  const [selectAction, setSelectAction] = useState<string>('SUM');
  const [currentFields, setCurrentFields] = useState<IField[]>([]);
  const [result, setResult] = useState('-');

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
          formula: `${selectAction} ${selectOne?.id} ${selectTwo?.id}`
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
  // console.log('TEST', parser.parse('(1 + 5 + (5 * 10)) / 10'));
  // console.log('SUPPORTED_FORMULAS', SUPPORTED_FORMULAS);

  const resultParser = (value: string, allFields: ICustomField[]) => {
    const arr = value.split(' ');
    const action = arr[0];
    setSelectAction(arr[0]);
    const one = allFields?.find((item) => item.id === arr[1])?.values[0].value;
    setSelectOne(taskCustomFieldsColumns.find((item) => item.id === arr[1]) || null);
    const two = allFields?.find((item) => item.id === arr[2])?.values[0].value;
    setSelectTwo(taskCustomFieldsColumns.find((item) => item.id === arr[2]) || null);
    return `${action}(${one}, ${two})`;
  };

  useEffect(() => {
    if (taskCustomFields?.length && currentCustomFieldColumn.properties?.formula) {
      const value = currentCustomFieldColumn.properties?.formula as string;
      const res = parser.parse(resultParser(value, taskCustomFields)).result as string;
      // fixed result
      setResult(String(Math.round(+res * 1e2) / 1e2));
    }
  }, [taskCustomFields, currentCustomFieldColumn]);

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
          marginLeft: '-110px',
          borderRadius: '20px'
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          style: {
            borderRadius: '20px'
          }
        }}
      >
        {/* SELECT */}
        <div className="flex items-center justify-start space-x-1 p-2 pl-4">
          <div>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setIsOpenSelectOne(true);
                setAnchorOne(e.currentTarget);
              }}
            >
              <Button active={false}>
                <span className="whitespace-nowrap">{selectOne ? selectOne.name : 'Select field'}</span>
                <ArrowDownFilled active={false} />
              </Button>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorOne}
              open={isOpenSelectOne}
              onClose={() => setIsOpenSelectOne(false)}
              style={{
                marginLeft: '-50px',
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
                      onClick={() => setSelectOne(field)}
                    >
                      <span className="mx-1 w-5 h-5">
                        <Number />
                      </span>
                      {field.name}
                    </div>
                  ))}
                </>
              ) : null}
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
          <div>
            <div
              onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                setIsOpenSelectTwo(true);
                setAnchorTwo(e.currentTarget);
              }}
            >
              <Button active={false}>
                <span className="whitespace-nowrap">{selectTwo ? selectTwo.name : 'Select field'}</span>
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
                      onClick={() => setSelectTwo(field)}
                    >
                      <span className="mx-1 w-5 h-5">
                        <Number />
                      </span>
                      {field.name}
                    </div>
                  ))}
                </>
              ) : null}
            </Menu>
          </div>
        </div>
        <div className="flex gap-1 items-end justify-end p-4">
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
    </div>
  );
}

export default FormulaField;
