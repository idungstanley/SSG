import React, { useState } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FieldType } from '../../../../features/directory/directory.interfaces';
import { useUpdateOrAddTemplateField } from '../../../../features/directory/directoryActionService';
import { useGetDirectoryTemplate } from '../../../../features/directory/directoryService';
import Checkbox from './Checkbox';

interface FieldItemProps {
  selectedTemplateId: string;
  fieldData?: {
    id: string;
    name: string;
    type: string;
    is_title: 1 | 0;
    is_required: 1 | 0;
  };
}

const typeOptions = ['Text', 'Bool', 'Number', 'Date'];

const firstLetterUppercase = (value: string) =>
  value.at(0)?.toUpperCase() + value.slice(1);

export default function FieldItem({
  selectedTemplateId,
  fieldData,
}: FieldItemProps) {
  const [name, setName] = useState(fieldData?.name || '');
  const [isRequired, setIsRequired] = useState(!!fieldData?.is_required);
  const [isTitle, setIsTitle] = useState(!!fieldData?.is_title);
  const [type, setType] = useState<FieldType>(
    ((fieldData ? firstLetterUppercase(fieldData.type) : null) ||
      'Text') as FieldType
  );

  const [allowEdit, setAllowEdit] = useState(!fieldData);

  const isNewField = !fieldData;

  const { data: template } = useGetDirectoryTemplate(selectedTemplateId);

  const { mutate: onCreateOrUpdate } =
    useUpdateOrAddTemplateField(selectedTemplateId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // allow edit for actual field on click pencil icon
    if (!isNewField && !allowEdit) {
      return setAllowEdit(true);
    }

    const savedFields = template?.fields.map((i) => ({
      id: i.id,
      name: i.name,
      type: i.type,
      isRequired: i.is_required,
      isTitle: i.is_title,
    }));

    if (savedFields) {
      const _name = name;
      const _type = type.toLowerCase() as FieldType;
      const _isTitle = (isTitle ? 1 : 0) as 1 | 0;
      const _isRequired = (isRequired ? 1 : 0) as 1 | 0;

      const newField = {
        id: fieldData?.id || '',
        name: _name,
        type: _type,
        isRequired: _isRequired,
        isTitle: _isTitle,
      };

      onCreateOrUpdate({
        templateId: selectedTemplateId,
        fields: [...savedFields, newField],
      });

      // clear input values if it's new filed
      if (isNewField) {
        setName('');
        setType('text');
        setIsRequired(false);
        setIsTitle(false);
      }

      // disable edit if it's enabled and it's actual field
      if (fieldData && allowEdit) {
        setAllowEdit(false);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex gap-3 items-center pt-4"
    >
      <input
        disabled={!allowEdit}
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="Name"
        type="text"
        placeholder="name"
        className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />

      <div className="mt-1 sm:col-span-2 sm:mt-0">
        <select
          disabled={!allowEdit}
          value={type}
          onChange={(e) => setType(e.target.value as FieldType)}
          id="type"
          name="type"
          className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
        >
          {typeOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      <Checkbox
        disabled={!allowEdit}
        label="Title"
        checked={isTitle}
        setChecked={setIsTitle}
      />

      <Checkbox
        disabled={!allowEdit}
        label="Required"
        checked={isRequired}
        setChecked={setIsRequired}
      />

      <button
        type="submit"
        className="inline-flex justify-center text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {allowEdit ? (
          <PlusIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <PencilIcon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
