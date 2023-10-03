import React, { useEffect, useState } from 'react';
import { ICustomField } from '../../../../../../features/task/taskSlice';
import FileIcon from '../../../../../../assets/icons/FileIcon';
import UploadToFile from './UploadToFileField';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';
import AlsoitMenuDropdown from '../../../../../DropDowns';
import AddTo from '../../../../../Pilot/components/details/properties/attachments/AddTo';
import { useAppSelector } from '../../../../../../app/hooks';

interface filesProps {
  taskCustomFields?: ICustomField;
  taskId: string;
  fieldId: string;
  listId: string;
}

function FilesField({ taskCustomFields, taskId, fieldId, listId }: filesProps) {
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const [pop, setPop] = useState<boolean>(false);
  const { showTaskUploadModal } = useAppSelector((state) => state.task);
  // <PlusIcon active />

  useEffect(() => {
    if (showTaskUploadModal) {
      setOpen(null);
    }
  }, [showTaskUploadModal]);
  return (
    <div>
      <button
        className="w-4 h-4 border border-alsoit-gray-200 rounded hover:bg-alsoit-gray-100 flex justify-center items-center"
        // onClick={(e) => setOpen(e.currentTarget)}
        onClick={() => setPop(!pop)}
      >
        <PlusIcon />
      </button>
      <div>
        <UploadToFile open={pop} setOpen={setPop} fieldId={fieldId} listId={listId} taskId={taskId} />
      </div>
      <AlsoitMenuDropdown anchorEl={open} handleClose={() => setOpen(null)}>
        <div style={{ width: '230px', height: '320px' }}>
          <AddTo />
        </div>
      </AlsoitMenuDropdown>
    </div>
  );
}

export default FilesField;
