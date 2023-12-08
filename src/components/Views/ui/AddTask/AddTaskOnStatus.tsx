import React, { TdHTMLAttributes, useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { useParams } from 'react-router-dom';
import { ACTIVE_COL_BG, DEFAULT_COL_BG } from '../../config';
import { cl } from '../../../../utils';
import ToolTip from '../../../Tooltip/Tooltip';
import Close from '../../../../assets/icons/Close';
import SaveIcon from '../../../../assets/icons/SaveIcon';
import StatusDropdown from '../../../status/StatusDropdown';
import { Task } from '../../../../features/task/interface.tasks';

interface ColProps extends TdHTMLAttributes<HTMLTableCellElement> {
  task: Task;
  paddingLeft?: number;
  onClose?: VoidFunction;
  selectedRow: boolean;
  handleOnSave: (
    e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => void;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
}

export default function AddTaskOnStatus({
  task,
  paddingLeft = 0,
  selectedRow,
  inputRef,
  onClose,
  handleOnSave,
  ...props
}: ColProps) {
  const { saveSettingOnline, verticalGrid, verticalGridlinesTask } = useAppSelector((state) => state.task);
  const { taskId } = useParams();

  const [saveToggle, setSaveToggle] = useState<boolean>(false);
  const [closeToggle, setCloseToggle] = useState<boolean>(false);

  const COL_BG = taskId === task?.id ? ACTIVE_COL_BG : selectedRow ? 'bg-alsoit-purple-50' : DEFAULT_COL_BG;
  return (
    <td
      className="sticky left-0 flex items-start justify-start text-sm font-medium text-gray-900 cursor-pointer text-start"
      {...props}
    >
      <div
        className="flex items-center h-full space-x-1 w-11"
        style={{
          padding: '15px 0',
          paddingLeft: 0
        }}
      />
      <div
        style={{
          paddingLeft,
          height:
            saveSettingOnline?.singleLineView && !saveSettingOnline?.CompactView
              ? '42px'
              : saveSettingOnline?.CompactView && saveSettingOnline?.singleLineView
              ? '25px'
              : !saveSettingOnline?.singleLineView && saveSettingOnline?.CompactView && task.name.length < 30
              ? '25px'
              : ''
        }}
        className={cl(
          COL_BG,
          `relative border-t ${verticalGrid && 'border-r'} ${
            verticalGridlinesTask && 'border-r'
          } w-full h-full flex items-center`
        )}
      >
        <div className="absolute bottom-0 right-0 flex p-1 space-x-1" style={{ zIndex: 1 }}>
          <ToolTip onMouseEnter={() => setCloseToggle(true)} onMouseLeave={() => setCloseToggle(false)} title="Cancel">
            <div
              className="border rounded-sm"
              style={{
                borderColor: '#B2B2B2CC',
                borderWidth: '0.5px',
                height: saveSettingOnline?.CompactView ? '15px' : '20px',
                width: saveSettingOnline?.CompactView ? '15px' : '20px'
              }}
              onClick={onClose}
            >
              <Close
                height={saveSettingOnline?.CompactView ? '15px' : '20px'}
                width={saveSettingOnline?.CompactView ? '15px' : '20px'}
                active={closeToggle}
              ></Close>
            </div>
          </ToolTip>
          <ToolTip onMouseEnter={() => setSaveToggle(true)} onMouseLeave={() => setSaveToggle(false)} title="Save">
            <span onClick={(e) => handleOnSave(e as React.MouseEvent<HTMLButtonElement, MouseEvent>, task.id)}>
              <SaveIcon
                height={saveSettingOnline?.CompactView ? '15px' : '20px'}
                width={saveSettingOnline?.CompactView ? '15px' : '20px'}
                active={saveToggle}
              ></SaveIcon>
            </span>
          </ToolTip>
        </div>
        <div className="pt-1 ml-4">
          <StatusDropdown taskCurrentStatus={task.status} taskStatuses={task.task_statuses} />
        </div>
        <div className="flex flex-col items-start justify-start w-full pl-2 space-y-1">
          <p
            className={`w-full flex text-left empty:before:content-[attr(placeholder)] alsoit-gray-300 font-semibold empty:opacity-50 overflow-hidden items-center h-5 ${
              saveSettingOnline?.CompactView ? 'text-alsoit-text-md' : 'text-alsoit-text-lg'
            }`}
            contentEditable={true}
            placeholder="Add New Task"
            ref={inputRef}
            style={{ maxWidth: '90%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
            onKeyDown={(e) => (e.key === 'Enter' ? handleOnSave(e, task.id) : null)}
          ></p>
        </div>
      </div>
    </td>
  );
}
