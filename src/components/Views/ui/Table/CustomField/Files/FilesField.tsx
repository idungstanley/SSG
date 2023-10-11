import React, { useState } from 'react';
import { ICustomField, setOpenFileUploadModal } from '../../../../../../features/task/taskSlice';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import AddTo from '../../../../../Pilot/components/details/properties/attachments/AddTo';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import FileIcons from './FileIcon';

interface filesProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  listId: string;
}

function FilesField({ taskCustomFields, taskId, fieldId, listId }: filesProps) {
  const taskFiles = taskCustomFields?.values ?? [];
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const { fileUploadProps } = useAppSelector((state) => state.task);

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center">
        {taskFiles.map((file) => {
          return (
            <FileIcons
              fileExtension={file.file?.file_format.extension}
              filePath={file.file?.path}
              key={file.id}
              fileName={file.name}
              height="h-5"
              width="w-5"
            />
          );
        })}
        <button
          className="w-4 h-4 border border-alsoit-gray-200 rounded hover:bg-alsoit-gray-100 flex justify-center items-center"
          onClick={(e) => {
            dispatch(
              setOpenFileUploadModal({
                ...fileUploadProps,
                listId,
                taskId,
                fieldId
              })
            );
            setOpen(e.currentTarget);
          }}
        >
          <PlusIcon />
        </button>
      </div>

      <AlsoitMenuDropdown anchorEl={open} handleClose={() => setOpen(null)}>
        <div style={{ width: '230px', height: '320px' }}>
          <AddTo locationn="list view" />
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default FilesField;
