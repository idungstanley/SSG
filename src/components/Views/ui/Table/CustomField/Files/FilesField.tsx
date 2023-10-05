import React, { useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import FileIcon from '../../../../../../assets/icons/FileIcon';
import UploadToFile from './UploadToFileField';

interface filesProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  listId: string;
}

function FilesField({ taskCustomFields, taskId, fieldId, listId }: filesProps) {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      <div>
        {taskCustomFields?.values[0] ? (
          <div></div>
        ) : (
          <button onClick={() => setOpen(!open)}>
            <FileIcon active={false} />
          </button>
        )}
      </div>
      <div>
        <UploadToFile open={open} setOpen={setOpen} fieldId={fieldId} listId={listId} taskId={taskId} />
      </div>
    </div>
  );
}

export default FilesField;
