import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { UseTaskUnassignService } from '../../../../features/task/taskService';
import PopAssignModal from './popAssignModal';
import ToolTip from '../../../../components/Tooltip/Tooltip';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';
import UserAvatar from './UserAvatar';

function GroupAssignee({
  data,
  itemId,
  teams,
  handleClick
}: {
  data: ITeamMembersAndGroup[];
  itemId?: string;
  teams: boolean;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  const { selectedTasksArray, selectedListIds, selectedTaskParentId } = useAppSelector((state) => state.task);

  // Define a variable to store the number of remaining items
  let remainingCount = 0;

  // Create a new array with the first three items and update the remaining count
  const displayedData = data.slice(0, 3);
  if (data.length > 3) {
    remainingCount = data.length - 3;
  }

  const [hoverInterval, setHoverInterval] = useState(false);
  const [modalLoader, setModalLoader] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLDivElement>(null);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const [displayed, setDisplayed] = useState<{
    show: boolean;
    index: number;
  }>({
    show: false,
    index: 0
  });

  const { mutate: onTaskUnassign } = UseTaskUnassignService(
    selectedTasksArray.length ? selectedTasksArray : [itemId as string],
    data[displayed.index],
    selectedListIds.length ? selectedListIds : [selectedTaskParentId]
  );

  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: itemId as string,
      team_member_id: id,
      teams
    });
  };

  const handleHoverIntervalMouseIn = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    const timeoutId = setTimeout(() => {
      setDisplayed((prev) => ({ ...prev, show: true, index }));
      setHoverInterval(true);
    }, 2000);
    setHoverTimeout(timeoutId);
    setTimeout(() => {
      setModalLoader(false);
    }, 1000);
  };

  const handleHoverIntervalMouseOut = () => {
    setDisplayed((prev) => ({ ...prev, show: false, index: 0 }));
    setAnchorEl(null);
    handleClose();
    setHoverInterval(false);
    setModalLoader(true);
  };

  const handleClose = () => {
    setDisplayed((prev) => ({ ...prev, show: false, index: 0 }));
    setAnchorEl(null);
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  return (
    <>
      <div className="relative flex items-center justify-center">
        {displayedData.map((newData, index) => (
          <div
            key={newData.id}
            className={`scaleBigger cursor-pointer ${index === 0 ? ' z-30   ' : ''} ${index === 1 ? 'z-20 ' : ''} ${
              index === 2 ? 'z-10' : 'z-0'
            }  `}
            onMouseEnter={(e) => {
              handleHoverIntervalMouseIn(index, e);
            }}
            onMouseLeave={() => handleHoverIntervalMouseOut()}
          >
            <div className=" flex items-center justify-center -ml-2.5 rounded-full relative group/parent">
              <ToolTip title={newData.name}>
                <div className="relative cursor-pointer">
                  <UserAvatar user={newData} handleClick={handleClick} />

                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border rounded-full group-hover/parent:hidden" />

                  <button
                    className="items-center justify-center absolute top-0 right-0 w-3 h-3 text-white bg-red-500 border rounded-full hover:bg-purple-700 hidden group-hover/parent:flex"
                    style={{
                      fontSize: '6px',
                      zIndex: 11
                    }}
                    onClick={() => handleUnAssignTask(newData.id)}
                  >
                    X
                  </button>
                  {/* )} */}
                  {hoverInterval && displayed.show && index === displayed?.index && (
                    <PopAssignModal
                      modalLoader={modalLoader}
                      spinnerSize={20}
                      currHoveredOnUser={newData.id ?? ''}
                      anchorEl={anchorEl}
                      handleClose={handleClose}
                    />
                  )}
                </div>
              </ToolTip>
            </div>
          </div>
        ))}
        {remainingCount > 0 ? (
          <span>
            {data?.length - 3 !== 0 ? (
              <span
                className="-ml-3 bg-gray-100 border-2 border-white rounded-full "
                style={{ padding: `${CompactView || CompactViewWrap ? '3px' : '7px'}` }}
              >
                +{data?.length - 3}
              </span>
            ) : null}
          </span>
        ) : null}
      </div>
    </>
  );
}

export default GroupAssignee;
