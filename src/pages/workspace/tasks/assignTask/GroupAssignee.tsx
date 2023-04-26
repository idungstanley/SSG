import React, { useState } from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';
import { UseUnassignTask } from '../../../../features/task/taskService';
import PopAssignModal from './popAssignModal';

function GroupAssignee({
  data,
  itemId,
  handleClick
}: {
  data: [{ id: string; initials: string; colour: string }] | undefined;
  itemId?: string;
  handleClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
      team_member_id: id
    });
  };

  const [hoverInterval, setHoverInterval] = useState(false);

  const handleHoverIntervalMouseIn = (index: number) => {
    setDisplayed({
      show: true,
      index
    });
    setTimeout(() => {
      setHoverInterval(true);
    }, 2000);
  };

  const handleHoverIntervalMouseOut = (index: number) => {
    setDisplayed({
      show: false,
      index
    });
    setHoverInterval(false);
  };

  return (
    <>
      {data && data?.length >= 5 ? (
        <div className="flex items-center justify-center ">
          {data?.slice(0, 3).map(
            (
              newData: {
                id: React.Key | null | undefined;
                initials: string;
                colour: string | undefined;
              },
              index: number
            ) => (
              <div
                key={newData.id}
                className={`scaleBigger ${index === 0 ? ' z-30   ' : ''} ${index === 1 ? 'z-20 ' : ''} ${
                  index === 2 ? 'z-10' : 'z-0'
                }  `}
                onMouseEnter={() => {
                  handleHoverIntervalMouseIn(index);
                }}
                onMouseLeave={() => handleHoverIntervalMouseOut(index)}
              >
                <span key={newData.id} className=" flex items-center  -ml-2.5  border-2  rounded-full ">
                  <div className="relative">
                    <span onClick={handleClick}>
                      <AvatarWithInitials
                        initials={newData.initials}
                        backgroundColour={newData.colour}
                        height={`${
                          CompactView || CompactViewWrap ? 'CompactWithInitialsH' : 'ComfortableWithInitialsH'
                        }`}
                        width={`${
                          CompactView || CompactViewWrap ? 'CompactWithInitialsW' : 'ComfortableWithInitialsW'
                        }`}
                      />
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
                  </div>
                </span>
                {hoverInterval && displayed.show && index == displayed?.index && (
                  <PopAssignModal
                    userData={
                      newData as {
                        id: React.Key | null | undefined;
                        initials: string;
                        colour: string | undefined;
                        name: string;
                        avatar_path: string;
                      }
                    }
                  />
                )}
              </div>
            )
          )}
          <span>
            {(data as [{ id: string; initials: string; colour: string }])?.length - 3 !== 0 ? (
              <span
                className="-ml-3 border-white border-2  rounded-full bg-gray-100 "
                style={{ padding: `${CompactView || CompactViewWrap ? '3px' : '7px'}` }}
              >
                +{(data as [{ id: string; initials: string; colour: string }])?.length - 3}
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
            <span
              key={newData.id}
              className="flex items-center justify-center -ml-2.5  border-2  rounded-full relative"
            >
              <div
                onMouseEnter={() => {
                  handleHoverIntervalMouseIn(index);
                }}
                onMouseLeave={() => handleHoverIntervalMouseOut(index)}
                className="relative "
              >
                <span onClick={handleClick}>
                  <AvatarWithInitials
                    initials={newData.initials}
                    backgroundColour={newData.colour}
                    height={`${CompactView || CompactViewWrap ? 'CompactWithInitialsH' : 'ComfortableWithInitialsH'}`}
                    width={`${CompactView || CompactViewWrap ? 'CompactWithInitialsW' : 'ComfortableWithInitialsW'}`}
                  />
                </span>
                {displayed.show && index == displayed?.index && (
                  <button
                    className="absolute top-0 right-0 border h-3 w-3 rounded-full bg-gray-500  text-white hover:bg-purple-700"
                    style={{
                      fontSize: '6px'
                    }}
                    onClick={() => handleUnAssignTask(newData.id as string)}
                  >
                    X
                  </button>
                )}

                {hoverInterval && displayed.show && index == displayed?.index && (
                  <PopAssignModal
                    userData={
                      newData as {
                        id: React.Key | null | undefined;
                        initials: string;
                        colour: string | undefined;
                        name: string;
                        avatar_path: string;
                      }
                    }
                  />
                )}
              </div>
            </span>
          </div>
        ))
      )}
    </>
  );
}

export default GroupAssignee;
