import React from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';

interface WebsiteFieldProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
}

function WebsiteField({ taskCustomFields, taskId, fieldId }: WebsiteFieldProps) {
  return <div>WebsiteField</div>;
}

export default WebsiteField;
