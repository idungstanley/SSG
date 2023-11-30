import React from 'react';
import TaskIcon from '../../../../../../assets/icons/TaskIcon';
import EmailIcon from '../../../../../../assets/icons/EmailIcon';
import CalendarIcon from '../../../../../../assets/icons/CalendarIcon';
import ToolTip from '../../../../../../components/Tooltip/Tooltip';
import { Capitalize } from '../../../../../../utils/NoCapWords/Capitalize';
import PlusIcon from '../../../../../../assets/icons/PlusIcon';

interface scheduleCards {
  schedule: {
    day: string;
    date: string;
    schedules: { type: string; title: string }[];
  };
}

function ScheduleCard({ schedule }: scheduleCards) {
  return (
    <div className="w-full">
      <div className="flex bg-white rounded p-2">
        <div className="text-center" style={{ width: '15%' }}>
          <h2 className="text-alsoit-text-md w-full flex justify-center">{schedule.day}</h2>
          <span className="text-alsoit-text-md w-full flex justify-center">
            <h3 className="w-5 h-5 rounded-full ">{schedule.date}</h3>
          </span>
        </div>
        <div className="" style={{ width: '85%' }}>
          {schedule.schedules.map((item) => {
            return (
              <div className="h-8 flex items-center my-1 group" key={item.title}>
                <div className="h-full flex flex-col justify-between mx-1 opacity-0 group-hover:opacity-100">
                  <ToolTip title="Add new">
                    <button>
                      <PlusIcon dimensions={{ width: 5, height: 5 }} />
                    </button>
                  </ToolTip>
                  <ToolTip title="Add new">
                    <button>
                      <PlusIcon dimensions={{ width: 5, height: 5 }} />
                    </button>
                  </ToolTip>
                </div>
                <span
                  style={{
                    width: '2px',
                    backgroundColor: item.type === 'task' ? '#0559D6' : item.type === 'meeting' ? '#FF0E0F' : '#BF01FE'
                  }}
                  className="h-full"
                ></span>
                <div
                  className="w-full flex items-center  gap-2 p-1 h-full"
                  style={{
                    backgroundColor: item.type === 'task' ? '#F3F7FD' : item.type === 'meeting' ? '#FFF3F3' : '#FCF3FF'
                  }}
                >
                  <ToolTip title={Capitalize(item.type)}>
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor:
                          item.type === 'task' ? '#0559D6' : item.type === 'meeting' ? '#FF0E0F' : '#BF01FE'
                      }}
                    >
                      {item.type === 'task' && <TaskIcon color="white" dimenions={{ width: '7', height: '7' }} />}
                      {item.type === 'meeting' && <EmailIcon color="white" dimensions={{ width: '7', height: '7' }} />}
                      {item.type === 'event' && (
                        <CalendarIcon active={false} dimensions={{ width: 7, height: 7 }} color="white" />
                      )}
                    </span>
                  </ToolTip>
                  <div>
                    <h2 className="text-alsoit-text-xi">{item.title}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ScheduleCard;
