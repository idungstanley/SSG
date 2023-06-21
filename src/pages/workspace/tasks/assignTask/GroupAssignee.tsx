import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';
import { UseUnassignTask } from '../../../../features/task/taskService';
import PopAssignModal from './popAssignModal';
import ToolTip from '../../../../components/Tooltip';
import AvatarForOwner from '../../../../components/avatar/AvatarForOwner';
import AvatarWithImage from '../../../../components/avatar/AvatarWithImage';

interface InewData {
  id: string | null | undefined;
  initials: string;
  color: string | undefined;
  name: string;
  role: string;
  avatar_path: string | null;
}

interface groupAssignee {
  color: string;
  id: string;
  initials: string;
  name: string;
  avatar_path?: string | null;
}

function GroupAssignee({
  data,
  itemId,
  handleClick,
  teams
}: {
  data:
    | [{ id: string; initials: string; color: string; name: string; avatar_path: string | null }]
    | groupAssignee[]
    | undefined;
  itemId?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  teams: boolean;
}) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);
  const [displayed, setDisplayed] = useState<{
    show: boolean;
    index: null | number;
  }>({
    show: false,
    index: null
  });

  const { mutate: onTaskUnassign } = UseUnassignTask();

  const handleUnAssignTask = (id: string) => {
    onTaskUnassign({
      taskId: itemId,
      team_member_id: id,
      teams
    });
  };

  const [hoverInterval, setHoverInterval] = useState(false);
  const [modalLoader, setModalLoader] = useState(true);

  const handleHoverIntervalMouseIn = (index: number) => {
    // setDisplayed((prev) => ({ ...prev, show: true, index }));
    // setTimeout(() => {
    //   setHoverInterval(true);
    // }, 500);
    // setTimeout(() => {
    //   setModalLoader(false);
    // }, 1000);
  };

  const handleHoverIntervalMouseOut = () => {
    setDisplayed((prev) => ({ ...prev, show: false, index: null }));
    setHoverInterval(false);
    setModalLoader(true);
  };

  return (
    <>
      {data && data?.length >= 5 ? (
        <div className="flex items-center justify-center relative">
          {data?.slice(0, 3).map((newData, index: number) => (
            <div
              key={newData.id}
              className={`scaleBigger ${index === 0 ? ' z-30   ' : ''} ${index === 1 ? 'z-20 ' : ''} ${
                index === 2 ? 'z-10' : 'z-0'
              }  `}
              onMouseEnter={() => {
                handleHoverIntervalMouseIn(index);
              }}
              onMouseLeave={() => handleHoverIntervalMouseOut()}
            >
              <div key={newData.id} className=" flex items-center justify-center -ml-2.5 rounded-full relative    ">
                <ToolTip tooltip={newData.name}>
                  <span onClick={handleClick}>
                    {(newData as InewData).role == 'owner' ? (
                      <AvatarForOwner initials="me" />
                    ) : (
                      <div className="border-2 border-red-400  rounded-full">
                        <AvatarWithInitials initials={newData.initials} backgroundColour={newData.color} badge={true} />
                      </div>
                    )}
                  </span>

                  {displayed.show && index == displayed?.index && (
                    <button
                      className="absolute top-0 right-0 border h-3 w-3 rounded-full bg-gray-500  text-white hover:bg-purple-700 "
                      style={{
                        fontSize: '6px'
                      }}
                      onClick={() => handleUnAssignTask(newData.id as string)}
                    >
                      X
                    </button>
                  )}
                </ToolTip>
              </div>

              {hoverInterval && displayed.show && index == displayed?.index && (
                <PopAssignModal
                  modalLoader={modalLoader}
                  spinnerSize={20}
                  roundedStyle="circular"
                  height="h-20"
                  width="w-20"
                  currHoveredOnUser={newData.id ?? ''}
                />
              )}
            </div>
          ))}
          <span>
            {data?.length - 3 !== 0 ? (
              <span
                className="-ml-3 border-white border-2 rounded-full bg-gray-100 "
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
            <div key={newData.id} className="flex items-center justify-center -ml-2.5 rounded-full relative">
              <ToolTip tooltip={newData.name}>
                <div
                  onMouseEnter={() => {
                    handleHoverIntervalMouseIn(index);
                  }}
                  onMouseLeave={() => handleHoverIntervalMouseOut()}
                  className="relative "
                >
                  {newData.avatar_path == null ? (
                    <span onClick={handleClick}>
                      {(newData as InewData).role == 'owner' ? (
                        <AvatarForOwner initials={newData.initials} />
                      ) : (
                        <div className="border-2 border-red-400 rounded-full">
                          <AvatarWithInitials
                            initials={newData.initials}
                            backgroundColour={newData.color}
                            badge={true}
                          />
                        </div>
                      )}
                    </span>
                  ) : (
                    <span onClick={handleClick}>
                      {(newData as InewData).role == 'owner' ? (
                        <AvatarForOwner initials={newData.initials} />
                      ) : (
                        <div className="border-2 border-red-400 rounded-full">
                          <AvatarWithImage image_path={newData.avatar_path} height="h-8" width="w-8" />
                        </div>
                      )}
                    </span>
                  )}

                  {displayed.show && index == displayed?.index ? (
                    <button
                      className="absolute top-0 right-0 border h-3 w-3 rounded-full bg-gray-500 text-white hover:bg-purple-700"
                      style={{
                        fontSize: '6px'
                      }}
                      onClick={() => handleUnAssignTask(newData.id as string)}
                    >
                      X
                    </button>
                  ) : (
                    <span className="absolute top-0 right-0 border h-2 w-2 bg-green-500 rounded-full"></span>
                  )}

                  {hoverInterval && displayed.show && index == displayed?.index && (
                    <PopAssignModal
                      modalLoader={modalLoader}
                      spinnerSize={20}
                      roundedStyle="circular"
                      height="h-20"
                      width="w-20"
                      currHoveredOnUser={newData.id ?? ''}
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
