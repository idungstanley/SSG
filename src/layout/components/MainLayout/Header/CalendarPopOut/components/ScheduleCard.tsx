import React from 'react';
import TaskIcon from '../../../../../../assets/icons/TaskIcon';
import EmailIcon from '../../../../../../assets/icons/EmailIcon';
import CalendarIcon from '../../../../../../assets/icons/CalendarIcon';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';

function ScheduleCard() {
  return (
    <div className="w-full">
      <div className="flex bg-white rounded p-2">
        <div className="text-center" style={{ width: '15%' }}>
          <h2 className="text-alsoit-text-md w-full flex justify-center">Mon</h2>
          <span className="text-alsoit-text-md w-full flex justify-center">
            <h3 className="w-5 h-5 rounded-full ">4</h3>
          </span>
        </div>
        <div className="" style={{ width: '85%' }}>
          <div className="h-8 flex items-center my-1">
            <span style={{ width: '2px', backgroundColor: '#0559D6' }} className="h-full"></span>
            <div className="w-full flex items-center  gap-2 p-1 h-full" style={{ backgroundColor: '#F3F7FD' }}>
              <ToolTip title="Task">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#0559D6' }}
                >
                  <TaskIcon color="white" dimenions={{ width: '7', height: '7' }} />
                </span>
              </ToolTip>
              <div>
                <h2 className="text-alsoit-text-xi">This is a Task</h2>
              </div>
            </div>
          </div>
          <div className="h-8 flex items-center my-1" style={{ backgroundColor: '#FFF3F3' }}>
            <span style={{ width: '2px', backgroundColor: '#FF0E0F' }} className="h-full"></span>
            <div className="w-full flex items-center gap-2 p-1 h-full">
              <ToolTip title="Email">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FF0E0F' }}
                >
                  <EmailIcon color="white" dimensions={{ width: '7', height: '7' }} />
                </span>
              </ToolTip>
              <div>
                <h2 className="text-alsoit-text-xi">This is for meeting</h2>
              </div>
            </div>
          </div>
          <div className="h-8 flex items-center my-1" style={{ backgroundColor: '#FCF3FF' }}>
            <span style={{ width: '2px', backgroundColor: '#BF01FE' }} className="h-full"></span>
            <div className="w-full flex items-center gap-2 p-1 h-full">
              <ToolTip title="Calendar event">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#BF01FE' }}
                >
                  <CalendarIcon active={false} dimensions={{ width: 7, height: 7 }} color="white" />
                </span>
              </ToolTip>
              <div>
                <h2 className="text-alsoit-text-xi">This is a calendar event</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
