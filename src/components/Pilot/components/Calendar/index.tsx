import { useState } from 'react';
import CalendarIcon from '../../../../assets/icons/CalendarIcon';
import SectionArea from '../SectionArea';

export default function Calendar() {
  const [iconToggle, setIconToggle] = useState(false);
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center w-full border-b-alsoit-border-base">
        <div onMouseEnter={() => setIconToggle(true)} onMouseLeave={() => setIconToggle(false)}>
          <SectionArea
            label="Calendar"
            icon={<CalendarIcon active={iconToggle} dimensions={{ width: 20, height: 20 }} />}
          />
        </div>
      </div>
      <div className="flex justify-center w-full">
        <span>Calendar Goes Here</span>
      </div>
    </div>
  );
}
