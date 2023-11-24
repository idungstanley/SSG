import React, { useState, useEffect } from 'react';
import { Menu } from '@mui/material';
import Button from '../../../../../Buttons/Button';
import ArrowDownFilled from '../../../../../../assets/icons/ArrowDownFilled';
import { BsFillDashSquareFill, BsFillSlashSquareFill, BsFillXSquareFill, BsPlusSquareFill } from 'react-icons/bs';
import { IField } from '../../../../../../features/list/list.interfaces';
import Number from '../../../../../../assets/branding/Number';
import { TbMathFunction } from 'react-icons/tb';
import { IAdditionalFormulaFields } from './SimpleFormulasField';
import TrashIcon from '../../../../../../assets/icons/TrashIcon';

const actions = [
  { id: 'SUM', icon: <BsPlusSquareFill color="#6bc950" size={25} /> },
  { id: 'MINUS', icon: <BsFillDashSquareFill color="#fd7171" size={25} /> },
  { id: 'MULTIPLY', icon: <BsFillXSquareFill color="#ffc800" size={25} /> },
  { id: 'DIVIDE', icon: <BsFillSlashSquareFill color="#49ccf9" size={25} /> }
];

interface AdditionalFormulasFieldProps {
  field: IAdditionalFormulaFields;
  currentFieldColumns: IField[];
  index: number;
  returnNewData: (data: IAdditionalFormulaFields | null, index: number) => void;
}

function NewFormulaField({ field, currentFieldColumns, index, returnNewData }: AdditionalFormulasFieldProps) {
  // menu positions
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorAction, setAnchorAction] = useState<null | HTMLElement>(null);
  // main states
  const [selectedFieldId, setSelectedFieldId] = useState<string>(field.id);
  const [selectedAction, setSelectedAction] = useState<string>(field.action);

  useEffect(() => {
    setSelectedFieldId(field.id);
    setSelectedAction(field.action);
  }, [field]);

  const renderIcon = (actionId: string) => {
    switch (actionId) {
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

  const renderName = (fieldId: string) => {
    let name = 'Select field';
    currentFieldColumns.forEach((item) => {
      if (item.id === fieldId) {
        name = item.name;
      }
    });
    return name;
  };

  const renderItemIcon = (field: IField) => {
    switch (field.type) {
      case 'number':
        return <Number />;
      case 'formula':
        return <TbMathFunction />;
    }
  };

  useEffect(() => {
    if (selectedFieldId) {
      returnNewData({ action: selectedAction, id: selectedFieldId }, index);
    }
  }, [selectedFieldId, selectedAction]);

  return (
    <>
      <div className="flex items-center justify-start space-x-1 p-2 pl-4">
        <div>
          <div
            style={{ marginRight: '10px' }}
            onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorAction(e.currentTarget)}
          >
            {renderIcon(selectedAction)}
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
          <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
            <Button active={!!field.id}>
              <span className="whitespace-nowrap w-full pl-1">{renderName(selectedFieldId)}</span>
              <ArrowDownFilled active={!!selectedFieldId} />
            </Button>
          </div>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            <div key="fieldId">
              {currentFieldColumns.length ? (
                <>
                  {currentFieldColumns.map((field) => (
                    <div
                      key={field.id}
                      className="flex px-2 py-1 w-44 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setSelectedFieldId(field.id);
                        setAnchorEl(null);
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
            </div>
          </Menu>
        </div>
        <div onClick={() => returnNewData(null, index)}>
          <TrashIcon />
        </div>
      </div>
    </>
  );
}

export default NewFormulaField;
