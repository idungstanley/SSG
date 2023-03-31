import React from 'react';
import { useAppSelector } from '../../../../app/hooks';
import { AvatarWithInitials } from '../../../../components';

function GroupAssignee({ data }: { data: [{ id: string; initials: string; colour: string }] | undefined }) {
  const { CompactView, CompactViewWrap } = useAppSelector((state) => state.task);

  return (
    <>
      {data && data?.length ? (
        <div className="flex items-center justify-center">
          {data
            ?.slice(0, 3)
            .map(
              (
                newData: { id: React.Key | null | undefined; initials: string; colour: string | undefined },
                index: number
              ) => (
                <div
                  key={newData.id}
                  className={`scaleBigger ${index === 0 ? ' z-30  ' : ''} ${index === 1 ? 'z-20 ' : 'z-10'} `}
                >
                  <span
                    key={newData.id}
                    className="flex items-center justify-center -ml-3.5 border-white border-2  rounded-full hover:bg-blue-500"
                  >
                    <AvatarWithInitials
                      initials={newData.initials}
                      backgroundColour={newData.colour}
                      height={`${CompactView || CompactViewWrap ? 'h-4' : 'h-8'}`}
                      width={`${CompactView || CompactViewWrap ? 'w-4' : 'w-8'}`}
                    />
                  </span>
                </div>
              )
            )}
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
