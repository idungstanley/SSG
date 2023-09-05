import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';
import { UseTaskUnassignService } from '../../../../features/task/taskService';
import PopAssignModal from './popAssignModal';
import ToolTip from '../../../../components/Tooltip/Tooltip';
import AvatarForOwner from '../../../../components/avatar/AvatarForOwner';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';
import { ITeamMembersAndGroup } from '../../../../features/settings/teamMembersAndGroups.interfaces';

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

  const { mutate: onTaskUnassign } = UseTaskUnassignService(itemId as string, data[displayed.index]);

  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: itemId,
      team_member_id: id,
      teams
    });
  };

  const handleHoverIntervalMouseIn = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
    const timeoutId = setTimeout(() => {
      setDisplayed((prev) => ({ ...prev, show: true, index }));
      setHoverInterval(true);
    }, 1000);
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

  const renderUnassignButton = (userId: string) => {
    return (
      <button
        className="flex items-center justify-center absolute top-0 right-0 w-3 h-3 text-white bg-gray-500 border rounded-full hover:bg-purple-700 "
        style={{
          fontSize: '6px',
          zIndex: 11
        }}
        onClick={() => handleUnAssignTask(userId)}
      >
        X
      </button>
    );
  };

  return (
    <>
      {data && data?.length >= 5 ? (
        <div className="relative flex items-center justify-center">
          {data?.slice(0, 3).map((newData, index) => (
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
              <div className=" flex items-center justify-center -ml-2.5 rounded-full relative ">
                <ToolTip title={newData.name}>
                  <div>
                    <span onClick={handleClick}>
                      {newData.role.key === 'owner' ? (
                        <AvatarForOwner initials="me" />
                      ) : (
                        <div className="border-2 border-red-400 rounded-full">
                          <AvatarWithInitials
                            initials={newData.user && (newData.user.initials as string)}
                            backgroundColour={newData.user && (newData.user.color as string)}
                            badge={true}
                            height={CompactView ? 'h-6' : 'h-7'}
                            width={CompactView ? 'w-6' : 'w-7'}
                          />
                        </div>
                      )}
                    </span>
                    {displayed.show && index === displayed?.index && renderUnassignButton(newData.id)}
                  </div>
                </ToolTip>
              </div>
              {displayed.show && index === displayed?.index ? (
                renderUnassignButton(newData.id)
              ) : (
                <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border rounded-full" />
              )}

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
          ))}
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
        </div>
      ) : (
        data?.map((newData, index: number) => (
          <div
            key={newData.id}
            className={`scaleBigger ${index === 0 ? ' z-30  ' : ''} ${index === 1 ? 'z-20 ' : ''} ${
              index === 2 ? 'z-10' : 'z-0'
            } `}
          >
            <div className="flex items-center justify-center -ml-2.5 rounded-full relative">
              <ToolTip title={newData.name}>
                <div
                  onMouseEnter={(e) => {
                    handleHoverIntervalMouseIn(index, e);
                  }}
                  onMouseLeave={() => handleHoverIntervalMouseOut()}
                  className="relative cursor-pointer"
                >
                  {!newData.user.avatar_path ? (
                    <span onClick={handleClick}>
                      {newData.role.key === 'owner' ? (
                        <AvatarForOwner initials={newData.user.initials} />
                      ) : (
                        <div className="border-2 border-red-400 rounded-full">
                          <AvatarWithInitials
                            initials={newData.user && (newData.user.initials as string)}
                            backgroundColour={newData.user && (newData.user?.color as string)}
                            badge={true}
                            height={CompactView ? 'h-6' : 'h-7'}
                            width={CompactView ? 'w-6' : 'w-7'}
                          />
                        </div>
                      )}
                    </span>
                  ) : (
                    <span onClick={handleClick}>
                      {newData.role.key === 'owner' ? (
                        <AvatarForOwner initials={newData.initials} />
                      ) : (
                        <div className="border-2 border-red-400 rounded-full">
                          <AvatarWithImage image_path={newData.user.avatar_path} height="h-8" width="w-8" />
                        </div>
                      )}
                    </span>
                  )}

                  {displayed.show && index == displayed?.index ? (
                    renderUnassignButton(newData.id)
                  ) : (
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 border rounded-full" />
                  )}

                  {hoverInterval && displayed.show && index == displayed?.index && (
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
        ))
      )}
    </>
  );
}

export default GroupAssignee;
