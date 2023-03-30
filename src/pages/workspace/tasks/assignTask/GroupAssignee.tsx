import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function GroupAssignee({ data }: { data: [{ id: string; initials: string; colour: string }] | undefined }) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);

  return (
    <>
      {data && data?.length >= 2 ? (
        <div className="flex items-center justify-center">
          {data
            ?.slice(0, 3)
            .map((newData: { id: React.Key | null | undefined; initials: string; colour: string | undefined }) => (
              <div key={newData.id} className="">
                <span
                  key={newData.id}
                  className="flex items-center justify-center -ml-2.5 border-white border-2 rounded-full"
                >
                  <AvatarWithInitials
                    initials={newData.initials}
                    backgroundColour={newData.colour}
                    height={`${CompactView || CompactViewWrap ? 'h-4' : 'h-8'}`}
                    width={`${CompactView || CompactViewWrap ? 'w-4' : 'w-8'}`}
                  />
                </span>
              </div>
            ))}
          <span>
            {(data as [{ id: string; initials: string; colour: string }])?.length - 3 !== 0 ? (
              <span>+{(data as [{ id: string; initials: string; colour: string }])?.length - 3}</span>
            ) : null}
          </span>
        </div>
      ) : (
        data?.map((newData) => (
          <div key={newData.id} className="flex z-10">
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
