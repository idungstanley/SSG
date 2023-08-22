import React from 'react';
import { IField } from '../../../../../../features/list/list.interfaces';
import { ICustomField } from '../../../../../../features/task/taskSlice';

interface LabelFieldWrapperProps {
  taskCustomFields?: ICustomField;
  // fieldId: string;
  // taskId: string;
  entityCustomProperty?: IField[];
}

function LabelsWrapper({ entityCustomProperty, taskCustomFields }: LabelFieldWrapperProps) {
  console.log(taskCustomFields);
  console.log(entityCustomProperty);
  return <div>{}</div>;
}

export default LabelsWrapper;
