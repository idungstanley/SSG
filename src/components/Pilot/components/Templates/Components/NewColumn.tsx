import React from 'react';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import CreateDropdownField from './CreateDropdownField';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../features/task/taskSlice';
import CreateDateField from './CreateDateField';
import CreateTextField from './CreateTextField';
import Picker from '../../../../../assets/icons/Picker';
import AlsoitMenuDropdown from '../../../../DropDowns';
import ColorPalette from '../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../tasks/ListItem';

function NewColumn() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { newCustomPropertyDetails } = useAppSelector((state) => state.task);

  const handleColor = (color: string | ListColourProps) => {
    dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, color: color as string }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="w-full">
      <div className="flex gap-2 items-center justify-between my-4 w-full">
        <div className="w-2/4">
          <p className="text-alsoit-text-xi text-alsoit-gray-100">PROPERTY TYPE</p>
          <ColumnTypeDropdown />
        </div>
        <div className="w-2/4">
          <p className="text-alsoit-text-xi text-alsoit-gray-100">PROPERTY NAME</p>
          <div
            className="flex items-center w-full rounded-md bg-white gap-1"
            style={{ height: '30px', borderRadius: '6px' }}
          >
            <input
              onChange={(e) =>
                dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, name: e.target.value }))
              }
              type="text"
              className="block border-0 py-1 ring-0  placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi sm:text-sm sm:leading-6"
              value={newCustomPropertyDetails.name}
              style={{ color: newCustomPropertyDetails.color ? newCustomPropertyDetails.color : '#242424' }}
            />
            <button onClick={handleClick}>
              <Picker />
            </button>
            <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
              <ColorPalette handleClick={handleColor} />
            </AlsoitMenuDropdown>
          </div>
        </div>
      </div>
      {newCustomPropertyDetails.type.toLowerCase() === 'single label' && <CreateDropdownField />}
      {newCustomPropertyDetails.type.toLowerCase() === 'multi label' && <CreateDropdownField />}
      {newCustomPropertyDetails.type.toLowerCase() === 'date' && <CreateDateField />}
      {newCustomPropertyDetails.type.toLowerCase() === 'short text' && <CreateTextField />}
      {newCustomPropertyDetails.type.toLowerCase() === 'long text' && <CreateTextField />}
    </div>
  );
}

export default NewColumn;
