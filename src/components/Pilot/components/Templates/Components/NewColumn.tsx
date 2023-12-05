import React, { useMemo, useState } from 'react';
import ColumnTypeDropdown from './ColumnTypeDropdown';
import CreateDropdownField from './Dropdown/CreateDropdownField';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setNewCustomPropertyDetails } from '../../../../../features/task/taskSlice';
import CreateDateField from './Date/CreateDateField';
import CreateTextField from './Texts/CreateTextField';
import Picker from '../../../../../assets/icons/Picker';
import AlsoitMenuDropdown from '../../../../DropDowns';
import { ListColourProps } from '../../../../tasks/ListItem';
// import EditDropdown from '../Edit/EditDropdown';
import { cl } from '../../../../../utils';
import FontStyle from './FontStyles/FontStyle';
import CreateNumberField from './Number/CreateNumberField';
import CreateEmailField from './Email/CreateEmailField';
import CreateWebsite from './Websites/CreateWebsite';
import CreateCurrencyField from './Currency/CreateCurrencyField';
import CreatePhone from './Phone/CreatePhone';
import CreateCheckbox from './Checkbox/CreateCheckbox';
import CreateRatings from './Rating/CreateRatings';
import CreateManualProgress from './Progress/CreateManualProgress';
import CreateAutoProgress from './Progress/CreateAutoProgress';
import CreateTime from './Time/CreateTime';
import CreateFormulaField from './Formula/CreateFormulaField';
import CreateFiles from './Files/CreateFiles';
import CreatePeople from './People/CreatePeople';
import CreateLocationField from './Location/CreateLocation';
import ColorPalette from '../../../../ColorPalette/component/ColorPalette';
import CreateTagsField from './Dropdown/CreateTags';
import Input from '../../../../input/Input';
import { CiCircleInfo } from 'react-icons/ci';
import { setPaletteDropDown } from '../../../../../features/account/accountSlice';
import PaletteManager from '../../../../ColorPalette';
import { useAbsolute } from '../../../../../hooks/useAbsolute';

function NewColumn() {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeBtn, setActiveBtn] = useState('1');
  const { newCustomPropertyDetails, updateCords } = useAppSelector((state) => state.task);
  const { paletteDropdown } = useAppSelector((state) => state.account);

  const { show, paletteId } = paletteDropdown;
  const { cords, relativeRef } = useAbsolute(updateCords, 266);

  const handleColor = (color?: string | ListColourProps | null) => {
    dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, color: color as string }));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const properties = [
    {
      type: 'dropdown',
      name: 'single label',
      element: <CreateDropdownField />
    },
    { type: 'labels', name: 'multi label', element: <CreateDropdownField /> },
    { type: 'tags', name: 'tags', element: <CreateTagsField /> },
    { type: 'date', name: 'date', element: <CreateDateField /> },
    { type: 'Short Text', name: 'short text', element: <CreateTextField /> },
    { type: 'Text', name: 'long text', element: <CreateTextField /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'number', element: <CreateNumberField /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'email', element: <CreateEmailField /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'website', element: <CreateWebsite /> },
    { type: 'money', name: 'currency', element: <CreateCurrencyField /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'phone', element: <CreatePhone /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'checkbox', element: <CreateCheckbox /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'rating', element: <CreateRatings /> },
    { type: 'progress_auto', name: 'auto', element: <CreateAutoProgress /> },
    { type: 'progress_manual', name: 'manual', element: <CreateManualProgress /> },
    { type: 'time', name: 'time', element: <CreateTime /> },
    { type: newCustomPropertyDetails.type.toLowerCase(), name: 'formula', element: <CreateFormulaField /> },
    { type: 'files', name: 'attachments', element: <CreateFiles /> },
    { type: 'people', name: 'people', element: <CreatePeople /> },
    { type: 'location', name: 'location', element: <CreateLocationField /> }
  ];

  const selectedFields = useMemo(
    () => properties.find((field) => field.name.toLowerCase() === newCustomPropertyDetails.type.toLowerCase()),
    [newCustomPropertyDetails, properties]
  );

  return (
    <>
      {/* {editCustomProperty ? (
        <EditDropdown />
      ) : ( */}
      <div className="w-full">
        <div className="flex items-center justify-between w-full gap-2 my-2 mb-3">
          <div className="w-2/4">
            <p className="mb-1 ml-1 text-alsoit-text-xi text-alsoit-gray-100">TYPE</p>
            <ColumnTypeDropdown />
          </div>
          <div className="w-2/4">
            <div className="flex items-center w-full rounded-md" style={{ borderRadius: '6px' }}>
              <div className="relative flex grow">
                <Input
                  labelClasses="text-alsoit-text-xi text-alsoit-gray-100 ml-1"
                  placeholder="Name Property"
                  height="h-8"
                  label="TITLE"
                  name="name"
                  value={newCustomPropertyDetails.name}
                  type="text"
                  onChange={(e) =>
                    dispatch(setNewCustomPropertyDetails({ ...newCustomPropertyDetails, name: e.target.value }))
                  }
                  classes={cl(
                    'block border-0 py-1 ring-0  placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi text-alsoit-gray-300 sm:text-sm sm:leading-6 w-10/12',
                    newCustomPropertyDetails.style?.is_bold === '1' ? 'font-extrabold' : 'font-semibold',
                    newCustomPropertyDetails.style?.is_italic === '1' && 'italic',
                    newCustomPropertyDetails.style?.is_underlined === '1' && 'underline underline-offset-2'
                  )}
                  styles={{ color: newCustomPropertyDetails.color ? newCustomPropertyDetails.color : '#242424' }}
                />
                <button
                  className="absolute flex items-center cursor-pointer right-7 top-7"
                  onClick={() => dispatch(setPaletteDropDown({ show: true, paletteId: 'property' }))}
                >
                  <Picker />
                </button>
                <button className="absolute flex items-center cursor-pointer right-2 top-7" onClick={handleClick}>
                  <CiCircleInfo />
                </button>
              </div>
              <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
                <div style={{ width: '276px' }} className="w-full p-4 rounded-2xl">
                  <div className="flex justify-between bg-gray-200 rounded-2xl">
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
                  {activeBtn === '1' && (
                    <ColorPalette
                      handleClick={handleColor}
                      activeColor={newCustomPropertyDetails.color ? newCustomPropertyDetails.color : undefined}
                    />
                  )}

                  {activeBtn === '2' && <FontStyle />}
                </div>
              </AlsoitMenuDropdown>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full" ref={relativeRef}>
          {paletteId === 'property' && show && (
            <PaletteManager
              cords={{ top: cords.top - 30, left: cords.left + 130 }}
              setPaletteColor={handleColor}
              title="Property"
            />
          )}
        </div>
        {selectedFields && selectedFields.element}
      </div>
      {/* )} */}
    </>
  );
}

export default NewColumn;
