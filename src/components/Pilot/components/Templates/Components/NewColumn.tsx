import React, { useState } from 'react';
import ColumnTypeDropdown from './Dropdown/ColumnTypeDropdown';
import CreateDropdownField from './Dropdown/CreateDropdownField';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../features/task/taskSlice';
import CreateDateField from './Date/CreateDateField';
import CreateTextField from './Texts/CreateTextField';
import Picker from '../../../../../assets/icons/Picker';
import AlsoitMenuDropdown from '../../../../DropDowns';
import ColorPalette from '../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../tasks/ListItem';
import EditDropdown from '../Edit/EditDropdown';
import { cl } from '../../../../../utils';
import FontStyle from './FontStyles/FontStyle';
import CreateNumberField from './Number/CreateNumberField';
import CreateEmailField from './Email/CreateEmailField';
import CreateCurrencyField from './Currency/CreateCurrencyField';

function NewColumn() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeBtn, setActiveBtn] = useState('1');
  const { newCustomPropertyDetails, editCustomProperty } = useAppSelector((state) => state.task);

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
    <>
      {editCustomProperty ? (
        <EditDropdown />
      ) : (
        <div className="w-full">
          <div className="flex gap-2 items-center justify-between my-4 w-full">
            <div className="w-2/4">
              <p className="text-alsoit-text-xi text-alsoit-gray-100">TYPE</p>
              <ColumnTypeDropdown />
            </div>
            <div className="w-2/4">
              <p className="text-alsoit-text-xi text-alsoit-gray-100">TITTLE</p>
              <div
                className="flex items-center w-full rounded-md bg-white gap-1"
                style={{ height: '30px', borderRadius: '6px' }}
              >
                <input
                  onChange={(e) =>
                    dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, name: e.target.value }))
                  }
                  type="text"
                  className={cl(
                    'block border-0 py-1 ring-0  placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi sm:text-sm sm:leading-6',
                    newCustomPropertyDetails.style?.is_bold === '1' ? 'font-extrabold' : 'font-semibold',
                    newCustomPropertyDetails.style?.is_italic === '1' && 'italic',
                    newCustomPropertyDetails.style?.is_underlined === '1' && 'underline underline-offset-2'
                  )}
                  value={newCustomPropertyDetails.name}
                  style={{ color: newCustomPropertyDetails.color ? newCustomPropertyDetails.color : '#242424' }}
                />
                <button onClick={handleClick}>
                  <Picker />
                </button>
                <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
                  <div style={{ width: '276px' }} className="p-4 rounded-2xl">
                    <div className="bg-gray-200  flex justify-between rounded-2xl">
                      <button
                        className={cl(
                          'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                          activeBtn === '1' && 'bg-alsoit-purple-400 text-white'
                        )}
                        style={{ width: '33.33%' }}
                        onClick={() => setActiveBtn('1')}
                      >
                        Font Color
                      </button>
                      <button
                        className={cl(
                          'text-xs font-extrabold p-1 rounded-2xl',
                          activeBtn === '2' && 'bg-alsoit-purple-400 text-white'
                        )}
                        style={{ width: '33.33%' }}
                        onClick={() => setActiveBtn('2')}
                      >
                        Font Style
                      </button>
                      <button
                        className={cl(
                          'text-xs font-extrabold p-1 rounded-2xl text-alsoit-text-lg',
                          activeBtn === '3' && 'bg-alsoit-purple-400 text-white'
                        )}
                        style={{ width: '33.33%' }}
                        onClick={() => setActiveBtn('3')}
                      >
                        Font Size
                      </button>
                    </div>
                    {activeBtn === '1' && <ColorPalette handleClick={handleColor} />}
                    {activeBtn === '2' && <FontStyle />}
                  </div>
                </AlsoitMenuDropdown>
              </div>
            </div>
          </div>
          {newCustomPropertyDetails.type.toLowerCase() === 'single label' && <CreateDropdownField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'multi label' && <CreateDropdownField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'tags' && <CreateDropdownField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'date' && <CreateDateField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'short text' && <CreateTextField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'long text' && <CreateTextField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'number' && <CreateNumberField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'email' && <CreateEmailField />}
          {newCustomPropertyDetails.type.toLowerCase() === 'currency' && <CreateCurrencyField />}
        </div>
      )}
    </>
  );
}

export default NewColumn;
