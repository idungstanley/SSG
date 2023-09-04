import React from 'react';
import { IField, Options } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import TagsDropdown from './TagsDropdown';

interface LabelFieldWrapperProps {
  taskCustomFields?: ICustomField;
  // fieldId: string;
  taskId: string;
  entityCustomProperty?: IField;
}

interface array2 {
  id: string;
  value: string;
}

const getActiveOptions = (arr1: Options | undefined, arr2: array2[] | undefined) => {
  return arr1?.filter((obj1) => arr2?.find((obj2) => obj2.value === obj1.id));
};

function TagsWrapper({ entityCustomProperty, taskCustomFields, taskId }: LabelFieldWrapperProps) {
  const activeOptions = taskCustomFields?.values;
  const allOptions = entityCustomProperty?.options;
  const optionsFromField = getActiveOptions(allOptions, activeOptions);

  return (
    <div className="w-full">
      <TagsDropdown
        optionsFromField={optionsFromField}
        allOptions={allOptions}
        currentProperty={entityCustomProperty as IField}
        taskId={taskId}
      />
    </div>
  );
}

export default TagsWrapper;
