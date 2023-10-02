import React, { useState, useEffect } from 'react';
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

const actions = [
  { id: 'SUM', icon: <BsPlusSquareFill color="#6bc950" size={25} /> },
  { id: 'MINUS', icon: <BsFillDashSquareFill color="#fd7171" size={25} /> },
  { id: 'MULTIPLY', icon: <BsFillXSquareFill color="#ffc800" size={25} /> },
  { id: 'DIVIDE', icon: <BsFillSlashSquareFill color="#49ccf9" size={25} /> }
];

interface AdditionalFormulasFieldProps {
  taskCustomFieldsColumns: IField[];
  taskCustomFields: ICustomField[];
  currentFields: IField[];
  prevFormula: string;
  handleSave: (res: string, formula: string) => void;
  handleClose: () => void;
  showAdditionalFormulas: () => void;
}

function SimpleFormulasField({
  taskCustomFieldsColumns,
  taskCustomFields,
  currentFields,
  prevFormula,
  showAdditionalFormulas,
  handleSave,
  handleClose
}: AdditionalFormulasFieldProps) {
  // menu positions
  const [anchorOne, setAnchorOne] = useState<null | HTMLElement>(null);
  const [anchorTwo, setAnchorTwo] = useState<null | HTMLElement>(null);
  const [anchorAction, setAnchorAction] = useState<null | HTMLElement>(null);
  // open/close state
  const [isOpenSelectOne, setIsOpenSelectOne] = useState(false);
  const [isOpenSelectTwo, setIsOpenSelectTwo] = useState(false);
  const [isOpenSelectAction, setIsOpenSelectAction] = useState(false);
  // main states
  const [selectedItemOne, setSelectedItemOne] = useState<IFormulaData | null>(null);
  const [selectedItemTwo, setSelectedItemTwo] = useState<IFormulaData | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('SUM');
  const [result, setResult] = useState('-');

  const onSave = () => {
    handleSave(result, `${selectedAction}("${selectedItemOne?.id}", "${selectedItemTwo?.id}")`);
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
    const action = value.split('(')[0];
    if (selectedItems.length === 2) {
      setSelectedAction(action);
      setSelectedItemOne(selectedItems[0]);
      setSelectedItemTwo(selectedItems[1]);
    } else {
      setSelectedItemOne(null);
      setSelectedItemTwo(null);
      showAdditionalFormulas();
    }
    let strWithCurrentValues = value;
    let strWithCurrentIds = value;
    selectedItems.forEach((item) => {
      strWithCurrentValues = strWithCurrentValues.replaceAll(`field("${item.name}")`, item.value);
      strWithCurrentIds = strWithCurrentIds.replaceAll(`field("${item.name}")`, item.id);
    });
    return { strWithCurrentValues, strWithCurrentIds };
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
      let strWithCurrentValues = value;
      selectedItems.forEach((item) => {
        strWithCurrentValues = strWithCurrentValues.replaceAll(`"${item.id}"`, item.value);
      });
      const res = parser.parse(strWithCurrentValues).result as string;
      setResult(res);
    }
  }, [selectedItemOne, selectedItemTwo, selectedAction]);

  return (
    <>
      <div className="flex items-center justify-start space-x-1 p-2 pl-4">
        <div className="w-full">
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              setIsOpenSelectOne(true);
              setAnchorOne(e.currentTarget);
            }}
          >
            <Button active={!!selectedItemOne}>
              <span className="whitespace-nowrap w-full pl-1">
                {selectedItemOne ? selectedItemOne.name : 'Select field'}
              </span>
              <ArrowDownFilled active={!!selectedItemOne} />
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
                    onClick={() => setSelectedItemOne({ id: field.id, name: field.name, value: '' })}
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
                  setSelectedAction(action.id);
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
            <Button active={!!selectedItemTwo}>
              <span className="whitespace-nowrap w-full pl-1">
                {selectedItemTwo ? selectedItemTwo.name : 'Select field'}
              </span>
              <ArrowDownFilled active={!!selectedItemTwo} />
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
                    onClick={() => setSelectedItemTwo({ id: field.id, name: field.name, value: '' })}
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
              <input className="inputShow" type="checkbox" checked={false} onChange={showAdditionalFormulas} />
              <div className="slider" />
            </label>
            <span className="ml-2 text-xs">Advanced Editor</span>
          </div>
        </button>
        <button className="p-1 bg-white rounded text-alsoit-danger h-6" style={{ width: '79px' }} onClick={handleClose}>
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
    </>
  );
}

export default SimpleFormulasField;
