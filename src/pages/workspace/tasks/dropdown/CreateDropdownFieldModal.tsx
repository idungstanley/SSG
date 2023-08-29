import { Transition } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/24/outline';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Fragment, useRef, useState } from 'react';

// import { useParams } from 'react-router-dom';
import { useCreateDropdownField } from '../../../../features/list/listService';
import { EntityType } from '../../../../utils/EntityTypes/EntityType';
import { setIsTasksUpdated } from '../../../../features/task/taskSlice';
import { useAppDispatch } from '../../../../app/hooks';

interface CreateDropdownFieldModalProps {
  show: boolean;
  setShow: (i: boolean) => void;
  listId: string;
}

export default function CreateDropdownFieldModal({ show, setShow, listId }: CreateDropdownFieldModalProps) {
  const dispatch = useAppDispatch();

  const [formInputs, setFormInputs] = useState<{ id: number; value: string }[]>([{ id: 1, value: '' }]);

  const fieldNameRef = useRef<HTMLInputElement>(null);
  // const { listId, hubId, walletId } = useParams();

  const entity = {
    type: EntityType.list, // listId ? 'list' : hubId ? 'hub' : 'wallet',
    id: listId //listId ?? walletId ?? hubId
  };

  const { mutate: onCreate } = useCreateDropdownField();

  const handleAddOption = () =>
    setFormInputs((prevInputs) => [...prevInputs, { id: (prevInputs.at(-1)?.id || 1) + 1, value: '' }]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fieldNameRef.current) {
      const name = fieldNameRef.current.value;
      const options = formInputs.map((i) => {
        return { name: i.value.trim(), color: null };
      });
      dispatch(setIsTasksUpdated(false));
      onCreate({
        name,
        options,
        id: entity.id,
        type: entity.type,
        customType: 'anything'
      });

      setFormInputs([{ id: 1, value: '' }]);
      setShow(false);
    }
  };

  const handleClose = () => setShow(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { value } = e.target;

    setFormInputs((prevInputs) => {
      const newInputs = [...prevInputs];

      return newInputs.map((i) => {
        if (i.id === id) {
          i.value = value;
        }

        return i;
      });
    });
  };

  const handleRemoveOption = (id: number) => setFormInputs((prev) => prev.filter((i) => i.id !== id));

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
      show={show}
    >
      <form
        onSubmit={handleSubmit}
        className="absolute p-4 w-96 top-5 right-0 z-10 py-1 mt-2 origin-top-right bg-white rounded-sm shadow-lg focus:outline-none flex flex-col gap-4"
      >
        <p className="uppercase font-thin text-xs text-gray-400">Add column</p>

        {/* dropdown name */}
        <div>
          <label htmlFor="field-name" className="mb-1 block font-medium text-gray-400 uppercase text-xs">
            field name
          </label>
          <input
            min={1}
            required
            ref={fieldNameRef}
            type="text"
            name="field-name"
            id="field-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder-gray-300 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter name..."
          />
        </div>

        {/* dropdown options */}
        <div className="space-y-3">
          {formInputs.map((i, index) => (
            <div className="relative" key={i.id}>
              <label
                htmlFor={`input_${i.id}`}
                className="block text-xs font-medium text-gray-400 uppercase mb-1"
              >{`OPTION ${index + 1}`}</label>

              <input
                min={1}
                required
                type="text"
                placeholder={`OPTION ${index + 1}`}
                name={`input_${index + 1}`}
                value={i.value}
                onChange={(event) => handleInputChange(event, i.id)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder-gray-300 ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button onClick={() => handleRemoveOption(i.id)} className="absolute top-7 right-1">
                <TrashIcon className="w-5 h-5 text-gray-300 cursor-pointer hover:text-primary-300 transition" />
              </button>
            </div>
          ))}
        </div>

        {/* add new option */}
        <button onClick={handleAddOption} className="text-primary-400 flex items-center gap-2">
          <PlusCircleIcon className="w-7 h-7" />
          <span>Add new option</span>
        </button>

        {/* bottom actions */}
        <div className="w-full flex justify-end gap-3">
          <button onClick={handleClose} className="capitalize bg-gray-400 py-3 px-6 text-white w-fit">
            cancel
          </button>
          <button type="submit" className="capitalize bg-primary-500 py-3 px-6 text-white w-fit">
            add column
          </button>
        </div>
      </form>
    </Transition>
  );
}
