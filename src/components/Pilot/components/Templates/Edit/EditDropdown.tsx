import React, { useEffect, useState } from 'react';
// import { useAppSelector } from '../../../../../app/hooks';
import { TrashIcon } from '@heroicons/react/24/outline';
import Picker from '../../../../../assets/icons/Picker';
import AlsoitMenuDropdown from '../../../../DropDowns';
import ColorPalette from '../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../tasks/ListItem';
import { UseEditCustomFieldService } from '../../../../../features/task/taskService';
import { useMutation } from '@tanstack/react-query';
import { IField } from '../../../../../features/list/list.interfaces';
import ColumnTypeDropdown from '../Components/ColumnTypeDropdown';
import Input from '../../../../input/Input';
import PlusIcon from '../../../../../assets/icons/PlusIcon';
import PermissionIcon from '../../../../../assets/icons/PermissionIcon';
import InformationsolidIcon from '../../../../../assets/icons/InformationsolidIcon';
import CollectionsIcon from '../../../../../assets/icons/chatIcons/CollectionsIcon';
import ClosePalette from '../../../../../assets/icons/ClosePalette';
import SavePalette from '../../../../../assets/icons/SavePalette';
import ToolTip from '../../../../Tooltip/Tooltip';
import { CiCircleInfo } from 'react-icons/ci';
import { columnTypesProps } from '../Components/CustomPropertyList';

function EditDropdown({
  editCustomProperty,
  mactchingData
}: {
  editCustomProperty: IField;
  mactchingData?: columnTypesProps;
}) {
  // const { editCustomProperty } = useAppSelector((state) => state.task);

  const [formInputs, setFormInputs] = useState(editCustomProperty?.options ? [...editCustomProperty.options] : []);
  const [propertyTitle, setPropertyTitle] = useState(editCustomProperty?.name || '');
  const [propertyColor, setPropertyColor] = useState(editCustomProperty?.color || null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<null | HTMLElement>(null);
  const [itemId, setItemId] = useState<string>();

  const editCustomField = useMutation(UseEditCustomFieldService);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id?: string) => {
    setItemId(id);
    setAnchorEl(event.currentTarget);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;

    setFormInputs((prevInputs) => {
      return prevInputs?.map((i) => {
        if (i.id === id) {
          return { ...i, name: value };
        }
        return i;
      });
    });
  };

  const handleAddNewOption = () => {
    setFormInputs((prevInputs) => [
      ...prevInputs,
      {
        id: formInputs.length.toString(),
        name: '',
        color: ''
      }
    ]);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyTitle(e.target.value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleColor = (color: string | ListColourProps | null) => {
    const colorValue = typeof color === 'string' ? color : '';
    setFormInputs((prevInputs) => {
      return prevInputs?.map((i) => {
        if (i.id === itemId) {
          return { ...i, color: colorValue };
        }
        return i;
      });
    });
  };

  const handleEditCustomField = () => {
    const options = formInputs.map((i) => {
      return { name: (i.name as string).trim(), color: i.color, id: i.id.length > 10 ? i.id : null };
    });
    editCustomField.mutateAsync({
      id: editCustomProperty?.id,
      name: propertyTitle,
      options,
      color: propertyColor
    });
  };

  const handleNameColor = (color: string | ListColourProps | null) => {
    setPropertyColor(color as string);
  };

  useEffect(() => {
    setFormInputs(editCustomProperty?.options ? [...editCustomProperty.options] : []);
    setPropertyTitle(editCustomProperty?.name || '');
    setPropertyColor(editCustomProperty?.color || '');
  }, [editCustomProperty]);

  return (
    <div className="p-2">
      <div className="flex items-center justify-between w-full gap-2 my-2 mb-3">
        <div className="w-2/4">
          <p className="mb-1 ml-1 text-alsoit-text-xi text-alsoit-gray-100">TYPE</p>
          <ColumnTypeDropdown mactchingData={mactchingData} />
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
                value={propertyTitle}
                type="text"
                onChange={handleTitleChange}
                classes="block border-0 ring-0 placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi sm:text-sm sm:leading-6 w-full"
                styles={{ color: propertyColor as string }}
              />
              <button
                className="absolute flex items-center cursor-pointer right-7 top-7"
                onClick={(e) => setOpen(e.currentTarget)}
              >
                <Picker />
              </button>
              <button
                className="absolute flex items-center cursor-pointer right-2 top-7"
                onClick={(e) => setOpen(e.currentTarget)}
              >
                <CiCircleInfo />
              </button>
            </div>
            <AlsoitMenuDropdown handleClose={() => setOpen(null)} anchorEl={open}>
              <ColorPalette handleClick={handleNameColor} />
            </AlsoitMenuDropdown>
          </div>
        </div>
      </div>
      {formInputs.length > 0 ? (
        <div>
          <div>
            <h2 className="mt-4 mb-1 font-semibold text-alsoit-text-xi">LABEL OPTION</h2>
          </div>
          <div className="space-y-2">
            {formInputs?.map((i, index) => (
              <div className="relative w-full" key={i.id}>
                <div className="flex items-center justify-between w-full h-8 bg-white rounded-md">
                  {i.color && (
                    <span
                      className="absolute top-0 bottom-0"
                      style={{ backgroundColor: i.color, height: '30px', borderRadius: '6px 0 0 6px', width: '5px' }}
                    ></span>
                  )}
                  <input
                    min={1}
                    required
                    type="text"
                    placeholder="Please input text option"
                    name={`input_${index + 1}`}
                    value={i.name}
                    onChange={(event) => handleInputChange(event, i.id)}
                    className="block w-2/3 py-1 placeholder-gray-300 border-0 rounded-md ring-0 ring-inset focus:ring-0 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300 text-alsoit-text-xi sm:text-sm sm:leading-6"
                  />
                  <div className="flex items-center gap-1 mr-2">
                    <button className="flex items-center cursor-pointer" onClick={(e) => handleClick(e, i.id)}>
                      <Picker />
                    </button>
                    <button>
                      <TrashIcon className="w-4 h-4 text-gray-300 transition cursor-pointer hover:text-primary-300" />
                    </button>
                  </div>
                </div>
                <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
                  <ColorPalette handleClick={handleColor} />
                </AlsoitMenuDropdown>
              </div>
            ))}
          </div>
          <button
            onClick={handleAddNewOption}
            className="flex items-center gap-2 p-1 my-2 rounded bg-alsoit-gray-50 text-alsoit-gray-300"
          >
            <PlusIcon className="w-3 h-3" />
            <span>Add option</span>
          </button>
        </div>
      ) : null}
      {}

      <div className="my-2 mt-2 text-xs">CLICK HERE TO HOST IN TEMPLATE</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 p-1 rounded bg-alsoit-gray-50 w-fit">
            <PermissionIcon />
            <div className="text-black">Permissions</div>
            <InformationsolidIcon />
          </div>
          <div
            className="flex items-center justify-center bg-white rounded-sm"
            style={{
              minWidth: '16px',
              height: '16px',
              fontSize: '8px',
              padding: '4px 2px',
              color: 'orange'
            }}
          >
            <span className="pr-1">
              <CollectionsIcon color="orange" />
            </span>
            Collection
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-1">
          <ToolTip title="Cancel">
            <span onClick={() => ({})} className="cursor-pointer text-[#FF3738] hover:text-white">
              <ClosePalette fill="white" />
            </span>
          </ToolTip>
          <ToolTip title="Add Property">
            <span className="cursor-pointer" onClick={handleEditCustomField}>
              <SavePalette />
            </span>
          </ToolTip>
        </div>
      </div>
    </div>
  );
}

export default EditDropdown;
