import { useState } from 'react';
import ThreeDotIcon from '../../../../assets/icons/ThreeDotIcon';
import ToolTip from '../../../Tooltip/Tooltip';
import { Menu } from '@mui/material';
import DropdownTitle from '../../../DropDowns/DropdownTitle';
import DropdownSubtitle from '../../../DropDowns/DropdownSubtitle';

// interface TaskDropDownProps {
//   dropdownEl: HTMLElement | null;
//   setDropdownEl: (i: HTMLElement | null) => void;
// }

export default function TaskDropDown() {
  const items = [
    {
      label: 'Rename'
    },
    {
      label: 'Add to'
    },
    {
      label: 'Convert to'
    },
    {
      label: 'Task Type'
    },
    {
      label: 'Duplicate'
    },
    {
      label: 'Send email to task'
    },
    {
      label: 'Merge'
    },
    {
      label: 'Move'
    },
    {
      label: 'Dependencies'
    },
    {
      label: 'Templates'
    },
    {
      label: 'Archive'
    }
  ];

  const [dropdownEl, setDropdownEl] = useState<null | HTMLElement>(null);

  const handleSettings = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>): void => {
    e.preventDefault();
    setDropdownEl(e.currentTarget);
  };

  return (
    <>
      <ToolTip title="Settings">
        <button className="p-1 opacity-0 group-hover:opacity-100" onClick={(e) => handleSettings(e)}>
          <ThreeDotIcon />
        </button>
      </ToolTip>
      <Menu anchorEl={dropdownEl} open={!!dropdownEl} onClose={() => setDropdownEl(null)}>
        <div style={{ height: '372px', width: '200px', overflow: 'auto' }}>
          <DropdownTitle content="TASK" />
          <DropdownSubtitle content="SETTINGS" />
          <div>
            {items.map((i) => (
              <div key={i.label}>
                <div
                  className="flex p-3 text-alsoit-text-lg font-semibold w-full cursor-pointer"
                  style={{ lineHeight: '15.6px', color: 'orange' }}
                >
                  {i.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Menu>
    </>
  );
}
