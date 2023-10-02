import React, { useEffect, useState } from 'react';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import Button from '../../../../../components/Buttons/Button';
import Assignee from '../../assignTask/Assignee';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCurrTeamMemId } from '../../../../../features/task/taskSlice';
import { useDuplicateTask } from '../../../../../features/task/taskService';

export default function DuplicateTaskAdvanceModal({
  handleClose,
  anchorEl
}: {
  handleClose: () => void;
  anchorEl: null | HTMLSpanElement | HTMLDivElement;
}) {
  const { duplicateTaskObj } = useAppSelector((state) => state.task);

  const { mutate: duplicateTask } = useDuplicateTask();
  const dispatch = useAppDispatch();

  const [currentSelected, setCurrentSelected] = useState<string[]>([]);

  const attributes = [
    { label: 'Everything', value: 'everything' },
    { label: 'Activity', value: 'activity' },
    { label: 'Attachments', value: 'attachments' },
    { label: 'Comments', value: 'comments' },
    { label: 'Only Assigned Comments', value: 'only-assigned-comments' },
    { label: 'Comment Attachments', value: 'comment_attachments' },
    { label: 'Custom Fields', value: 'custom_fields' },
    { label: 'Dependencies', value: 'dependencies' },
    { label: 'Due Date', value: 'due_date' },
    { label: 'Keep Task Status', value: 'keep_task_status' },
    { label: 'Recurring Settings', value: 'recurring_settings' },
    { label: 'Tags', value: 'tag' }
  ];

  const asigneeWatcher = [
    { label: 'Assignees', value: 'assignees', asigneeWatcher: <Assignee option="getTeamId" /> },
    { label: 'Watcher', value: 'watcher', asigneeWatcher: <Assignee option="getTeamId" /> },
    { label: 'Send Notifications' }
  ];

  const checkBox = {
    width: '16px',
    height: '16px',
    border: '1px solid gray',
    borderRadius: '3px',
    margin: '0 8px',
    cursor: 'pointer',
    color: '#7F76F0'
  };

  useEffect(() => {
    if (duplicateTaskObj.fullTask?.assignees.length) {
      dispatch(setCurrTeamMemId(duplicateTaskObj.fullTask?.assignees[0]?.id as string));
    } else {
      dispatch(setCurrTeamMemId(null));
    }

    if (duplicateTaskObj.fullTask?.assignees.length) {
      const label = 'assignees';
      setCurrentSelected((prevSelected) => [...prevSelected, label]);
    }
    if (duplicateTaskObj.fullTask?.description) {
      const label = 'comments';
      setCurrentSelected((prevSelected) => [...prevSelected, label]);
    }
    if (duplicateTaskObj.fullTask?.custom_field_columns) {
      const label = 'custom_fields';
      setCurrentSelected((prevSelected) => [...prevSelected, label]);
    }
    if (duplicateTaskObj.fullTask?.end_date) {
      const label = 'due_date';
      setCurrentSelected((prevSelected) => [...prevSelected, label]);
    }
    if (duplicateTaskObj.fullTask?.status) {
      const label = 'keep_task_status';
      setCurrentSelected((prevSelected) => [...prevSelected, label]);
    }
  }, []);

  const handleDuplicateSave = () => {
    duplicateTask({
      ...duplicateTaskObj,
      list_id: duplicateTaskObj.list_id,
      copy: currentSelected
    });

    handleClose();
  };

  const onChange = (label: string, value: string) => {
    // Toggle the selected state
    setCurrentSelected((prevSelected) =>
      prevSelected.includes(value) ? prevSelected.filter((selected) => selected !== value) : [...prevSelected, value]
    );
  };

  return (
    <div>
      <AlsoitMenuDropdown handleClose={handleClose} anchorEl={anchorEl}>
        <section
          style={{
            width: '650px',
            height: '685px',
            padding: '20px 50px 50px 50px'
          }}
        >
          <div className="flex justify-between mt-3 mb-5">
            <h1 className="text-2xl">Duplicate task</h1>
            <p className="text-2xl cursor-pointer" onClick={handleClose}>
              x
            </p>
          </div>

          <section
            className="border mx-5 pl-3"
            style={{
              backgroundColor: '#FBFBFB'
            }}
          >
            <p className="my-5">What do you want to duplicate</p>
            <section className="flex justify-between mr-3 h-full">
              <div className="space-y-5 pb-3">
                {attributes.map((attribute) => {
                  return (
                    <div key={attribute.label} className="flex items-center ">
                      <input
                        type="checkbox"
                        checked={currentSelected.includes(attribute.value as string)}
                        onChange={() => onChange(attribute.label.toLowerCase(), attribute.value as string)}
                        style={checkBox}
                      />
                      <span className="pl-5">{attribute.label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col justify-between pb-3 ">
                {asigneeWatcher.map((attribute) => {
                  return (
                    <div
                      key={attribute.label}
                      className={`flex flex-col justify-center ${attribute.asigneeWatcher && 'border-b-2 pb-3'}`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={currentSelected.includes(attribute.value as string)}
                          onChange={() => onChange(attribute.label.toLowerCase(), attribute.value as string)}
                          style={checkBox}
                        />
                        <span className="pl-3">{attribute.label}</span>
                      </div>
                      <p className="ml-16 my-3 ">{attribute.asigneeWatcher}</p>
                    </div>
                  );
                })}
              </div>
            </section>
          </section>

          <div className="flex justify-between my-5">
            <p></p>
            <p className="cursor-pointer" onClick={handleDuplicateSave}>
              <Button active={true}>Duplicate task</Button>
            </p>
          </div>
        </section>
      </AlsoitMenuDropdown>
    </div>
  );
}
