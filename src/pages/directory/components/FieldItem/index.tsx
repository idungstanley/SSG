import React, { useState } from 'react';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { FieldType } from '../../../../features/directory/directory.interfaces';
import { useUpdateOrAddTemplateField } from '../../../../features/directory/directoryActionService';
import { useGetDirectoryTemplate } from '../../../../features/directory/directoryService';

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

export default function FieldItem({
  selectedTemplateId,
  fieldData,
}: FieldItemProps) {
  const [name, setName] = useState(fieldData?.name || '');
  const [type, setType] = useState<FieldType>(
    (fieldData
      ? ((fieldData.type.at(0)?.toUpperCase() +
          fieldData.type.slice(1)) as FieldType)
      : null) || ('Text' as FieldType)
  );

  const [isRequired, setIsRequired] = useState(!!fieldData?.is_required);
  const [isTitle, setIsTitle] = useState(!!fieldData?.is_title);
  const [allowEdit, setAllowEdit] = useState(!fieldData);

  const isNewField = !fieldData;

  const { data: template } = useGetDirectoryTemplate(selectedTemplateId);

  const { mutate: onCreateOrUpdate } =
    useUpdateOrAddTemplateField(selectedTemplateId);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      // clear inputs
      if (isNewField) {
        setName('');
        setType('text');
        setIsRequired(false);
        setIsTitle(false);
      }

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

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            disabled={!allowEdit}
            checked={isTitle}
            onChange={(e) => setIsTitle(e.target.checked)}
            id="title"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        <label
          htmlFor="title"
          className="font-medium text-gray-700 ml-3 text-sm"
        >
          Title
        </label>
      </div>

      <div className="relative flex items-start">
        <div className="flex h-5 items-center">
          <input
            disabled={!allowEdit}
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            id="Required"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
        </div>

        <label
          htmlFor="Required"
          className="font-medium text-gray-700 ml-3 text-sm"
        >
          Required
        </label>
      </div>

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
