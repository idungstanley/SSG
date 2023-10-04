import React, { useState } from 'react';
import { useAppSelector } from '../../../../../app/hooks';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import Picker from '../../../../../assets/icons/Picker';
import AlsoitMenuDropdown from '../../../../DropDowns';
import ColorPalette from '../../../../ColorPalette/component/ColorPalette';
import { ListColourProps } from '../../../../tasks/ListItem';
import { UseEditCustomFieldService } from '../../../../../features/task/taskService';
import { useMutation } from '@tanstack/react-query';
import { cl } from '../../../../../utils';

function EditDropdown() {
  const { editCustomProperty } = useAppSelector((state) => state.task);
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

  return (
    <div className="p-4 my-2 bg-alsoit-gray-50 rounded-2xl">
      <div className="w-full">
        <p className="my-2 font-semibold text-alsoit-text-xi text-alsoit-gray-100">Tittle</p>
        <div
          className="flex items-center w-full gap-1 bg-white rounded-md"
          style={{ height: '30px', borderRadius: '6px' }}
        >
          <input
            type="text"
            className={cl(
              'block border-0 py-1 ring-0 placeholder-gray-300 focus:ring-0 focus:ring-inset text-alsoit-text-xi sm:text-sm sm:leading-6 w-full'
            )}
            style={{ color: propertyColor as string }}
            value={propertyTitle}
            onChange={handleTitleChange}
          />
          <button className="mx-2" onClick={(e) => setOpen(e.currentTarget)}>
            <Picker />
          </button>
          <AlsoitMenuDropdown handleClose={() => setOpen(null)} anchorEl={open}>
            <ColorPalette handleClick={handleNameColor} />
          </AlsoitMenuDropdown>
        </div>
      </div>
      <div>
        <h2 className="mt-4 font-semibold text-alsoit-text-xi">DEFINE PROPERTY OPTION</h2>
      </div>
      {formInputs?.map((i, index) => (
        <div className="relative w-full" key={i.id}>
          <div className="flex items-center justify-between w-full my-2 bg-white rounded-md">
            {i.color && (
              <span
                className="w-2"
                style={{ backgroundColor: i.color, height: '30px', borderRadius: '6px 0 0 6px' }}
              ></span>
            )}
            <input
              min={1}
              required
              type="text"
              placeholder="Please input property option"
              name={`input_${index + 1}`}
              value={i.name}
              onChange={(event) => handleInputChange(event, i.id)}
              className="block w-2/3 py-1 placeholder-gray-300 border-0 shadow-sm ring-0 ring-inset focus:ring-0 focus:ring-inset focus:ring-indigo-600 text-alsoit-gray-300 text-alsoit-text-xi sm:text-sm sm:leading-6"
            />
            <div className="flex items-center gap-1">
              <button
                className="font-semibold cursor-pointer text-alsoit-text-xi text-alsoit-gray-300 hover:text-alsoit-purple-300"
                onClick={(e) => handleClick(e, i.id)}
              >
                Change Option Color
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
      <button
        className="flex items-center gap-2 p-2 text-white rounded bg-alsoit-purple-300"
        onClick={handleAddNewOption}
      >
        <PlusCircleIcon className="w-5 h-5" />
        <span>Add new option</span>
      </button>

      <div className="flex justify-between w-full mt-4">
        <button
          style={{ width: '79px', height: '24px' }}
          className="bg-white rounded text-alsoit-text-md text-alsoit-danger"
        >
          Delete Field
        </button>
        <div className="flex gap-2">
          <button
            style={{ width: '79px', height: '24px' }}
            className="bg-white rounded text-alsoit-text-md text-alsoit-danger"
          >
            Cancel
          </button>
          <button
            style={{ width: '79px', height: '24px' }}
            className="bg-white rounded text-alsoit-text-md text-alsoit-gray-300"
          >
            Replace
          </button>
          <button
            style={{ width: '79px', height: '24px' }}
            className="text-white rounded bg-alsoit-success text-alsoit-text-md"
            onClick={handleEditCustomField}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditDropdown;
