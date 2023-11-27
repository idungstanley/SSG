import { useEffect, useState } from 'react';
import { MdOutlineDeveloperBoard } from 'react-icons/md';
import { Menu } from '@mui/material';
import { VerticalScroll } from '../../../../components/ScrollableContainer/VerticalScroll';
import { useAppSelector } from '../../../../app/hooks';
import { getTasksStatuses, useMultipleUpdateStatus } from '../../../../features/task/taskService';
import { RiCheckboxBlankFill } from 'react-icons/ri';

export interface MultipleTaskStatuses {
  name: string;
  color: string;
  type: string;
}

export default function MultipleStatuses() {
  const { selectedTasksArray } = useAppSelector((state) => state.task);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [allStatuses, setAllStatuses] = useState<MultipleTaskStatuses[]>([]);

  // get list tasks
  const { data: statusesData } = getTasksStatuses(selectedTasksArray, anchorEl as HTMLElement | null);
  const { mutate: onUpdate } = useMultipleUpdateStatus();

  useEffect(() => {
    if (statusesData) {
      setAllStatuses(statusesData);
    }
  }, [statusesData]);

  const updateStatus = (name: string) => {
    onUpdate({
      ids: selectedTasksArray,
      status: name
    });
  };

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => setAnchorEl(e.currentTarget)}>
        <MdOutlineDeveloperBoard />
      </div>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)} style={{ marginTop: '10px' }}>
        <div className="relative z-10" key="multipleStatuses">
          <VerticalScroll>
            <div className="max-h-52">
              <div className="flex flex-col items-center justify-center w-48 p-1 text-center bg-white divide-y divide-gray-100 shadow-lg outline-none h-fit ring-1 ring-black ring-opacity-5 focus:outline-none">
                {allStatuses.length
                  ? allStatuses.map((status) => (
                      <button
                        key={status.name}
                        type="button"
                        className="flex items-center px-4 py-2 text-sm text-gray-600 rounded hover:bg-alsoit-gray-50 text-left space-x-2 w-full"
                        onClick={() => {
                          updateStatus(status.name);
                          setAnchorEl(null);
                        }}
                      >
                        <p>
                          <RiCheckboxBlankFill
                            className="pl-px text-xs"
                            aria-hidden="true"
                            style={{ color: `${status.color}` }}
                          />
                        </p>
                        <p>{status.name}</p>
                      </button>
                    ))
                  : null}
              </div>
            </div>
          </VerticalScroll>
        </div>
      </Menu>
    </>
  );
}
