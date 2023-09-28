import React, { useEffect } from 'react';
import AlsoitMenuDropdown from '../../../../../components/DropDowns';
import Button from '../../../../../components/Buttons/Button';
import Assignee from '../../assignTask/Assignee';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCurrTeamMemId } from '../../../../../features/task/taskSlice';

export default function DuplicateTaskAdvanceModal({
  handleClose,
  anchorEl
}: {
  handleClose: () => void;
  anchorEl: null | HTMLSpanElement | HTMLDivElement;
}) {
  const { duplicateTaskObj } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();

  const attributes = [
    { label: 'Everything' },
    { label: 'Activity' },
    { label: 'Attachments' },
    { label: 'Comments' },
    { label: 'Only Assigned Comments' },
    { label: 'Comment Attachments' },
    { label: 'Custom Fields' },
    { label: 'Dependencies' },
    { label: 'Due Date' },
    { label: 'Keep Task Status' },
    { label: 'Recurring Settings' },
    { label: 'Tags' }
  ];
  const asigneeWatcher = [
    { label: 'Assignee', asigneeWatcher: <Assignee option="getTeamId" /> },
    { label: 'Watcher', asigneeWatcher: <Assignee option="getTeamId" /> },
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
  }, []);

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
                      <input type="checkbox" style={checkBox} /> <span className="pl-5">{attribute.label}</span>
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
                        <input type="checkbox" style={checkBox} /> <span className="pl-3">{attribute.label}</span>
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
            <p className="cursor-pointer">
              <Button active={true}>Duplicate task</Button>
            </p>
          </div>
        </section>
      </AlsoitMenuDropdown>
    </div>
  );
}
