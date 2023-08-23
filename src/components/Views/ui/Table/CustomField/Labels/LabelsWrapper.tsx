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
  return <div>LabelsWrapper</div>;
}

export default LabelsWrapper;
