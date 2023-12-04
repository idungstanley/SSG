import React, { useEffect, useRef, useState } from 'react';
import { ICustomField, setOpenFileUploadModal } from '../../../../../../features/task/taskSlice';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import AddTo from '../../../../../Pilot/components/details/properties/attachments/AddTo';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import FileIcons from './FileIcon';
import { Task } from '../../../../../../features/task/interface.tasks';

interface filesProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  listId: string;
  activeColumn?: boolean[];
  task?: Task;
}

function FilesField({ taskCustomFields, taskId, fieldId, listId, activeColumn, task }: filesProps) {
  const taskFiles = taskCustomFields?.values ?? [];

  const dispatch = useAppDispatch();

  const [open, setOpen] = useState<null | HTMLElement>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { fileUploadProps, KeyBoardSelectedTaskData, taskColumnIndex } = useAppSelector((state) => state.task);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      setOpen(containerRef.current);
    }
  };

  useEffect(() => {
    if (containerRef.current && activeColumn) {
      if (task?.id === KeyBoardSelectedTaskData?.id && activeColumn[taskColumnIndex]) {
        containerRef.current.focus();
      }
      containerRef.current.addEventListener('keydown', handleKeyDown);
    }

    return () => containerRef.current?.removeEventListener('keydown', handleKeyDown);
  }, [task, KeyBoardSelectedTaskData, taskColumnIndex, activeColumn]);

  return (
    <div ref={containerRef} tabIndex={0}>
      <div className="flex flex-wrap items-center gap-2">
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
          className="flex items-center justify-center w-4 h-4 border rounded border-alsoit-gray-200 hover:bg-alsoit-gray-100"
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
