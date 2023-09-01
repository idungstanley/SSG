import { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { IEntries } from '../../../../features/task/interface.tasks';
import ReusableSelect from '../../../../utils/TimeDropDown';
import { ActiveUsersTimer } from './ActiveUsersTimer';
import { createDynamicTimeComponent } from '../../../../utils/calendar';

interface Props {
  activeTrackers: IEntries[] | undefined;
}

export function ManualTimeElement({ activeTrackers }: Props) {
  const [value, setValue] = useState<string>('');

  const { timeInterval } = useAppSelector((state) => state.calendar);
  const { timezone } = useAppSelector((state) => state.userSetting);
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-col space-y-1.5">
        <input
          type="text"
          placeholder="Enter time e.g. 3hrs 20mins"
          className="w-11/12 px-2 py-0.5 mx-auto rounded-lg text-alsoit-text-md"
        />
        <input
          type="text"
          placeholder="Description"
          className="w-11/12 px-2 py-0.5 mx-auto rounded-lg text-alsoit-text-md"
        />
      </div>
      <div className="w-11/12 flex justify-start items-center mx-auto">
        <div className="cursor-pointer bg-alsoit-purple-50 p-2.5 rounded-sm shadow-xl">
          <ReusableSelect
            options={createDynamicTimeComponent(timeInterval, timezone)}
            style="top-3"
            onclick={(e) => console.log(e)}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <ActiveUsersTimer activeTrackers={activeTrackers} />
      </div>
    </div>
  );
}
