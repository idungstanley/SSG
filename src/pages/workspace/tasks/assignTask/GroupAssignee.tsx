import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function GroupAssignee({ data }: { data: [{ id: string; initials: string; colour: string }] | undefined }) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);

  return (
    <>
      {data && data?.length >= 3 ? (
        <div className="flex items-center justify-center">
          {data
            ?.slice(0, 2)
            .map((newData: { id: React.Key | null | undefined; initials: string; colour: string | undefined }) => (
              <div key={newData.id}>
                <span key={newData.id} className="flex  items-center gap-1 justify center">
                  <AvatarWithInitials
                    initials={newData.initials}
                    backgroundColour={newData.colour}
                    height={`${CompactView || CompactViewWrap ? 'h-4' : 'w-8'}`}
                    width={`${CompactView || CompactViewWrap ? 'h-4' : 'w-8'}`}
                  />
                </span>
              </div>
            ))}
          <span>
            {(data as [{ id: string; initials: string; colour: string }])?.length - 2 !== 0 ? (
              <span>+{(data as [{ id: string; initials: string; colour: string }])?.length - 2}</span>
            ) : null}
          </span>
        </div>
      ) : (
        data?.map((newData) => (
          <div key={newData.id} className="flex">
            <span key={newData.id}>
              <AvatarWithInitials
                initials={newData.initials}
                backgroundColour={newData.colour}
                height={`${CompactView || CompactViewWrap ? 'h-4' : 'h-8'}`}
                width={`${CompactView || CompactViewWrap ? 'w-4' : 'w-8'}`}
              />
            </span>
          </div>
        ))
      )}
    </>
  );
}

export default GroupAssignee;
